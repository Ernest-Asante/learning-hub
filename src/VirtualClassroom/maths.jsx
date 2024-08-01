import React,{useState, useEffect} from 'react'
import { ToastContainer,toast } from 'react-toastify';
import { Button,Card, IconButton, Toolbar, AppBar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';
import Loading from './Loading';

import { collection, onSnapshot,addDoc, orderBy, query, where,orWhere, getDoc, doc, setDoc ,Timestamp} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';


function Maths() {

  const [data, setData] = useState('')

    let navigate = useNavigate();
   
    const handleBack = () => {
      navigate(-1)
    }

      
    useEffect(()=>{ 
      const  postRef=collection(db,"questions", "cmaths" ,"cmaths");
          const b = query(postRef, orderBy("createdAt","desc"));

          onSnapshot(b,(snapshot)=>{
              const data=snapshot.docs.map((doc)=>({ 
                 id:doc.id,   
                 ...doc.data(), 
              }));

              console.log("Fetched Data:", data); 
             
              setData(data);   
              console.log(data); 
             
          }) 
    },[]);  

  return (
    <>
    
    <Box sx={{ flexGrow: 1, marginBottom:"5px" }}>
      <AppBar position="fixed" sx={{bgcolor:"white", marginBottom:8,display:{xs:'block',sm:"block"}}}>
        <ToastContainer/>
        <Toolbar>
       
        <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu" 
            sx={{  }}
            onClick={handleBack}
          >
           
            <ArrowBackIosNewOutlined sx={{color:"black",marginLeft:0}}/>
          </IconButton>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"black" ,fontWeight:200,fontStyle:'fantasy',marginLeft:1}}>
            CORE MATHEMATICS TESTS
          </Typography>
        
        </Toolbar>
      </AppBar>
    </Box>

    {data?(
    <>
   
   <Box sx={{marginTop:"15%"}}>
    <Typography variant="h6">SELECT THE TEST...</Typography>
    </Box>
    

     { data && data.map(({ time,id,begin,createdAt, title})=>( 
           <Box sx={{marginTop:"10px"}}> 
           <Card  onClick={()=> navigate(`/cmathsquestions/${id}`)}  key={{id}} sx={{minHeight:"120px", width:"98%", margin:"5px", marginRight:"1%"}}>
               < Typography sx={{marginLeft:"3px", marginTop:"5px"}}><b>Test Title: {title}</b></Typography>
               < Typography sx={{marginLeft:"3px", marginTop:"5px"}}><b>Time Limit: {time}</b></Typography>
               {begin?( < Typography sx={{marginLeft:"3px", marginTop:"5px"}}><b>Test Availability: Available </b></Typography>)
              :( < Typography sx={{marginLeft:"3px", marginTop:"5px"}}><b>Test Availability: Unavailable </b></Typography>)}
              
              
           </Card>
        </Box>
     ))}
      </>  
     
    ):(<Loading/>)}
   
   
    </>
  )
}

export default Maths