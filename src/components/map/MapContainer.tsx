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
import { Legend } from "../legend";
import ResetButtonControl from "../controlls/ResetButtonControl";
import SortingByControl from "../controlls/SortingByControl";
// layers
import { GeoJSONLayer, MarkerLayer } from "../Layers";
// Data
import country from "../../mock/country.json";
import prisonData from "../../mock/prisonData.json";
import sortingMethods from "../../mock/sortingMethods.json";
// utils
import FitBoundsToGeoJSON from "../../utils/fitBound";
import { MapSettings } from ".";

const CustomMapContainer: React.FC = () => {
  const [countryData, setCountryData] = useState<GeoJSONType | null>(
    country as GeoJSONType
  );
  const [statistics, setStatistics] = useState<GeoJSONType | null>(null);
  const [sortingByMethode, setSortingByMethode] = useState(sortingMethods[0]);
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
  };

  const handleReset = () => {
    setCountryData(country as GeoJSONType);
    setStatistics(null);
  };

  const onSortingByChange = (e: any) => {
    const selectedMethod = sortingMethods.find((method) => method.field === e);
    if (selectedMethod) {
      setSortingByMethode(selectedMethod);
    }
  };

  return (
    <LeafletMapContainer
      style={{ height: "100%", width: "100%" }}
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

      {statistics && (
        <MarkerLayer data={statistics} sortingData={sortingByMethode} />
      )}

      {/* Legend */}
      {statistics && <Legend sortingData={sortingByMethode} />}

      {statistics && <ResetButtonControl onReset={handleReset} />}
      {statistics && (
        <SortingByControl
          sortingMethods={sortingMethods}
          onSortingByChange={onSortingByChange}
        />
      )}
    </LeafletMapContainer>
  );
};

export default CustomMapContainer;
