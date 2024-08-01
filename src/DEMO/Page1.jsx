import React from 'react'
import AppbarA from './Appbar1'
import BottomNav1 from './BottomNav1'
import { Button, Divider, Stack, Typography,Card, Box } from '@mui/material'
import { blue, pink ,grey} from '@mui/material/colors';
import tomatoes from './tomatoes.jpeg';
import tomatoes2 from './tomatoes2.jpeg';
import egg from './egg.jpeg';
import egg2 from './egg2.jpeg';
import cabbage from './cabbage.jpeg';
import cabbage2 from './cabbage2.jpeg';

function Page1() {
  return (
    <>
    <AppbarA/>
    <div style={{marginTop:"65px"}}>

    <input placeholder='search for commodity' style={{margin:"8px", width:"95%", borderRadius:"25px", height:"40px"}}/>
    <Divider sx={{margin:"8px"}}/>
        <Stack direction="row">
            <Typography sx={{marginTop:"5px", marginLeft:"3px"}}>
               <b>JOIN GHANA COMMODITY EXCHANGE</b> 
            </Typography>
            <Button sx={{height:"30px",width:"18%",bgcolor:blue[600],borderRadius:5,marginLeft:"5%", }} variant="Outlined"  >JOIN</Button>
         
        </Stack>
        <Divider sx={{margin:"8px"}}/>

        <Stack direction='row' margin="3px">
       <Button sx={{height:"30px",width:"35%",bgcolor:blue[600],borderRadius:5,marginLeft:"1%", }} variant="Outlined"  >FAST DEALS</Button>
       <Button sx={{height:"30px",width:"20%",color:blue[800],borderRadius:5 ,marginLeft:"1%",}} variant="outlined"  >CROPS</Button>
       <Button sx={{height:"30px",width:"25%",color:blue[800],borderRadius:5 ,marginLeft:"1%",}} variant="outlined"  >ANIMALS</Button>
       <Button sx={{height:"30px",width:"30%",color:blue[800],borderRadius:5,marginLeft:"1%", }} variant="outlined"  >PRODUCTS</Button>
       </Stack>
       <Divider sx={{margin:"8px"}}/>

       <Box sx={{flex:4, backgroundColor:"white" , height:"99vh" ,width:{md:"98%", xs:"98%", sm:"98%"},marginLeft:{xs:"2%"},marginRight:{xs:"4%"},marginTop:{xs:"5%",md:"6%"}}}>
   
   
    <Card sx={{minHeight:"300px", width:"98%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"5px"}}>
    
      <Stack direction="column"> 
        <img src={tomatoes2} alt='tomatoes' style={{width:"98vw", height:"180px"}}/>
        <Stack direction="row" sx={{marginTop:"8px"}}>
        <img src={tomatoes} alt='tomatoes' style={{width:"50px", height:"50px", borderRadius:"50px", marginLeft:"5px"}}/>
        <Typography sx={{marginLeft:"8px", marginTop:"10px", fontSize:"25px"}}>Tiger Organic Farms</Typography>
        </Stack>
        <Typography sx={{fontSize:"18px", marginLeft:"8px",}}>We have several boxes of organic tomatoes ready for sales. Contact us at 05432284893 for affordable prices.</Typography>
        <Stack direction="row" sx={{marginTop:"8px", alignItems:"center"}}>
          <Typography sx={{fontSize:"20px", marginLeft:"8px",}}>PRICE: 200GH PER BOX</Typography>
          <Button sx={{height:"35px",width:"30%",bgcolor:blue[600],borderRadius:5,marginLeft:"7%", marginBottom:"10px", fontSize:"20px"}} variant="Outlined"  >DETAILS</Button>
        </Stack>

      </Stack>

    </Card>
   
  
   


    <Divider sx={{margin:"8px"}}/> 

   

    <Card sx={{minHeight:"300px", width:"98%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"5px"}}>

    <Stack direction="column">
    <img src={egg2} alt='tomatoes' style={{width:"98vw", height:"180px"}}/>
    <Stack direction="row" sx={{marginTop:"8px"}}>
    <img src={egg} alt='tomatoes' style={{width:"50px", height:"50px", borderRadius:"50px", marginLeft:"5px"}}/>
    <Typography sx={{marginLeft:"8px", marginTop:"10px", fontSize:"25px"}}>Reinfield Egg Farm</Typography>
    </Stack>
    <Typography sx={{fontSize:"18px", marginLeft:"8px",}}>We have several crates of eggs ready for sales. Contact us at 05432284893 for affordable prices. We are located at Ofankor in Greater Accra Region.</Typography>
    <Stack direction="row" sx={{marginTop:"8px", alignItems:"center"}}>
    <Typography sx={{fontSize:"20px", marginLeft:"8px",}}>PRICE: 30GH PER CRATE</Typography>
    <Button sx={{height:"35px",width:"30%",bgcolor:blue[600],borderRadius:5,marginLeft:"7%", marginBottom:"10px", fontSize:"20px"}} variant="Outlined"  >DETAILS</Button>
    </Stack>

    </Stack>

    </Card>


   </Box>


    </div>
    <BottomNav1/>
    </>
  )
}

export default Page1