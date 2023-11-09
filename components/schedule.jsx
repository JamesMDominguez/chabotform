'use client';
import Stack from '@mui/material/Stack';
import React, { useState,useMemo } from 'react';

export default function Schedule({days,timeRange,handleTimeSelect,getDailyHours}){

    function grayOutBox(day, index) {
        if (index < 2) return true;
        if (day == "Mon" && index > 17) return true;
        if (day == "Wed" && index > 9 && index < 14) return true;
        if (day == "Thurs" && index > 17) return true;
        if (day == "Fri" && index > 17) return true;
        return false;
      }

      
return(
    <Stack direction={"row"}>

    <Stack sx={{ width: 80 }}>
      <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin", borderTopLeftRadius: '10px' }}>
        <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>Time</p>
      </div>
      <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
        <p style={{ fontSize: "13px", textAlign: "center", margin: 0 }}>Daily Hours</p>
      </div>
      {timeRange.map((i) => {
        return (
          <div key={"Weekly" + i} style={{ borderBottomLeftRadius: i == '7:00pm' ? '10px' : 0, color: '#5d5e5e', fontSize: "14px", borderStyle: "solid", borderWidth: "thin", textAlign: "center", height: '1.3rem' }} >
            <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>{i}</p>
          </div>
        )
      })
      }
    </Stack>

    <Stack direction={"row"}>
      {days.map((day) => {
        return (
          <Stack key={"yourDay" + day} sx={{ maxWidth: 120 }}>
            <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin", borderTopRightRadius: day == 'Fri' ? '10px' : 0 }}>
              <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }} >{day}</p>
            </div>
            <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
              <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }} >{getDailyHours(day)}</p>
            </div>
            {timeRange.map((i, index) => {
              return (
                <div key={"timerange" + i}>
                <input type="search" list="list" name={day + "_" + i} autoComplete="on" onChange={handleTimeSelect} style={{borderBottomRightRadius: i == '7:00pm' && day == 'Fri' ? '10px' : 0,maxWidth: 100, width: 95, height: '1.41rem',backgroundColor: grayOutBox(day, index) ? '#c3c4c7' : '',borderStyle: "solid",borderWidth: "thin" }}/>
                <datalist id="list">
                    <option value="In-Person">In-Person</option>
                    <option value="Remote">Remote</option>
                    <option value="PFU">PFU</option>
                    <option value="Break">Break</option>
                </datalist>
              </div>
              )
            })
            }
          </Stack>
        )
      })}
    </Stack>
  </Stack>
)

}