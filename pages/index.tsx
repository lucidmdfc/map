import dynamic from "next/dynamic";
const MapContainer = dynamic(() => import("./map/MapContainer"), { ssr: false });

export default function Home() {
  return (
  <div style={{ height: "500px", width: "650px" }}>
    <MapContainer/>
  </div>
  );
}
