import React, {useContext,useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
//import { ChooseContext } from './ContextA.jsx';
import { collection, onSnapshot,addDoc, orderBy, query, where,orWhere, getDoc, doc, setDoc ,Timestamp} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config.jsx';
import { storage } from '../firebase-config';

import { uploadBytes,ref,getDownloadURL } from 'firebase/storage';
import { blue, grey } from '@mui/material/colors';
import { Box, Card, Stack, Typography,styled,TextField, Modal,Avatar,Button,Chip ,IconButton, Divider} from '@mui/material'
import cabbage from './cabbage.jpeg'
import { BeenhereOutlined, BookOutlined, CommentOutlined, HomeWorkOutlined, LibraryBooksOutlined, QuizOutlined } from '@mui/icons-material';

const StyledModal=styled(Modal)({   
  display:"flex",
  alignItems:"center",
  justifyContent:"center"

})

function Home() {

  const [data, setData] = useState('') 
  const [open2,setOpen2]=useState(false); 
  const [myComment, setMyComment] = useState('') 



  const auth = getAuth();
      
  const user = auth.currentUser; 
  
  const handleClickD = () => {
    setOpen2(true)
  }

  useEffect(()=>{
    const  postRef=collection(db,"post"); 
        const q= query(postRef,orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const posts=snapshot.docs.map((doc)=>({
               id:doc.id,
               ...doc.data(),
            }));
            setData(posts); 
            console.log(data); 
        })
  },[]);

  const handleAlert = () =>{
    alert("comment submited")
    setOpen2(false)
  }

  return (
    <>

    <div> 
    <StyledModal
        open={open2}
        onClose={e=>setOpen2(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
      >
        <Box width={300} minHeight={200} bgcolor="white" p={3} borderRadius={5} sx={{}}>
         <Typography>POST A COMMENT</Typography>
          <Stack direction="column" marginTop={1}>
          <TextField
          id="standard-basic" 
          label="Comment field"
          placeholder="Enter a comment..."
          variant="standard"
          value={myComment}
          onChange={(e) => {setMyComment(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:1,marginTop:"2px"}}
        />

       

     

        
     
     
          <Button sx={{marginTop:5}} variant="contained" color="primary" onClick={handleAlert}>POST COMMENT</Button>
          </Stack>
        </Box>
      </StyledModal>
    </div> 

 
         <Box bgcolor={grey[50]} flex={6}  sx={{display:{xs:"block",sm:"block"}, padding:{xs:0, sm:1, md:3}, width:{sm:'100%',xs:'100%',md:"45%"}, marginTop:{xs:60, sm:"15px"}}}>

{ data && data.map(({ id,createdAt, title, body, photo, userId, userName, forumName, userImage, forumImage })=>( 
    <>
       
  <Card key={{id}} sx={{minHeight:"100px", width:"98%", display:"flex", margin:"1px", borderRadius:"15px", marginTop:"8px"}}>
    
    <Stack direction="column"> 
    <Stack direction="row" sx={{marginTop:"8px", alignItems:"center"}}>
        <img src={forumImage} alt='tomatoes' style={{width:"30px", height:"30px", borderRadius:"100px", marginLeft:"5px"}}/>
        <Stack direction="column" sx={{marginTop:"2px", alignItems:"center", justifyContent:"space-between"}}>
        <Typography sx={{fontSize:"15px", marginLeft:"8px",}}>{forumName}</Typography> 
       
        </Stack>
    </Stack> 
     <Typography sx={{fontSize:"12px", margin:"6px"}}>{title}</Typography>  
     <img src={photo} alt='tomatoes' style={{width:"98%", height:"200px", borderRadius:"10px", marginLeft:"5px"}}/>
    <Typography sx={{fontSize:"12px", marginLeft:"8px",marginTop:"4px"}}>{body} </Typography>
    
      
      
      
      <Divider sx={{width:1,marginTop:1}}/>
      <Stack direction="row" sx={{marginTop:"2px", alignItems:"center", justifyContent:"space-around"}}>

        <Typography sx={{fontSize:"11px", marginLeft:0, paddingBottom:1}}>[ <img src={userImage} alt='tomatoes' style={{width:"12px", height:"12px", borderRadius:"100px", marginLeft:"1px", marginTop:"9px"}}/> {userName} ]</Typography>
        <Button sx={{height:"20px",marginRight:0,width:"100px",bgcolor:blue[100],color:blue[800], borderRadius:5,marginLeft:"7%", marginBottom:"10px", fontSize:"10px", marginTop:"4px",marginRight: "5px"}} variant="Outlined" onClick={handleClickD} ><CommentOutlined sx={{height:15, color: blue}}/>COMMENT</Button>
       
      </Stack> 

    </Stack> 

  </Card>
  <Divider sx={{width:1,marginTop:1, marginBottom:1}}/>
  </>

))} 
     
         </Box>
         </>
   
  )
}

export default Home
