import React, {useState, useEffect} from 'react'
import AppbarA from './AppbarA'
import { Box ,Card, Divider} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query, where, getDoc, doc, setDoc ,Timestamp, addDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { storage } from '../firebase-config';  
import { db } from '../firebase-config';
import Loading from './Loading';
import { UploadFile} from '@mui/icons-material' 
import { uploadBytes,ref,getDownloadURL } from 'firebase/storage';

import {  createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar, Button, Stack, TextField, Typography,Fab ,styled,Modal} from '@mui/material';

import { blue, pink } from '@mui/material/colors'; 
import imga from './imga.png'; 
import imgb from './imgb.png'   

const StyledModal=styled(Modal)({   
    display:"flex",
    alignItems:"center", 
    justifyContent:"center"
  
  })

function AdminAddResult() {
    const { userId } = useParams();
    const [data, setData] = useState([]);
    const [open,setOpen]=useState(false);
    const [open2,setOpen2]=useState(false);
    const [title,setTitle]=useState('');
    const [score,setScore]=useState('');
    const [totalScore,setTotalScore]=useState('');
    const [remarks,setRemarks]=useState('');
    const [subject,setSubject]=useState('');

    let navigate = useNavigate();

   

    const auth = getAuth();
    const user = auth.currentUser;
  
    const userDetails = async () => {
        try {
          const docRef = doc(db, "studentsprofile", `${userId}`);
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
        userDetails();
      }, [userId]);


    const handleClick= async (e) => {
        e.preventDefault();
    
        const ref = collection(db, "results", )
        await addDoc(ref,{
           
            title:title,
            totalScore:totalScore, 
            subject:subject,
            remarks:remarks,
            score:score,
            createdAt:Timestamp.now().toDate(),
            userId:userId,
            
         }).then(() => {
             // Profile updated!
            // alert("Successful...");
            // navigate('/ab4')
            toast.success('Results Submitted Successfully')
            setOpen(false)
           
           
             // ...
           }).catch((error) => {
             // An error occurred
             // ...
             toast.error('Operation failed...try again')
             console.log(error)
            // alert(" An error occurred...try again");
           });
    
    
      setTitle("");
      setTotalScore("");
      setScore("");
      setSubject("");
      setRemarks('')
    
    
    
    
    
      }
     
      
  return (
    <>
    
    <Box>
    {data.length === 0 ? (
      <Loading/>

       ):(
        <>
    <div> <AppbarA/></div>
    <Box sx={{flex:4, backgroundColor:"white" ,marginTop:"6%", height:"99vh" ,width:{md:"98%", xs:"98%", sm:"98%"},marginLeft:{xs:"2%"},marginRight:{xs:"4%"}}}>
   <ToastContainer/>
        <h1>ADD ACADEMICS RECORD TO:</h1>
    <h2>{data.surname} {data.othername}</h2>
   


    <Fab variant='extended'  onClick={e=>setOpen(true)} sx={{width:150,bgcolor:blue[600]}}>
       
       ADD RESULTS
     </Fab>

    
    </Box>
    </>
       )}
    </Box>

     
    
    <div>
    <StyledModal
        open={open}
        onClose={e=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       

        <Box  bgcolor="white" p={3} borderRadius={5} sx={{width:{xs:"90%", md:"50%"}, height:"80%"}}>
          <Stack direction="row" spacing={2}>
          {auth.currentUser?  <Avatar src={data.photo}></Avatar>:<p>no user</p>} 
          {auth.currentUser?<Typography >{data.surname} {data.othername}</Typography>:<p>no user</p>} 
          </Stack>
          <Stack direction="column" marginTop={1}>
            <h3>ADD TEST SCORE TO THIS PORTAL</h3>
            <TextField
          id="standard-basic"
          label="Title Of Test field"
          placeholder="Enter The Title Of The Test..."
          variant="standard"
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:1,marginTop:"10px"}}
        />

   
           <TextField
          id="standard-basic"
          label=" Subject field"
          placeholder="Enter The Subject Of The Test..."
          variant="standard"
          value={subject}
          onChange={(e) => {setSubject(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:1}}
        />
        
        <TextField
          id="standard-basic"
          label=" Total Score field"
          placeholder="Enter The Total Score..."
          variant="standard"
          value={totalScore}
          onChange={(e) => {setTotalScore(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:1,marginTop:"10px"}}
        />
         <TextField
          id="standard-basic"
          label=" Student Score field"
          placeholder="Enter The Student Score..."
          variant="standard"
          value={score}
          onChange={(e) => {setScore(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:1,marginTop:"10px"}}
        />
         <TextField
          id="standard-basic"
          label="Remarks or Notice field"
          placeholder="Enter Notice Or Remarks For This Student..."
          variant="standard"
          value={remarks}
          onChange={(e) => {setRemarks(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:1,marginTop:"10px"}}
        />
        <br></br>
        <Button sx={{marginTop:1,width:"50%",bgcolor:blue,borderRadius:5,marginLeft:"25%"}} variant="contained"  onClick={handleClick}>SUBMIT RESULTS</Button>

          </Stack>
        </Box>
      </StyledModal>
     
    </div>

<div>
<StyledModal
    open={open2}
    onClose={e=>setOpen2(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
   

    <Box width={400} height={400} bgcolor="white" p={3} borderRadius={5} sx={{}}>
      <Stack direction="row" spacing={2}>
      {auth.currentUser?  <Avatar src={imga}></Avatar>:<p>no user</p>} 
      {auth.currentUser?<Typography >{data.surname}</Typography>:<p>no user</p>} 
      </Stack>
      <Stack direction="column" marginTop={1}>
        <p>exams</p>
      </Stack>
    </Box>
  </StyledModal>
 
</div>
    </>
  )
}

export default AdminAddResult
