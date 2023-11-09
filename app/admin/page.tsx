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
import React from 'react';

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
  const [open, setOpen] = useState(false);
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
  function grayOutBox(day: string, index: number) {
    if (index < 2) return true;
    if (day == "Mon" && index > 17) return true;
    if (day == "Wed" && index > 9 && index < 14) return true;
    if (day == "Thurs" && index > 17) return true;
    if (day == "Fri" && index > 17) return true;
    return false;
  }

  const findDayTime = (Dates: any,Breaks:any, Day: any, Time: any) => {
    let x = Dates?.map((date: any) => {
      if (date.day == Day && date.time == Time) {
        return (date.option)
      } else {
        return ""
      }
    }).join('')
    if(x == ""){
      let val = Breaks?.map((date:any) => {
          if (date.day == Day && date.time == Time) {
            return ("Break")
          } else {
            return ""
          }
        }).join('')
      return val
  }
    return (x)
  }

  const getDailyHours = (day: string) => {
    let num = 0
    selecteChip?.schedule?.forEach((time: { day: string; }) => {
      if (time.day == day) {
        num++
      }
    })
    return num / 2
  }

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
                  {selecteChip?.name}
                </Typography>

                <div style={{display:"flex"}}>
                <Stack direction={"row"}>
                  <Stack sx={{ width: 80 }}>
                    <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin", borderTopLeftRadius: '10px' }}>
                      <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>Time</p>
                    </div>
                    <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
                      <p style={{ fontSize: "13px", textAlign: "center", margin: 0 }}>Daily Hours</p>
                    </div>
                    {timeRange.map((i) => {
                      return (
                        <div key={"Weekly" + i} style={{ borderBottomLeftRadius: i == '7:00pm' ? '10px' : 0, color: '#5d5e5e', fontSize: "14px", borderStyle: "solid", borderWidth: "thin", textAlign: "center", height: '1.3rem' }} >
                          <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>{i}</p>
                        </div>
                      )
                    })
                    }
                  </Stack>

                  <Stack direction={"row"}>
                    {days.map((day) => {
                      return (
                        <Stack key={"yourDay" + day} sx={{ maxWidth: 150 }}>
                          <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin", borderTopRightRadius: day == 'Fri' ? '10px' : 0 }}>
                            <p style={{ margin: "0", fontSize: "15px", textAlign: "center" }} >{day}</p>
                          </div>
                          <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
                            <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }} >{getDailyHours(day)}</p>
                          </div>
                          {timeRange.map((i, index) => {
                            return (
                              <div key={"timerange" + index} style={{ borderStyle: "solid", borderWidth: "thin", borderBottomRightRadius: i == '7:00pm' && day == 'Fri' ? '10px' : 0, maxWidth: 90, width: 80, height: '1.3rem', color: '#5d5e5e', backgroundColor: grayOutBox(day, index) ? '#c3c4c7' : '' }}>
                                <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }}>{findDayTime(selecteChip?.schedule,selecteChip?.breaks, day, i)}</p>
                              </div>
                            )
                          })
                          }
                        </Stack>
                      )
                    })}
                  </Stack>
                </Stack>
                <table style={{height:50,marginLeft:"10px"}}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>D-Hour</th>
                  </tr>
                  </thead>
                  <tbody>
                  {selecteChip?.ica.map((x:any)=>{
                    return(<tr key={'tableRow'+x.name+x.dHours}>
                      <th>{x.name}</th>
                      <th>{x.dHours}</th>
                    </tr>)
                  })}
                </tbody>
                </table>
                </div>


                <p style={{ margin: 0 }}><b>Comments</b></p>
                <p style={{ margin: 0 }}>{selecteChip?.comments}</p>

                <Stack direction={"row"} justifyContent="space-between" sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={handleNewRequest}>Accept</Button>
                  <Button color="error">Reject</Button>
                </Stack>
              </Box>
            </Modal>

            <Stack direction={"column"} spacing={2}>
              {data.filter((person) => person.approval == selecteTab.toLowerCase()).map((i, index) => (
                <Chip sx={{ width: '300px' }} key={i.name + index} label={i.name + " " + i.year + " " + i.semester} onClick={() => { handleOpen(i) }} />
              ))}
            </Stack>

          </>
        )}
      </Box>
    </Box>
  );
}
