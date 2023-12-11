'use client';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Snackbar, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Fun from '../../utils/myFunc'


export default function LinkGen() {
  const [open, setOpen] = useState(false);
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const findEmailByName = (name: string) => {
    const person = Fun.people.find(person => person.name === name);
    return person ? person.email : '';
  }
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const copyToClipboard = async () => {
    setOpen(true);
    const linkQuery = await process.env.NEXT_PUBLIC_LINK as string;
    navigator.clipboard
      .writeText(`${process.env.NEXT_PUBLIC_LINK}${semester ? `?semester=${semester}` : ''}${year ? `&year=${year}` : ''}${email ? `&counselor=${email}`:''}`)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };
  
  return (
    <>
      <h4>Link Generator</h4>
      <Stack gap={2} direction={"row"}>
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message="Copied to clipboard"
          action={action}
        />
        <FormControl size='small' fullWidth sx={{ maxWidth: "200px" }}>
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
        <TextField size='small' value={year} onChange={(e) => setYear(e.target.value)} type="number" id="filled-basic" label="Year" variant="outlined" sx={{ mb: "20px" }}
          InputProps={{ startAdornment: <InputAdornment position="start"><CalendarMonthIcon /> </InputAdornment> }}
        />
        <FormControl fullWidth sx={{maxWidth:"300px"}} size='small'>
          <InputLabel id="demo-simple-select-label">Counselor Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ mb: "20px" }}
            value={name}
            label="Counselor Name"
            onChange={(e) => {
              setName(e.target.value)
              setEmail(findEmailByName(e.target.value))
            }}
          >
            {Fun.people.map((person) => (
              <MenuItem key={person.name + "menuItem"} value={person.name}>{person.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={{ height: "40px" }} onClick={copyToClipboard} variant="contained" color='inherit'>Copy Link</Button>
      </Stack>
      <h3>{`${process.env.NEXT_PUBLIC_LINK}${semester ? `?semester=${semester}` : ''}${year ? `&year=${year}` : ''}${email ? `&counselor=${email}`:''}`}</h3>
    </>
  )
}