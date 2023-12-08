'use client';
import { Chip,Stack } from '@mui/material';
import Fun from '../../utils/myFunc'
import React from 'react';


export default function Contacts() {
    return (
        <>
        <h4>Counselors</h4>
        <Stack gap={2} direction={"row"} flexWrap="wrap">
          {Fun.people.map((person, index) => (
            <Chip sx={{ maxWidth: '300px' }} key={person.email + index} label={person.name} />
          ))}
        </Stack>
      </>
    )
}