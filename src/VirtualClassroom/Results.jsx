
import React, { useState, useEffect }  from 'react'
import BottomNav3 from './BottomNav3'

import { Link, useNavigate, useParams } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query, where, getDoc, doc, setDoc ,Timestamp} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';

import { Avatar, Button, Stack,Divider, TextField, Typography ,Card,Box} from '@mui/material';
import Loading from './Loading';
import AppbarE from './AppBarE';


function Results() {
  const [data, setData] = useState([]);
  const auth = getAuth(); 
  const user = auth.currentUser;
  let navigate = useNavigate();

 
  useEffect(()=>{
    const  postRef=collection(db,"results");
        const b = query(postRef, where("userId", "==", `${user.uid}`),orderBy("createdAt","desc"));
        onSnapshot(b,(snapshot)=>{
            const data=snapshot.docs.map((doc)=>({ 
               id:doc.id, 
               ...doc.data(), 
            }));
          
            setData(data); 
            console.log(data); 
           
        })   
  },[]); 



 
  return (
    <>
    <div>
        <AppbarE/>
      <BottomNav3/>
    </div>
    
      
    <Box>
    { data.length === 0 ? (
      <Loading/>
       ):(
      
     
    <Box sx={{flex:4, backgroundColor:"white" , height:"99vh" ,width:{md:"98%", xs:"98%", sm:"98%"},marginLeft:{xs:"2%"},marginRight:{xs:"4%"},marginTop:{xs:"15%",md:"6%"}}}>
   
    { data && data.map(({userId,title,score,subject,remarks,totalScore,createdAt,id})=>(
    <Card   key={{userId}} sx={{minHeight:"200px", width:"98%", display:"flex", margin:"5px", borderRadius:"15px", marginTop:"20px"}}>
    
     

      <Stack direction="column">
        <Box sx={{marginLeft:"5px"}}>
        <Typography><b>Subject: {subject}</b> </Typography> 
           <Typography><b>Test Title: {title} </b></Typography>
           <Divider sx={{margin:"5px"}}/>
        <Typography sx={{marginTop:"15px" }}><b>You Scored: </b > <b style={{color:"green"}}>{score}</b></Typography>
        <Typography><b>Total Score(Over): </b>{totalScore}</Typography>
        <Typography><b>Percentage: </b>{Math.round(Number(score)/Number(totalScore)*100)}%</Typography>
        </Box>
        <Divider sx={{margin:"5px"}}/>
       <Typography sx={{marginTop:"15px", marginLeft:"5px"}}><b>Remarks: </b>{remarks}</Typography>
       </Stack>

    </Card>
    ))}
  
    </Box>
       )}
    </Box>
    
    </>
  )
}

export default Results