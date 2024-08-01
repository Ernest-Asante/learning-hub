import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Stack } from '@mui/material';
import { ArrowBackIosNewOutlined, Person} from '@mui/icons-material';

//import imga from './imga.png';
import { blue, pink } from '@mui/material/colors'; 
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom'; 
import Createpost from './Createpost'; 

import logo from './logo.jpeg'
import flyer from './flyer.jpeg'



export default function AppbarA() { 
  
    const navigate =useNavigate();

    const handleClick = () =>{
        navigate('/adminlogin')
    }
 
  return (
    <Box sx={{ flexGrow: 1, marginBottom:5.5 }}> 
      <AppBar position="fixed" sx={{bgcolor:"white", marginBottom:8,display:{xs:'block',sm:"block"}}}>
        <ToastContainer/> 
        <Toolbar> 
       
       

         <Stack direction="row" spacing={1}  marginTop={0} justifyContent="space-between">
         <img alt="holly" src={logo} style={{height:30,width:30,marginLeft:1}}/>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color:"black" ,fontWeight:200,fontStyle:'fantasy',marginLeft:1}}>
            LEARNING HUB 
          </Typography>  
          
         
        <Box sx={{width:{xs:50, sm:250, md:550}}}></Box>
         {/*  <Button sx={{height:"30px",width:100,marginLeft:100,color:blue[800],borderRadius:5 ,display: { xs: "block", sm: "block" }}} variant="outlined"   >AI TUTOR</Button> */}
         <Createpost/>
          </Stack> 
      
       
        
        </Toolbar>  
       
      </AppBar>  
    </Box>
  );
}