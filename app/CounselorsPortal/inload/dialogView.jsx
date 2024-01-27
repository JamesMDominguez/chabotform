import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {Button,Dialog,AppBar,Toolbar,IconButton,Typography,Slide} from '@mui/material';
import { useRouter } from 'next/navigation'
import InloadView from '../../../components/inloadView'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FullScreenDialog({selectedChip,open,handleClose}) {
  const router = useRouter()
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
     {selectedChip?.name + " " + selectedChip?.year + " " + selectedChip?.semester}
    </Typography>
    <Button onClick={()=>router.push(`/resubmission/${selectedChip._id}`)} disabled={selectedChip?.approval=="Pending"||selectedChip?.approval=="PendingResubmission"?false:true} size="small" color="inherit" variant='outlined' sx={{mr:"10px"}}>
        Resubmit week for approval
    </Button>
    <Button autoFocus color="inherit" onClick={handleClose}>
      close
    </Button>
  </Toolbar>
</AppBar>)
  return (
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <ViewAppBar/>
        <InloadView selectedChip={selectedChip}/>
      </Dialog>
  );
}

