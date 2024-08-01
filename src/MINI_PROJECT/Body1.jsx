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

import Home from './Home';
import { db } from '../firebase-config';
import { getDoc,doc, collection,query,onSnapshot} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AppbarA from './Appbar1';
//import Loading from './Loading';


function Body1() {

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
          <AppbarA/>
          <Stack direction="row" spacing={1} justifyContent="space-between" marginTop={2}>
             <Left/>
              <Home/>
              <Right/>
          </Stack>
          <BottomNav1/>
          </Box> 
     
   </Box>
  ) 
}

export default Body1