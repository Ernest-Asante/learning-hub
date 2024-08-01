import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';

import imga from './imga.png';
import { blue, pink } from '@mui/material/colors'; 
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



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
       
         <img alt="holly" src={imga} style={{height:30,width:30,marginLeft:8}}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"black" ,fontWeight:200,fontStyle:'fantasy',marginLeft:1}}>
            TRANSPORT & LOGISTICS
          </Typography>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}