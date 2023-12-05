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
  const [data, setData] = useState<[MyObject]>();
  const [selecteTab, setSelectedTab] = useState('Schedule Overview');
  const [selectedLoad, setSelectedLoad] = useState('Summer');

  const tabsList = [
    { name: 'Pending', label: "Pending Review", icon: <PendingActionsIcon sx={{ marginBottom: "-5px" }} /> },
    { name: 'Approved', label: "Approved", icon: <AddTaskIcon sx={{ marginBottom: "-5px" }} /> },
    { name: 'PendingResubmission', label: "Pending Resubmission", icon: <AccessAlarmsIcon sx={{ marginBottom: "-5px" }} /> },
    { name: 'Resubmission', label: "Resubmited", icon: <ErrorIcon sx={{ marginBottom: "-5px" }} /> },
  ]
  const [selecteChip, setSelectedChip] = useState<any>();
  const [inbox, setInbox] = useState<any>();
  const [semester, setSemester] = useState('');
  const people = [
    { name: 'Michelle Reyes', email: 'mreyes@chabotcollege.edu' },
    { name: 'Frances Fon', email: 'ffon@chabotcollege.edu' },
    { name: 'Benjamin Barboza', email: 'bbarboza@chabotcollege.edu' },
    { name: 'Wafa Ali', email: 'wali@chabotcollege.edu' },
    { name: 'Dara Greene', email: 'dgreene@chabotcollege.edu' },
    { name: 'Laura Alarcon', email: 'lalarcon@chabotcollege.edu' },
    { name: 'Reena Jas', email: 'rjas@chabotcollege.edu' },
    { name: 'Heather Oshiro', email: 'hoshiro@chabotcollege.edu' },
    { name: 'Yetunde Osikomaiya', email: 'yosikomaiya@chabotcollege.edu' },
    { name: 'David Irving', email: 'dirving@chabotcollege.edu' },
    { name: 'Katie Messina Silva', email: 'kmessina@chabotcollege.edu' },
    { name: 'Shannon Stanley', email: 'sstanley@chabotcollege.edu' },
    { name: 'John Salangsang', email: 'jsalangsang@chabotcollege.edu' },
    { name: 'Emmanuel Lopez', email: 'ealopez@chabotcollege.edu' },
    { name: 'Juztino Panella', email: 'jpanella@chabotcollege.edu' },
  ];
  let inboxLen = inbox?.filter((element: { status: string; }) => element.status == 'unread').length
  const handleOpen = (person: any) => {
    setSelectedChip(person)
    setSelectedTab("Selected Schedule")
  }

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
                      style={{ backgroundColor: selectedLoad === 'button1' ? '#d6d6d6' : 'white' }}
                      onClick={() => handleButtonClick('button1')}
                    >
                      Over-Load
                    </Button>
                    <Button
                      style={{ backgroundColor: selectedLoad === 'button2' ? '#d6d6d6' : 'white' }}
                      onClick={() => handleButtonClick('button2')}
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
                  {people
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
            <Stack gap={2} direction={"row"} flexWrap="wrap">              
            {selecteTab == "Contacts" && people.map((person, index) => (
              <Chip sx={{ maxWidth: '300px' }} key={person.email + index} label={person.name} />
            ))}
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
}
