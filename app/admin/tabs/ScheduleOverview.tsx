'use client';
import { Button, ButtonGroup, Chip, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import {useState} from 'react';
import React from 'react';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ErrorIcon from '@mui/icons-material/Error';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Fun from '../../utils/myFunc'


export default function Schedule({data, handleOpen}: {data: any, handleOpen: any}){
    const [semester, setSemester] = useState('');
    const [selectedLoad, setSelectedLoad] = useState('');
    const tabsList = [
        { name: 'Pending', label: "Pending Review", icon: <PendingActionsIcon sx={{ marginBottom: "-5px" }} /> },
        { name: 'Approved', label: "Approved", icon: <AddTaskIcon sx={{ marginBottom: "-5px" }} /> },
        { name: 'PendingResubmission', label: "Pending Resubmission", icon: <AccessAlarmsIcon sx={{ marginBottom: "-5px" }} /> },
        { name: 'Resubmission', label: "Resubmited", icon: <ErrorIcon sx={{ marginBottom: "-5px" }} /> },
      ]
    function handleButtonClick(arg0: string): void {
        setSelectedLoad(arg0);
      }

    return(
        <>
        <Stack direction={"row"} spacing={2}>
          <FormControl fullWidth size='small' sx={{ maxWidth: "200px" }}>
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
          <ButtonGroup sx={{ height: "40px" }} size='small' variant="outlined" color='inherit' aria-label="outlined button group">
            <Button
              style={{ backgroundColor: selectedLoad === 'Over-Load' ? '#d6d6d6' : 'white' }}
              onClick={() => handleButtonClick('Over-Load')}
            >
              Over-Load
            </Button>
            <Button
              style={{ backgroundColor: selectedLoad === 'In-Load' ? '#d6d6d6' : 'white' }}
              onClick={() => handleButtonClick('In-Load')}
            >
              In-Load
            </Button>
          </ButtonGroup>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          {tabsList.map(({ name, icon, label }) => (
            <Stack key={name} direction={"column"} spacing={2}>
              <h4>{icon} {label}</h4>
              {data.filter((person: { approval: string; }) => person.approval.toLowerCase() == name.toLowerCase()).map((i:any, index:any) => (
                <Chip sx={{ maxWidth: '300px' }} key={i.name + index} label={i.name} onClick={() => { handleOpen(i) }} />
              ))}
            </Stack>
          ))}
          <Stack direction={"column"} spacing={2}>
            <h4><HelpOutlineIcon sx={{ marginBottom: "-5px" }} /> Missing</h4>
            {Fun.people
              .filter(person => !data.some((item: { email: string; }) => item.email === person.email))
              .map((person, index) => (
                <Chip
                  sx={{ maxWidth: '300px' }}
                  key={person.email + index}
                  label={person.name}
                />
              ))}
          </Stack>
        </Stack>
      </>
    )
}