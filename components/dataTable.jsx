'use client';
import React from 'react';

export default function DataTable({selecteChip}){
let TotalICA = 0;

return(
    <div style={{display:"flex",flexDirection:"row"}}>
        <table style={{ height: 50, marginTop: "10px",marginRight:"20px" }}>
      <thead >
        <tr>
          <th>CAH Name</th>
          <th>D-Hour</th>
        </tr>
      </thead>
      <tbody>
        {selecteChip?.ica?.map((x) => {
          TotalICA += x.dHours
          return (<tr key={'tableRow' + x.name + x.dHours}>
            <th>{x.name}</th>
            <th>{x.dHours}</th>
          </tr>)
        })}
        <tr>
          <th>Total</th>
          <th>{TotalICA}</th>
        </tr>
      </tbody>
    </table>

    <table style={{ height: 50, marginTop: "10px" }}>
      <thead>
        <tr>
          <th>D-Hours</th>
          <th>{selecteChip.schedule?.length / 2}</th>
        </tr>
        <tr>
          <th>Week Hours</th>
          <th>{TotalICA + selecteChip.schedule?.length / 2}</th>
        </tr>
      </thead>
    </table>
    </div>
)
}