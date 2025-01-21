import React from 'react';
// import Control from 'react-leaflet-control';
const LegendControll = ({ sortingData }: any) => {
  return (
    <div className="legend-controll">
       {/* <Control position="bottomright"> */}
          <h4>{sortingData.field}</h4>
          {sortingData.Legends.map((legend: any, index: number) => {
            return (
              <div key={index} className="legend-item">
                <span style={{ backgroundColor: legend.color, height:"16px", width:"16px", display:"flex",marginRight:"4px" }}></span>
                <span>{legend.NumericRanges[0]} - {legend.NumericRanges[1]}</span>
              </div>
            );
          })}
       {/* </Control> */}
      </div>
  );
};

export default LegendControll;