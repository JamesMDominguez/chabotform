"use client";
import { Stack,Typography,Card,CardContent,CardActionArea,Chip } from '@mui/material';
import { useState,useEffect } from 'react';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Dialog from './inload/dialogView'
import OverloadDialog from './overload/dialogView'
import InloadForm from './inload/dialogForm'
import OverloadForm from './overload/dialogForm'

export default function Home() {
    const [data, setData] = useState(null);
    const [overloadData, setOverloadData] = useState(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [selectedChip, setSelectedChip] = useState(null);

  
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
                            <Card key={"inload"+index} sx={{  borderColor: "black", borderRadius: "20px" }} variant="outlined">
                                <CardActionArea onClick={()=>{
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
                        )})}
                </Stack>
                <Typography variant="h6" component="div">
                    Previous Over-Load Submissions
                </Typography>
                <Stack direction={"row"} gap={2} mt={2} mb={2}>
                {overloadData && overloadData.map((item, index) => {
                        return (
                            <Card key={"overloadData"+index} sx={{  borderColor: "black", borderRadius: "20px" }} variant="outlined">
                                <CardActionArea onClick={()=>{
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
                        )})}
                </Stack>
                <Dialog selectedChip={selectedChip} handleClose={handleClose} open={open} />
                <OverloadDialog selectedChip={selectedChip} handleClose={handleClose2} open={open2} />
                <InloadForm selectedChip={selectedChip} handleClose={handleClose3} open={open3} getData={getData}/>
                <OverloadForm selectedChip={selectedChip} handleClose={handleClose4} open={open4} getData={getData} />
            </Stack>
        </>
    )
}
