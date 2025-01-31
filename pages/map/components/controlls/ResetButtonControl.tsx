import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { IoMdClose } from "react-icons/io";
import ReactDOMServer from "react-dom/server";

const ResetButtonControl = ({ onReset }: { onReset: () => void }) => {
  const map = useMap();

  useEffect(() => {
    const control = new L.Control({ position: "topright" });

    control.onAdd = () => {
      const div = L.DomUtil.create("div", "reset-button-control");
      div.innerHTML = ReactDOMServer.renderToString(
        <IoMdClose style={{ cursor: "pointer" }} />
      );
      div.onclick = onReset;
      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, onReset]);

  return null;
};

export default ResetButtonControl;
