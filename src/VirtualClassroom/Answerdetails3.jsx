import React, {useContext,useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ChooseContext } from './ContextA.jsx';
import { collection, onSnapshot,addDoc, orderBy, query, where,orWhere, getDoc, doc, setDoc ,Timestamp} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import Loading from './Loading';
import { ToastContainer,toast } from 'react-toastify';
import { Card, IconButton, Toolbar, AppBar, Typography, Box, Button , Stack, Divider} from '@mui/material';

import { ArrowBackIosNewOutlined } from '@mui/icons-material';

function AnswerDetail3() {
   
  const [data, setData] = useState('') 
 
 

  const { id } = useParams(); 

  
      
    let navigate = useNavigate();  
   
    const handleBack = () => { 
      navigate(-1)  
    }

    const auth = getAuth();

   

    const questions = async () => {
      try {
        const docRef = doc(db, "answers","emaths","emaths" ,`${id}`);
        const docSnaps = await getDoc(docRef)
  
        if (docSnaps.exists()) { 
          setData(docSnaps.data());
          console.log("Document data:", docSnaps.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!"); 
        }
      } catch (error) { console.error('an error') }
     
  
    } 
  
    useEffect(() => {
      questions();
    }, [id]);

    



  return (
    <>
    <Box sx={{ flexGrow: 1, marginBottom:"15px" }}>
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
        
        <Stack direction = "row" >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"black" ,fontWeight:200,fontStyle:'fantasy',marginLeft:1, textAlign:"center"}}>
          {data.title} RESULTS
        </Typography>
      
        </Stack>
      
      </Toolbar> 
    </AppBar> 
  </Box>

  {data?(
  <>

{data.begin?(
    <>
  
 <Box sx={{marginTop:"15%"}}>
  
  </Box>
  
         <Box sx={{marginTop:"10px"}}>  
         <Card sx={{minHeight:"120px", width:"98%", margin:"5px", marginRight:"1%"}}>
             < Typography sx={{marginLeft:"3px", marginTop:"5px"}}><b>Test Name: {data.title}</b></Typography>
            
             <Divider sx={{margin:"10px"}}/>
           
        {data.multiples.length > 0 ? ( <><Typography sx={{textAlign:"center", margin:"2px"}}><b>MULTIPLE CHOICE ANSWERS</b></Typography>
             <ol style={{paddingLeft:"25px", marginLeft:"5px"}}>
        {data.multiples.map((question, index) => (
          <li key={index} style={{marginBottom:"10px", marginLeft:"5px"}}>
            {question.question}
            <br/> 
           
           
          </li>
        ))}  
        </ol>
        </>
        ):(<Typography></Typography>)}

        {
          data.questions.length > 0? (
            <>
            <Divider sx={{margin:"10px"}}/>
            <Typography sx={{textAlign:"center", margin:"12px"}}><b>THEORY ANSWERS </b></Typography>
            <ol style={{paddingLeft:"20px", marginLeft:"5px"}}>
            {data.questions.map((question, index) => (
              <li key={index} style={{marginBottom:"10px",marginLeft:"5px"}}>
                {question.question}
                
               
               
              </li>
            ))} 
            </ol>
            <Divider sx={{margin:"10px"}}/>
            <Typography sx={{textAlign:"center", margin:"12px"}}><b>END OF ANSWERS </b></Typography>
            <Divider sx={{margin:"10px"}}/>
            <Typography sx={{textAlign:"center", margin:"12px"}}><b>EXAMINATION UNIT - EMPIRE OF GRACE COLLEGE </b></Typography>
            </>

          ):(
            <>
          <Divider sx={{margin:"10px"}}/>
          <Typography sx={{textAlign:"center", margin:"12px"}}><b>END OF ANSWERS </b></Typography>
          <Divider sx={{margin:"10px"}}/>
          <Typography sx={{textAlign:"center", margin:"12px"}}><b>EXAMINATION UNIT - EMPIRE OF GRACE COLLEGE </b></Typography>
          </>)
        }

         </Card>
      </Box> 

      </>
      ):(<Typography sx={{textAlign:"center", marginTop:"50%"}}><b>ANSWERS UNAVAILABLE</b></Typography>)}
 
 
    </> 
   
  ):(<Loading/>)}

</>
 
  )
}

export default AnswerDetail3
