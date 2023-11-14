
import Stack from '@mui/material/Stack';
import { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CommentsChip from './commentsChip'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import SendIcon from '@mui/icons-material/Send';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import DataTable from './dataTable';
import Fun from '../app/utils/myFunc'
const timeRange = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"]
const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]

export default function SelectedSchedule({ selecteChip, getData, setSelectedTab }) {

    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([]);
    const grayOutBox = Fun.grayOutBox
    const getDailyHours = Fun.getDailyHours
    const findDayTime = Fun.findDayTime
    const [approvalState, setApprovalState] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClickOpen = (state) => {
        setApprovalState(state)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const requestData = {
        key: selecteChip?._id
      };
    async function getCommentData() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_TEST}?${new URLSearchParams(requestData)}`, { cache: 'no-store' });
        const jsonData = await res.json();
        setComments(jsonData);
    }

    useEffect(() => {
        getCommentData()
    }, [])




    async function sendComment() {
        const res = await fetch(process.env.NEXT_PUBLIC_COMMENT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: comment, CommentId: selecteChip._id, sender: "admin" }),
        });
        if (res.ok) {
            setComment("")
            getCommentData()
        }
    }

    const handleConfirmation = async () => {
        setLoading(true)

        const res = await fetch(process.env.NEXT_PUBLIC_ADMIN, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ approval: approvalState, id: selecteChip._id }),
        });
        if (res.ok) {
            setLoading(false)
            getData()
            setSelectedTab(approvalState)
            setOpen(false)
        }
    }

    return (selecteChip && <>
        <h3>{selecteChip.name + " " + selecteChip.year + " " + selecteChip.semester}</h3>

        <Stack direction={"row"}>
            <Stack sx={{ width: 80 }}>
                <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin", borderTopLeftRadius: '10px' }}>
                    <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>Time</p>
                </div>
                <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
                    <p style={{ fontSize: "13px", textAlign: "center", margin: 0 }}>Daily Hours</p>
                </div>
                {timeRange.map((i) => {
                    return (
                        <div key={"Weekly" + i} style={{ borderBottomLeftRadius: i == '7:00pm' ? '10px' : 0, color: '#5d5e5e', fontSize: "14px", borderStyle: "solid", borderWidth: "thin", textAlign: "center", height: '1.3rem' }} >
                            <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>{i}</p>
                        </div>
                    )
                })}
            </Stack>

            <Stack direction={"row"}>
                {days.map((day) => {
                    return (
                        <Stack key={"yourDay" + day} sx={{ maxWidth: 150 }}>
                            <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin", borderTopRightRadius: day == 'Fri' ? '10px' : 0 }}>
                                <p style={{ margin: "0", fontSize: "15px", textAlign: "center" }} >{day}</p>
                            </div>
                            <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
                                <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }} >{getDailyHours(day,selecteChip)}</p>
                            </div>
                            {timeRange.map((i, index) => {
                                return (
                                    <div key={"timerange" + index} style={{ borderStyle: "solid", borderWidth: "thin", borderBottomRightRadius: i == '7:00pm' && day == 'Fri' ? '10px' : 0, maxWidth: 90, width: 80, height: '1.3rem', color: '#5d5e5e', backgroundColor: grayOutBox(day, index) ? '#c3c4c7' : '' }}>
                                        <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }}>{findDayTime(selecteChip?.schedule, selecteChip?.breaks, day, i)}</p>
                                    </div>)
                            })}
                        </Stack>)
                })}
            </Stack>
        </Stack>

       <DataTable selecteChip={selecteChip}/>

        <p style={{ marginTop: "10px", marginBottom: "0" }}><b>Comments</b></p>
        <Stack direction={"column"} sx={{ maxWidth: "30rem" }}>
            <TextField
                autoFocus
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                margin="dense"
                sx={{ marginBottom: "25px" }}
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
            <CommentsChip selecteChip={selecteChip} comments={comments.Comment}/>
        </Stack>

        <Stack direction={"row"} justifyContent="start" spacing={4} sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => handleClickOpen("Approved")}>Approve</Button>
            <Button color="error" variant="contained" onClick={() => handleClickOpen("Resubmission")}>Resubmission</Button>
            <Button color="warning" variant="contained" onClick={() => handleClickOpen("Pending")}>Pending</Button>
        </Stack>

        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>{approvalState} confirmation</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>

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

    </>)
}