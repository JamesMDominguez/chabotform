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
import React from 'react';

const drawerWidth = 240;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "20px"
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
  const TableWidth = 250;
  const handleOpen = (person: any) => {
    setSelectedChip(person)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

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
  }, []);

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

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
                <Stack direction={'row'} gap={2}>

                  <TableContainer component={Paper} sx={{ minWidth: 100, maxWidth: TableWidth }}>
                  <Table size="small" aria-label="a dense table">
                      <TableHead>
                          <h3 style={{margin:0,textAlign:'center'}}>Monday</h3>
                      </TableHead>
                      <TableBody>
                          {selecteChip?.schedule.map((chip: any, index) => {
                            if (chip.day == 'Mon')
                              return (<TableRow>
                                <TableCell align="right">{chip.time}</TableCell>
                                <TableCell align="right">{chip.option}</TableCell>
                                </TableRow>)
                          })}
                      </TableBody>
                    </Table>
                    </TableContainer>

                  <TableContainer component={Paper} sx={{ minWidth: 100, maxWidth: TableWidth }}>
                  <Table size="small" aria-label="a dense table">
                      <TableHead>
                          <h3 style={{margin:0,textAlign:'center'}}>Tuesday</h3>
                      </TableHead>
                      <TableBody>
                          {selecteChip?.schedule.map((chip: any, index) => {
                            if (chip.day == 'Tus')
                              return (<TableRow>
                                <TableCell align="right">{chip.time}</TableCell>
                                <TableCell align="right">{chip.option}</TableCell>
                                </TableRow>)
                          })}
                      </TableBody>
                    </Table>
                    </TableContainer>

                  <TableContainer component={Paper} sx={{ minWidth: 100, maxWidth: TableWidth }}>
                  <Table size="small" aria-label="a dense table">
                      <TableHead>
                          <h3 style={{margin:0,textAlign:'center'}}>Wednesday</h3>
                      </TableHead>
                      <TableBody>
                          {selecteChip?.schedule.map((chip: any, index) => {
                            if (chip.day == 'Wed')
                              return (<TableRow>
                                <TableCell align="right">{chip.time}</TableCell>
                                <TableCell align="right">{chip.option}</TableCell>
                                </TableRow>)
                          })}
                      </TableBody>
                    </Table>
                    </TableContainer>

                  <TableContainer component={Paper} sx={{ minWidth: 100, maxWidth: TableWidth }}>
                  <Table size="small" aria-label="a dense table">
                      <TableHead>
                          <h3 style={{margin:0,textAlign:'center'}}>Thursday</h3>
                      </TableHead>
                      <TableBody>
                          {selecteChip?.schedule.map((chip: any, index) => {
                            if (chip.day == 'Thurs')
                              return (<TableRow>
                                <TableCell align="right">{chip.time}</TableCell>
                                <TableCell align="right">{chip.option}</TableCell>
                                </TableRow>)
                          })}
                      </TableBody>
                    </Table>
                    </TableContainer>

                    <TableContainer component={Paper} sx={{ minWidth: 100, maxWidth: TableWidth }}>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                          <h3 style={{margin:0,textAlign:'center'}}>Friday</h3>
                      </TableHead>
                      <TableBody>
                          {selecteChip?.schedule.map((chip: any, index) => {
                            if (chip.day == 'Fri')
                              return (<TableRow>
                                <TableCell align="right">{chip.time}</TableCell>
                                <TableCell align="right">{chip.option}</TableCell>
                                </TableRow>)
                          })}
                      </TableBody>
                    </Table>
                    </TableContainer>

                </Stack>

                <p style={{ margin: 0 }}><b>Comments</b></p>
                <p style={{ margin: 0 }}>{selecteChip?.comments}</p>

                <Stack direction={"row"} justifyContent="space-between" sx={{ mt: 2 }}>
                  <Button variant="contained">Accept</Button>
                  <Button color="error">Reject</Button>
                </Stack>
              </Box>
            </Modal>

            <Stack direction={"column"} spacing={2}>
              {data.filter((person) => person.approval == selecteTab.toLowerCase()).map((i, index) => (
                <Chip sx={{ width: '300px' }} key={i.name + index} label={i.name + " " + i.currtentSession} onClick={() => { handleOpen(i) }} />
              ))}
            </Stack>

          </>
        )}
      </Box>
    </Box>
  );
}
