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
import Legend from "../legend/legend";
import ResetButtonControl from "../controlls/ResetButtonControl";
import SortingByControl from "../controlls/SortingByControl";
// layers
import GeoJSONLayer from "../Layers/GeoJSONLayer";
import MarkerLayer from "../Layers/MarkerLayer";
// Data
import moroccoData from "../../data/morocco.json";
import prisonData from "../../data/prisonData.json";
import sortingMethods from "../../data/sortingMethods.json";
// utils
import FitBoundsToGeoJSON from "../../utils/fitBound";

const CustomMapContainer: React.FC = () => {
  const [countryData, setCountryData] = useState<GeoJSONType | null>(
    moroccoData as GeoJSONType
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
    setCountryData(moroccoData as GeoJSONType);
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
      scrollWheelZoom={false}
      dragging={false}
      touchZoom={false}
      doubleClickZoom={false}
      boxZoom={false}
      keyboard={false}
      zoomControl={false}
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
