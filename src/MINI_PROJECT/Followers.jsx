import React from 'react'
import { Box,Button } from '@mui/material'
import { grey, pink, blue } from '@mui/material/colors';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import { arrayRemove, arrayUnion, updateDoc ,doc} from 'firebase/firestore';

function Followers({postId,followers}) {
    const auth = getAuth(); 
    const user = auth.currentUser;

    const followersRef= doc(db,"forum",`${postId}`);
    const handleRec=()=>{
      if(followers?.includes(user.uid)){
        updateDoc(followersRef,{
          followers:arrayRemove(user.uid),
        }).then(()=>{
          console.log('unfollowed');
        }).catch((e)=>{ 
          console.log(e); 
        });
      } else{
        updateDoc(followersRef,{
          followers:arrayUnion(user.uid),
        }).then(()=>{
          console.log('followed');
        }).catch((e)=>{
          console.log(e);
        });
      }
    }
  return (
   <Box>
   {!followers?.includes(user.uid)? ( <Button sx={{height:"18px",width:"30px",color:blue[600],borderRadius:5,marginLeft:"35%", marginBottom:"10px", fontSize:"10px", marginTop:"4px",marginRight: "5px"}} variant="outlined"  onClick={handleRec}>FOLLOW</Button>):( <Button sx={{height:"18px",width:"30px",color:blue[600],borderRadius:5,marginLeft:"7%", marginBottom:"10px", fontSize:"10px", marginTop:"4px",marginRight: "5px"}} variant="outlined"  onClick={handleRec}>UNFOLLOW</Button>)} 
   </Box>
  )
}  

export default Followers
