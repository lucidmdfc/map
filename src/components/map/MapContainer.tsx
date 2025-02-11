import { useEffect, useState } from "react";
// leaflet
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON as GeoJSONType } from "geojson";

// controlls
import ResetButtonControl from "../controlls/ResetButtonControl";
// layers
import { GeoJSONLayer, MarkerLayer } from "../Layers";
// Data
import country from "../../dataMocks/country.json";
import prisonData from "../../dataMocks/prisonData.json";
import sortingMethods from "../../dataMocks/sortingMethods.json";
// utils
import FitBoundsToGeoJSON from "../../utils/fitBound";
import { MapSettings } from ".";
import { Box } from "@mui/material";
import { LegendWithFilters } from "../LegendWithFilters";
import { useMapRegistry } from "@/src/hooks/useMapRegistry";

const CustomMapContainer: React.FC = () => {
  const [countryData, setCountryData] = useState<GeoJSONType | null>(
    country as GeoJSONType
  );
  const [statistics, setStatistics] = useState<GeoJSONType | null>(null);
  const [sortingByMethode, setSortingByMethode] = useState(sortingMethods[0]);
  const [cityClicked, setCityClicked] = useState(false); // Track if a city is clicked
  const [legendType, setLegendType] = useState<"category" | "gradient">(
    sortingByMethode.legendType as "category" | "gradient"
  );
  const { state, updateMarkers, updateLegend, refresh } = useMapRegistry();

  useEffect(() => {
    const sendDataAndFetchUpdatedState = async () => {
      const markers = prisonData.features.map((prison: any) => ({
        id: prison.properties.id,
        coordinates: prison.geometry.coordinates,
        type: prison.properties.type,
        metadata: {
          title: prison.properties.name,
          description: prison.properties.city,
          ...prison.properties,
        },
      }));
      // console.log(sortingByMethode);
      const legend = {
        title: "Prison Statistics",
        type: "legend",
        items: sortingByMethode.items.map((legendItem, index) => ({
          type: sortingByMethode.legendType,
          id: `${sortingByMethode.field}-${index}`,
          label: legendItem.label,
          NumericRanges:
            legendItem.NumericRanges.length === 2
              ? (legendItem.NumericRanges as [number, number])
              : legendItem.NumericRanges[0],
        })),
      };
      // console.log(legend);
      await updateMarkers(markers);
      await updateLegend(legend);
      await refresh();
    };
    sendDataAndFetchUpdatedState();
  }, [updateMarkers, updateLegend, refresh]);
  // console.log(sortingMethods);
  // console.log(state.legend);

  const handleCityClick = async (feature: any) => {
    const cityData: GeoJSONType = {
      type: "FeatureCollection",
      features: [feature],
    };
    setCountryData(cityData as GeoJSONType);
    const filteredStatisticalData = prisonData.features.filter(
      (prison: any) => prison.properties.city === feature.properties.name
    );
    const singleStatisticalData: GeoJSONType = {
      type: "FeatureCollection",
      features: filteredStatisticalData.map((prison: any) => ({
        ...prison,
        type: "Feature",
      })),
    };
    const markers = await prisonData.features.map((prison: any) => ({
      id: prison.properties.id,
      coordinates: prison.geometry.coordinates,
      type: prison.properties.type,
      metadata: {
        title: prison.properties.name,
        description: prison.properties.city,
        ...prison.properties,
      },
    }));
    setStatistics(singleStatisticalData as GeoJSONType);
    await updateMarkers(markers);
    await refresh();

    setCityClicked(true);
  };

  const handleReset = () => {
    setCountryData(country as GeoJSONType);
    setStatistics(null);
    setCityClicked(false);
  };

  const onSortingByChange = (e: any) => {
    const selectedMethod = sortingMethods.find((method) => method.field === e);
    if (selectedMethod) {
      setSortingByMethode(selectedMethod);
      setLegendType(selectedMethod.legendType as "category" | "gradient");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <LeafletMapContainer
        style={{
          height: "100%",
          width: "60%",
        }}
        {...MapSettings}
      >
        {/* <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          /> */}

        {/* Automatically fit the map to countryData */}
        {countryData && <FitBoundsToGeoJSON geojsonData={countryData} />}

        {/* Layers (choropleth + marker) */}
        {countryData && (
          <GeoJSONLayer
            key={JSON.stringify(countryData)}
            data={countryData}
            onCityClick={handleCityClick}
          />
        )}

        {cityClicked && (
          <MarkerLayer
            data={statistics}
            sortingData={sortingByMethode}
            markers={state.markers}
          />
        )}

        {cityClicked && <ResetButtonControl onReset={handleReset} />}
      </LeafletMapContainer>
      <Box sx={{ width: "40%" }}>
        {state.legend && (
          <LegendWithFilters
            onSortingByChange={onSortingByChange}
            sortingByMethod={state.legend}
            // sortingByMethod={sortingByMethode}
            sortingByMethods={sortingMethods}
            // setLegendType={setLegendType}
            legendType={legendType}
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomMapContainer;
