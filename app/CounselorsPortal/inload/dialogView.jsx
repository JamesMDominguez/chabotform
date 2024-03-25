import InLoadPage from './formInputs2';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {Button,Dialog,AppBar,Toolbar,IconButton,Typography,Slide} from '@mui/material';
import Comments from '../../../components/comments';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
Transition.displayName = "Transition"

export default function FullScreenDialog4({selectedChip,open,handleClose,getData,employmentType}) {
  const FormAppBar = () => (
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
     Inload Form
    </Typography>
    <Button autoFocus color="inherit" onClick={handleClose}>
      close
    </Button>
  </Toolbar>
</AppBar>)
  FormAppBar.displayName = "FormAppBar"
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <FormAppBar/>
        <InLoadPage selectedChip={selectedChip} handleClose={handleClose} getData={getData} employmentType={employmentType}/>
        <div style={{marginBottom:"20px"}}>
          <Comments selectedChip={selectedChip} sender={'user'}/>
        </div>
      </Dialog>
    </>
  );
}
