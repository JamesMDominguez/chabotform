import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack } from '@mui/material';
export default function Finished() {

  return (
    <Stack direction={'column'} alignItems={"center"}>
    <CheckCircleIcon sx={{fontSize:"400px",color:"green"}}/>
    <h1 style={{margin:0}}>Thank You!</h1>
    <p style={{margin:0}}>Form Submited.</p>
    </Stack>
  );
}
