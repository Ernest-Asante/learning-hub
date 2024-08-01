import React from 'react'
import { useEffect,useState } from 'react';
//import Appbar from './AppBar'
//import Home from './Home'
import BottomNav1 from './BottomNav1'
import { Box,Stack,Skeleton} from '@mui/material';
//import ProfileX from './Profile';
//import Wassce from './Wassce';
import Left from './Left';
import Right from './Right';

import { db } from '../firebase-config';
import { getDoc,doc, collection,query,onSnapshot} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AppbarA from './Appbar1';
import Suggestions from './Suggestions';
import BottomNav3 from './BottomNav3';
import AppbarC from './Appbar3';
import AppbarD from './Appbar4';
import Profile from './Profile';
import BottomNav4 from './BottomNav4';
//import Loading from './Loading';


function Body4() {

  /*const [data,setData]=useState([]) 
  const auth = getAuth(); 
  const user = auth.currentUser; 

  useEffect(()=>{
    const  postRef=collection(db,"Profile"); 
        const b = query(postRef);
        onSnapshot(b,(snapshot)=>{
            const data=snapshot.docs.map((doc)=>({
               id:doc.id,
               ...doc.data(),
            }));
            setData(data); 
            console.log(data);
        })  
  },[auth.currentUser]);  */
   

  return (
     <Box>
     <Box>
          <AppbarD/>
          <Stack direction="row" spacing={1} justifyContent="space-between" marginTop={2}>
             <Left/>
              <Profile/>
              <Right/> 
          </Stack>
          <BottomNav4/>
          </Box> 
     
   </Box>
  )
}

export default Body4