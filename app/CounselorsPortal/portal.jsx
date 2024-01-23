"use client";
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useState,useEffect } from 'react';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/navigation'
import Dialog from './dialog'
import OverloadDialog from './overloadDialog'

export default function Home() {
    const router = useRouter()
    const [data, setData] = useState(null);
    const [overloadData, setOverloadData] = useState(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [selectedChip, setSelectedChip] = useState(null);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClickOpen2 = () => {
      setOpen2(true);
    };
  
    const handleClose2 = () => {
      setOpen2(false);
    };

    async function getData() {
        const apiUrl = `${process.env.NEXT_PUBLIC_LINK}/api/counselorPortal`;
        const res = await fetch(apiUrl);
        const jsonData = await res.json();
        console.log(jsonData, "jsonData")
        setData(jsonData.Schedule);
        setOverloadData(jsonData.OverloadSchedule);
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Stack mt={5} ml={5} direction={"column"}>
                <Typography variant="h6" component="div">
                    Schedule Proposal Submission
                </Typography>
                <Stack direction={"row"} gap={2} mt={2} mb={2}>
                    <Card sx={{ minWidth: 250, borderColor: "black", borderRadius: "20px" }} variant="outlined">
                        <CardActionArea onClick={() => router.push('/')}>
                            <CardContent>
                                <Stack direction={"row"} gap={2}>
                                    <CalendarMonthIcon sx={{ fontSize: "35px" }} />
                                    <Typography variant="h4" component="div" sx={{ fontWeight: "light" }}>
                                        In-Load From
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ minWidth: 250, borderColor: "black", borderRadius: "20px" }} variant="outlined">
                        <CardActionArea onClick={() => router.push('/overload')} >
                            <CardContent>
                                <Stack direction={"row"} gap={2}>
                                    <MoreTimeIcon sx={{ fontSize: "35px" }} />
                                    <Typography variant="h4" component="div" sx={{ fontWeight: "light" }}>
                                        Over-Load From
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
                            <Card sx={{  borderColor: "black", borderRadius: "20px" }} variant="outlined">
                                <CardActionArea onClick={()=>{
                                    setSelectedChip(item);
                                    handleClickOpen();
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
                        )})}
                </Stack>
                <Typography variant="h6" component="div">
                    Previous Over-Load Submissions
                </Typography>
                <Stack direction={"row"} gap={2} mt={2} mb={2}>
                {overloadData && overloadData.map((item, index) => {
                        return (
                            <Card sx={{  borderColor: "black", borderRadius: "20px" }} variant="outlined">
                                <CardActionArea onClick={()=>{
                                    setSelectedChip(item);
                                    handleClickOpen2();
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
                        )})}
                </Stack>
                <Dialog selectedChip={selectedChip} handleClose={handleClose} open={open} />
                <OverloadDialog selectedChip={selectedChip} handleClose={handleClose2} open={open2} />
            </Stack>
        </>
    )
}
