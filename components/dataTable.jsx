'use client';
import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

export default function DataTable({ selectedChip }) {
  let TotalICA = 0;
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.grey[600],
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Stack direction={'column'} gap={2} sx={{margin:"10px"}}>
      {selectedChip?.ica?.length > 0 && selectedChip?.ica[0].name !=="" && 
      <TableContainer  sx={{ border: '1px solid black',borderRadius:"11px" }}>
        <Table sx={{ width: 500 }} >
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left" sx={{borderTopLeftRadius: '10px'}}>ICA Name	</StyledTableCell>
              <StyledTableCell align="right" sx={{borderTopRightRadius: '10px'}}>D-Hour Total</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {selectedChip?.ica?.map((x, index) => {
              TotalICA += x.dHours;
              const isLastRow = index === selectedChip.ica.length - 1;
              return (
                <StyledTableRow key={x.name}>
                  <StyledTableCell align="left" sx={{ borderBottomLeftRadius: isLastRow ? '10px' : '0' }}>{x.name}</StyledTableCell>
                  <StyledTableCell align="right" sx={{ borderBottomRightRadius: isLastRow ? '10px' : '0' }}>{x.dHours}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      }

      <TableContainer sx={{ border: '1px solid black',borderRadius:"11px" }}>
        <Table sx={{ maxWidth: 500 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left" sx={{borderTopLeftRadius: '10px'}}>Totals	</StyledTableCell>
              <StyledTableCell align="right" sx={{borderTopRightRadius: '10px'}}>Value</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell align="left">Total ICA</StyledTableCell>
              <StyledTableCell align="right">{TotalICA}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left">Direct Counseling Hours</StyledTableCell>
              <StyledTableCell align="right">{selectedChip.schedule?.length / 2}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="left" sx={{borderBottomLeftRadius: '10px'}}>Week Hours</StyledTableCell>
              <StyledTableCell align="right" sx={{borderBottomRightRadius: '10px'}}>{TotalICA + selectedChip.schedule?.length / 2}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}