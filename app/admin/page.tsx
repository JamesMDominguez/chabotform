'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import React from 'react';
import SelectedSchedule from '../../components/selectedSchedule';
import ApprovalBtn from '../../components/approvalBtn';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ErrorIcon from '@mui/icons-material/Error';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Fun from '../utils/myFunc'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 240;

interface MyObject {
  day: string;
  semester: string;
  year: string;
  _id: string;
  schedule: string[];
  name: string;
  email: string;
  ica: [string, string][];
  comments: string;
  currtentSession: string;
  approval: string;
}

export default function Admin() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState<[MyObject]>();
  const [selecteTab, setSelectedTab] = useState('Schedule Overview');
  const [selectedLoad, setSelectedLoad] = useState('');
  const [year, setYear] = useState('');

  const tabsList = [
    { name: 'Pending', label: "Pending Review", icon: <PendingActionsIcon sx={{ marginBottom: "-5px" }} /> },
    { name: 'Approved', label: "Approved", icon: <AddTaskIcon sx={{ marginBottom: "-5px" }} /> },
    { name: 'PendingResubmission', label: "Pending Resubmission", icon: <AccessAlarmsIcon sx={{ marginBottom: "-5px" }} /> },
    { name: 'Resubmission', label: "Resubmited", icon: <ErrorIcon sx={{ marginBottom: "-5px" }} /> },
  ]
  const [selecteChip, setSelectedChip] = useState<any>();
  const [inbox, setInbox] = useState<any>();
  const [semester, setSemester] = useState('');

  let inboxLen = inbox?.filter((element: { status: string; }) => element.status == 'unread').length
  const handleOpen = (person: any) => {
    setSelectedChip(person)
    setSelectedTab("Selected Schedule")
  }

  const copyToClipboard = async() => {
    setOpen(true);
    const linkQuery = await process.env.NEXT_PUBLIC_LINK as string;
    navigator.clipboard
      .writeText(`${linkQuery}?semester=${semester}&year=${year}`)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  async function getData() {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ADMIN as string);
      const inboxRes = await fetch(process.env.NEXT_PUBLIC_INBOX as string)
      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }
      const inboxJson = await inboxRes.json();
      const jsonData = await res.json();
      setData(jsonData);
      setInbox(inboxJson)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const selectedInbox = (id: string) => {
    data?.forEach(async element => {
      if (element._id == id) {
        setSelectedChip(element)
        setSelectedTab("Selected Schedule")
        await fetch(process.env.NEXT_PUBLIC_INBOX as string, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id }),
        })
        getData()
      }
    });
  }

  useEffect(() => {
    getData();
  }, []);


  function handleButtonClick(arg0: string): void {
    setSelectedLoad(arg0);
  }


  const action = (
    <React.Fragment>
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
    </React.Fragment>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color='inherit'
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Page {selecteTab}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <img
            src='https://districtazure.clpccd.org/prmg/files/docs/styles-logos/cc-logo-horizontal-1c.jpg'
            height={50}
            alt="Image Description"
          /></Toolbar>
        <Divider />
        <ApprovalBtn setSelectedTab={setSelectedTab} selecteTab={selecteTab} inboxLen={inboxLen} />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {data && (
          <>
            {selecteTab == "Schedule Overview" && (
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
              </>
            )}
            <Stack direction={"row"} spacing={2}>
              {selecteTab == "Schedule Overview" && tabsList.map(({ name, icon, label }) => (
                <Stack key={name} direction={"column"} spacing={2}>
                  <h4>{icon} {label}</h4>
                  {data.filter((person) => person.approval.toLowerCase() == name.toLowerCase()).map((i, index) => (
                    <Chip sx={{ maxWidth: '300px' }} key={i.name + index} label={i.name} onClick={() => { handleOpen(i) }} />
                  ))}
                </Stack>
              ))}
              {selecteTab == "Schedule Overview" && (
                <Stack direction={"column"} spacing={2}>
                  <h4><HelpOutlineIcon sx={{ marginBottom: "-5px" }} /> Missing</h4>
                  {Fun.people
                    .filter(person => !data.some(item => item.email === person.email))
                    .map((person, index) => (
                      <Chip
                        sx={{ maxWidth: '300px' }}
                        key={person.email + index}
                        label={person.name}
                      />
                    ))}
                </Stack>
              )}
            </Stack>
            {selecteTab == "Selected Schedule" && <SelectedSchedule selecteChip={selecteChip} getData={getData} setSelectedTab={setSelectedTab} />}
            {selecteTab == "Inbox" && [...inbox].reverse().map((box: any) => {
              return (
                <div key={box._id} style={{ marginBottom: "10px" }}>
                  <Chip onClick={() => selectedInbox(box.CommentId)} icon={box.status == "unread" ? <MarkUnreadChatAltIcon color='error' /> : <MarkEmailReadIcon color='success' />} label={box.name} />
                </div>
              )
            }
            )}
            {selecteTab == "Contacts" && (
              <>
                <h4>Counselors</h4>
                <Stack gap={2} direction={"row"} flexWrap="wrap">
                  {Fun.people.map((person, index) => (
                    <Chip sx={{ maxWidth: '300px' }} key={person.email + index} label={person.name} />
                  ))}
                </Stack>
              </>
            )
            }
            {selecteTab == "Link Generator" && (
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
               <Button sx={{height:"40px"}} onClick={copyToClipboard} variant="contained" color='inherit'>Copy Link</Button>
              </Stack>
              <h3>{`${process.env.NEXT_PUBLIC_LINK}${semester ? `?semester=${semester}` : ''}${year ? `&year=${year}` : ''}`}</h3>
              </>
            )}


          </>
        )}
      </Box>
    </Box>
  );
}
