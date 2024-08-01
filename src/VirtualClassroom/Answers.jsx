import React from 'react'
import BottomNav2 from './BottomNav2'
import AppbarA from './AppbarA'
import { TextField, Typography,Button, Card, Stack, Avatar ,Divider, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Answers() {
    const navigate=useNavigate();

    const handleClick1 = () => {
        navigate("/scienceanswers")
      }

      const handleClick2 = () => {
        navigate("/mathsanswers")
      }
 
      const handleClick3 = () => {
        navigate("/emathsanswers")
      }

      const handleClick4 = () => {
        navigate("/ictanswers")
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
    <BottomNav2/>
    </>
  )
}

export default Answers
