import React, { useState, useEffect } from 'react'

import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import { collection, onSnapshot, orderBy, query, where, getDoc, doc, setDoc ,Timestamp, addDoc} from 'firebase/firestore';

import Select from 'react-select';

import Box from '@mui/material/Box';
import { ToastContainer,toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


import LinearProgress from '@mui/material/LinearProgress';
import { TextField, Typography,Button, Card, Stack, Avatar ,Divider} from '@mui/material';
import { blue, pink ,grey} from '@mui/material/colors';


import imga from './imga.png';
import imgb from './imgb.png';
import AppbarA from './AppbarA';


//import * as AT from "africastalking" 

function Profileupdate() {

    
    
    const courses = [
        {value: 'General Science', label:'General Science'},
        {value: 'Business', label:'Business'},
        {value: 'Visual Art', label:'Visual Art'},
        {value: 'General Art', label:'General Art'},
        {value: 'Home Economics', label:'Home Economics'},
        {value: 'Agricultural Science', label:'Agricultural Science'},
        {value: 'Technical Science', label:'Technical Science'},
       
       
    ]
 
  const [loading, setLoading] = useState(false);
  const [surname, setSurname] =useState('');
  const [othername, setOthername] =useState('');
  const [course, setCourse] =useState('');

  const handleChange = (selectedOption)=>{setCourse(selectedOption);
    setCourse(selectedOption.value);
  console.log(selectedOption.value)}


  const navigate=useNavigate();

  const auth = getAuth();
  const user = auth.currentUser

  const handleClick= async (e) => {
    e.preventDefault();

    const ref = doc(db, "studentsprofile", `${user.uid}`)
    await setDoc(ref,{
        surname:surname ,
        othername:othername,
        course:course,
        createdAt:Timestamp.now().toDate(),
        userId:user.uid,
       
        
     }).then(() => {
         // Profile updated!
        // alert("Successful...");
        // navigate('/ab4')
        toast.success('Profile updated')
        setTimeout(()=>navigate('/studenthomepage'),2000)
       
       
         // ...
       }).catch((error) => {
         // An error occurred
         // ...
         toast.error('Operation failed...try again')
         console.log(error)
        // alert(" An error occurred...try again");
       });


  setSurname("");
  setOthername("");
  setCourse("");
 





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
         <Typography sx={{marginTop:4,fontSize:25,textAlign:"center"}}>UPDATE PROFILE PAGE</Typography>
        
        <br></br>

        <TextField
          id="standard-basic"
          label="Surname field"
          placeholder="Enter Surnmae..."
          variant="standard"
          value={surname}
          onChange={(e) => {setSurname(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:2,marginTop:"10px"}}
        />

        <TextField
          id="standard-basic"
          label="Other names field"
          placeholder="Enter Other names..."
          variant="standard"
          value={othername}
          onChange={(e) => {setOthername(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:2,marginTop:"10px"}}
        />

        <p style={{marginTop:"10px"}}>Select Your Course</p>
          <Select
          options= {courses}
         
          onChange={handleChange}
          
          />


        <Button sx={{marginTop:5,height:"50px",width:"75%",bgcolor:grey[800],borderRadius:5,marginLeft:"10%", marginTop:"20%"}} variant="contained"  onClick={handleClick}>UPDATE PROFILE</Button>
       
    </Card>
    </Box>

     
     
 
  </Box> 
    </>
  
  )
  
}

export default Profileupdate