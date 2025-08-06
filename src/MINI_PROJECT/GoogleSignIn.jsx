import React, { useState, useEffect } from 'react'

import { collection, onSnapshot, orderBy, query, where, getDoc, doc } from 'firebase/firestore';

import logo from './logo.jpeg'
import flyer from './flyer.jpeg'

import Box from '@mui/material/Box';
import { ToastContainer,toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'; 

import { GoogleAuthProvider ,getAuth,signInWithPopup} from 'firebase/auth';
import LinearProgress from '@mui/material/LinearProgress';
import { TextField,Toolbar,AppBar, Typography,Button, Card, Stack, Avatar ,Divider} from '@mui/material';
import { blue, pink ,grey} from '@mui/material/colors';


//import imga from './imga.png'; 
//import imgb from './imgb.png'; 
//import AppbarA from './AppbarA';   


//import * as AT from "africastalking" 

function GoogleSignIn() {
  const [dataa, setDataa] = useState('');
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState('ECG will undertake planned maintenance works to improve service delivery on ([date]) at ([time]). The affected location are([locations]). ECG regrets the inconvenience that will arise out of this exercise.');
  const [location, setLocation] = useState(true);
  const [subscribers, setSubscribers] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  const auth = getAuth();
  const provider= new GoogleAuthProvider();
  const Signup = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in:', result.user);

    // Navigate after successful sign-in
    navigate('/transitioning');

    // Optional: log the full result
    console.log(result);
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      console.log('Popup was closed before completing sign-in.');
    } else {
      console.error('Sign-in error:', error.message);
    }
  }
};
  return(
    <>
       <AppBar position="fixed" sx={{bgcolor:"white", marginBottom:8,display:{xs:'block',sm:"block"}}}>
        <ToastContainer/>
        <Toolbar>
       
         <img alt="holly" src={logo} style={{height:30,width:30,marginLeft:8}}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"black" ,fontWeight:200,fontStyle:'fantasy',marginLeft:1}}>
            LEARNING HUB
          </Typography>
        
        </Toolbar>
      </AppBar>
    <Box style={{display:"flex",height:"93vh"}}> 
    <Box sx={{flex:8, backgroundColor:"white", height:"93vh", marginRight:1,display:{xs:"none",md:"block"}}}>
    
     < Card  sx={{ borderRadius:5, height:"27%",position:"" ,width:"95%",marginTop:10,marginLeft:"2%",marginBottom:"2%"}}>
      <Stack direction="row">
      <Avatar src={logo} sx={{ height:90, width:100,marginTop:3,marginLeft:2}} />
      <Stack direction="column" sx={{marginLeft:3}}>
      <Stack direction="row">
      <h3>COLLABORATIVE LEARNING ENVIRONMENT</h3>
     
      </Stack>
       <Typography>JOIN A FORUM OF INTEREST</Typography> 
       <Typography>SHARE YOUR THOUGHTS AND PROBLEMS</Typography>
       <Typography>ENJOY THE NEW WAY OF LEARNING</Typography>
      </Stack>
      </Stack>
      
    </Card>
    < Card  sx={{ borderRadius:5, height:"60%", width:"95%",marginLeft:"2%"}}>
      <img src={flyer} style={{ height:"100%", width:"100%"}}/>
    </Card>
    
    </Box>
   
    <Box sx={{flex:4, backgroundColor:"white" , height:"99vh" ,width:{md:"30%", xs:"98%", sm:"98%"},marginLeft:{xs:"2%"},marginRight:{xs:"4%"}}}>
      <Card sx={{ borderRadius:5, height:"82%", width:{md:"30%", xs:"97%", sm:"97%"},position:"absolute",marginTop:10}}>
         <ToastContainer/>
         <Typography sx={{marginTop:4,fontSize:30,textAlign:"center"}}>LEARNING HUB</Typography>
        
        <br></br>

        <img src={flyer} style={{ height:"30%", width:"100%", marginTop:"2%"}}/> 

        <Button sx={{marginTop:5,height:"50px",width:"80%",bgcolor:blue[800],borderRadius:4,marginLeft:"10%", marginTop:"20%"}} variant="contained"  onClick={Signup}>CONTINUE WITH GOOGLE</Button>
       
    </Card>
    </Box>

     
     
 
  </Box>
    </>
  
  )
  
}

export default GoogleSignIn
