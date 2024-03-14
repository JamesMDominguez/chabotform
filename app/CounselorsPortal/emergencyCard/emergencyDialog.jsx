import React, { useState } from 'react'
import { Typography, Stack, TextField, Dialog, DialogContent, DialogTitle, Button } from '@mui/material'


export default function EmergencyDialog({ open, handleClose,setEmergencyCardSubmited }) {
    const [birthdate, setBirthdate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [medicalConditions, setMedicalConditions] = useState("");
    const [allergies, setAllergies] = useState("");
    const [Relationship1, setRelationship1] = useState("");
    const [Relationship2, setRelationship2] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");
    const [emergencyContact1Name, setEmergencyContact1Name] = useState("");
    const [emergencyContact1PhoneNumber, setEmergencyContact1PhoneNumber] = useState("");
    const [emergencyContact2Name, setEmergencyContact2Name] = useState("");
    const [emergencyContact2PhoneNumber, setEmergencyContact2PhoneNumber] = useState("");

    const handleSubmit = async () => {
        const res = await fetch('/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                birthdate,
                phoneNumber,
                street,
                city,
                zipcode,
                medicalConditions,
                allergies,
                Relationship1,
                Relationship2,
                additionalInformation,
                emergencyContact1Name,
                emergencyContact1PhoneNumber,
                emergencyContact2Name,
                emergencyContact2PhoneNumber,
                emergencyCardSubmited: true
            })
        })
        if (res.status === 200){
            handleClose()
            setEmergencyCardSubmited(true)
        }
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'md'}>
            <DialogTitle id="alert-dialog-title">
                {"Emergency Contact Information"}
            </DialogTitle>
            <DialogContent>
                <Stack fullWidth direction={"row"} justifyContent={'center'} gap={2} mt={2} mb={2}>
                    <Stack gap={2} width={"45%"}>
                        <TextField label="Birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                        <TextField label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        <TextField label="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
                        <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} />
                        <TextField label="Zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                    </Stack>
                    <Stack gap={2} width={"45%"}>
                        <TextField label="Medical conditions" value={medicalConditions} onChange={(e) => setMedicalConditions(e.target.value)} />
                        <TextField label="Allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
                        <TextField label="Additional Information" multiline rows={7.3} value={additionalInformation} onChange={(e) => setAdditionalInformation(e.target.value)} />
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent={'center'} gap={2} mt={2} mb={2}>
                    <Stack width={"45%"} gap={2}>
                        <Typography variant="h7" component="div">
                            Emergency Contact #1
                        </Typography>
                        <TextField label="Name" value={emergencyContact1Name} onChange={(e) => setEmergencyContact1Name(e.target.value)} />
                        <TextField label="Phone Number" value={emergencyContact1PhoneNumber} onChange={(e) => setEmergencyContact1PhoneNumber(e.target.value)} />
                        <TextField label="Relationship" value={Relationship1} onChange={(e) => setRelationship1(e.target.value)} />
                    </Stack>
                    <Stack width={"45%"} gap={2}>
                        <Typography variant="h7" component="div">
                            Emergency Contact #2
                        </Typography>
                        <TextField label="Name" value={emergencyContact2Name} onChange={(e) => setEmergencyContact2Name(e.target.value)} />
                        <TextField label="Phone Number" value={emergencyContact2PhoneNumber} onChange={(e) => setEmergencyContact2PhoneNumber(e.target.value)} />
                        <TextField label="Relationship" value={Relationship2} onChange={(e) => setRelationship2(e.target.value)} />
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent={'flex-end'} gap={2} mt={2} mb={2} mr={4}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                </Stack>            
            </DialogContent>
        </Dialog>
    )
}