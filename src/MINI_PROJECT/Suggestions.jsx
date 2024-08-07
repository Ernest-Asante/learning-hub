import React from 'react'
import { useEffect,useState } from 'react';
import { Box, Card, Stack, Typography,Avatar,Button,Chip ,IconButton, Divider} from '@mui/material'
import { blue, grey } from '@mui/material/colors';
import cabbage from './cabbage.jpeg'

import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import { collection, onSnapshot, orderBy, query, where, getDoc, doc, setDoc ,Timestamp, addDoc} from 'firebase/firestore';
import Followers from './Followers';

function Suggestions() {

  
  const [data,setData]=useState([])
  const [loading,setLoading]= useState(true)
  const [searchTerm,setSearchTerm]=useState('');
 
  const auth = getAuth(); 
  const user = auth.currentUser; 

  
 /* useEffect(()=>{
    const  postRef=collection(db,"Offers");
        const q= query(postRef,where("postId","==", auth.currentUser&&auth.currentUser.uid,) ,orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const posts=snapshot.docs.map((doc)=>({
               id:doc.id,
               ...doc.data(),
            }));
            setPosts(posts); 
            console.log(posts); 
        })
  },[]); */
 
  
useEffect(()=>{
  const  postRef=collection(db,"forum"); 
      const b = query(postRef,orderBy("createdAt","desc"));
      onSnapshot(b,(snapshot)=>{
          const data=snapshot.docs.map((doc)=>({
             id:doc.id,
             ...doc.data(), 
          }))
          .filter((data) => !data.followers.includes(user.uid)); 
          setData(data); 
          console.log(data); 
      })  
},[]);  

  return (
 
         <>
         <Box sx={{width:"98%"}}>
         <input placeholder="search for forums..." style={{width:"98%", height:"25px", marginTop:"5px", borderRadius:"20px", backgroundColor:"white"}}  onChange={event =>{setSearchTerm(event.target.value)}}/>

        <Divider sx={{width:1,marginTop:2, marginBottom:1}}/>
      <Typography>SUGGESTED FORUMS </Typography>
      
      {data.length===0?(<p>Loading ...</p>):(data &&  data.filter((data)=>{
            if(searchTerm===""){  
              return data
            }else if(data.name.toLowerCase().includes(searchTerm.toLowerCase())||data.description.toLowerCase().includes(searchTerm.toLowerCase())||data.category.toLowerCase().includes(searchTerm.toLowerCase())){
              return data 
            }  
          }).map(({userId,name, category, description, photo, id, followers})=>(   
        

     <>
      <Card key={{id}} sx={{minHeight:"70px", width:"98%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"5px"}}>
    
      <Stack direction="column"> 
      <Stack direction="row" sx={{marginTop:"8px", alignItems:"center"}}>
          <img src={photo} alt='tomatoes' style={{width:"30px", height:"30px", borderRadius:"100px", marginLeft:"5px"}}/>
          <Typography sx={{fontSize:"15px", marginLeft:"8px",}}>{name}</Typography>  
      </Stack> 
      
        <Typography sx={{fontSize:"10px", marginLeft:"8px",marginTop:"2px"}}>{description} </Typography>
        <Stack direction="row" sx={{marginTop:"2px", alignItems:"center", justifyContent:"space-between"}}>
          <Typography sx={{fontSize:"11px", marginLeft:"8px",}}>{category} </Typography>
         {/* <Button sx={{height:"18px",width:"30px",color:blue[600],borderRadius:5,marginLeft:"7%", marginBottom:"10px", fontSize:"10px", marginTop:"4px",marginRight: "5px"}} variant="outlined"  >JOIN</Button> */}
          { user?(<Followers postId={id} followers={ followers}/>):(<p></p>)}
        </Stack> 

      </Stack>

    </Card>
    <Divider sx={{width:1,marginTop:1, marginBottom:1}}/> 
    </>

  )))}
       
    </Box>
       
  
      </>
   
  )
}

export default Suggestions
