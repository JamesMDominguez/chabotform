"use client";
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation'
import Fun from '../utils/myFunc';
import { useState } from 'react';

export default function Finished() {
  const [w_number, setW_number] = useState('');
  const router = useRouter()

  async function handleSubmit() {
    const authUser = await Fun.GetUser(w_number);
    console.log(authUser)
    if (authUser.userFound){
      console.log(authUser)
      window.localStorage.setItem('name', authUser.name);
      router.push('/')
    }
    else {
      alert('Invalid W Number');
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '20px', width: '300px', border: '1px solid black' }}>
        <img style={{ width: '200px', margin: '0 auto' }} src='https://districtazure.clpccd.org/prmg/files/docs/styles-logos/cc-logo-horizontal-1c.jpg' />
        <h2 style={{ margin: 0, textAlign: 'center', fontWeight: 'normal', marginBottom: '20px' }}>Portal Login</h2>
        <TextField value={w_number} onChange={(e) => setW_number(e.target.value)} name='text' fullWidth id="outlined-basic" label="Enter W Number" variant="outlined" />
        <Button onClick={handleSubmit} fullWidth sx={{ mt: '10px' }} variant="contained" color='warning'>Login</Button>
      </div>
    </div>
  );
}
