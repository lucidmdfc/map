import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

const LegendControl = ({ sortingData }: any) => {
  const map = useMap();

  useEffect(() => {
    const control = new L.Control({ position: "bottomright" }); 
    const container = L.DomUtil.create("div", "legend-control");

    // Create legend title using L.DomUtil.create
    const legendTitle = L.DomUtil.create("h4", "legend-title");
    legendTitle.textContent = sortingData.field;
    container.appendChild(legendTitle);

    sortingData.Legends.forEach((legend: any) => {
      // Create legend item using L.DomUtil.create
      const legendItem = L.DomUtil.create("div", "legend-item");

      // Create color box using L.DomUtil.create
      const colorBox = L.DomUtil.create("span", "legend-color");
      colorBox.style.backgroundColor = legend.color;
      legendItem.appendChild(colorBox);

      // Create range text using L.DomUtil.create
      const rangeText = L.DomUtil.create("span", "");
      rangeText.textContent = `${legend.NumericRanges[0]} - ${legend.NumericRanges[1]}`;
      legendItem.appendChild(rangeText);

      container.appendChild(legendItem);
    });
    

    control.onAdd = () => container;
    control.addTo(map);

    return () => {
      control.remove(); // Clean up the control when the component is unmounted
    };
    
  }, [map, sortingData]); // Re-run when sortingData or map changes

  return null;
};

export default LegendControl;