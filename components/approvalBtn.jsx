'use client';
import { useState, useEffect } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ErrorIcon from '@mui/icons-material/Error';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from 'react';
import Badge from '@mui/material/Badge';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

export default function ApprovalBtn({setSelectedTab,selecteTab,inboxLen}){
    return(<List>
        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Pending" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Pending")}>
            <ListItemIcon>
              <PendingActionsIcon />
            </ListItemIcon>
            <ListItemText primary={"Pending"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Aproved" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Approved")}>
            <ListItemIcon>
              <AddTaskIcon />
            </ListItemIcon>
            <ListItemText primary={"Approved"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Resubmission" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Resubmission")}>
            <ListItemIcon>
              <ErrorIcon />
            </ListItemIcon>
            <ListItemText primary={"Resubmitted"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "PendingResubmission" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("PendingResubmission")}>
            <ListItemIcon>
              <AccessAlarmsIcon />
            </ListItemIcon>
            <ListItemText primary={"Pending Resubmission"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Selected Schedule" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Selected Schedule")}>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary={"Selected Schedule"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Inbox" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Inbox")}>
            <ListItemIcon>
              <Badge badgeContent={inboxLen} color="primary">
               <MailIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={"Inbox"} />
          </ListItemButton>
        </ListItem>
      </List>)
}