import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import GeoJSONLayer from "./Layers/GeoJSONLayer";
import moroccoData from "./data/morocco.json";
import prisonData from "./data/prisonData.json";
import { useState } from "react";
import { GeoJSON as GeoJSONType } from "geojson";
import MarkerLayer from "./Layers/MarkerLayer";
import LegendControll from "./controlls/legendControll";

const CustomMapContainer: React.FC = () => {
  const [prisonsData, setPrisonsData] = useState<GeoJSONType | null>(null); 

  const handleCityClick = (feature: any) => {
    // console.log("City clicked: ", feature.properties.name);
    // Update the state to display additional data when a city is clicked
    setPrisonsData(prisonData as GeoJSONType);
  };

  const sortingBy = {
    field: "capacity",
    Legends: [
      {
        label: "Low capacity",
        color: "blue",
        NumericRanges: [0, 2999]
      },
      {
        label: "medium capacity",
        color: "orange",
        NumericRanges: [3000, 4999]
      },
      {
        label: "high capacity",
        color: "red",
        NumericRanges: [4999, 9999]
      },
    ]
  }
  // const sortingBy = {
  //   field: "density",
  //   Legends: [
  //     {
  //       label: "Low Density",
  //       color: "blue",
  //       NumericRanges: [0, 19]
  //     },
  //     {
  //       label: "medium Density",
  //       color: "orange",
  //       NumericRanges: [20, 49]
  //     },
  //     {
  //       label: "high density",
  //       color: "red",
  //       NumericRanges: [50, 99]
  //     },
  //     {
  //       label: "danger density",
  //       color: "purple",
  //       NumericRanges: [100, 1000]
  //     },
  //   ]
  // }

  return (
    <LeafletMapContainer 
      center={[28.7917, -8.0926]} 
      zoom={5}
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

      {/* Layers (choropleth + marker) */}
      {moroccoData && <GeoJSONLayer data={moroccoData as GeoJSONType} onCityClick={handleCityClick} />}
      {prisonsData && <MarkerLayer data={prisonsData} sortingData={sortingBy}/>}

      {/* Legend */}
      {prisonsData && <LegendControll sortingData={sortingBy}/>}
    </LeafletMapContainer >
  );
};

export default CustomMapContainer;