import * as React from 'react';
import {Stack, FormControl, FormLabel, TextField,MenuItem,Select,InputLabel,InputAdornment} from '@mui/material';
import ScheduleGrid from "./scheduleGrid";
import DataTable from './overLoadTable'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


export default function App({selectedChip}) {
    const conVertDate = (date) => {
        const dateObject = new Date(date);
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = dateObject.getDate().toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${month}/${day}/${year}`;
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center",  marginTop: "100px" }}>
        <Stack>
          <p style={{ textAlign: "center" }}>F-Hour (non student contact i.e. projects)</p>
          <DataTable selectedChip={selectedChip} />
        </Stack>
        <Stack>
          <p style={{ textAlign: "center" }}>D-Hour Direct Student Counseling</p>
          <FormControl variant="standard">
            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>How many hours? Please specify per week or per semester.</FormLabel>
            <Stack direction={"row"} gap={2}>
              <TextField
                sx={{ width: 150 }}
                id="outlined-basic"
                label="F-Hours"
                variant="outlined"
                value={selectedChip?.dHours}
                type={'number'}
                InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon /> </InputAdornment> }}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Range</InputLabel>
                <Select
                  value={selectedChip?.dHourRange}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Range"
                >
                  <MenuItem value={'Semester'}>Semester</MenuItem>
                  <MenuItem value={'Week'}>Week</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </FormControl>
          <FormControl fullWidth sx={{ mb: "20px" }}>
            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>Please provide the start date and end date for this request.</FormLabel>
            <Stack direction={'row'}>
              <TextField
                id="outlined-basic"
                label="Project Start"
                variant="outlined"
                value={conVertDate(selectedChip?.dateRange)}
              />
              <HorizontalRuleIcon style={{ marginTop: "20px" }} />
              <TextField
                id="outlined-basic"
                label="Project End"
                variant="outlined"
                value={conVertDate(selectedChip?.dateRange2)}
              />
            </Stack>
          </FormControl>
          <ScheduleGrid selectedChip={selectedChip} />
        </Stack>
      </div>
    );
}
