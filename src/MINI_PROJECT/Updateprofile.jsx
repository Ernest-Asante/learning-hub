import React, { useState, useEffect } from 'react'

import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import { collection, onSnapshot, orderBy, query, where, getDoc, doc, setDoc ,Timestamp, addDoc} from 'firebase/firestore';
import { storage } from '../firebase-config';

import { uploadBytes,ref,getDownloadURL } from 'firebase/storage';

import Select from 'react-select';

import cabbage from './cabbage.jpeg' 
import logo from './logo.jpeg'
import flyer from './flyer.jpeg'


import { ToastContainer,toast } from 'react-toastify'; 
import { Link } from 'react-router-dom' 
import { useNavigate } from 'react-router-dom';
import {  PostAdd,UploadFile} from '@mui/icons-material' 

import LinearProgress from '@mui/material/LinearProgress';
import { TextField,Toolbar,AppBar, Typography,Button, Card, Stack, Avatar ,Divider, Box} from '@mui/material';
import { blue, pink ,grey} from '@mui/material/colors';




//import * as AT from "africastalking"  

function Updateprofile() {

    
  const levels = [
    {value: 'Level 100', label:'Level 100'},
    {value: 'Level 200', label:'Level 200'},
    {value: 'Level 300', label:'Level 300'},
    {value: 'Level 400', label:'Level 400'},
    {value: 'Level 500', label:'Level 500'},
    {value: 'Level 600', label:'Level 600'},
   
   
]
    
    const programs = [ 
        {value: 'Computer Science', label:'Computer Science'},
        {value: 'Accounting',label:'Accounting'},
        {value: 'Cybersecurity', label:'Cybersecurity'},
        {value: 'Medicine', label:'Medicine'},
        {value: 'Economics', label:'Economics'},
        {value: 'Chemistry', label:'Chemistry'},
        {value: 'Biology', label:'Biology'},
       
       
    ]
 
  const [loading, setLoading] = useState(false);
  const [name, setName] =useState('');
  const [interest, setInterest] =useState([]);
 // const [interest, setInterest] =useState([]);
  const [program, setProgram] =useState('');
  const [level, setLevel] =useState('');
  const [photo, setPhoto] =useState('');


  const handleChange = (selectedOption)=>{setLevel(selectedOption);
    setLevel(selectedOption.value);
  console.log(selectedOption.value)}

  const handleChange2 = (selectedOption)=>{setProgram(selectedOption);
    setProgram(selectedOption.value); 
  console.log(selectedOption.value)} 

  
  //console.log(interest[0].value)
   

  const navigate=useNavigate();

  const auth = getAuth();
  const user = auth.currentUser

  const Create=async(e)=>{
      
    e.preventDefault();
    const auth = getAuth();
    //const user = auth.currentUser;
    
        const storageRef = ref(storage, `profile/${photo.name}`);
        await uploadBytes(storageRef,photo);

      
        // Retrieve the download URL 
        
         getDownloadURL(ref(storageRef))

         .then((url)=>{
          const ref = doc(db, "profile", `${user.uid}`)
           setDoc(ref,{
                name: name,
                level:level,
                program:program,
                photo: url,
                createdAt:Timestamp.now().toDate(),
                userId:user.uid,
              
               
            })

              }).then(() => {
                // Profile updated!
                alert("Successful...");
                navigate('/home')
               
                // ...
              }).catch((error) => {
                // An error occurred
                // ...
                console.log(error)
                alert(" An error occurred...try again");
              }); 
    
      
       setProgram("");
       setPhoto(null);
       setName("");
       setInterest(null);
       setLevel("");
      
      
      
     
    
}
  


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
    
     < Card  sx={{ borderRadius:5, height:"28%",position:"" ,width:"95%",marginTop:10,marginLeft:"2%",marginBottom:"2%"}}>
      <Stack direction="row">
      <Avatar src={logo} sx={{ height:90, width:100,marginTop:3,marginLeft:2}} />
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
    < Card  sx={{ borderRadius:5, height:"60%", width:"95%",marginLeft:"2%"}}>
      <img src={flyer} style={{ height:"100%", width:"100%"}}/>
    </Card>
    
    </Box>
   
    <Box sx={{flex:4, backgroundColor:"white" , height:"99vh" ,width:{md:"30%", xs:"98%", sm:"98%"},marginLeft:{xs:"2%"},marginRight:{xs:"4%"}}}>
      <Card sx={{ borderRadius:5, minHeight:"110%", width:{md:"30%", xs:"97%", sm:"97%"},position:"absolute",marginTop:10}}>
         <ToastContainer/>
         <Typography sx={{marginTop:1,fontSize:20,textAlign:"center"}}>UPDATE PROFILE</Typography>
        
        

        <TextField
          id="standard-basic"
          label="Name field"
          placeholder="Enter your name..."
          variant="standard"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:1,marginTop:"2px"}}
        />

       <p style={{marginTop:"5px"}}>Select Your Program</p>
          <Select 
          options= {programs}
          
          onChange={handleChange2} 
          
          />

        
       <p style={{marginTop:"5px"}}>Select Your Level</p>
          <Select
          options= {levels}
          
          onChange={handleChange} 
           
          /> 

      <Stack direction="row">
        <Button variant="outlined" component="label" sx={{marginTop:1,width:"50%",bgcolor:blue,color:"black"}}>
          <UploadFile/>  PROFILE PIC
          <input type="file" accept="image/*" hidden  onChange={(e) =>{setPhoto(e.target.files[0])}} />
        </Button>

        <Box sx={{marginLeft:4,marginTop:1}}>
        
        {photo && (
            <div>
                <img
                src={URL.createObjectURL(photo)}
                alt="thumb"
                style={{height:75,width:140}}
                />
            </div>
        )}
     
          </Box>
          </Stack>

        
      




        <Button sx={{marginTop:5,height:"50px",width:"80%",bgcolor:blue[800],borderRadius:5,marginLeft:"10%", marginTop:"20%"}} variant="contained"  onClick={Create}>UPDATE PROFILE</Button>
       
    </Card>  
    </Box>  

 
  </Box> 
    </>
  
  )
  
}

export default Updateprofile