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
const drawerWidth = 240;

interface MyObject {
  _id: string;
  schedule: string[];
  name: string;
  ica: [string, string][];
  comments: string;
  currtentSession: string; // Typo in your data, should be 'currentSession'
  approval: string; // Typo in your data, should be 'approval'
}

export default function Admin() {
  const [data, setData] = useState<[MyObject]>();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch('http://localhost:3000/api/submit');

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
  }, []);

  // Move the console.log statement here to log the data when it's available.
  useEffect(() => {
    if (data) {
      console.log(data[0]);
    }
  }, [data]);

  return (
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Page
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
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                 <PendingActionsIcon /> 
                </ListItemIcon>
                <ListItemText primary={"Pending"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
              <ListItemIcon>
                 <AddTaskIcon /> 
                </ListItemIcon>
                <ListItemText primary={"Aproved"} />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
      {data && (
        <>
        {data.map((i)=>(
          <>
           <pre>{i.name}</pre>
        {i.schedule.map((x)=>(
        <pre>{x}</pre>
        ))}
        <pre>{i.ica}</pre>
        <pre>{i.approval}</pre>
        <pre>{i.currtentSession}</pre>
          </>
        ))}

        </>
      )}
        </Typography>
      </Box>
    </Box>
  );
}
