import { Chip,Stack } from '@mui/material';
import React from 'react';
import ContactDialog from './ContactDialog'
export default function Contacts({allUsers}:any) {
  const [open, setOpen] = React.useState(false);
  const [selectedChip, setSelectedChip] = React.useState<any>();
  const handleClickOpen = (user:any) => {
    setSelectedChip(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <>
        <h4>Full-Time Counselors</h4>
        <Stack gap={2} direction={"row"} flexWrap="wrap">
          {allUsers.filter((person:any)=>person.employmentType =='full-time').map((person:any, index:any) => (
            <Chip sx={{ maxWidth: '300px' }} onClick={()=>handleClickOpen(person)} key={person.email + index} label={person.name} />
          ))}
        </Stack>
        <h4>Part-Time Counselors</h4>
        <Stack gap={2} direction={"row"} flexWrap="wrap">
          {allUsers.filter((person:any)=>person.employmentType == 'part-time').map((person:any, index:any) => (
            <Chip sx={{ maxWidth: '300px' }} onClick={()=>handleClickOpen(person)} key={person.email + index} label={person.name} />
          ))}
        </Stack>
        <ContactDialog open={open} handleClose={handleClose} selectedChip={selectedChip}/>
      </>
    )
}