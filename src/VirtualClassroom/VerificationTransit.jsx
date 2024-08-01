import React, { useState, useEffect } from 'react'
import { Box ,Card} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query, where, getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import Loading from './Loading';
import imga from './imga.png';
import AppbarA from './AppbarA';

function VerificationTransition() {
    const [isLoading, setIsLoading] = useState(true); 
    const [data, setData] = useState('');

    let navigate = useNavigate();

    const handleClick = () => {
      navigate('/adminverifystud')
    }
    const handleClick2 = () => {
      navigate('/studentprofile')
    }

    const auth = getAuth();
    const user = auth.currentUser;

  
    const userDetails = async () => {
      try {
        const docRef = doc(db, "studentsprofile", `${user.uid}`);
        const docSnaps = await getDoc(docRef)
  
        if (docSnaps.exists()) {
          setData(docSnaps.data());
          console.log("Document data:", docSnaps.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) { console.error('an error') }
      finally {
        setIsLoading(false);
      }
  
    }
  
    useEffect(() => {
      userDetails();
    }, [user.uid]);

    if (isLoading) {
        return <Loading/>;
      }


      const handleNavigation = () => {
        if (data) {
          navigate('/studenthomepage'); 
        } else {
          navigate('/updateprofile');  
        }
      };
    
    
     handleNavigation(); 

 
  return (
    
    <Box>
    
        <>
    <div> <AppbarA/></div>
    
    <Box sx={{flex:4, backgroundColor:"white" , height:"99vh" ,width:{md:"98%", xs:"98%", sm:"98%"},marginLeft:{xs:"2%"},marginRight:{xs:"4%"}}}>
    <Card sx={{ borderRadius:5, height:"85%", width:{md:"97%", xs:"97%", sm:"97%"},position:"absolute",marginTop:"3%"}}>
    
   
   <h1 style={{textAlign:"center",display:"flex" ,justifyContent:"center"}}>REDIRECTING...</h1>
  
    </Card>
    </Box>
    </>
     
    </Box>
  )
}

export default VerificationTransition