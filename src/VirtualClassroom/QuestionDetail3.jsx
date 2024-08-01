import React, {useContext,useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ChooseContext } from './ContextA.jsx';
import { collection, onSnapshot,addDoc, orderBy, query, where,orWhere, getDoc, doc, setDoc ,Timestamp} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config.jsx';
import Loading from './Loading.jsx';
import { ToastContainer,toast } from 'react-toastify';
import { Card, IconButton, Toolbar, AppBar, Typography, Box, Button , Stack, Divider} from '@mui/material';

import { ArrowBackIosNewOutlined } from '@mui/icons-material';

function QuestionDetail3() {
   
  const [data, setData] = useState('') 
  const [visibilityCount, setVisibilityCount] = useState(0);
   const [data2, setData2] = useState("");


  const { id } = useParams(); 
      
    let navigate = useNavigate();  
   
    const handleBack = () => { 
      navigate(-1)  
    }

    const auth = getAuth();

   

    const questions = async () => {
      try {
        const docRef = doc(db, "questions","emaths","emaths" ,`${id}`);
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

    
    const userdetails = async () => {
      try {
        const docRef = doc(db, "studentsprofile",`${id}`);
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
      userdetails();
    }, [id]);

  //Visibility

  /*useEffect(() => {
    const handleVisibilityChange = () => { 
      if (document.visibilityState === 'hidden') {
         setVisibilityCount(prevCount => prevCount + 1);
        console.log('cheating1'); 
      }
    }; 

    const handleResize = () => {
      // Check if the window size becomes smaller (indicating split-screen view)
      if (window.innerWidth < window.screen.width || window.innerHeight < window.screen.height) {
        setVisibilityCount(prevCount => prevCount + 1);
        console.log('cheating2');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

   
    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);*/

  useEffect(() => {
    const handleVisibilityChange = () => {
      setVisibilityCount(prevCount => {
        const newCount = prevCount + 1;
        updateFirestoreVisibilityCount(newCount); // Update Firestore with the new count
        console.log('cheating');
        return newCount;
      });
    };

    const handleResize = () => {
      if (window.innerWidth < window.screen.width || window.innerHeight < window.screen.height) {
        console.log('cheating');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = listenForRealtimeUpdates();

    return unsubscribe;
  }, []); 

  useEffect(() => {
    updateFirestoreVisibilityCount(visibilityCount); // Update Firestore when the visibility count changes
  }, [visibilityCount]);

  const updateFirestoreVisibilityCount = async (count) => {
    try {
      const user = auth.currentUser; 
      if (user) {
        const userDocRef = doc(db, 'visibilityCounts', user.uid);
        await setDoc(userDocRef, { count ,name:`${data2.surname}`+"" +`${data2.othername}`}); 
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const listenForRealtimeUpdates = () => {
    const user = auth.currentUser;  
    if (user) { 
      const userDocRef = doc(db, 'visibilityCounts', user.uid);
      return onSnapshot(userDocRef, (snapshot) => {
        if (snapshot.exists()) {
          const count = snapshot.data().count;
          setVisibilityCount(count); 
        }
      });
    }
  };


  return (
    <>
    <Box sx={{ flexGrow: 1, marginBottom:"15px" }}>
    <AppBar position="fixed" sx={{bgcolor:"white", marginBottom:8,display:{xs:'block',sm:"block"}}}>
      <ToastContainer/>
      <Toolbar>

      {data.tab?(
      <>
     
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
        </> 
        ):(<Typography>.</Typography>)}
        
        <Stack direction = "row" >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"black" ,fontWeight:200,fontStyle:'fantasy',marginLeft:1, textAlign:"center"}}>
          EXAMROOM
        </Typography>
        <Button variant = "outlined" sx={{width:"180px", height:"30px", marginLeft:"10%", marginTop:"5px"}}>OFFENCE : {- visibilityCount }</Button>
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
             < Typography sx={{marginLeft:"3px", marginTop:"5px"}}><b>Time Limit: {data.time}</b></Typography>
             < Typography sx={{marginLeft:"3px", marginTop:"5px"}}><b>Instruction: {data.instruction}</b></Typography>
           <Divider sx={{margin:"10px"}}/>

        {data.questions.length > 0 ? ( <Typography sx={{textAlign:"center", margin:"2px"}}><b>MULTIPLE CHOICE QUESTIONS</b></Typography>):(<Typography></Typography>)}
             <ol style={{paddingLeft:"25px",marginLeft:"5px",  userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
        {data.questions.map((question, index) => (
          <li key={index} style={{marginBottom:"10px",marginLeft:"5px",  userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
            {question.question}
            <br/> 
           
            <ul>
              {question.choices.map((choice, choiceIndex) => (
                <li key={choiceIndex}>{choice}</li>
               
              ))} 
            </ul> 
          </li>
        ))} 
        </ol>

        {
          data.theory.length > 0? (
            <>
            <Divider sx={{margin:"10px"}}/>
            <Typography sx={{textAlign:"center", margin:"12px"}}><b>THEORY QUESTIONS </b></Typography>
            <ol style={{paddingLeft:"20px",marginLeft:"5px",  userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
            {data.theory.map((question, index) => (
              <li key={index} style={{marginBottom:"10px",marginLeft:"5px",  userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
                {question.question}
                
               
               
              </li>
            ))} 
            </ol>
            <Divider sx={{margin:"10px"}}/>
            <Typography sx={{textAlign:"center", margin:"12px"}}><b>END OF TEST </b></Typography>
            <Divider sx={{margin:"10px"}}/>
            <Typography sx={{textAlign:"center", margin:"12px"}}><b>EXAMINATION UNIT - EMPIRE OF GRACE COLLEGE </b></Typography>
            </>

          ):(
            <>
          <Divider sx={{margin:"10px"}}/>
          <Typography sx={{textAlign:"center", margin:"12px"}}><b>END OF TEST </b></Typography>
          <Divider sx={{margin:"10px"}}/>
          <Typography sx={{textAlign:"center", margin:"12px"}}><b>EXAMINATION UNIT - EMPIRE OF GRACE COLLEGE </b></Typography>
          </>)
        }

         </Card>
      </Box> 

      </>
      ):(<Typography sx={{textAlign:"center", marginTop:"50%"}}><b>TEST UNAVAILABLE</b></Typography>)}
 
 
    </> 
   
  ):(<Loading/>)}

</>
 
  )
}

export default QuestionDetail3
