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

const drawerWidth = 240;

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
  const [inbox, setInbox] = useState<any>();
  let inboxLen = inbox?.filter((element: { status: string; })=>element.status=='unread').length
  const handleOpen = (person: any) => {
    setSelectedChip(person)
    setSelectedTab("Selected Schedule")
  }
  
  async function getData(){
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ADMIN as string);
      const inboxRes = await fetch('http://localhost:3000/api/inbox')
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

  const selectedInbox = (id:string) => {
    data?.forEach(async element => {
      if(element._id == id){
        setSelectedChip(element)
        setSelectedTab("Selected Schedule")
        await fetch('http://localhost:3000/api/inbox',{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id:id}),
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
       <ApprovalBtn setSelectedTab={setSelectedTab} selecteTab={selecteTab} inboxLen={inboxLen}/>
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
            {selecteTab == "Selected Schedule" && <SelectedSchedule selecteChip={selecteChip} getData={getData} setSelectedTab={setSelectedTab} />}
            {selecteTab == "Inbox" && [...inbox].reverse().map((box:any)=>{
            return(
              <div key={box._id} style={{marginBottom:"10px"}}>    
              <Chip onClick={()=>selectedInbox(box.CommentId)} icon={box.status == "unread"?<MarkUnreadChatAltIcon color='error' />:<MarkEmailReadIcon color='success'/>} label={box.name} />
              </div>
            )}
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
