"use client"
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';

export default function Finished() {
    const [value, setValue] = React.useState(dayjs('2022-04-17'));
    const [value2, setValue2] = React.useState(dayjs('2022-04-17'));

    return (
        <>
            <AppBar position="static" color='transparent'>
                <Toolbar>
                    <img
                        src='https://districtazure.clpccd.org/prmg/files/docs/styles-logos/cc-logo-horizontal-1c.jpg'
                        height={50}
                        alt="Image Description"
                    />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Over-Load Proposed Schedule Full-Time Counselors
                    </Typography>
                </Toolbar>
            </AppBar>
            <Stack mt={5} alignItems="center" direction={"column"}>
                <Stack>
                    <FormControl variant="standard">
                        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>Contact details</FormLabel>
                        <Stack direction={"row"} gap={2}>  
                            <TextField id="filled-basic" label="Counselor Name" variant="outlined" sx={{ mb: "20px" }}
                                InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon /> </InputAdornment> }}
                            />
                            <TextField id="filled-basic" label="Chabot Email" variant="outlined" sx={{ mb: "20px" }}
                                InputProps={{ startAdornment: <InputAdornment position="start"><MailOutlineIcon /> </InputAdornment> }}
                            />
                        </Stack>
                    </FormControl>
                    <FormControl variant="standard">
                        <FormLabel id="demo-controlled-radio-buttons-group">Please select what you are requesting for overload</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="D-Hour" control={<Radio />} label="D-Hour (direct student contact i.e. counseling)" />
                            <FormControlLabel value="F-Hour" control={<Radio />} label="F-Hour (non student contact i.e. projects)" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl variant="standard">
                        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px", mt: "20px" }}>Please provide a description of the assignment. </FormLabel>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            label="Enter your answer"
                        />
                    </FormControl>

                    <FormControl variant="standard">
                        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px", mt: "20px" }}>Please provide the start date and end date for this request. </FormLabel>
                        <Stack direction={'row'}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                        label="Start"
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <HorizontalRuleIcon style={{ marginTop: "20px" }} />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                        label="End"
                                        value={value2}
                                        onChange={(newValue) => setValue2(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Stack>
                    </FormControl>

                    <FormControl variant="standard">
                        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px", mt: "20px" }}>How many hours? Please specify per week or per semester.</FormLabel>
                        <Stack direction={"row"} gap={2}>
                            <TextField
                                sx={{ width: 110 }}
                                size="small"
                                id="outlined-basic"
                                label="Hours"
                                variant="outlined"
                                type={'number'}
                                InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon /> </InputAdornment> }}
                                />

                            <FormControl sx={{ minWidth: 180 }} size="small">
                            <InputLabel id="demo-select-small-label">Range</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Range"
                            >
                                <MenuItem value={10}>Semester</MenuItem>
                                <MenuItem value={20}>Week</MenuItem>
                            </Select>
                            </FormControl>
                        </Stack>
                    </FormControl>
                    <FormControl variant="standard">
                        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ marginTop: "20px" }}>Are you planning to work overload hours for workload banking? </FormLabel>
                        <FormLabel id="demo-controlled-radio-buttons-group">If you answered Yes, additional forms need to be completed </FormLabel>
                        <FormLabel id="demo-controlled-radio-buttons-group">and submitted to Academic Services. </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl variant="standard">
                        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px", mt: "20px" }}>Notes (optional)</FormLabel>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={2}
                            label="Enter your answer"
                        />
                    </FormControl>
                    <Button variant="contained" style={{ marginTop: "20px", marginBottom: "50px" }} endIcon={<SendIcon />}>
                        Send
                    </Button>
                </Stack>
            </Stack>
        </>
    );
}
