import React from 'react'
import AppbarA from './Appbar2'
import BottomNav2 from './BottomNav2'
import { Button, Divider, Stack, Typography, Box,Card } from '@mui/material'
import { blue, pink ,grey} from '@mui/material/colors';
import transport from './transport.jpeg';
import transport2 from './transport2.jpeg';
import transport3 from './transport3.jpeg';


function Page2() {
  return (
    <>
    <AppbarA/>
    <div style={{marginTop:"65px"}}>
    <input placeholder='search town or district' style={{margin:"8px", width:"95%", borderRadius:"25px", height:"40px"}}/>
    <Divider sx={{margin:"8px"}}/>
    <Stack direction="row">
            <Typography sx={{marginTop:"5px", marginLeft:"3px"}}>
               <b>CONTACT DTL FOR EASY TRANSPORT</b> 
            </Typography>
            <Button sx={{height:"30px",width:"20%",bgcolor:blue[600],borderRadius:5,marginLeft:"5%", }} variant="Outlined"  >CONTACT</Button>
         
        </Stack>
        <Divider sx={{margin:"8px"}}/>
        <Typography sx={{marginLeft:"5px"}}>AVAILABLE NEAR YOU</Typography>
        <Divider sx={{margin:"8px"}}/>

        <Box sx={{flex:4, backgroundColor:"white" , height:"50vh" ,width:{md:"98%", xs:"98%", sm:"98%"},marginLeft:{xs:"2%"},marginRight:{xs:"4%"},marginTop:{xs:"5%",md:"6%"}}}>
   
   
        <Card sx={{height:"200px", width:"98%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"1px"}}>
        <Stack direction="row">
         <img src={transport2} alt='transport' style={{width:"49vw", height:"200px"}}/>
         <Stack direction="column">
          <Typography sx={{marginLeft:"5px"}}><b>@ KOFI NTIM</b></Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ TEMA COMM 21</b></Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ KIA TRUCK</b> </Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ CAR NO. :GR 2763</b></Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ TEL: 06534273783</b></Typography>

         </Stack>
        </Stack>
        </Card>
        <Divider sx={{margin:"8px"}}/>

        <Card sx={{height:"200px", width:"98%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"1px"}}>
        <Stack direction="row">
         <img src={transport3} alt='transport' style={{width:"49vw", height:"200px"}}/>
         <Stack direction="column">
          <Typography sx={{marginLeft:"5px"}}><b>@ KOFI NTIM</b></Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ TEMA COMM 21</b></Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ KIA TRUCK</b> </Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ CAR NO. :GR 2763</b></Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ TEL: 06534273783</b></Typography>

         </Stack>
        </Stack>
        </Card>
        <Divider sx={{margin:"8px"}}/>

        <Card sx={{height:"200px", width:"98%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"1px"}}>
        <Stack direction="row">
         <img src={transport} alt='transport' style={{width:"49vw", height:"200px"}}/>
         <Stack direction="column">
          <Typography sx={{marginLeft:"5px"}}><b>@ KOFI NTIM</b></Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ TEMA COMM 21</b></Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ KIA TRUCK</b> </Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ CAR NO. :GR 2763</b></Typography>
          <Typography sx={{marginLeft:"5px"}}><b>@ TEL: 06534273783</b></Typography>

         </Stack>
        </Stack>
        </Card>

        </Box>
       

    </div>
    <BottomNav2/>
    </>
  )
}

export default Page2
