"use client";
import { Stack, Typography, Card, CardContent, CardActionArea, Chip, TextField,Button } from '@mui/material';
import { useState, useEffect } from 'react';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Dialog from './inload/dialogView'
import OverloadDialog from './overload/dialogView'
import InloadForm from './inload/dialogForm'
import OverloadForm from './overload/dialogForm'
import EmergencyCard from './emergencyCard/emergencyDialog'
export default function Home() {
    const [data, setData] = useState(null);
    const [overloadData, setOverloadData] = useState(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [selectedChip, setSelectedChip] = useState(null);
    const [name,setName] = useState('')
    useEffect(() => {
        setName(localStorage.getItem('name'))
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };
    const handleClose4 = () => {
        setOpen4(false);
    };

    const handleClose5 = () => {
        setOpen5(false);
    }

    async function getData() {
        const apiUrl = `${process.env.NEXT_PUBLIC_LINK}/api/counselorPortal`;
        const res = await fetch(apiUrl);
        const jsonData = await res.json();
        setData(jsonData.Schedule);
        setOverloadData(jsonData.OverloadSchedule);
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Stack direction={"row"} justifyContent={'center'} gap={3} mt={4} mb={2} ml={2}>
                <Stack direction={"column"} gap={2} sx={{backgroundColor:"white",padding:"30px",borderRadius:"15px", border:"1px solid lightgray"}}>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile" style={{ borderRadius: "50%", width: "300px" }} />
                    <Typography variant="h4" component="div" textAlign={'center'}>{name}</Typography>
                </Stack>

                <Stack direction={"column"} sx={{backgroundColor:"white",padding:"30px",borderRadius:"15px", border:"1px solid lightgray"}}>
                    <Typography variant="h6" component="div">
                        Schedule Proposal Submission
                    </Typography>
                    <Stack direction={"row"} gap={2} mt={2} mb={2}>
                        <Card sx={{ minWidth: 250, borderColor: "black", borderRadius: "20px" }} variant="outlined">
                            <CardActionArea onClick={() => setOpen3(true)}>
                                <CardContent>
                                    <Stack direction={"row"} gap={2}>
                                        <CalendarMonthIcon sx={{ fontSize: "35px" }} />
                                        <Typography variant="h4" component="div" sx={{ fontWeight: "light" }}>
                                            In-Load Form
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card sx={{ minWidth: 250, borderColor: "black", borderRadius: "20px" }} variant="outlined">
                            <CardActionArea onClick={() => setOpen4(true)} >
                                <CardContent>
                                    <Stack direction={"row"} gap={2}>
                                        <MoreTimeIcon sx={{ fontSize: "35px" }} />
                                        <Typography variant="h4" component="div" sx={{ fontWeight: "light" }}>
                                            Over-Load Form
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Stack>
                    <Typography variant="h6" component="div">
                        Previous In-Load Submissions
                    </Typography>
                    <Stack direction={"row"} gap={2} mt={2} mb={2}>

                        {data && data.map((item, index) => {
                            return (
                                <Card key={"inload" + index} sx={{ borderColor: "black", borderRadius: "20px" }} variant="outlined">
                                    <CardActionArea onClick={() => {
                                        setSelectedChip(item);
                                        setOpen(true)
                                    }}>
                                        <CardContent>
                                            <Typography variant="h4" component="div" sx={{ fontWeight: "light" }}>
                                                {item.semester} {item.year}
                                            </Typography>
                                            <Stack direction={"row"} mt={1} gap={1}>
                                                <Typography variant="h5" color="text.secondary">
                                                    Status:
                                                </Typography>
                                                <Chip label={item.approval} color={item.approval == "Approved" ? "success" : "warning"} />
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })}
                    </Stack>
                    <Typography variant="h6" component="div">
                        Previous Over-Load Submissions
                    </Typography>
                    <Stack direction={"row"} gap={2} mt={2} mb={2}>
                        {overloadData && overloadData.map((item, index) => {
                            return (
                                <Card key={"overloadData" + index} sx={{ borderColor: "black", borderRadius: "20px" }} variant="outlined">
                                    <CardActionArea onClick={() => {
                                        setSelectedChip(item);
                                        setOpen2(true)
                                    }}>
                                        <CardContent>
                                            <Typography variant="h4" component="div" sx={{ fontWeight: "light" }}>
                                                {item.dateCreated}
                                            </Typography>
                                            <Stack direction={"row"} mt={1} gap={1}>
                                                <Typography variant="h5" color="text.secondary">
                                                    Status:
                                                </Typography>
                                                <Chip label={item.approval} color={item.approval == "Approved" ? "success" : "warning"} />
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })}
                    </Stack>
                    {/* <Button variant="outlined" onClick={()=>setOpen5(true)}>
                        Open simple dialog
                    </Button> */}
                    {/* <EmergencyCard open={open5} handleClose={handleClose5} /> */}
                    <Dialog selectedChip={selectedChip} handleClose={handleClose} open={open} />
                    <OverloadDialog selectedChip={selectedChip} handleClose={handleClose2} open={open2} />
                    <InloadForm selectedChip={selectedChip} handleClose={handleClose3} open={open3} getData={getData} />
                    <OverloadForm selectedChip={selectedChip} handleClose={handleClose4} open={open4} getData={getData} />
                </Stack>
            </Stack>
        </>
    )
}
