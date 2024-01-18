import { Chip,Stack } from '@mui/material';

export default function Contacts({allUsers}:any) {

    return (
        <>
        <h4>Counselors</h4>
        <Stack gap={2} direction={"row"} flexWrap="wrap">
          {allUsers.map((person:any, index:any) => (
            <Chip sx={{ maxWidth: '300px' }} key={person.email + index} label={person.name} />
          ))}
        </Stack>
      </>
    )
}