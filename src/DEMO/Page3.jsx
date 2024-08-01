import React from 'react'
import AppbarA from './Appbar3'
import BottomNav3 from './BottomNav3'
import { Button, Divider, Stack, Typography ,Box, Card} from '@mui/material'
import { blue, pink ,grey} from '@mui/material/colors';
import tool1 from './tool1.jpeg';
import tool2 from './tool2.jpeg';
import tool3 from './tool3.jpeg';

function Page3() {
  return (
    <>
    <AppbarA/>
    <div style={{marginTop:"65px"}}>
    <Stack direction="row">
            <Typography sx={{marginTop:"5px", marginLeft:"3px"}}>
               <b>SEEK VERTINERY OR EXPECT ADVICE</b> 
            </Typography>
            <Button sx={{height:"30px",width:"18%",bgcolor:blue[600],borderRadius:5,marginLeft:"5%", }} variant="Outlined"  >JOIN</Button>
         
        </Stack>
        <Divider sx={{margin:"8px"}}/>


       <Stack direction='row' margin="3px">
       <Button sx={{height:"30px",width:"38%",bgcolor:blue[600],borderRadius:5,marginLeft:"1%", }} variant="Outlined"  >FARM TOOLS</Button>
       <Button sx={{height:"30px",width:"20%",color:blue[800],borderRadius:5 ,marginLeft:"1%",}} variant="outlined"  >JOBS</Button>
       <Button sx={{height:"30px",width:"30%",color:blue[800],borderRadius:5 ,marginLeft:"1%",}} variant="outlined"  >TRAINING</Button>
       <Button sx={{height:"30px",width:"25%",color:blue[800],borderRadius:5,marginLeft:"1%", }} variant="outlined"  >FARMLAND</Button>
       </Stack>
       <Divider sx={{margin:"8px"}}/>
       <Typography sx={{marginLeft:"5px"}}>BUY - GOING FOR COOL PRICES</Typography>
        <Divider sx={{margin:"8px"}}/>

        <Box sx={{flex:4, backgroundColor:"white" , height:"50vh" ,width:{md:"98%", xs:"98%", sm:"98%"},marginLeft:{xs:"2%"},marginRight:{xs:"4%"},marginTop:{xs:"5%",md:"6%"}}}>
   
   
        <Card sx={{height:"200px", width:"98%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"1px"}}>
        <Stack direction="row">
        <img src={tool1} alt='transport' style={{width:"49vw", height:"200px"}}/>
        <Stack direction="column">
        <Typography sx={{marginLeft:"5px"}}><b>@ KOFI CAR RENTAL</b></Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ TEMA COMM 21</b></Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ COMBINE HARVESTER</b> </Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ CAR NO. :GR 2763</b></Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ TEL: 0534273783</b></Typography>

        </Stack>
        </Stack>
        </Card>
        <Divider sx={{margin:"8px"}}/>

        <Card sx={{height:"200px", width:"98%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"1px"}}>
        <Stack direction="row">
        <img src={tool2} alt='transport' style={{width:"49vw", height:"200px"}}/>
        <Stack direction="column">
        <Typography sx={{marginLeft:"5px"}}><b>@ BENSON LIMITED</b></Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ ACCRA NEW TOWN</b></Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ COCOA HARVESTER</b> </Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ PRICE: 120GH</b></Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ TEL: 0544273783</b></Typography>

        </Stack>
        </Stack>
        </Card>
        <Divider sx={{margin:"8px"}}/>

        <Card sx={{height:"200px", width:"98%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"1px"}}>
        <Stack direction="row">
        <img src={tool3} alt='transport' style={{width:"49vw", height:"200px"}}/>
        <Stack direction="column">
        <Typography sx={{marginLeft:"5px"}}><b>@ DADDY B AGRO</b></Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ KEJETIA, KUMASI</b></Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ KNAPSACK SPRAYER</b> </Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ PRICE:450GH</b></Typography>
        <Typography sx={{marginLeft:"5px"}}><b>@ TEL: 0534273783</b></Typography>

        </Stack>
        </Stack>
        </Card>
        <Divider sx={{margin:"8px"}}/>
        </Box>



    </div>
    <BottomNav3/>
    </>
  )
}

export default Page3