
import React from 'react'
import { useEffect,useState } from 'react';
import { Box, Card, Stack, Typography,Avatar,Button,Chip ,IconButton, Divider} from '@mui/material'
import { blue, grey } from '@mui/material/colors';
import cabbage from './cabbage.jpeg'
import { useNavigate } from 'react-router-dom';

import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import { collection, onSnapshot, orderBy, query, where, getDoc, doc, setDoc ,Timestamp, addDoc} from 'firebase/firestore';

function Forum() {

  const [data,setData]=useState([])
  const [loading,setLoading]= useState(true) 

  let navigate = useNavigate();

 
  const auth = getAuth(); 
  const user = auth.currentUser; 

  useEffect(()=>{
    const  postRef=collection(db,"forum"); 
        const q= query(postRef,where("followers", "array-contains", user.uid) ,orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const posts=snapshot.docs.map((doc)=>({
               id:doc.id,
               ...doc.data(),
            }));
            setData(posts); 
            console.log(data); 
        })
  },[]);


  return (
 
         
  
      <>
      <Box sx={{width: "98%"}}>  

      { data && data.map(({ id,createdAt, name, category, photo})=>( 

  <Card key={{id}} onClick={()=> navigate(`/forumdetails/${id}`)} sx={{minHeight:"55px", width:"98%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"15px", marginRight:"5px"}}>
  
  <Stack direction="column">  
  <Stack direction="row" sx={{marginTop:"8px", alignItems:"center"}}>
      <img src={photo} alt='tomatoes' style={{width:"30px", height:"30px", borderRadius:"100px", marginLeft:"5px"}}/>
      <Stack direction="column"> 
      <Typography sx={{fontSize:"15px", marginLeft:"8px",}}>{name}</Typography> 
      <Typography sx={{fontSize:"12px", marginLeft:"8px",}}>{category}</Typography> 
      </Stack>
  </Stack> 

  </Stack> 

</Card>
 ))} 



 
   
  
   </Box>
   

  </>
   
  )
}

export default Forum
