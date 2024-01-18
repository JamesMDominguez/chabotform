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
import MoreTimeIcon from '@mui/icons-material/MoreTime';

export default function ApprovalBtn({setSelectedTab,selecteTab}){
    return(<List>
        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "In-load Overview" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("In-load Overview")}>
            <ListItemIcon>
              <PendingActionsIcon />
            </ListItemIcon>
            <ListItemText primary={"In-load Overview"} />                      
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ backgroundColor: selecteTab == "Over-load Overview" ? "#D3D3D3" : "" }}>
          <ListItemButton onClick={() => setSelectedTab("Over-load Overview")}>
            <ListItemIcon>
              <MoreTimeIcon />
            </ListItemIcon>
            <ListItemText primary={"Over-load Overview"} />                      
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
      </List>)
}