import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CommentsChip from "../../components/commentsChip";
import DialogActions from '@mui/material/DialogActions';
import SendIcon from '@mui/icons-material/Send';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import OverloadView from '../../components/overloadView'


export default function FullScreenDialog9({selectedChip,open,handleClose,getData,comments,getCommentData}) {
    const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
    Transition.displayName = "Transition"
    const [comment, setComment] = useState('')
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

    async function sendComment() {
        const apiUrl = `${process.env.NEXT_PUBLIC_LINK}/api/comments`;
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: comment, CommentId: selectedChip._id, sender: "admin",email:selectedChip.email }),
        });
        if (res.ok) {
            setComment("")
            getCommentData(selectedChip._id)
        }
    }

    const handleConfirmation = async () => {
        setLoading(true)
        const apiUrl = `${process.env.NEXT_PUBLIC_LINK}/api/overloadSchedule`;

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

    const ViewAppbar = () =>(<AppBar  sx={{ position: 'fixed',backgroundColor:"gray" }} >
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
        <ViewAppbar/>
        <OverloadView selectedChip={selectedChip}/>
        <Stack style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{marginBottom: "0" }}><b>Comments</b></p>
            <TextField
                autoFocus
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                margin="dense"
                sx={{ marginBottom: "25px",maxWidth:"30rem" }}
                id="name"
                label="Add a comment...   "
                type="email"
                variant='standard'
                fullWidth
            />
            {comment != "" &&
                <Stack direction={"row"} gap={2} justifyContent="flex-end" sx={{ marginBottom: "10px" }}>
                    <Button variant="text" color="secondary" size='small'>Cancel</Button>
                    <Button variant="contained" color="secondary" size='small' onClick={()=>sendComment()}>Comment</Button>
                </Stack>
            }
            <CommentsChip selecteChip={selectedChip} comments={comments}/>
        </Stack>

      <Stack direction={"row"} justifyContent="center" spacing={4} sx={{ mb: 2 }}>
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
