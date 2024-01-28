'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import React from 'react';
import SideMenu from './sideMenu';
import Contacts from './tabs/Contacts';
import ScheduleOverview from './tabs/Inload';
import OverloadOverview from './tabs/overload';
import LinearProgress from '@mui/material/LinearProgress';
import Logout from '../serverActions/action'
import Name from '../CounselorsPortal/name';
import Fun from '../utils/myFunc'
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
  const [data2, setData2] = useState<any>();
  const [allUsers, setAllUsers] = useState<any>();
  const [selecteTab, setSelectedTab] = useState('In-load Overview');

  async function getData() {
      const apiUrl: string = `${process.env.NEXT_PUBLIC_LINK}/api/overloadSchedule`;
      const apiUrl2: string = `${process.env.NEXT_PUBLIC_LINK}/api/inLoadSchedule`;
      const users = await Fun.GetAllUsers();
      const res = await fetch(apiUrl2);
      const res2 = await fetch(apiUrl);
      const jsonData = await res.json();
      const jsonData2 = await res2.json();
      setAllUsers(users);
      setData(jsonData);
      setData2(jsonData2);
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

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Page {selecteTab}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Name />
            <form action={Logout}>
              <Button type='submit' variant='outlined' sx={{ ml: "10px" }} color="inherit">Logout</Button>
            </form>
          </div>
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
        <SideMenu setSelectedTab={setSelectedTab} selecteTab={selecteTab} />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {data && (
          <Box>
            {selecteTab == "In-load Overview" && (<ScheduleOverview data={data} allUsers={allUsers} getData={getData}/>)}
            {selecteTab == "Over-load Overview" && (<OverloadOverview data={data2} getData={getData} />)}
            {selecteTab == "Contacts" && (<Contacts allUsers={allUsers}/>)}
          </Box>
        )}
        {!data && (<Box sx={{ width: '100%' }}><LinearProgress /></Box>
        )}
      </Box>
    </Box>
  );
}