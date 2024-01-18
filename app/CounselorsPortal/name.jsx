'use client';
import Typography from '@mui/material/Typography';
import { useEffect,useState } from 'react';

export default function Name() {
    const [name,setName] = useState('')
    useEffect(() => {
        setName(localStorage.getItem('name'))
    }, [])
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {name}
    </Typography>
  )
}