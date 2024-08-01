import React, {useContext,useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
//import { ChooseContext } from './ContextA.jsx';
import { collection, onSnapshot,addDoc, orderBy, query, where,orWhere, getDoc, doc, setDoc ,Timestamp} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config.jsx';
import Loading from './Loading.jsx';
import { blue, grey } from '@mui/material/colors';
import {  CommentOutlined, PostAdd,UploadFile} from '@mui/icons-material'
import { ToastContainer,toast } from 'react-toastify';
import { storage } from '../firebase-config';
import Select from 'react-select';

import { uploadBytes,ref,getDownloadURL } from 'firebase/storage';
import { Card, IconButton, Toolbar, styled, Modal, AppBar,TextField, Typography, Box, Button , Stack, Divider} from '@mui/material';
import cabbage from './cabbage.jpeg'
import { ArrowBackIosNewOutlined } from '@mui/icons-material';

const StyledModal=styled(Modal)({   
  display:"flex",
  alignItems:"center",
  justifyContent:"center"

})

const categories = [ 
  {value: 'Computer Science', label:'Computer Science'},
  {value: 'Accounting',label:'Accounting'},
  {value: 'Cybersecurity', label:'Cybersecurity'},
  {value: 'Medicine', label:'Medicine'},
  {value: 'Economics', label:'Economics'},
  {value: 'Chemistry', label:'Chemistry'},
  {value: 'Biology', label:'Biology'},
 
   
  ]


function Profile2() {

    const [open,setOpen]=useState(false); 
    const [open2,setOpen2]=useState(false); 
    const [loading,setLoading]=useState(true); 
    const [data,setData]=useState([]);
    const [data2,setData2]=useState([]);
    const [data3,setData3]=useState([]);

    const [name, setName] =useState('');
    const [description, setDescription] =useState('');
    const [category, setCategory] =useState('');
    const [followers, setFollowers] =useState([]);
    const [photo, setPhoto] =useState('');

    const handleChange = (selectedOption)=>{setCategory(selectedOption);
      setCategory(selectedOption.value);
    console.log(selectedOption.value)}

        
    let navigate = useNavigate();  

    const handleBack = () => { 
      navigate(-1)  
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
          setLoading(false)
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
          const q= query(postRef,where("userId", "==", user.uid) ,orderBy("createdAt","desc"));
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

    
    useEffect(()=>{
      const  postRef=collection(db,"post"); 
          const q= query(postRef,where("userId", "==", user.uid) ,orderBy("createdAt","desc"));
          onSnapshot(q,(snapshot)=>{
              const posts=snapshot.docs.map((doc)=>({
                 id:doc.id,
                 ...doc.data(),
              }));
              setData3(posts); 
              console.log(data3); 
              setLoading(false)
          })
    },[]);
 




    const Create=async(e)=>{
      
      e.preventDefault();
      const auth = getAuth();
      const user = auth.currentUser;
      
          const storageRef = ref(storage, `forum/${photo.name}`);
          await uploadBytes(storageRef,photo);
  
        
          // Retrieve the download URL 
          
           getDownloadURL(ref(storageRef)) 
   
           .then((url)=>{ 
            const ref = collection(db, "forum",)
             addDoc(ref,{ 
                  name: name,
                  description: description,
                  category:category,
                  followers:followers, 
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
      
        
         setCategory("");
         setName("");
         setDescription("");
         setPhoto(null);
        
        
        
       
      
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
        <Box width={300} height={500} bgcolor="white" p={3} borderRadius={5} sx={{}}>
         <Typography>CREATE YOUR OWN FORUM</Typography>
          <Stack direction="column" marginTop={1}>
          <TextField
          id="standard-basic" 
          label="Name field"
          placeholder="Enter name of forum..."
          variant="standard"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:1,marginTop:"2px"}}
        />

       <TextField
          id="standard-basic"
          label="Description field"
          placeholder="Enter description of forum"
          variant="standard"
          value={description} 
          onChange={(e) => {setDescription(e.target.value)}}
          sx={{width:"90%",marginLeft:"3%",marginBottom:1,marginTop:"2px"}} 
        />

       <p style={{marginTop:"5px"}}>Select Category of forum</p> 
          <Select 
          options= {categories}
          
          onChange={handleChange} 
          
          />

        
     
      <Stack direction="row">
        <Button variant="outlined" component="label" sx={{marginTop:1,width:"50%",bgcolor:blue,color:"black"}}>
          <UploadFile/>  PROFILE PIC
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
          <Button sx={{marginTop:8}} variant="contained" color="primary"  onClick={Create}>CREATE FORUM</Button>
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
        <Box width={300} height={300} bgcolor="white" p={3} borderRadius={5} sx={{}}>
         <Typography>EDIT YOUR PROFILE</Typography>
          <Stack direction="column" marginTop={1}>
          <TextField id="standard-basic" label="College Name" variant="standard"/>
         
         
          <Button variant="outlined" component="label" color="primary" sx={{marginTop:8,width:"50%"}}>
            <UploadFile/>  Upload Image
            <input type="file" hidden  />
          </Button>
          <Button sx={{marginTop:8}} variant="contained" color="primary"  >DONE</Button>
          </Stack>
        </Box>
      </StyledModal>
    </div>

    <Box sx={{ flexGrow: 1, marginBottom:"15px" , display:{xs:"none", sm:"block"}}}>
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
          PROFILE
        </Typography>
      
        </Stack>
      
      </Toolbar> 
    </AppBar> 
  </Box>

  <Box bgcolor={grey[50]}   p={1} top={10} sx={{display:{xs:"none",sm:"block"},width:{xs:'98%',sm:"98%"}, minHeight:"100%"}}>
      
 
      
      <Card sx={{height:120, width:{xs: "100%", sm: "60%", md: "50%"}, display:"flex", marginLeft:{sm:"15%",md:"25%"},marginRight:{sm: "15%",md:"25%"} ,borderRadius:"15px", marginTop:6, marginBottom:1}}> 
    
    <Stack direction="column"> 
    <Stack direction="row" sx={{marginTop:"8px", alignItems:"center"}}> 
        <img src={data2.photo} alt='tomatoes' style={{width:"50px", height:"50px", borderRadius:"100px", marginLeft:"5px"}}/>
        <Stack direction="column"> 
        <Typography sx={{fontSize:"15px", marginLeft:"8px",}}>{data2.name}</Typography> 
        <Typography sx={{fontSize:"12px", marginLeft:"8px",}}>{data2.program}</Typography> 
        <Typography sx={{fontSize:"12px", marginLeft:"8px",}}>{data2.level}</Typography>
        </Stack>
    </Stack> 
    <Stack direction="row"> 
       
    <Button sx={{height:"28px",width:"160px",bgcolor:blue[500],borderRadius:5,marginLeft:"7%", marginBottom:"10px", fontSize:"10px", marginTop:"5px",marginRight: "5px", marginTop: 1}} variant="contained" onClick={e=>setOpen(true)}   >CREATE FORUM </Button>
    <Button sx={{height:"28px",width:"160px",bgcolor:blue[500],borderRadius:5,marginLeft:"7%", marginBottom:"10px", fontSize:"10px", marginTop:"5px",marginRight: "5px", marginTop: 1}} variant="contained" onClick={e=>setOpen2(true)}  >EDIT PROFILE </Button>
    </Stack> 
    
    </Stack> 


  </Card>

 
  <Typography sx={{textAlign:"center"}}>MY CREATED FORUMS</Typography>

  
{ data && data.map(({ id,createdAt, photo, userId, name, category })=>( 
<Card key={{id}} sx={{minHeight:"55px", width:"60%", display:"flex", marginLeft:"25%",marginRight:"25%", borderRadius:"15px", marginTop:"5px"}}>
  
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


<Typography sx={{textAlign:"center"}}>MY POSTS</Typography>

{ data3 && data3.map(({ id,createdAt, title, body, photo, userId, userName, forumName, userImage, forumImage })=>( 
    <>
       
  <Card key={{id}} sx={{minHeight:"100px", width:"58%", display:"flex",marginLeft:"25%",marginRight:"25%", borderRadius:"15px", marginTop:"8px"}}>
    
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
        <Button sx={{height:"20px",marginRight:0,width:"100px",bgcolor:blue[100],color:blue[800], borderRadius:5,marginLeft:"7%", marginBottom:"10px", fontSize:"10px", marginTop:"4px",marginRight: "5px"}} variant="Outlined"  ><CommentOutlined sx={{height:15, color: blue}}/>COMMENT</Button>
       
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

export default Profile2