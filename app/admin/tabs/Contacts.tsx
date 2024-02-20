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
        <h4>Counselors</h4>
        <Stack gap={2} direction={"row"} flexWrap="wrap">
          {allUsers.map((person:any, index:any) => (
            <Chip sx={{ maxWidth: '300px' }} onClick={()=>handleClickOpen(person)} key={person.email + index} label={person.name} />
          ))}
        </Stack>
        <ContactDialog open={open} handleClose={handleClose} selectedChip={selectedChip}/>
      </>
    )
}