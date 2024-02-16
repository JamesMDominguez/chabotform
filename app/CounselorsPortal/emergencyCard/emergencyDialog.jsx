import React from 'react'
import { Typography, Stack, TextField, Dialog, DialogContent, DialogTitle } from '@mui/material'


export default function EmergencyDialog({ open, handleClose }) {

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'md'}>
            <DialogTitle id="alert-dialog-title">
                {"Emergency Contact Information"}
            </DialogTitle>
            <DialogContent>
                <Stack fullWidth direction={"row"} gap={2} mt={2} mb={2}>
                    <div>
                    <TextField label="W-Number" value="W-1234456" />
                    <TextField label="Birthdate" value="01/01/1990" />
                    <TextField label="Cell #" value="123-456-7890" />
                    <TextField label="Address" value="1234 Main St. San Antonio, TX 78201" />
                        <Typography variant="h7" component="div">
                            Contact #1
                        </Typography>
                        <Stack direction={"row"} gap={2}>
                            <TextField size="small" label="Name" value="Jane Doe" />
                            <TextField size="small" label="Phone Number" value="123-456-7890" />
                        </Stack>
                        <Typography variant="h7" component="div">
                            Contact #2
                        </Typography>
                        <Stack direction={"row"} gap={2}>
                            <TextField size="small" label="Name" value="Jane Doe" />
                            <TextField size="small" label="Phone Number" value="123-456-7890" />
                        </Stack>
                        <Stack direction={"row"} gap={2}>
                            <TextField size="small" label="Medical Insurance" value="Yes" />
                            <TextField size="small" label="Policy #" value="1234567890" />
                        </Stack>
                        <Stack direction={"row"} gap={2}>
                            <TextField size="small" label="Primary Care Physician" value="Dr. Smith, 123-456-7890" />
                            <TextField size="small" label="Preferred Hospital" value="Methodist Hospital" />
                        </Stack>
                    </div>
                    <div>
                        <TextField size="small" label="Medical conditions" value="None" />
                        <TextField size="small" label="Allergies" value="None" />
                        <TextField size="small" label="Family/Household" value="Jane Doe, John Doe, 2 kids, 1 dog" />
                        <TextField size="small" label="Additional Information" value="None" />
                    </div>
                </Stack>
            </DialogContent>
        </Dialog>)
}