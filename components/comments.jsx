'use client';
import { useState,useEffect } from 'react';
import {Button,TextField,Stack,Chip} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Skeleton from '@mui/material/Skeleton';

export default function Comments({selectedChip,sender}) {
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [loadingComment, setLoadingComment] = useState(false);
    const [loadingCommentData, setLoadingCommentData] = useState(true);

    async function getCommentData() {
        const apiUrl = `${process.env.NEXT_PUBLIC_LINK}/api/comments`;
        const res = await fetch(apiUrl, { method: "GET", headers: { "chipID": selectedChip._id } });
        if(res.ok){
            setLoadingCommentData(false)
        }
        const jsonData = await res.json();
        setComments(jsonData);
    }

    useEffect(() => {
        getCommentData()
    }
    , [selectedChip])

    function createDataAndTime() {
        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;

        const options = { hour: 'numeric', minute: 'numeric' };
        const currentTime = currentDate.toLocaleTimeString([], options);

        return {
            date: formattedDate,
            time: currentTime
        };
    }

    async function sendComment() {
        const dataAndTime = createDataAndTime();
        setLoadingComment(true)
        const apiUrl = `${process.env.NEXT_PUBLIC_LINK}/api/comments`;
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: comment, CommentId: selectedChip._id, sender: sender, email: selectedChip.email, date: dataAndTime.date, time: dataAndTime.time }),
        });
        if (res.ok) {
            setLoadingComment(false)
            setComment("")
            getCommentData()
        }
    }

    return (
            <Stack style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ marginBottom: "0" }}><b>Comments</b></p>
                <TextField
                    multiline
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                    }}
                    margin="dense"
                    sx={{ marginBottom: "25px", maxWidth: "30rem" }}
                    id="name"
                    label="Add a comment...   "
                    type="email"
                    variant='standard'
                    fullWidth
                />
                {comment != "" &&
                    <Stack direction={"row"} gap={2} justifyContent="flex-end" sx={{ marginBottom: "10px" }}>
                        <Button variant="text" onClick={() => setComment('')} size='small'>Cancel</Button>
                        <LoadingButton
                            sx={{ width: '50%' }}
                            variant="contained" fullWidth onClick={() => sendComment()}
                            endIcon={<SendIcon />}
                            loading={loadingComment}
                            loadingPosition="end"
                        >
                            <span>Send</span>
                        </LoadingButton>
                    </Stack>
                }
                {loadingCommentData && <Skeleton variant="rectangular" width={500} height={100} />}
                <Stack gap={2} direction={'column-reverse'}>
                    {comments?.map((com) => (
                        <div key={com.comment}>
                            <p style={{ margin: 0, fontSize: "10px" }}>{com.date} {com.time}</p>
                            <Chip label={com.comment} color={com.sender == 'user' ? 'primary' : 'default'} sx={{
                                height: 'auto',
                                '& .MuiChip-label': {
                                    display: 'block',
                                    whiteSpace: 'normal',
                                },
                                display: 'block',
                                padding: '5px',
                                width: '500px',
                            }} />
                        </div>
                    ))}
                </Stack>
            </Stack>
    )
}