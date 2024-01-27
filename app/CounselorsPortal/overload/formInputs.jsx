'use client';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Schedule from '../../../components/overloadSchedule';
import dayjs from 'dayjs';

const timeRange = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"]
const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]

export default function Home({handleClose,getData}) {

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // Months are zero-based
    let yyyy = today.getFullYear();
    let formattedToday = dd + '/' + mm + '/' + yyyy;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    formattedToday = mm + '/' + dd + '/' + yyyy;

    const [projectDescription, setDescription] = useState(['']);
    const [funding, setFunding] = useState(['']);
    const [projectHours, setProjectHours] = useState(['']);
    const [projectRange, setProjectRange] = useState(['']);
    const [FOAP, setFOAP] = useState(['']);
    const [projectDateRange, setProjectDateRange] = useState([dayjs(formattedToday)]);
    const [project2DateRange, setProject2DateRange] = useState([dayjs(formattedToday)]);

    const [comments, setComments] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dateRange, setValue] = useState(dayjs(formattedToday));
    const [dateRange2, setValue2] = useState(dayjs(formattedToday));
    const [dHourRange, setDHourRange] = useState('');
    const [dHours, setDHours] = useState('');
    const [checked, setChecked] = useState(false);

    const addInputField = () => {
        setDescription([...projectDescription, '']);
        setFunding([...funding, '']);
        setProjectHours([...projectHours, '']);
        setProjectRange([...projectRange, '']);
        setFOAP([...FOAP, '']);
        setProjectDateRange([...projectDateRange, dayjs(formattedToday)]);
        setProject2DateRange([...project2DateRange, dayjs(formattedToday)]);
    };

    const updateData = (day, time, value) => {
        let updated = true;
        let myData = data.map((date) => {
            if (date.day == day && date.time == time) {
                updated = false
                if (value == "" || value == "Break") {
                    return null
                }
                return { ...date, option: value };
            }
            return date;
        })
        const filteredArray = myData.filter((item) => item !== null);

        setData(filteredArray)
        return updated
    }

    const handleTimeSelect = (e) => {
        let myData = [...data]
        let [day, time] = e.target.name.split('_');

        if (updateData(day, time, e.target.value) && e.target.value != "") {
            myData.push({
                day: day,
                time: time,
                option: e.target.value
            });
            setData(myData)
        }
    }

    const getDailyHours = (day) => {
        let num = 0
        data.forEach((time) => {
            if (time.day == day) {
                num++
            }
        })
        return num / 2
    }

    const removeInputField = () => {
        const newProjectDescription = [...projectDescription];
        const newFunding = [...funding];
        const newProjectHours = [...projectHours];
        const newProjectRange = [...projectRange];
        const newFOAP = [...FOAP];
        const newProjectDateRange = [...projectDateRange];
        const newProject2DateRange = [...project2DateRange];

        newProjectDescription.pop();
        newFunding.pop();
        newProjectHours.pop();
        newProjectRange.pop();
        newFOAP.pop();
        newProjectDateRange.pop();
        newProject2DateRange.pop();

        setDescription(newProjectDescription);
        setFunding(newFunding);
        setProjectHours(newProjectHours);
        setProjectRange(newProjectRange);
        setFOAP(newFOAP);
        setProjectDateRange(newProjectDateRange);
        setProject2DateRange(newProject2DateRange);
    };

    const handleInput = (index, event, variable, setState) => {
        const newInputValues = [...variable];
        newInputValues[index] = event.target.value;
        setState(newInputValues);
    };

    const handleDateInput = (index, event, variable, setState) => {
        const newInputValues = [...variable];
        newInputValues[index] = event;
        setState(newInputValues);
    };

    const handleSubmitForm = async (val) => {
        console.log(val,checked)
        if (!checked) {
            alert("Please confirm that overtime hours do not conflict or overlap with inload hours and any adjustments to approved overload schedule requires prior approval.");
            return;
        }

        if (val.schedule.length === 0 && val.name === "" && val.funding === "" && val.projectHours === "" && val.projectRange === "" && val.dHours === "" && val.dHourRange === "" && val.dHourRange === "" && val.dHours === "") {
            alert("Please fill out at least one section");
            return;
        }

        if (val.project[0].name !== "" || val.project[0].funding !== "" || val.project[0].projectHours !== "" || val.project[0].projectRange !== "" || val.data.length > 0 || val.dHours !== "" || val.dHourRange !== "") {
            for (let i = 0; i < val.project.length; i++) {
                const project = val.project[i];
                if (val.dHourRange === "" || val.dHours === "") {
                    alert("Please fill out all fields for D-Hours");
                    return;
                }
                if (
                    project.name === "" ||
                    project.funding === "" ||
                    project.projectHours === "" ||
                    project.projectRange === ""
                ) {
                    alert("Please fill out all fields");
                    return;
                }
            }
        }

        setLoading(true)
        const apiUrl = `${process.env.NEXT_PUBLIC_LINK}/api/overloadSchedule`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(val),
        });

        if (response.ok) {
            handleClose()
            getData()
        }
        else {
            console.log('Request failed');
        }
    };

    return (
        <>
            <Stack direction={"row"} gap={2} flexWrap="wrap" justifyContent="center" alignItems="center" mt={10}>
                <div>
                    <p style={{ textAlign: "center" }}>F-Hour (non student contact i.e. projects)</p>
                    {projectDescription.map((value, index) => (
                        <Stack
                            key={`input-field-box-${index}`}
                            direction={'column'}
                            gap={2}
                            mb={2}
                        >

                            <FormControl variant="standard">
                                <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>Please provide a description of the assignment. </FormLabel>
                                <TextField
                                    id="outlined-multiline-static"
                                    value={projectDescription[index]}
                                    onChange={(event) => handleInput(index, event, projectDescription, setDescription)}
                                    multiline
                                    rows={5}
                                    label="Enter your answer"
                                />
                            </FormControl>

                            <FormControl variant="standard">
                                <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>Who is funding this project? </FormLabel>
                                <TextField
                                    id="outlined-multiline-static"
                                    value={funding[index]}
                                    onChange={(event) => handleInput(index, event, funding, setFunding)}
                                    multiline
                                    label="Enter your answer"
                                />
                            </FormControl>
                            <FormControl variant="standard">
                                <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>If applicable what is the FOAP?</FormLabel>
                                <TextField
                                    id="outlined-multiline-static"
                                    value={FOAP[index]}
                                    onChange={(event) => handleInput(index, event, FOAP, setFOAP)}
                                    type={'number'}
                                    label="Enter your answer"
                                />
                            </FormControl>
                            <FormControl variant="standard">
                                <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>How many hours? Please specify per week or per semester.</FormLabel>
                                <Stack direction={"row"} gap={2}>
                                    <TextField
                                        sx={{ width: 150 }}
                                        id="outlined-basic"
                                        label="F-Hours"
                                        variant="outlined"
                                        value={projectHours[index]}
                                        onChange={(event) => handleInput(index, event, projectHours, setProjectHours)}
                                        type={'number'}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon /> </InputAdornment> }}
                                    />

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-select-small-label">Range</InputLabel>
                                        <Select
                                            value={projectRange[index]}
                                            onChange={(event) => handleInput(index, event, projectRange, setProjectRange)}
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

                            <FormControl variant="standard">
                                <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>Please provide the start date and end date for this request. </FormLabel>
                                <Stack direction={'row'}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            <DatePicker
                                                label="Start"
                                                value={projectDateRange[index]}
                                                onChange={(event) => handleDateInput(index, event, projectDateRange, setProjectDateRange)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <HorizontalRuleIcon style={{ marginTop: "20px" }} />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            <DatePicker
                                                label="End"
                                                value={project2DateRange[index]}
                                                onChange={(event) => handleDateInput(index, event, project2DateRange, setProject2DateRange)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Stack>
                            </FormControl>
                        </Stack>
                    ))}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} >
                        <Button variant="contained" size='small' onClick={addInputField}>Add Input</Button>
                        <Button variant="contained" size='small' color="error" onClick={removeInputField} disabled={projectDescription.length === 1}>Remove Input</Button>
                    </Stack>
                    <TextField
                        id="outlined-multiline-static"
                        value={comments}
                        label="Comments"
                        multiline
                        rows={3}
                        fullWidth
                        sx={{ maxWidth: "500px", mt: 2 }}
                        onChange={(e) => setComments(e.target.value)}
                    />
                </div>
                <div>
                    <p style={{ textAlign: "center" }}>D-Hour Direct Student Counseling</p>
                    <Stack direction={"column"} >
                        <FormControl variant="standard">
                            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>Please specify per week or per semester.</FormLabel>
                            <Stack direction={"row"} gap={2}>
                                <TextField
                                    sx={{ width: 150 }}
                                    id="outlined-basic"
                                    label="D-Hours"
                                    variant="outlined"
                                    type={'number'}
                                    value={dHours}
                                    onChange={(event) => setDHours(event.target.value)}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon /> </InputAdornment> }}
                                />
                                <FormControl fullWidth >
                                    <InputLabel id="demo-select-small-label">Range</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={dHourRange}
                                        onChange={(e) => setDHourRange(e.target.value)}
                                        label="Range"
                                    >
                                        <MenuItem value={'Semester'}>Semester</MenuItem>
                                        <MenuItem value={'Week'}>Week</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </FormControl>

                        <FormControl variant="standard" sx={{ mb: "20px", mt: "20px" }}>
                            <FormLabel id="demo-controlled-radio-buttons-group">Please provide the start date and end date for this request. </FormLabel>
                            <Stack direction={'row'}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            label="Start"
                                            value={dateRange}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <HorizontalRuleIcon style={{ marginTop: "20px" }} />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            label="End"
                                            value={dateRange2}
                                            onChange={(newValue) => setValue2(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Stack>
                        </FormControl>
                    </Stack>
                    <Schedule days={days} getDailyHours={getDailyHours} timeRange={timeRange} handleTimeSelect={handleTimeSelect} />
                </div>
                <div>
            <FormControlLabel
                sx={{ mt: 2 }}
                control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} />}
                label={<>Click Here to confirm that overtime hours do not conflict or overlap with inload hours
                    <br />and any adjustments to approved overload schedule requires prior approval.</>} />
            <LoadingButton
                variant="contained" sx={{ mt: 2, mb: 3}} fullWidth onClick={() => {
                    const project = projectDescription.map((descriptionValue, i) => {
                        return { name: descriptionValue, funding: funding[i], projectHours: projectHours[i], projectRange: projectRange[i], FOAP: FOAP[i], projectDateRange: projectDateRange[i], project2DateRange: project2DateRange[i] }
                    })
                    let mySchedule = {
                        project: project,
                        dHours: dHours,
                        dHourRange: dHourRange,
                        dateRange: dateRange,
                        dateRange2: dateRange2,
                        schedule: data,
                        comments: comments,
                        approval: "Pending"
                    }
                    handleSubmitForm(mySchedule)
                }}
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
            >
                <span>Submit</span>
            </LoadingButton>
                </div>
            </Stack>
            
        </>
    )
}


