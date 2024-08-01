import React, { useState, useEffect } from 'react'

import { collection, onSnapshot, orderBy, query, where, getDoc, doc } from 'firebase/firestore';



import Box from '@mui/material/Box';
import { ToastContainer,toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider ,getAuth,signInWithPopup} from 'firebase/auth';
import LinearProgress from '@mui/material/LinearProgress';
import { TextField, Typography,Button, Card, Stack, Avatar ,Divider} from '@mui/material';
import { blue, pink ,grey} from '@mui/material/colors';


import imga from './imga.png';
import imgb from './imgb.png';
import AppbarA from './AppbarA';


//import * as AT from "africastalking" 

function Signup() {
  const [dataa, setDataa] = useState('');
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState('ECG will undertake planned maintenance works to improve service delivery on ([date]) at ([time]). The affected location are([locations]). ECG regrets the inconvenience that will arise out of this exercise.');
  const [location, setLocation] = useState(true);
  const [subscribers, setSubscribers] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  const auth = getAuth();
  const provider= new GoogleAuthProvider();
  const Signup=async()=>{await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      navigate('/transition')
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(result)
    }).catch((error) => {
      // Handle Errors here.
      //const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      // The email of the user's account used.
      //const email = error.customData.email;
      // The AuthCredential type that was used.
     // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

  return(
    <>
     <AppbarA/>
    <Box style={{display:"flex",height:"93vh"}}> 
    <Box sx={{flex:8, backgroundColor:"white", height:"93vh", marginRight:1,display:{xs:"none",md:"block"}}}>
    
     < Card  sx={{ borderRadius:5, height:"25%",position:"" ,width:"95%",marginTop:"4%",marginLeft:"2%",marginBottom:"2%"}}>
      <Stack direction="row">
      <Avatar src={imga} sx={{ height:100, width:100,marginTop:3,marginLeft:2}} />
      <Stack direction="column" sx={{marginLeft:3}}>
      <Stack direction="row">
      <h3>EMPIRE OF GRACE</h3>
     
      </Stack>
       <Typography>MOTTO: ALL WITH GOD THE BEST</Typography>
       <Typography>LOCATION: ACCRA, GHANA</Typography>
       <Typography>CONTACT: 0537437637</Typography>
      </Stack>
      </Stack>
      
    </Card>
    < Card  sx={{ borderRadius:5, height:"62%", width:"95%",marginLeft:"2%"}}>
      <img src={imgb} style={{ height:"100%", width:"100%"}}/>
    </Card>
    
    </Box>
   
    <Box sx={{flex:4, backgroundColor:"white" , height:"99vh" ,width:{md:"30%", xs:"98%", sm:"98%"},marginLeft:{xs:"2%"},marginRight:{xs:"4%"}}}>
      <Card sx={{ borderRadius:5, height:"98%", width:{md:"30%", xs:"97%", sm:"97%"},position:"absolute",marginTop:"2%"}}>
         <ToastContainer/>
         <Typography sx={{marginTop:4,fontSize:30,textAlign:"center"}}>VIRTUAL CLASSROOM</Typography>
        
        <br></br>

        <img src={imga} style={{ height:"40%", width:"100%", marginTop:"10%"}}/>

        <Button sx={{marginTop:5,height:"50px",width:"75%",bgcolor:grey[800],borderRadius:5,marginLeft:"10%", marginTop:"20%"}} variant="contained"  onClick={Signup}>CONTINUE WITH GOOGLE</Button>
       
    </Card>
    </Box>

     
     
 
  </Box>
    </>
  
  )
  
}

export default Signup