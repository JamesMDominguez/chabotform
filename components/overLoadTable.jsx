'use client';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

export default function DataTable({ selectedChip }) {

    const conVertDate = (date) => {
        const dateObject = new Date(date);
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = dateObject.getDate().toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${month}/${day}/${year}`;
    }
    return (
        <Stack direction={'column'} gap={2} sx={{ margin: "20px" }}>
            {selectedChip?.project?.map((x, index) => {
                const date1 = conVertDate(x.projectDateRange); 
                const date2 = conVertDate(x.project2DateRange); 
                
                return (
                        <Stack
                            key={`input-field-box-${index}`}
                            direction={'column'}
                            gap={2}
                            mb={2}
                        >
                            <h1>Project {index+1}</h1>
                            <TextField
                                id="outlined-multiline-static"
                                value={x.name}
                                multiline
                                label="Description"
                            />

                            <TextField
                                id="outlined-multiline-static"
                                value={x.funding}
                                multiline
                                label="Funding"
                            />
                            <TextField
                                id="outlined-multiline-static"
                                value={x["FOAP"]}
                                type={'number'}
                                label="FOAP (optional)"
                            />
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
                                <TextField
                                    sx={{ width: 150 }}
                                    id="outlined-basic"
                                    label="Project Range"
                                    variant="outlined"
                                    value={x.projectRange}
                                    type={'number'}
                                />
                            </Stack>

                                <Stack direction={'row'}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Project Range"
                                        variant="outlined"
                                        value={date1}
                                    />
                                   <HorizontalRuleIcon style={{ marginTop: "20px" }} />
                                   <TextField
                                        id="outlined-basic"
                                        label="Project Range"
                                        variant="outlined"
                                        value={date2}
                                    />
                                </Stack>
                        </Stack>
                );
            })}
        </Stack>
    );
}