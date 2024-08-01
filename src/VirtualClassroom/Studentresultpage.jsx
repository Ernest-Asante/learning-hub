
import React, { useState, useEffect } from 'react'
import AppbarA from './AppbarA'
import { Box ,Card,Button, Avatar, Typography, Stack,} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query, where, getDocs, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import Loading from './Loading';
import { blue, pink } from '@mui/material/colors'; 
import imga from './imga.png';

function Studentresult() {
    const [data, setData] = useState([]);

    let navigate = useNavigate();

   

    const auth = getAuth(); 
    const user = auth.currentUser;
  
      
 
  
      

      useEffect(()=>{
        const  postRef=collection(db,"studentsprofile");
            const b = query(postRef,orderBy("createdAt","desc"));
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
    
    <Box>
    {data.length === 0 ? (
      <Loading/>
       ):(
       
     
        <>
    <div> <AppbarA/></div>
    <Box sx={{flex:4, backgroundColor:"white" , height:"99vh" ,width:{md:"98%", xs:"98%", sm:"98%"},marginLeft:{xs:"2%"},marginRight:{xs:"4%"}}}>
    <Card sx={{ borderRadius:5, minHeight:"85%", width:{md:"97%", xs:"97%", sm:"97%"},position:"absolute",marginTop:"3%"}}>
        <h1>{data.surname}</h1>
    { data && data.map(({userId,surname,othername,course})=>(
    <Card  onClick={()=> navigate(`/adminaddresult/${userId}`)} key={{userId}} sx={{height:"50px", width:"98%", display:"flex", margin:"5px", borderRadius:"15px"}}>
    
      <Stack direction="row">
         <Avatar src={imga} sx={{height:"45px", width:"45px"}}></Avatar>
         <Stack direction="column" sx={{marginLeft:"7px"}}>
           <Typography>{surname} {othername}</Typography>
           <Typography>{course} </Typography>
         </Stack>
      </Stack>

    </Card>
    ))}
    </Card>
    </Box>
    
    </>

       )}
    </Box>
  )
}

export default Studentresult