'use client';
import { Chip,Stack } from '@mui/material';
import Fun from '../../utils/myFunc'
import React from 'react';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';


export default function Inbox({inbox, selectedInbox}: {inbox: any, selectedInbox: any}) {
        return (
                <>
                {[...inbox].reverse().map((box: any) => {
                            return (
                                <div key={box._id} style={{ marginBottom: "10px" }}>
                                    <Chip onClick={() => selectedInbox(box.CommentId)} icon={box.status == "unread" ? <MarkUnreadChatAltIcon color='error' /> : <MarkEmailReadIcon color='success' />} label={box.name} />
                                </div>
                            );
                })}
            </>
        );
}