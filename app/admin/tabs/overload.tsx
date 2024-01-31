'use client';
import { Chip, Stack } from '@mui/material';
import {useState} from 'react';
import React from 'react';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ErrorIcon from '@mui/icons-material/Error';
import Dialog from '../dialogOverLoad';
import Divider from '@mui/material/Divider';

export default function Schedule({data,getData}: any){
    const [open, setOpen] = useState(false);
    const [selectedChip, setSelectedChip] = useState<any>();
    const [comments, setComments] = useState([]);


    const handleClickOpen = (i:any) => {
      setSelectedChip(i)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const tabsList = [
        { name: 'Pending', label: "Pending Review", icon: <PendingActionsIcon sx={{ marginBottom: "-5px" }} /> },
        { name: 'PendingResubmission', label: "Pending Resubmission", icon: <AccessAlarmsIcon sx={{ marginBottom: "-5px" }} /> },
        { name: 'Resubmission', label: "Resubmited", icon: <ErrorIcon sx={{ marginBottom: "-5px" }} /> },
        { name: 'Approved', label: "Approved", icon: <AddTaskIcon sx={{ marginBottom: "-5px" }} /> },
      ]

    return(
        <>
        <Stack direction={"column"} spacing={2}>
          {tabsList.map(({ name, icon, label }) => (
            <Stack key={name} direction={"column"} spacing={2}>
              <h4>{icon} {label}</h4>
                <Stack key={name} direction={"row"} flexWrap="wrap">
              {data.filter((person:any) => person.approval.toLowerCase() == name.toLowerCase()).map((i:any, index:any) => (
                <Chip sx={{ margin: '10px' }} key={i.name + index} label={i.name} onClick={()=>handleClickOpen(i)} />
              ))}
            </Stack>
            {name !== tabsList[tabsList.length - 1].name && <Divider variant="inset" />}
            </Stack>
          ))}
        </Stack>

      <Dialog selectedChip={selectedChip} handleClose={handleClose} open={open} getData={getData} />
      </>
    )
}