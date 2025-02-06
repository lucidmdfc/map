import { useState } from "react";
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
  const handleCityClick = (feature: any) => {
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
    setStatistics(singleStatisticalData as GeoJSONType);
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
          width: "100%",
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
          <MarkerLayer data={statistics} sortingData={sortingByMethode} />
        )}

        {cityClicked && <ResetButtonControl onReset={handleReset} />}
      </LeafletMapContainer>
      <Box>
        <LegendWithFilters
          onSortingByChange={onSortingByChange}
          sortingByMethod={sortingByMethode}
          sortingByMethods={sortingMethods}
          // setLegendType={setLegendType}
          legendType={legendType}
        />
      </Box>
    </Box>
  );
};

export default CustomMapContainer;
