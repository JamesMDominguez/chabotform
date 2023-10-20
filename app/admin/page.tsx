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
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ErrorIcon from '@mui/icons-material/Error';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const drawerWidth = 240;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  const [selecteTab, setSelectedTab] = useState('Pending');
  const [selecteChip, setSelectedChip] = useState<MyObject>();
  const [open, setOpen] = useState(false);
  const handleOpen = (person: any) => {
    setSelectedChip(person)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

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
            <ListItemButton onClick={() => setSelectedTab("Aproved")}>
              <ListItemIcon>
                <AddTaskIcon />
              </ListItemIcon>
              <ListItemText primary={"Aproved"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Rejected" ? "#D3D3D3" : "" }}>
            <ListItemButton onClick={() => setSelectedTab("Rejected")}>
              <ListItemIcon>
                <ErrorIcon />
              </ListItemIcon>
              <ListItemText primary={"Rejected"} />
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
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    {selecteChip?.name + " " + selecteChip?.currtentSession}
                  </Typography>

                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center"><b>Proposed Schedule</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selecteChip?.schedule.map((chip) => (
                            <TableRow
                              key={chip}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                              <TableCell align="center">{chip}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <p style={{margin:0}}><b>Comments</b></p>
                    <p style={{margin:0}}>{selecteChip?.comments}</p>

                  <Stack direction={"row"} justifyContent="space-between" sx={{mt:2}}>
                    <Button variant="contained">Accept</Button>
                    <Button color="error">Reject</Button>
                  </Stack>
                </Box>
              </Modal>

              <Stack direction={"column"} spacing={2}>
                {data.filter((person) => person.approval == selecteTab.toLowerCase()).map((i,index) => (
                  <Chip sx={{ width: '300px' }} key={i.name+index} label={i.name + " " + i.currtentSession} onClick={() => { handleOpen(i) }} />
                ))}
              </Stack>

            </>
          )}
      </Box>
    </Box>
  );
}
