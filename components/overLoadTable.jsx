'use client';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';

export default function DataTable({ selectedChip }) {

    const conVertDate = (date) => {
        const dateObject = new Date(date);
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = dateObject.getDate().toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${month}/${day}/${year}`;
    }

    return (
        <Stack direction={'column'} gap={2} sx={{ margin: "20px",marginTop:"0px" }}>
            {selectedChip?.project?.map((x, index) => {
                const date1 = conVertDate(x.projectDateRange);
                const date2 = conVertDate(x.project2DateRange);

                return (
                    <Stack
                        key={`input-field-box-${index}`}
                        direction={'column'}
                        gap={2}
                    >
                        <h4 style={{ margin: '0' }}>Project {index + 1}</h4>
                        <FormControl variant="standard">
                            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>Please provide a description of the assignment. </FormLabel>
                            <TextField
                                id="outlined-multiline-static"
                                value={x.name}
                                multiline
                                label="Enter your answer"
                            />
                        </FormControl>

                        <FormControl variant="standard">
                            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>Who is funding this project? </FormLabel>
                            <TextField
                                id="outlined-multiline-static"
                                value={x.funding}
                                onChange={(event) => handleInput(index, event, funding, setFunding)}
                                multiline
                                label="Enter your answer"
                            />
                        </FormControl>

                        <FormControl variant="standard">
                            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>If applicable what is the FOAP?</FormLabel>
                            <TextField
                                id="outlined-multiline-static"
                                value={x["FOAP"]}
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
                                    value={x.projectHours}
                                    type={'number'}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon /> </InputAdornment> }}
                                />

                                <FormControl fullWidth>
                                    <InputLabel id="demo-select-small-label">Range</InputLabel>
                                    <Select
                                        value={x.projectRange}
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

                        <FormControl fullWidth>
                            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ mb: "10px" }}>Please provide the start date and end date for this request.</FormLabel>
                            <Stack direction={'row'}>
                                <TextField
                                    id="outlined-basic"
                                    label="Project Start"
                                    variant="outlined"
                                    value={date1}
                                />
                                <HorizontalRuleIcon style={{ marginTop: "20px" }} />
                                <TextField
                                    id="outlined-basic"
                                    label="Project End"
                                    variant="outlined"
                                    value={date2}
                                />
                            </Stack>
                        </FormControl>

                        <FormControl variant="standard">
                            <TextField
                                id="outlined-multiline-static"
                                value={selectedChip.comments}
                                label="Comments"
                                multiline
                                rows={3}
                                fullWidth
                                sx={{ maxWidth: "500px", mt: 2 }}
                            />
                        </FormControl>
                    </Stack>
                );
            })}
        </Stack>
    );
}