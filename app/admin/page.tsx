'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import React from 'react';
import SelectedSchedule from '../../components/selectedSchedule';
import ApprovalBtn from '../../components/approvalBtn';
import LinkGen from './tabs/linkGen';
import Contacts from './tabs/Contacts';
import ScheduleOverview from './tabs/ScheduleOverview';
import Inbox from './tabs/inbox';
import LinearProgress from '@mui/material/LinearProgress';

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
  const [selecteChip, setSelectedChip] = useState<any>();
  const [inbox, setInbox] = useState<any>();

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
          <Box>
            {selecteTab == "Schedule Overview" && (<ScheduleOverview data={data} handleOpen={handleOpen} />)}
            {selecteTab == "Selected Schedule" && <SelectedSchedule selecteChip={selecteChip} getData={getData} setSelectedTab={setSelectedTab} />}
            {selecteTab == "Inbox" && (<Inbox inbox={inbox} selectedInbox={selectedInbox} />)}
            {selecteTab == "Contacts" && (<Contacts />)}
            {selecteTab == "Link Generator" && (<LinkGen />)}
          </Box>
        )}
        {!data && (<Box sx={{ width: '100%' }}><LinearProgress /></Box>)}
      </Box>
    </Box>
  );
}
