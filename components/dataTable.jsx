'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function DataTable({ selectedChip }) {
  let TotalICA = 0;

  return (
    <div style={{ marginRight: "20px" }}>
      <p style={{ textAlign: "center" }}>Semester and Year</p>
      <Stack direction={"row"} gap={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Semester</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="outlined"
            value={selectedChip?.semester}
            label="Semester"
            sx={{ mb: "20px" }}
          >
            <MenuItem value="Summer">Summer ☀️</MenuItem>
            <MenuItem value="Spring">Spring 🌱</MenuItem>
            <MenuItem value="Fall">Fall 🍂</MenuItem>
          </Select>
        </FormControl>
        <TextField value={selectedChip.year} type="number" id="filled-basic" label="Year" variant="outlined" sx={{ mb: "20px" }}
          InputProps={{ startAdornment: <InputAdornment position="start"><CalendarMonthIcon /> </InputAdornment> }}
        />
      </Stack>
      {selectedChip.employmentType == "full-time" && <>
      <p style={{ textAlign: "center" }}>Instruction / Coord / Assign (ICA)</p>
      {selectedChip?.ica?.map((value, index) => {
        TotalICA += value.dHours;
        return (
          <Stack
            key={`input-field-box-${index}`}
            direction={'row'}
            gap={2}
            mb={2}
          >
            <TextField
              id={`outlined-basic-${index}`}
              label="ICA Name"
              variant="outlined"
              value={value.name}
              key={`input-field-${index}`}
              InputProps={{ startAdornment: <InputAdornment position="start"><SchoolIcon /> </InputAdornment> }}
            />

            <TextField
              type={'number'}
              label='D-Hour'
              id="outlined-basic"
              variant="outlined"
              key={`input-field99-${index}`}
              value={TotalICA}
              InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon /> </InputAdornment> }}
            />
          </Stack>
        )
      })}
      </>}
      <List>
      {selectedChip.employmentType == "full-time" && <>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Total ICA Hours" />
            <Chip color="primary" sx={{ width: "70px" }} label={TotalICA + 0} />

          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText primary="Total Direct Weekly Counseling Hours" />
            <Chip color="primary" sx={{ width: "70px" }} label={selectedChip?.schedule?.length / 2} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </>}

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={`Total Weekly hours ${selectedChip.employmentType=="full-time"? "(Must Equal 27.5)":""}`} />
            <Chip color="primary" sx={{ width: "70px" }} label={TotalICA + selectedChip?.schedule?.length / 2} />
          </ListItemButton>
        </ListItem>
      </List>
      <TextField
        id="outlined-multiline-static"
        value={selectedChip?.comments}
        label="Comments"
        multiline
        rows={2}
        fullWidth
        sx={{ maxWidth: "500px", mt: 2 }}
      />
    </div>
  );
}