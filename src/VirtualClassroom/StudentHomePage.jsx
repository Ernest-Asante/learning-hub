import React from 'react'
import BottomNav1 from './BottomNav1'
import AppbarA from './AppbarA'
import { TextField, Typography,Button, Card, Stack, Avatar ,Divider, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';


function StudentHomePage() {
    const navigate=useNavigate();

    const handleClick1 = () => {
        navigate("/sciencetest")
      }

      const handleClick2 = () => {
        navigate("/mathstest")
      }
 
      const handleClick3 = () => {
        navigate("/emathstest")
      }

      const handleClick4 = () => {
        navigate("/icttest")
      }

  return (
    <>
    <AppbarA/>
    <Box  sx={{marginTop:"12p%"}}>

    </Box>
   

   <Box sx={{marginTop:"18%"}}>
    < Card  sx={{ borderRadius:5, height:"60px",position:"" ,width:"95%",marginTop:"8px",marginLeft:"2%",marginBottom:"2%"}} onClick={handleClick1}>
      <Typography sx={{marginLeft:"10px", marginTop:"12px", fontSize:"22px"}}><b>INTEGRATED SCIENCE</b></Typography>
    </Card>
    </Box>
    <Box sx={{marginTop:"3%"}}>
    < Card  sx={{ borderRadius:5, height:"60px",position:"" ,width:"95%",marginTop:"8px",marginLeft:"2%",marginBottom:"2%"}} onClick={handleClick2}>
      <Typography sx={{marginLeft:"10px", marginTop:"12px", fontSize:"22px"}}><b>CORE MATHEMATICS</b></Typography>
    </Card>
    </Box>
    <Box sx={{marginTop:"3%"}}>
    < Card  sx={{ borderRadius:5, height:"60px",position:"" ,width:"95%",marginTop:"8px",marginLeft:"2%",marginBottom:"2%"}} onClick={handleClick3}>
      <Typography sx={{marginLeft:"10px", marginTop:"12px", fontSize:"22px"}}><b>ELECTIVE MATHS</b></Typography>
    </Card>
    </Box>
    <Box sx={{marginTop:"3%"}}> 
    < Card  sx={{ borderRadius:5, height:"60px",position:"" ,width:"95%",marginTop:"8px",marginLeft:"2%",marginBottom:"2%"}} onClick={handleClick4}>
      <Typography sx={{marginLeft:"10px", marginTop:"12px", fontSize:"22px"}}><b>INFO COMM TECH (ICT)</b></Typography>
    </Card>
    </Box>
    <BottomNav1/>
    </>
  )
}

export default StudentHomePage
