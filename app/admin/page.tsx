'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ErrorIcon from '@mui/icons-material/Error';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from 'react';
import SelectedSchedule from '../../components/selectedSchedule';

const drawerWidth = 240;
const timeRange = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"]
const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "20px"
};

interface MyObject {
  day: string;
  semester: string;
  year: string;
  _id: string;
  schedule: string[];
  name: string;
  ica: [string, string][];
  comments: string;
  currtentSession: string;
  approval: string;
}

export default function Admin() {
  const [data, setData] = useState<[MyObject]>();
  const [selecteTab, setSelectedTab] = useState('Pending');
  const [selecteChip, setSelectedChip] = useState<any>();
  const [requestData, setRequestData] = useState(false);

  const handleOpen = (person: any) => {
    setSelectedChip(person)
    setSelectedTab("Selected Schedule")
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_ADMIN as string);
        if (!res.ok) {
          throw new Error(`Request failed with status: ${res.status}`);
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, [requestData]);

  const handleNewRequest = async (requestData: any) => {
    const url = process.env.NEXT_PUBLIC_EMAIL as string;

    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({ id: requestData, approval: "Approved" })
    };
    await fetch(url, requestOptions);
    setRequestData(true);
  };



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
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
        <Toolbar />

        <Divider />
        <List>
          <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Pending" ? "#D3D3D3" : "" }}>
            <ListItemButton onClick={() => setSelectedTab("Pending")}>
              <ListItemIcon>
                <PendingActionsIcon />
              </ListItemIcon>
              <ListItemText primary={"Pending"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Aproved" ? "#D3D3D3" : "" }}>
            <ListItemButton onClick={() => setSelectedTab("Approved")}>
              <ListItemIcon>
                <AddTaskIcon />
              </ListItemIcon>
              <ListItemText primary={"Approved"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Resubmission" ? "#D3D3D3" : "" }}>
            <ListItemButton onClick={() => setSelectedTab("Resubmission")}>
              <ListItemIcon>
                <ErrorIcon />
              </ListItemIcon>
              <ListItemText primary={"Resubmission"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Selected Schedule" ? "#D3D3D3" : "" }}>
            <ListItemButton onClick={() => setSelectedTab("Selected Schedule")}>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary={"Selected Schedule"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {data && (
          <>
            <Stack direction={"column"} spacing={2}>
              {data.filter((person) => person.approval.toLowerCase() == selecteTab.toLowerCase()).map((i, index) => (
                <Chip sx={{ width: '300px' }} key={i.name + index} label={i.name + " " + i.year + " " + i.semester} onClick={() => { handleOpen(i) }} />
              ))}
            </Stack>

            {selecteTab == "Selected Schedule" && <SelectedSchedule selecteChip={selecteChip}/>}
          </>
        )}
      </Box>
    </Box>
  );
}
