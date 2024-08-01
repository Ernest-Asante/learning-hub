import React, {useState,useEffect} from 'react'

import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import { collection, onSnapshot, orderBy, query, where, getDoc, doc, setDoc ,Timestamp, addDoc} from 'firebase/firestore';
import { storage } from '../firebase-config';

import { uploadBytes,ref,getDownloadURL } from 'firebase/storage';
import { Box, Card, styled,Modal, TextField, Stack, Typography,Avatar,Button,Chip ,IconButton, Divider} from '@mui/material'
import { blue, grey } from '@mui/material/colors';
import cabbage from './cabbage.jpeg'
import Createforum from './Createforum';
import {  CommentOutlined, PostAdd,UploadFile} from '@mui/icons-material'

import Select from 'react-select';


   
const categories = [ 
  {value: 'Computer Science', label:'Computer Science'},
  {value: 'Accounting',label:'Accounting'},
  {value: 'Cybersecurity', label:'Cybersecurity'},
  {value: 'Medicine', label:'Medicine'},
  {value: 'Economics', label:'Economics'},
  {value: 'Chemistry', label:'Chemistry'},
  {value: 'Biology', label:'Biology'},
 
 
 
]


const StyledModal=styled(Modal)({  
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  
  })
function Profile() {
    const [open,setOpen]=useState(false); 
    const [loading,setLoading]=useState(true); 
    const [data,setData]=useState([]);
    const [data2,setData2]=useState([]);
    const [data3,setData3]=useState([]);
    const [open2,setOpen2]=useState(false); 
    const [open3,setOpen3]=useState(false); 
    const [myComment, setMyComment] = useState('') 

    const [name, setName] =useState('');
    const [description, setDescription] =useState('');
    const [category, setCategory] =useState('');
    const [followers, setFollowers] =useState([]);
    const [photo, setPhoto] =useState('');

    const handleChange = (selectedOption)=>{setCategory(selectedOption);
      setCategory(selectedOption.value);
    console.log(selectedOption.value)}

    const auth = getAuth();
    const user = auth.currentUser;

    const handleClickD = () => {
      setOpen3(true)
    }
  


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
                  followers: followers,
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

  if(loading){
    <div><p>loading</p></div>
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


    <Box sx={{display:{xs:"block",sm:"none"}, padding:{xs:0, sm:1, md:3}, width:{sm:'100%',xs:'100%',md:"45%"}, marginTop:80}}>

           
  <Card sx={{minHeight:"100px", width:"100%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:2}}>
    
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



  <Typography>MY CREATED FORUMS</Typography>

  
  { data && data.map(({ id,createdAt, photo, userId, name, category })=>( 
  <Card key={{id}} sx={{minHeight:"55px", width:"100%", display:"flex", margin:"3px", borderRadius:"15px", marginTop:"5px"}}>
    
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


<Typography>MY POSTS</Typography>

{ data3 && data3.map(({ id,createdAt, title, body, photo, userId, userName, forumName, userImage, forumImage })=>( 
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
        <Button sx={{height:"20px",marginRight:0,width:"100px",bgcolor:blue[100],color:blue[800], borderRadius:5,marginLeft:"7%", marginBottom:"10px", fontSize:"10px", marginTop:"4px",marginRight: "5px"}} variant="Outlined" ><CommentOutlined sx={{height:15, color: blue}}/>COMMENT</Button>
       
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

export default Profile