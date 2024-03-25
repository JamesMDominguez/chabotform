import React from 'react';
import DataTable from './dataTable'
import ScheduleGrid from './scheduleGrid'
import Stack from '@mui/material/Stack';

export default function Inload({selectedChip,getDailyHours}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row',justifyContent:"center",marginTop:"100px" }}>
        <DataTable selectedChip={selectedChip} />
        <Stack>
          <p style={{ textAlign: "center" }}>Proposed Weekly Schedule</p>
          <ScheduleGrid selectedChip={selectedChip} getDailyHours={getDailyHours}/>
        </Stack>
      </div>
    )
}