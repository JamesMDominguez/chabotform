"use client";
import { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CommentsChip from '../../components/commentsChip'
import ScheduleGrid from "../../components/scheduleGrid";
import DataTable from "../../components/dataTable";

export default function Page({ params }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [selecteChip, setSelecteChip] = useState();

  const requestData = {
    key1: params.schedule
  };

  async function getData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_COMMENT}?${new URLSearchParams(requestData)}`, { cache: 'no-store' });
    const jsonData = await res.json();
    setComments(jsonData.Comment);
    setSelecteChip(jsonData.Schedule[0]);
  }

  async function sendComment() {
    const res = await fetch(process.env.NEXT_PUBLIC_COMMENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: comment, CommentId: params.schedule,sender:"user",email:selecteChip.email}),
    });
    if (res.ok) {
      setComment("")
      getData()
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (selecteChip && <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h3>{selecteChip.name + " " + selecteChip.year + " " + selecteChip.semester}</h3>

    <ScheduleGrid selecteChip={selecteChip}/>

    <DataTable selecteChip={selecteChip}/>

    <p style={{ marginTop: "10px", marginBottom: "0" }}><b>Comments</b></p>
    <Stack direction={"column"} sx={{ maxWidth: "30rem" }}>
      <TextField
        autoFocus
        multiline
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        margin="dense"
        sx={{ marginBottom: "25px",minWidth:"30rem" }}
        id="name"
        label="Add a comment...   "
        type="email"
        variant='standard'
        fullWidth
      />
      {comment != "" &&
        <Stack direction={"row"} gap={2} justifyContent="flex-end" sx={{ marginBottom: "10px" }}>
          <Button variant="text" size='small' onClick={() => setComment('')}>Cancel</Button>
          <Button variant="contained" size='small' onClick={() => sendComment()}>Comment</Button>
        </Stack>
      }
    {comments && <CommentsChip selecteChip={selecteChip} comments={comments}/>}
    </Stack>
  </div>
  )
}