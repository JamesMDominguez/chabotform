import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import isAuth from "../components/isAuth";
import Portal from './CounselorsPortal/portal'
import Name from './CounselorsPortal/name'
import Typography from '@mui/material/Typography';
import { Button} from '@mui/material';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

function Finished() {
    async function Logout() {
        'use server'
        cookies().delete('w_number')
        cookies().delete('name')
        cookies().delete('email')
        redirect("/Login");
      }
    return (
        <>
            <AppBar position="static" color='transparent'>
                <Toolbar>
                    <img
                        src='https://districtazure.clpccd.org/prmg/files/docs/styles-logos/cc-logo-horizontal-1c.jpg'
                        height={50}
                        alt="Image Description"
                    />

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Counselors Portal
                    </Typography>
                    <div style={{display:"flex",flexDirection:"row"}}>
                    <Name />
                    <form action={Logout}>
                    <Button type='submit' variant='outlined' sx={{ml:"10px"}} color="inherit">Logout</Button>
                    </form>
                    </div>
                </Toolbar>
            </AppBar>

            <Portal />
        </>
    );
}

export default isAuth(Finished);