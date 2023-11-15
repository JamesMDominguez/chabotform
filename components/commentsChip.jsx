'use client';
import React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

export default function CommentsChip({selecteChip,comments}){

return(
    <Stack gap={2} direction={'column'}>
    <Stack gap={2} direction={'column-reverse'}>
      {comments?.map((com) => (<Chip key={com.comment} label={com.comment} color={com.sender=='user'?'primary':'default'} sx={{
        '& .MuiChip-label': {
          display: 'block',
        }
      }} />))}
    </Stack>

    <Chip label={selecteChip?.comments} sx={{
      '& .MuiChip-label': {
        display: 'block'
      }
    }} />
  </Stack>
)
}