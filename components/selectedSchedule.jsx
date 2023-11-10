
import Stack from '@mui/material/Stack';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SendIcon from '@mui/icons-material/Send';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';

const timeRange = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"]
const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]

export default function SelectedSchedule({ selecteChip }) {

    const [loading, setLoading] = useState(false);
    let TotalICA = 0
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    function grayOutBox(day, index) {
        if (index < 2) return true;
        if (day == "Mon" && index > 17) return true;
        if (day == "Wed" && index > 9 && index < 14) return true;
        if (day == "Thurs" && index > 17) return true;
        if (day == "Fri" && index > 17) return true;
        return false;
      }

      const getDailyHours = (day) => {
        let num = 0
        selecteChip?.schedule?.forEach((time) => {
          if (time.day == day) {
            num++
          }
        })
        return num / 2
      }
      const findDayTime = (Dates,Breaks, Day, Time) => {
        let x = Dates?.map((date) => {
          if (date.day == Day && date.time == Time) {
            return (date.option)
          } else {
            return ""
          }
        }).join('')
        if(x == ""){
          let val = Breaks?.map((date) => {
              if (date.day == Day && date.time == Time) {
                return ("Break")
              } else {
                return ""
              }
            }).join('')
          return val
      }
        return (x)
      }

      const handleApprove = async () => {
        setLoading(true)

        const res = await fetch(process.env.NEXT_PUBLIC_ADMIN, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({approval:"Approved",id:selecteChip._id}),
          });
          if(res.ok){
            setLoading(false)
            setOpen(false)
          }
      }

    return (<>
    <h3>{selecteChip.name+" "+selecteChip.year+" "+selecteChip.semester}</h3>

    <Stack direction={"row"}>
        <Stack sx={{ width: 80 }}>
            <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin", borderTopLeftRadius: '10px' }}>
              <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>Time</p>
            </div>
            <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
              <p style={{ fontSize: "13px", textAlign: "center", margin: 0 }}>Daily Hours</p>
            </div>
            {timeRange.map((i) => {
            return (
            <div key={"Weekly" + i} style={{ borderBottomLeftRadius: i == '7:00pm' ? '10px' : 0, color: '#5d5e5e', fontSize: "14px", borderStyle: "solid", borderWidth: "thin", textAlign: "center", height: '1.3rem' }} >
                <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>{i}</p>
            </div>
            )})}
        </Stack>

        <Stack direction={"row"}>
            {days.map((day) => {
                return (
                <Stack key={"yourDay" + day} sx={{ maxWidth: 150 }}>
                    <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin", borderTopRightRadius: day == 'Fri' ? '10px' : 0 }}>
                        <p style={{ margin: "0", fontSize: "15px", textAlign: "center" }} >{day}</p>
                    </div>
                    <div style={{ borderStyle: "solid", height: '1.4rem', borderWidth: "thin" }}>
                        <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }} >{getDailyHours(day)}</p>
                    </div>
                {timeRange.map((i, index) => {
                return (
                    <div key={"timerange" + index} style={{ borderStyle: "solid", borderWidth: "thin", borderBottomRightRadius: i == '7:00pm' && day == 'Fri' ? '10px' : 0, maxWidth: 90, width: 80, height: '1.3rem', color: '#5d5e5e', backgroundColor: grayOutBox(day, index) ? '#c3c4c7' : '' }}>
                        <p style={{ margin: "0", fontSize: "14px", textAlign: "center" }}>{findDayTime(selecteChip?.schedule, selecteChip?.breaks, day, i)}</p>
                    </div>)})}
                </Stack>)})}
            </Stack>
        </Stack>


            <table style={{height:50,marginTop:"10px"}}>
                <thead >
                  <tr>
                    <th>CAH Name</th>
                    <th>D-Hour</th>
                  </tr>
                  </thead>
                  <tbody>
                  {selecteChip?.ica.map((x)=>{
                    TotalICA += x.dHours
                    return(<tr key={'tableRow'+x.name+x.dHours}>
                      <th>{x.name}</th>
                      <th>{x.dHours}</th>
                    </tr>)
                  })}
                   <tr>
                    <th>Total</th>
                    <th>{TotalICA}</th>
                  </tr>
                </tbody>
            </table>

            <table style={{height:50,marginTop:"10px"}}>
                <thead>
                  <tr>
                    <th>D-Hours</th>
                    <th>{selecteChip.schedule.length/2}</th>
                  </tr>
                  <tr>
                    <th>Week Hours</th>
                    <th>{TotalICA + selecteChip.schedule.length/2}</th>
                  </tr>
                </thead>
            </table>

            <p style={{ margin: 0 }}><b>Comments</b></p>
            <Chip label={selecteChip?.comments} />

            <Stack direction={"row"} justifyContent="start" spacing={4} sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={handleClickOpen}>Approve</Button>
                  <Button color="error" variant="contained" >Resubmission</Button>
                  <Button color="warning" variant="contained">Pending</Button>
            </Stack>

        <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Approval confirmation</DialogTitle>
        <DialogContent sx={{minWidth:"400px"}}>
          <TextField
            autoFocus
            multiline
            margin="dense"
            rows={3}
            id="name"
            label="Comments"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

        <LoadingButton
          sx={{width:'50%'}}
          variant="contained" fullWidth onClick={handleApprove}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
        >
          <span>Send</span>
        </LoadingButton>
        </DialogActions>
      </Dialog>

    </>)
}