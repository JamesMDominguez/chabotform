'use client';
import { useState, useEffect } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from 'react';
import Badge from '@mui/material/Badge';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

export default function ApprovalBtn({setSelectedTab,selecteTab,inboxLen}){
    return(<List>
        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Schedule Overview" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Schedule Overview")}>
            <ListItemIcon>
              <PendingActionsIcon />
            </ListItemIcon>
            <ListItemText primary={"Schedule Overview"} />                      
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

        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Contacts" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Contacts")}>
            <ListItemIcon>
              <Badge color="primary">
               <RecentActorsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={"Contacts"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Link Generator" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Link Generator")}>
            <ListItemIcon>
              <Badge color="primary">
               <InsertLinkIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={"Link Generator"} />
          </ListItemButton>
        </ListItem>
      </List>)
}