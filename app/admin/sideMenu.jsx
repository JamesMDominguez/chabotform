'use client';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Badge from '@mui/material/Badge';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { FormControl, InputLabel, MenuItem, Select ,Button,Stack} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ApprovalBtn({setSelectedTab,selecteTab,year,setYear,semester,setSemester}){
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, index) => currentYear - index+1);
  const [showDefault, setShowDefault] = useState(false);

    async function changeDefault(){
      const apiUrl3 = `${process.env.NEXT_PUBLIC_LINK}/api/term`;
      const res = await fetch(apiUrl3, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Year:year,Semester:semester}),
      })
      if(res.status == 200){
        setShowDefault(false)
      }
    }

    return(<List>
      <h4 style={{margin:0,marginLeft:"10px"}}>Full Time</h4>
        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "In-load Overview" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("In-load Overview")}>
            <ListItemIcon>
              <PendingActionsIcon />
            </ListItemIcon>
            <ListItemText primary={"In-load Overview"} />                      
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Over-load Overview" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Over-load Overview")}>
            <ListItemIcon>
              <MoreTimeIcon />
            </ListItemIcon>
            <ListItemText primary={"Over-load Overview"} />                      
          </ListItemButton>
        </ListItem>
        <h4 style={{margin:0,marginLeft:"10px"}}>Part Time</h4>
        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Part Time In-load Overview" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Part Time In-load Overview")}>
            <ListItemIcon>
              <PendingActionsIcon />
            </ListItemIcon>
            <ListItemText primary={"In-load Overview"} />                      
          </ListItemButton>
        </ListItem>

        <h4 style={{margin:0,marginLeft:"10px"}}>Information</h4>
        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Contacts" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Contacts")}>
            <ListItemIcon>
              <Badge color="primary">
               <RecentActorsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={"Contacts"} />
          </ListItemButton>
        </ListItem>
        <h4 style={{margin:0,marginLeft:"10px",marginBottom:"10px"}}>Current Term</h4>
        <List style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FormControl size='small' sx={{minWidth:"227px"}}>
            <InputLabel id="demo-simple-select-label">Semester</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="outlined"
              label="Semester"
              value={semester}
              onChange={(e) => {
                setSemester(e.target.value)
                setShowDefault(true)
              }}
              sx={{ mb: "20px" }}
            >
              <MenuItem value="Summer">Summer ☀️</MenuItem>
              <MenuItem value="Spring">Spring 🌱</MenuItem>
              <MenuItem value="Fall">Fall 🍂</MenuItem>
            </Select>
          </FormControl>

          <FormControl size='small' sx={{minWidth:"227px"}}>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                label="Year"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value)
                  setShowDefault(true)
              }}
                sx={{ mb: "20px" }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        {showDefault && (
          <Stack direction={'row'}>
          <IconButton aria-label="delete" onClick={()=>setShowDefault(false)}>
            <CancelIcon />
          </IconButton>
          <Button size='small' variant="outlined" color='inherit' sx={{width:"180px"}} onClick={()=>changeDefault()}>Set Default</Button>
          </Stack>
        )}
        </List>
      </List>)
}