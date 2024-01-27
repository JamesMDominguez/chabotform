
"use client";
import Stack from '@mui/material/Stack';
import Fun from '../app/utils/myFunc'

const timeRange = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"]
const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]

export default function SelectedSchedule({ selectedChip }) {

  const getDailyHours = Fun.getDailyHours
  const grayOutBox = Fun.grayOutBox
  const findDayTime = Fun.findDayTime

  return (
    <>
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
          })}
        </Stack>

        <Stack direction={"row"}>
          {days.map((day) => {
            return (
              <Stack key={"yourDay" + day} sx={{ maxWidth: 150 }}>
                <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin", borderTopRightRadius: day == 'Fri' ? '10px' : 0 }}>
                  <p style={{ margin: "0", fontSize: "15px", textAlign: "center" }} >{day}</p>
                </div>
                <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
                  <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }} >{getDailyHours(day, selectedChip)}</p>
                </div>
                {timeRange.map((i, index) => {
                  return (
                    <div key={"timerange" + index} style={{ borderStyle: "solid", borderWidth: "thin", borderBottomRightRadius: i == '7:00pm' && day == 'Fri' ? '10px' : 0, maxWidth: 90, width: 80, height: '1.3rem', color: '#5d5e5e', backgroundColor: grayOutBox(day, index) ? '#c3c4c7' : '' }}>
                      <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }}>{findDayTime(selectedChip?.schedule, selectedChip?.breaks, day, i)}</p>
                    </div>)
                })}
              </Stack>)
          })}
        </Stack>
      </Stack>
    </>
  )
}