import OverLoadPage from './formInputs';
import * as React from 'react';
import {Button,Dialog,AppBar,Toolbar,IconButton,Typography,Slide} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FullScreenDialog({open,handleClose,getData}) {

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
     Overload Form
    </Typography>
    <Button autoFocus color="inherit" onClick={handleClose}>
      close
    </Button>
  </Toolbar>
</AppBar>)

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <ViewAppBar/>
        <OverLoadPage handleClose={handleClose} getData={getData}/>
      </Dialog>
    </>
  );
}
