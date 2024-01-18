import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IsAuth from '../components/isAuth';
import Name from './CounselorsPortal/name';
import InLoadPage from '../components/inLoadPage';
import Logout from './serverActions/action';

function Home() {

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
          In-Load Proposed Schedule Full-Time Counselors
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Name />
            <form action={Logout}>
              <Button type='submit' variant='outlined' sx={{ ml: "10px" }} color="inherit">Logout</Button>
            </form>
          </div>
        </Toolbar>
      </AppBar>

      <InLoadPage />

    </Stack>
  )
}


export default IsAuth(Home)
