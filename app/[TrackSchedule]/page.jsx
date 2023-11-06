import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack } from '@mui/material';


export default function Page({ params }) {
  console.log(params.TrackSchedule)
  return (
    <Stack direction={'column'} alignItems={"center"}>
    <h1 style={{margin:0}}>Thank You!</h1>
    </Stack>
  );
}
