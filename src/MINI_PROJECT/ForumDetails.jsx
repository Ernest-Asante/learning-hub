import React, {useContext,useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
//import { ChooseContext } from './ContextA.jsx';
import { collection, onSnapshot,addDoc, orderBy, query, where,orWhere, getDoc, doc, setDoc ,Timestamp} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config.jsx';
import { storage } from '../firebase-config';

import { uploadBytes,ref,getDownloadURL } from 'firebase/storage';
import Loading from './Loading.jsx';
import { blue, grey } from '@mui/material/colors';
import cabbage from './cabbage.jpeg'
import {  PostAdd,UploadFile} from '@mui/icons-material'
import { ToastContainer,toast } from 'react-toastify';
import { Card, IconButton, Toolbar, styled, Modal, AppBar,TextField, Typography, Box, Button , Stack, Divider, BottomNavigation} from '@mui/material';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'
import { ArrowBackIosNewOutlined ,CommentOutlined, HomeWorkOutlined, LibraryBooksOutlined,} from '@mui/icons-material';

const StyledModal=styled(Modal)({   
  display:"flex",
  alignItems:"center",
  justifyContent:"center"

})


function ForumDetails() {

    const [data, setData] = useState('') 
    const [data2, setData2] = useState('') 
     const [data3, setData3] = useState('') 
     const [comment, setComment] = useState([]) 
    const [open,setOpen]=useState(false); 
    const [loading,setLoading]=useState(false); 
    const [open2,setOpen2]=useState(false); 
    const [myComment, setMyComment] = useState('') 
    const [messaging, setMessaging] = useState('') 
    const [messagings, setMessagings] = useState('')
      const [title,setTitle]=useState(''); 
      const [body,setBody]=useState(''); 
      const [photo,setPhoto]=useState(null); 
    const [page, setPage] = useState('post')
    const [messages, setMessages] = useState([
      { 
        message: "Hello, i am your AI Tutor", 
        sender: "Gemini",
        direction: 'incoming'
      },
      { 
        message: "Hello, i am your AI Tutor", 
        sender: "Gemini",
        direction: 'outgoing'
      },
      { 
        message: "Hello, i am your AI Tutor", 
        sender: "Gemini",
        direction: 'incoming'
      },
      { 
        message: "Hello, i am your AI Tutor", 
        sender: "Gemini",
        direction: 'outgoing'
      }
    ])


    const handleClickA = () => {
        setPage("post")
      }
      const handleClickB = () => {
        setPage("chat")
      }

      const handleClickC = () => {
        setOpen(true)
      }

      const handleClickD = () => {
        setOpen2(true)
      }


 

    const { id } = useParams(); 
    console.log(id)
  
    
        
      let navigate = useNavigate();  
     
      const handleBack = () => { 
        navigate(-1)  
      }
  
      const auth = getAuth();
      
      const user = auth.currentUser; 


      useEffect(()=>{ 
        const  postRef=collection(db,"chats"); 
        const q = query(postRef, where("forumId", "==", id), orderBy("createdAt", "asc"));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const posts = snapshot.docs.map((doc) => {
            const postData = doc.data();
            const direction = postData.userId === user.uid ? 'outgoing' : 'incoming';
            return {
              id: doc.id,
              ...postData,
              direction
            };
          });
          setMessaging(posts);
        }, (error) => {
          console.error("Error fetching documents: ", error);
        });

    return () => unsubscribe();
      },[]);
    

      const forumDetails = async () => {
        try {
          const docRef = doc(db, "forum", `${id}`);
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
        forumDetails();
      }, [id]);

      const userDetails = async () => {
        try {
          const docRef = doc(db, "profile", `${user.uid}`);
          const docSnaps = await getDoc(docRef)
    
          if (docSnaps.exists()) {
            setData3(docSnaps.data());
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
        const  postRef=collection(db,"post"); 
            const q= query(postRef,where("forumId", "==", `${id}`) ,orderBy("createdAt","desc"));
            onSnapshot(q,(snapshot)=>{
                const posts=snapshot.docs.map((doc)=>({
                   id:doc.id,
                   ...doc.data(),
                }));
                setData(posts); 
                console.log(data); 
            })
      },[]);
  

      const Create=async(e)=>{
      
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        
            const storageRef = ref(storage, `post/${photo.name}`);
            await uploadBytes(storageRef,photo);
    
          
            // Retrieve the download URL 
            
             getDownloadURL(ref(storageRef)) 
    
             .then((url)=>{
              const ref = collection(db, "post",)
               addDoc(ref,{ 
                    title: title,
                    body: body,
                    forumId:id,
                    forumName:data2.name,
                    forumImage: data2.photo,
                    userName: data3.name,
                    userImage: data3.photo,
                    comment: comment,
                   
                    photo: url, 
                    createdAt:Timestamp.now().toDate(),
                    userId:user.uid,
                  
                   
                })
    
                  }).then(() => {
                    // Profile updated!
                    alert("Successful...");
                  //  navigate('/home')
                  setOpen(false)
                   
                    // ...
                  }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(error)
                    alert(" An error occurred...try again");
                  }); 
        
          
           setTitle("");
           setBody("");
            
           setPhoto(null);
        
    }

    const handleAlert = () =>{
      alert("comment submited")
      setOpen2(false)
    }


    const handleMessage= async (message) => { 
      setMessagings(message) 
      console.log(message)
  
  
      const ref = collection(db, "chats", ) 
      await addDoc(ref,{
          message:message,
          forumId:id,
          name: data3.name,
          createdAt:Timestamp.now().toDate(), 
          userId:user.uid, 
          
       }).then(() => {
           // Profile updated!
         //  alert("Successful..."); 
          // navigate('/ab4')
        //  toast.success('Results Submitted Successfully')
        //  setOpen(false)
         
         
           // ...
         }).catch((error) => {
           // An error occurred
           // ...
        //   toast.error('Operation failed...try again')
           console.log(error)
          // alert(" An error occurred...try again");
         });
  
  
   // setMessaging("");
  
    }
   
    
  
   
  
  

  return (
    <>

<div> 
    <StyledModal
        open={open}
        onClose={e=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
      >
        <Box width={300} minHeight={300} bgcolor="white" p={3} borderRadius={5} sx={{}}>
         <Typography>CREATE A POST</Typography>
          <Stack direction="column" marginTop={1}>
          <TextField
          id="standard-basic" 
          label="Title field"
          placeholder="Enter title of post..."
          variant="standard"
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:1,marginTop:"2px"}}
        />

       <TextField
          id="standard-basic"
          label="Post body field"
          placeholder="Enter body of post"
          variant="standard"
          value={body} 
          onChange={(e) => {setBody(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:1,marginTop:"2px"}} 
        />

     

        
     
      <Stack direction="row">
        <Button variant="outlined" component="label" sx={{marginTop:1,width:"50%",bgcolor:blue,color:"black"}}>
          <UploadFile/>  POST IMAGE
          <input type="file" accept="image/*" hidden  onChange={(e) =>{setPhoto(e.target.files[0])}} />
        </Button>

        <Box sx={{marginLeft:4,marginTop:1}}>
        
        {photo && (
            <div>
                <img
                src={URL.createObjectURL(photo)}
                alt="thumb"
                style={{height:75,width:140}}
                />
            </div>
        )}
     
          </Box>
          </Stack>
          <Button sx={{marginTop:5}} variant="contained" color="primary" onClick={Create}>CREATE POST</Button>
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
          {data2.name}
        </Typography>
      
        </Stack>
      
      </Toolbar> 
    </AppBar> 
  </Box>

  <Box bgcolor={grey[50]}   p={1} top={10} sx={{display:{xs:"block",sm:"block"},width:{xs:'98%',sm:"98%"}, minHeight:"100%"}}>
      
 
      
    <Card sx={{height:60, width:{xs: "100%", sm: "60%", md: "50%"}, display:"flex", marginLeft:{sm:"15%",md:"25%"},marginRight:{sm: "15%",md:"25%"} ,borderRadius:"15px", marginTop:6, marginBottom:1}}> 
    
      
      <Box> 
        <Stack direction="row" sx={{display:"flex" ,marginTop:"10px"}}> 
        <Button onClick={handleClickA} variant={page=="post"?("contained"):("outlined")} component="label" sx={{marginBottom:3, width: 120,alignItems:"center",textAlign:"center",justifyContent:"center",borderRadius:5,marginLeft:'6%',display:"block"}}>POSTS</Button>
        <Button onClick={handleClickB} variant={page=="chat"?("contained"):("outlined")} component="label" sx={{textAlign:"center",width: 120,marginBottom:3,alignItems:"center",textAlign:"center",justifyContent:"center",borderRadius:5,marginLeft:'6%',display:"block"}}>CHATS</Button>
        <Button onClick={handleClickC} variant="outlined" component="label" sx={{marginBottom:3,alignItems:"center",textAlign:"center",width: 130,justifyContent:"center",borderRadius:5,marginRight:'6%',marginLeft:'6%',display:"block"}}>CREATE</Button>
       
        </Stack>
       
      </Box> 
    
    </Card>

    <Divider sx={{width:5}}/> 

    <Card sx={{width:{xs: "100%", sm: "60%", md: "50%"},minHeight: 400, marginLeft:{sm:"15%",md:"25%"},marginRight:{sm: "15%",md:"25%"}}}>
    

     {page=="post"? (
     <Box>
         
  { data && data.map(({ id,createdAt, title, body, photo, userId, userName, userImage, forumName, forumImage })=>( 
    <>
       
  <Card key={{id}} sx={{minHeight:"100px", width:"98%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"5px"}}>
    
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
     

     </Box>):( 
      <>
      <Box>
      <Typography>CHAT HERE</Typography> 
      {loading  ? (<Typography>loading</Typography>):(
      <MainContainer> 
            <ChatContainer>
              <MessageList  
             >
               { messaging && messaging.map((message, i)=>{
                   return <Message key ={i} model={message} />
                })} 
     
              </MessageList> 
              <MessageInput placeholder='type message here'   onSend={handleMessage}/> 
            </ChatContainer>
          </MainContainer> 
      )}


      </Box> 

   
      
    
     </> 
      
    )}
    </Card>
  </Box>
  </>
  )
}

export default ForumDetails