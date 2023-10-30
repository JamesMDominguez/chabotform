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
import Paper from '@mui/material/Paper';

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

  const handleTimeSelect = (e) => {
    let myData = [...data]
    let [day, time] = e.target.name.split('_');
    if(e.target.value != "Break" && e.target.value != "N/A"){
      myData.push({
        day: day,
        time: time,
        option: e.target.value
      });
      setData(myData)
    }
  }

  const updateData = (day,time) => {
    let myData2 = [...data]
    let myData = data.filter((date)=>{
      if(date.day == day && date.time == time){
        return true
      }
    })
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
        }
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

  function grayOutBox(day,index){
    if(index < 2){
      return true;
    }

    if(day== "Mon" && index > 17){
      return true;
    }
    

    if( day== "Wed" && index > 9 && index < 14){
      return true;
    }

    if(day== "Thurs" && index > 17){
      return true;
    }

    if( day== "Fri" && index > 7 ){
      return true;
    }

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
      <p style={{ textAlign: "center" }}>Contact details</p>
      <Stack direction={"row"} gap={2}>
        <TextField value={name} onChange={(e) => setName(e.target.value)} id="filled-basic" label="Counselor Name" variant="outlined" sx={{ mb: "20px" }}
        InputProps={{startAdornment:<InputAdornment position="start"><PersonOutlineIcon /> </InputAdornment>}}
         />
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="filled-basic" label="Email" variant="outlined" sx={{ mb: "20px" }} 
          InputProps={{startAdornment:<InputAdornment position="start"><MailOutlineIcon /> </InputAdornment>}}
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
            InputProps={{startAdornment:<InputAdornment position="start"><SchoolIcon /> </InputAdornment>}}
          />

          <TextField
            sx={{width:110}}
            id="outlined-basic"
            label="CAH (A-hr)"
            variant="outlined"
            type={'number'}
            key={`input-field2-${index}`}
            value={inputValues2[index]}
            onChange={(event) => handleInputAhour(index, event)} 
            InputProps={{startAdornment:<InputAdornment position="start"><AccessTimeIcon /> </InputAdornment>}}
            />

          <TextField
            sx={{width:110}}
            type={'number'}
            label='D-Hour'
            id="outlined-basic"
            variant="outlined"
            key={`input-field99-${index}`}
            value={roundToNearestDecimal(inputValues2[index] / 0.54545, 1)}
            onChange={(event) => handleInputDhour(index, event)}
            InputProps={{startAdornment:<InputAdornment position="start"><AccessTimeIcon /> </InputAdornment>}}
            />

        </Stack>
      ))}
      <Stack direction={'row'} spacing={3} sx={{ mb: 1 }} >
        <Button variant="contained" size='small' onClick={addInputField}>Add Input</Button>
        <Button variant="contained" size='small' color="error" onClick={removeInputField} disabled={inputValues.length === 1}>Remove Input</Button>
      </Stack>

      <p style={{ textAlign: "center" }}>Proposed Weekly Schedule</p>

      <Stack direction={"row"}>
        <Stack spacing={0} sx={{ width: 100 }}>
          <p style={{ margin: "0", fontSize: "13.3px", borderStyle: "solid", textAlign: "center" }} >Time</p>
          {timeRange.map((i) => {
            return (
              <p style={{ margin: "0",padding:'2px',color:'#5d5e5e', fontSize: "14px", borderStyle: "solid", borderWidth: "thin", textAlign: "center" }} key={"Weekly" + i}>{i}</p>
            )
          })
          }
        </Stack>

        <Stack direction={"row"}>
          {days.map((day) => {
            return (
              <Stack key={"urDay" + day} spacing={0} sx={{ maxWidth: 120 }}>
                <p style={{ margin: "0", fontSize: "14px", borderStyle: "solid", borderColor:"gray",textAlign: "center"}} >{day}</p>
                {timeRange.map((i,index) => {
                  return (
                    <select name={day + "_" + i} onChange={handleTimeSelect} key={"timerange" + i} style={{ maxWidth: 90,width:80,height:23 , backgroundColor:grayOutBox(day,index)?'#c3c4c7':'' }}>
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
      <Button variant="contained" sx={{ mt: 2,mb:10 }} onClick={() => {
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

    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <Stack direction={'row'} spacing={1} sx={{padding:2}}>
    <p style={{marginTop:'5px'}}>Total Week hours</p>
      <Chip color="primary" label={data.length / 2 + getTotalHrs()} />
      <p style={{marginTop:'5px'}}>Direct Weekly Counseling Hours </p>
      <Chip color="primary" label={27.5 - getTotalHrs()} />
      </Stack>
    </Paper>
    </Stack>
  )
}



