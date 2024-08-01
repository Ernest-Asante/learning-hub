import React from 'react'
import { useEffect,useState } from 'react';
import { Box, Card, Stack, Typography,Avatar,Button,Chip ,IconButton, Divider} from '@mui/material'
import { blue, grey } from '@mui/material/colors';
import cabbage from './cabbage.jpeg'

import { useNavigate } from 'react-router-dom';

import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import { collection, onSnapshot, orderBy, query, where, getDoc, doc, setDoc ,Timestamp, addDoc} from 'firebase/firestore';

function Left() {

  const [data,setData]=useState([])
  const [data2,setData2]=useState([])
  const [loading,setLoading]= useState(true) 

  let navigate = useNavigate();

  
  const handleProfile = () =>{
    navigate('/myprofile')
  }

 
  const auth = getAuth(); 
  const user = auth.currentUser; 


  const userDetails = async () => {
    try {
      const docRef = doc(db, "profile", `${user.uid}`);
      const docSnaps = await getDoc(docRef)

      if (docSnaps.exists()) {
        setData2(docSnaps.data());
        console.log("Document data:", docSnaps.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) { console.error('an error') }
    

  }

  useEffect(() => {
    userDetails();
  }, [user.uid]);

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
            setLoading(false)
        })
  },[]);

  if(loading){
    <div><p>Loading...</p></div>
  }

 
  return ( 
    <>
  <Box bgcolor={grey[50]}  flex={3} p={3} top={10} sx={{display:{xs:"none",sm:"block"},width:{xs:'100%',sm:"25%"}}}>
      
   
      
  <Card sx={{minHeight:"100px", width:"100%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"5px"}}>
    
    <Stack direction="column"> 
    <Stack direction="row" sx={{marginTop:"8px", alignItems:"center"}}>
        <img src={data2.photo} alt='tomatoes' style={{width:"30px", height:"30px", borderRadius:"100px", marginLeft:"5px"}}/>
        <Stack direction="column"> 
        <Typography sx={{fontSize:"15px", marginLeft:"8px",}}>{data2.name}</Typography> 
        <Typography sx={{fontSize:"12px", marginLeft:"8px",}}>{data2.program}</Typography> 
        </Stack>
    </Stack> 
    <Button sx={{height:"28px",width:"200px",bgcolor:blue[500],borderRadius:5,marginLeft:"7%", marginBottom:"10px", fontSize:"10px", marginTop:"5px",marginRight: "5px", marginTop: 1}} variant="contained" onClick={handleProfile} >VIEW PROFILE </Button>
    
    
    </Stack>

  </Card>
  <Divider sx={{width:1,marginTop:1, marginBottom:1}}/>

<Typography>MY FORUMS</Typography>

 
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

export default Left
