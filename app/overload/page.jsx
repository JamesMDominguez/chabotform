import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IsAuth from '../../components/isAuth';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import Name from '../CounselorsPortal/name';
import OverLoadPage from '../../components/overLoadPage';
function Home() {

  async function Logout() {
    'use server'
    cookies().delete('w-number')
    cookies().delete('name')
    cookies().delete('email')
    redirect("/Login");
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
    >

      <AppBar position="static" color='transparent'>
        <Toolbar>
          <img
            src='https://districtazure.clpccd.org/prmg/files/docs/styles-logos/cc-logo-horizontal-1c.jpg'
            height={50}
            alt="Image Description"
          />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Over-Load Proposed Schedule Counselors
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Name />
            <form action={Logout}>
              <Button type='submit' variant='outlined' sx={{ ml: "10px" }} color="inherit">Logout</Button>
            </form>
          </div>
        </Toolbar>
      </AppBar>
    
      <OverLoadPage />

    </Stack>
  )
}


export default IsAuth(Home)
