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
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Schedule from '../components/schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';


const timeRange = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"]
const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]

export default function Home() {
  const [data, setData] = useState([]);
  const [inputCount, setInputCount] = useState(1);
  const [icaName, setIcaName] = useState(['']);
  const [icaHours, setIcaHours] = useState(['']);
  const [comments, setComments] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter()
  const [breaks, setBreaks] = useState([]);
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);



  const updateData = (day, time, value) => {
    let updated = true;
    let myData = data.map((date) => {
      if (date.day == day && date.time == time) {
        updated = false
        if (value == "" || value == "Break") {
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

  const updateBreaks = (day, time) => {
    if (breaks) {
      let myBreaks = breaks.map((thisBreak) => {
        if (thisBreak.day === day && thisBreak.time === time) {
          return null;
        }
        return thisBreak;
      });
      const filteredArray = myBreaks.filter((item) => item !== null);
      setBreaks(filteredArray);
    }
  };

  const handleTimeSelect = (e) => {
    let myData = [...data]
    let [day, time] = e.target.name.split('_');

    updateBreaks(day, time)

    if (e.target.value == "Break") {
      let myBreaks = [...breaks]

      myBreaks.push({
        day: day,
        time: time
      })
      setBreaks(myBreaks)
    }
    if (updateData(day, time, e.target.value) && e.target.value != "Break" && e.target.value != "") {
      myData.push({
        day: day,
        time: time,
        option: e.target.value
      });
      setData(myData)
    }
  }

  const getDailyHours = (day) => {
    let num = 0
    data.forEach((time) => {
      if (time.day == day) {
        num++
      }
    })
    return num / 2
  }

  const addInputField = () => {
    setInputCount(inputCount + 1);
    setIcaName([...icaName, '']);
    setIcaHours([...icaHours, '']);
  };

  const removeInputField = () => {
    const newInputValues = [...icaName];
    const newicaHours = [...icaHours];

    newInputValues.pop();
    newicaHours.pop();

    setIcaName(newInputValues);
    setIcaHours(newicaHours);
  };

  const handleInputICA = (index, event) => {
    const newInputValues = [...icaName];
    newInputValues[index] = event.target.value;
    setIcaName(newInputValues);
  };

  const handleInputAhour = (index, event) => {
    const newInputValues = [...icaHours];
    newInputValues[index] = event.target.value;
    setIcaHours(newInputValues);
  };

  const handleInputDhour = (index, event) => {
    const newInputValues = [...icaHours];
    newInputValues[index] = event.target.value * 0.54545;
    setIcaHours(newInputValues);
  };

  const handleSubmitForm = async (val) => {
    setLoading(true)
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(val),
    });
    if(response.ok){
      const data = await response.json();
      const url = process.env.NEXT_PUBLIC_EMAIL;
      const objectID = data.insertedId
      const requestOptions = {
        method: "POST",
        headers: {
          name: name,
          email: email,
          data: objectID.toString()
        },
        body: JSON.stringify(val)
      };
      let emailRes = await fetch(url, requestOptions);
      router.push('/finished')
    }
    else {
      console.log('Request failed');
    }

  }

  function roundToNearestDecimal(number, decimalPlaces) {
    if (number == 0) return ''
    const multiplier = 10 ** decimalPlaces;
    return Math.round(number * multiplier) / multiplier;
  }

  const getTotalHrs = () => {
    let hrs = 0;
    icaHours.forEach((val) => {
      hrs = hrs + Number(val)
    })
    return roundToNearestDecimal(hrs / 0.54545, 1)
  }

  const getTotalPFUhours = () => {
    let num = ((27.5 - getTotalHrs()) * 0.1)
    if (num > 2.5) return 2.5
    else return Math.floor(num * 2) / 2
  }

  function getRemoteHours() {
    let hrs = 0;
    icaHours.forEach((val) => {
      hrs = hrs + Number(val)
    })
    hrs = hrs / 0.54545

    let num = ((27.5 - hrs) * 0.22)
    return Math.round(num * 2) / 2;
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <img
            src='https://districtazure.clpccd.org/prmg/files/docs/styles-logos/cc-logo-horizontal-1c.jpg'
            height={50}
            alt="Image Description"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            In-Load Proposed Schedule Full-Time Counselors
          </Typography>
        </Toolbar>
      </AppBar>

      <Stack direction={"row"} gap={2} mt={4} flexWrap="wrap">
        <div>
          <p style={{ textAlign: "center" }}>Contact details</p>
          <Stack direction={"row"} gap={2}>
            <TextField value={name} onChange={(e) => setName(e.target.value)} id="filled-basic" label="Counselor Name" variant="outlined" sx={{ mb: "20px" }}
              InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon /> </InputAdornment> }}
            />
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="filled-basic" label="Chabot Email" variant="outlined" sx={{ mb: "20px" }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MailOutlineIcon /> </InputAdornment> }}
            />
          </Stack>

          <Stack direction={"row"} gap={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Semester</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                value={semester}
                label="Semester"
                sx={{ mb: "20px" }}
                onChange={(e) => setSemester(e.target.value)}
              >
                <MenuItem value="Summer">Summer ☀️</MenuItem>
                <MenuItem value="Spring">Spring 🌱</MenuItem>
                <MenuItem value="Fall">Fall 🍂</MenuItem>
              </Select>
            </FormControl>
            <TextField value={year} onChange={(e) => setYear(e.target.value)} type="number" id="filled-basic" label="Year" variant="outlined" sx={{ mb: "20px" }}
              InputProps={{ startAdornment: <InputAdornment position="start"><CalendarMonthIcon /> </InputAdornment> }}
            />
          </Stack>

          <p style={{ textAlign: "center" }}>Instruction / Coord / Assign (ICA)</p>
          {icaName.map((value, index) => (
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
                value={icaName[index]}
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
                value={icaHours[index]}
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
                value={roundToNearestDecimal(icaHours[index] / 0.54545, 1)}
                onChange={(event) => handleInputDhour(index, event)}
                InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon /> </InputAdornment> }}
              />

            </Stack>
          ))}
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <Button variant="contained" size='small' onClick={addInputField}>Add Input</Button>
            <Button variant="contained" size='small' color="error" onClick={removeInputField} disabled={icaName.length === 1}>Remove Input</Button>
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
                <ListItemText primary="Total ICA Hours" />
                <Chip color="primary" label={getTotalHrs() + 0} />

              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Total Direct Weekly Counseling Hours" />
                <Chip color="primary" label={27.5 - getTotalHrs()} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Available Remote Hours (From Total D-Hours)" />
                <Chip color="primary" label={getRemoteHours()} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Proactive Follow-up Hours (From Total D-Hours)" />
                <Chip color="primary" label={getTotalPFUhours()} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Total Weekly hours (Must Equal 27.5)" />
                <Chip color="primary" label={data.length / 2 + getTotalHrs()} />

              </ListItemButton>
            </ListItem>
          </List>
        </div>
        <div>
          <p style={{ textAlign: "center" }}>Proposed Weekly Schedule</p>
          <Schedule days={days} getDailyHours={getDailyHours} timeRange={timeRange} handleTimeSelect={handleTimeSelect} />
        </div>
      </Stack>

        <LoadingButton
          variant="contained" sx={{ mt: 2, maxWidth: '58%' }} fullWidth onClick={() => {
        const ica = icaName.map((y, i) => {
          return { name: y, aHours: icaHours[i], dHours: roundToNearestDecimal(icaHours[i] / 0.54545, 1) }
        })
        let mySchedule = {
          schedule: data,
          name: name,
          email: email,
          ica: ica,
          comments: comments,
          approval: "pending",
          year: year,
          semester: semester,
          breaks: breaks
        }
        handleSubmitForm(mySchedule)
      }}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
        >
          <span>Submit</span>
        </LoadingButton>

    </Stack>
  )
}



