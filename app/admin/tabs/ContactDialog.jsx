import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import React from 'react';
import { Stack, TextField, DialogContent } from '@mui/material'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
Transition.displayName = "Transition";

export default function ContactDialog({open, handleClose,selectedChip}) {

return(<Dialog
    fullScreen
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
  >
    <AppBar sx={{ position: 'relative',backgroundColor:"gray" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Contact Details
        </Typography>
      </Toolbar>
    </AppBar>
    <DialogContent>
                <Stack fullWidth direction={"row"} justifyContent={'center'} gap={2} mt={2} mb={2}>
                    <Stack gap={2} width={"45%"}>
                        <TextField label="Name" value={selectedChip?.name} />
                        <TextField label="Birthdate" value={selectedChip?.birthdate} />
                        <TextField label="Phone Number" value={selectedChip?.phoneNumber} />
                        <TextField label="Street" value={selectedChip?.street} />
                        <TextField label="City" value={selectedChip?.city} />
                        <TextField label="Zipcode" value={selectedChip?.zipcode} />
                    </Stack>
                    <Stack gap={2} width={"45%"}>
                        <TextField label="Email" value={selectedChip?.email} />
                        <TextField label="Medical conditions" value={selectedChip?.medicalConditions}  />
                        <TextField label="Allergies" value={selectedChip?.allergies} />
                        <TextField label="Additional Information" multiline rows={7.3} value={selectedChip?.additionalInformation} />
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent={'center'} gap={2} mt={2} mb={2}>
                    <Stack width={"45%"} gap={2}>
                        <Typography variant="h7" component="div">
                            Emergency Contact #1
                        </Typography>
                        <TextField label="Name" value={selectedChip?.emergencyContact1Name} />
                        <TextField label="Phone Number" value={selectedChip?.emergencyContact1PhoneNumber} />
                        <TextField label="Relationship" value={selectedChip?.Relationship1}/>
                    </Stack>
                    <Stack width={"45%"} gap={2}>
                        <Typography variant="h7" component="div">
                            Emergency Contact #2
                        </Typography>
                        <TextField label="Name" value={selectedChip?.emergencyContact2Name} />
                        <TextField label="Phone Number" value={selectedChip?.emergencyContact2PhoneNumber} />
                        <TextField label="Relationship" value={selectedChip?.Relationship2}/>
                    </Stack>
                </Stack>       
            </DialogContent>
  </Dialog>)
}

    