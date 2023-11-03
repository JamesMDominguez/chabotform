import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack } from '@mui/material';
export default function Finished() {

  return (
    <Stack direction={'column'} alignItems={"center"}>
    <CheckCircleIcon sx={{fontSize:"400px",color:"green"}}/>
    <h1 style={{margin:0}}>Thank You!</h1>
    <p style={{margin:0}}>Form Submited. A copy of your proposed schedule will be sent to your Chabot Email.</p>
    </Stack>
  );
}
