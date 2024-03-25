import * as React from 'react';
import { useState } from 'react';
import {Button,Dialog,Stack,AppBar,Toolbar,IconButton,Typography,Slide,DialogTitle,DialogActions} from '@mui/material';
import Comments from "../../components/comments";
import InloadView from "../../components/inloadView";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import FormInputs2 from '../CounselorsPortal/inload/formInputs2'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
Transition.displayName = "Transition";

export default function FullScreenDialog({selectedChip,open,handleClose,getData}) {
    const [approvalState, setApprovalState] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [loading, setLoading] = useState(false);
      
    const handleClickOpen = (state) => {
        setApprovalState(state)
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleConfirmation = async () => {
        setLoading(true)
        const apiUrl = `${process.env.NEXT_PUBLIC_LINK}/api/inLoadSchedule`;
        const res = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ approval: approvalState, id: selectedChip._id }),
        });
        if (res.ok) {
            setLoading(false)
            getData()
            handleClose2()
            handleClose()
        }
    }  

    const AppbarView = () => (<AppBar  sx={{ position: 'fixed',backgroundColor:"gray" }} >
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
       {selectedChip?.name} {selectedChip?.year} {selectedChip?.semester}
      </Typography>
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
        <AppbarView/>
        <FormInputs2 selectedChip={selectedChip} handleClose={handleClose} getData={getData} employmentType={selectedChip?.employmentType}/>
        <Comments selectedChip={selectedChip} sender={"admin"}/>
      <Stack direction={"row"} justifyContent="center" spacing={4} sx={{ mb: 2,mt:2 }}>
            <Button variant="contained" onClick={() => handleClickOpen("Approved")}>Approve</Button>
            <Button color="error" variant="contained" onClick={() => handleClickOpen("PendingResubmission")}>Resubmission</Button>
        </Stack>
      </Dialog>

        <Dialog open={open2} onClose={handleClose2}>
            <DialogTitle>{approvalState} confirmation</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose2}>Cancel</Button>
                <LoadingButton
                    sx={{ width: '50%' }}
                    variant="contained" fullWidth onClick={handleConfirmation}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                >
                    <span>Send</span>
                </LoadingButton>
            </DialogActions>
        </Dialog>
    </>
  );
}
