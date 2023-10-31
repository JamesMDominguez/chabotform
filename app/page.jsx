'use client';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SchoolIcon from '@mui/icons-material/School';
import Chip from '@mui/material/Chip';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

let timeRange = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"]
let days = ["Mon", "Tus", "Wed", "Thurs", "Fri"]

export default function Home() {
  const [data, setData] = useState([]);
  const [inputCount, setInputCount] = useState(1);
  const [inputValues, setInputValues] = useState(['']); // Store input values in an array
  const [inputValues2, setInputValues2] = useState(['']); // Store input values in an array
  const [comments, setComments] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter()

  const updateData = (day, time, value) => {
    let updated = true
    let myData = data.map((date) => {
      if (date.day == day && date.time == time) {
        updated = false
        if(value == "N/A"){
          return null
        }
        return { ...date, option: value };
      }
      return date;
    })
    const filteredArray = myData.filter((item) => item !== null);

    setData(filteredArray)
    return updated
  }

  const handleTimeSelect = (e) => {
    let myData = [...data]
    let [day, time] = e.target.name.split('_');
    if (updateData(day, time, e.target.value) && e.target.value != "Break" && e.target.value != "N/A") {
      myData.push({
        day: day,
        time: time,
        option: e.target.value
      });
      setData(myData)
    }
  }



  function getCurrentSeason() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // January is 1, February is 2, and so on
    const currentYear = currentDate.getFullYear();

    let season = "";

    if (currentMonth >= 6 && currentMonth <= 7) {
      season = "summer";
    } else if (currentMonth >= 1 && currentMonth <= 5) {
      season = "spring";
    } else if (currentMonth >= 8 && currentMonth <= 12) {
      season = "fall";
    } else {
      season = "not spring, summer, or fall"; // Modify this line as needed.
    }

    return `${season} ${currentYear}`;
  }

  const addInputField = () => {
    setInputCount(inputCount + 1);
    setInputValues([...inputValues, '']); // Add an empty string to the inputValues array
    setInputValues2([...inputValues2, '']); // Add an empty string to the inputValues array
  };

  const removeInputField = () => {
    const newInputValues = [...inputValues];
    const newInputValues2 = [...inputValues2];

    newInputValues.pop(); // Remove the corresponding value
    newInputValues2.pop(); // Remove the corresponding value

    setInputValues(newInputValues);
    setInputValues2(newInputValues2);
  };

  const handleInputICA = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  const handleInputAhour = (index, event) => {
    const newInputValues = [...inputValues2];
    newInputValues[index] = event.target.value;
    setInputValues2(newInputValues);
  };

  const handleInputDhour = (index, event) => {
    const newInputValues = [...inputValues2];
    newInputValues[index] = event.target.value * 0.54545;
    setInputValues2(newInputValues);
  };

  const handleButtonClick = async (val) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(val),
    });
    if (response.ok) {
      const data = await response.json();
      const url = process.env.NEXT_PUBLIC_EMAIL;

      const requestOptions = {
        method: "POST",
        headers: {
          name: name,
          email: email,
          data: data
        },
        body: JSON.stringify(val)
      };
      const response2 = await fetch(url, requestOptions);
      router.push('/finished')
    } else {
      throw new Error('Request failed');
    }

  }

  function roundToNearestDecimal(number, decimalPlaces) {
    if (number == 0) return ''
    const multiplier = 10 ** decimalPlaces;
    return Math.round(number * multiplier) / multiplier;
  }

  const getTotalHrs = () => {
    let hrs = 0;
    inputValues2.forEach((val) => {
      hrs = hrs + Number(val)
    })
    return roundToNearestDecimal(hrs / 0.54545, 1)
  }

  function grayOutBox(day, index) {
    if (index < 2) return true;
    if (day == "Mon" && index > 17) return true;
    if (day == "Wed" && index > 9 && index < 14) return true;
    if (day == "Thurs" && index > 17) return true;
    if (day == "Fri" && index > 7) return true;
    return false;
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <img
        src='https://static.wixstatic.com/media/5d5779_352eaa2c4edc497a9143e995091f41a9~mv2.jpg/v1/fill/w_250,h_334,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5d5779_352eaa2c4edc497a9143e995091f41a9~mv2.jpg'
        width={100}
        height={134}
        style={{ position: 'absolute', top: 0, left: 0, width: "100px", padding: "10px" }}
        alt="Image Description"
      />
      <h3 style={{ textAlign: "center" }}>General Counseling Division</h3>
      <h3>In-Load Proposed Schedule - Full-Time Counselors</h3>
      <Stack direction={"row"} gap={2}>
        <div>
          <p style={{ textAlign: "center" }}>Contact details</p>
          <Stack direction={"row"} gap={2}>
            <TextField value={name} onChange={(e) => setName(e.target.value)} id="filled-basic" label="Counselor Name" variant="outlined" sx={{ mb: "20px" }}
              InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon /> </InputAdornment> }}
            />
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="filled-basic" label="Email" variant="outlined" sx={{ mb: "20px" }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MailOutlineIcon /> </InputAdornment> }}
            />
          </Stack>

          <p style={{ textAlign: "center" }}>Instruction / Coord / Assign (ICA)</p>
          {inputValues.map((value, index) => (
            <Stack
              key={`input-field-box-${index}`}
              direction={'row'}
              gap={2}
              mb={2}
            >
              <TextField
                id={`outlined-basic-${index}`}
                label="ICA Name"
                variant="outlined"
                value={inputValues[index]}
                onChange={(event) => handleInputICA(index, event)}
                key={`input-field-${index}`}
                InputProps={{ startAdornment: <InputAdornment position="start"><SchoolIcon /> </InputAdornment> }}
              />

              <TextField
                sx={{ width: 110 }}
                id="outlined-basic"
                label="CAH (A-hr)"
                variant="outlined"
                type={'number'}
                key={`input-field2-${index}`}
                value={inputValues2[index]}
                onChange={(event) => handleInputAhour(index, event)}
                InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon /> </InputAdornment> }}
              />

              <TextField
                sx={{ width: 110 }}
                type={'number'}
                label='D-Hour'
                id="outlined-basic"
                variant="outlined"
                key={`input-field99-${index}`}
                value={roundToNearestDecimal(inputValues2[index] / 0.54545, 1)}
                onChange={(event) => handleInputDhour(index, event)}
                InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon /> </InputAdornment> }}
              />

            </Stack>
          ))}
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <Button variant="contained" size='small' onClick={addInputField}>Add Input</Button>
            <Button variant="contained" size='small' color="error" onClick={removeInputField} disabled={inputValues.length === 1}>Remove Input</Button>
          </Stack>

          <TextField
            id="outlined-multiline-static"
            value={comments}
            label="Comments"
            multiline
            rows={2}
            fullWidth
            sx={{ maxWidth: "500px", mt: 2 }}
            onChange={(e) => setComments(e.target.value)}
          />

          <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Total Week hours" />
            <Chip color="primary" label={data.length / 2 + getTotalHrs()} />

            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Direct Weekly Counseling Hours" />
              <Chip color="primary" label={27.5 - getTotalHrs()} />
            </ListItemButton>
          </ListItem>
        </List>
        </div>

        <div>
          <p style={{ textAlign: "center" }}>Proposed Weekly Schedule</p>

          <Stack direction={"row"}>
            <Stack sx={{ width: 80 }}>
              <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
                <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>Time</p>
              </div>
              {timeRange.map((i) => {
                return (
                  <div key={"Weekly" + i} style={{ color: '#5d5e5e', fontSize: "14px", borderStyle: "solid", borderWidth: "thin", textAlign: "center", height: '1.3rem' }} >
                    <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>{i}</p>
                  </div>
                )
              })
              }
            </Stack>

            <Stack direction={"row"}>
              {days.map((day) => {
                return (
                  <Stack key={"urDay" + day} sx={{ maxWidth: 120 }}>
                    <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
                      <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }} >{day}</p>
                    </div>
                    {timeRange.map((i, index) => {
                      return (
                        <select name={day + "_" + i} onChange={handleTimeSelect} key={"timerange" + i} style={{ maxWidth: 90, width: 80, height: '1.425rem', backgroundColor: grayOutBox(day, index) ? '#c3c4c7' : '' }}>
                          <option value="N/A"></option>
                          <option value="In-Person">In-Person</option>
                          <option value="Remote">Remote</option>
                          <option value="PRU">PFU</option>
                          <option value="Break">Break</option>
                        </select>
                      )
                    })
                    }
                  </Stack>
                )
              })}
            </Stack>
          </Stack>
        </div>
      </Stack>

      <Button variant="contained" sx={{ mt: 2, mb: 10 }} onClick={() => {
        const ica = inputValues.map((y, i) => {
          return [y, inputValues2[i]]
        })
        let mySchedule = {
          schedule: data,
          name: name,
          email: email,
          ica: ica,
          comments: comments,
          currtentSession: getCurrentSeason(),
          approval: "pending"
        }
        handleButtonClick(mySchedule)
      }}>Submit</Button>

    </Stack>
  )
}



