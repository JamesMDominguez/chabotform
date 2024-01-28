import * as React from 'react';
import {Button,Dialog,Typography,IconButton,Toolbar,AppBar } from '@mui/material';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import OverloadView from '../../../components/overloadView'
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
Transition.displayName = "Transition"

export default function FullScreenDialog2({ selectedChip, open, handleClose }) {
  const ViewAppBar = () => (<AppBar  sx={{ position: 'fixed',backgroundColor:"gray" }} >
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
     {selectedChip?.name}
    </Typography>
    <Button onClick={()=>router.push(`/overloadResubmission/${selectedChip._id}`)} disabled={selectedChip?.approval=="Pending"||selectedChip?.approval=="PendingResubmission"?false:true} size="small" color="inherit" variant='outlined' sx={{mr:"10px"}}>
        Resubmit week for approval
    </Button>
    <Button autoFocus color="inherit" onClick={handleClose}>
      close
    </Button>
  </Toolbar>
</AppBar>)
  ViewAppBar.displayName = "ViewAppBar"

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
       <ViewAppBar/>
       <OverloadView selectedChip={selectedChip}/>
      </Dialog>
    </>
  );
}
