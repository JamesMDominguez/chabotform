import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ScheduleGrid from "../../components/scheduleGrid";
import DataTable from "../../components/dataTable";
import { useRouter } from 'next/navigation'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({selectedChip,open,handleClose}) {
  const router = useRouter()

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar  sx={{ position: 'fixed',backgroundColor:"gray" }} >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
             {selectedChip?.name + " " + selectedChip?.year + " " + selectedChip?.semester}
            </Typography>
            <Button onClick={()=>router.push(`/overloadResubmission/${selectedChip._id}`)} disabled={selectedChip?.approval=="Pending"||selectedChip?.approval=="PendingResubmission"?false:true} size="small" color="inherit" variant='outlined' sx={{mr:"10px"}}>
                Resubmit week for approval
            </Button>
            <Button autoFocus color="inherit" onClick={handleClose}>
              close
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ display: 'flex', flexDirection: 'row',justifyContent:"center", alignItems: 'center',marginTop:"100px" }}>
            <ScheduleGrid selectedChip={selectedChip} />
            <DataTable selectedChip={selectedChip} />
        </div>
      </Dialog>
    </>
  );
}
