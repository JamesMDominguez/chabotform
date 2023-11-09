
import Stack from '@mui/material/Stack';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

const timeRange = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"]
const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]

export default function SelectedSchedule({ selecteChip }) {
      
    let TotalICA = 0
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
    function grayOutBox(day, index) {
        if (index < 2) return true;
        if (day == "Mon" && index > 17) return true;
        if (day == "Wed" && index > 9 && index < 14) return true;
        if (day == "Thurs" && index > 17) return true;
        if (day == "Fri" && index > 17) return true;
        return false;
      }

      const getDailyHours = (day) => {
        let num = 0
        selecteChip?.schedule?.forEach((time) => {
          if (time.day == day) {
            num++
          }
        })
        return num / 2
      }

      function roundToNearestDecimal(number, decimalPlaces) {
        if (number == 0) return ''
        const multiplier = 10 ** decimalPlaces;
        return Math.round(number * multiplier) / multiplier;
      }

      const getTotalHrs = () => {
        let hrs = 0;
        selecteChip?.ica.forEach((val) => {
          hrs = hrs + Number(val.dHours)
        })
        return roundToNearestDecimal(hrs / 0.54545, 1)
      }
    
      const findDayTime = (Dates,Breaks, Day, Time) => {
        let x = Dates?.map((date) => {
          if (date.day == Day && date.time == Time) {
            return (date.option)
          } else {
            return ""
          }
        }).join('')
        if(x == ""){
          let val = Breaks?.map((date) => {
              if (date.day == Day && date.time == Time) {
                return ("Break")
              } else {
                return ""
              }
            }).join('')
          return val
      }
        return (x)
      }

    return (<>
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
            )})}
        </Stack>

        <Stack direction={"row"}>
            {days.map((day) => {
                return (
                <Stack key={"yourDay" + day} sx={{ maxWidth: 150 }}>
                    <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin", borderTopRightRadius: day == 'Fri' ? '10px' : 0 }}>
                        <p style={{ margin: "0", fontSize: "15px", textAlign: "center" }} >{day}</p>
                    </div>
                    <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
                        <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }} >{getDailyHours(day)}</p>
                    </div>
                {timeRange.map((i, index) => {
                return (
                    <div key={"timerange" + index} style={{ borderStyle: "solid", borderWidth: "thin", borderBottomRightRadius: i == '7:00pm' && day == 'Fri' ? '10px' : 0, maxWidth: 90, width: 80, height: '1.3rem', color: '#5d5e5e', backgroundColor: grayOutBox(day, index) ? '#c3c4c7' : '' }}>
                        <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }}>{findDayTime(selecteChip?.schedule, selecteChip?.breaks, day, i)}</p>
                    </div>)})}
                </Stack>)})}
            </Stack>
        </Stack>


            <table style={{height:50,marginTop:"10px"}}>
                <thead >
                  <tr>
                    <th>CAH Name</th>
                    <th>D-Hour</th>
                  </tr>
                  </thead>
                  <tbody>
                  {selecteChip?.ica.map((x)=>{
                    TotalICA += x.dHours
                    return(<tr key={'tableRow'+x.name+x.dHours}>
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

            <table style={{height:50,marginTop:"10px"}}>
                <thead>
                  <tr>
                    <th>D-Hours</th>
                    <th>{selecteChip.schedule.length/2}</th>
                  </tr>
                  <tr>
                    <th>Week Hours</th>
                    <th>{TotalICA + selecteChip.schedule.length/2}</th>
                  </tr>
                </thead>
            </table>

            <p style={{ margin: 0 }}><b>Comments</b></p>
            <Chip label={selecteChip?.comments} />

            <Stack direction={"row"} justifyContent="start" spacing={4} sx={{ mt: 2 }}>
                  <Button variant="contained">Accept</Button>
                  <Button color="error" variant="outlined" >Resubmission</Button>
            </Stack>
    </>)
}