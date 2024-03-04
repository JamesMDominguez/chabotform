import InLoadPage from './formInputs';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {Button,Dialog,AppBar,Toolbar,IconButton,Typography,Slide} from '@mui/material';


const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
Transition.displayName = "Transition"

export default function FullScreenDialog5({open,handleClose,getData,employmentType}) {

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
        <InLoadPage handleClose={handleClose} getData={getData} employmentType={employmentType}/>
      </Dialog>
    </>
  );
}
