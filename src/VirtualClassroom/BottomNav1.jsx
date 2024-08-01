
import React from "react";
import { useState } from "react";
import { Box,BottomNavigation,BottomNavigationAction } from "@mui/material";
import { CastForEducationOutlined,Home, CreateOutlined, BookOutlined, School, Business, Person, Quiz, LibraryBooks, Beenhere } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function BottomNav1() {
    
    const [selectedIndex, setSelectedIndex] =useState(1);

    const handleSelect = (event,index)=>{
      setSelectedIndex(index); 
    };

   let navigate = useNavigate();
 
  const handleClick1 = () => {
    navigate("/studenthomepage")
  }
  const handleClick2 = () => {
    navigate("/answers")
  }
  const handleClick3 = () => {
    navigate("/results")
  }
 
    return (
      <Box sx={{ width: "100%", position: "fixed", bottom: 0, bgcolor: "white",display: { xs: "block", sm: "none" } }}>
        <BottomNavigation
          showLabels
          value={selectedIndex}
          zIndex={10}
          elevation={10}
          position="fixed"
          onChange={handleSelect}
          sx={{backgroundColor:"white"}}
        >
          <BottomNavigationAction label="QUESTIONS" icon={<Quiz/>} value={1} sx={{color:selectedIndex===1?'primary' : 'text.secondary'}} onClick={handleClick1} />
          <BottomNavigationAction label="ANSWERS" icon={<LibraryBooks/>} value={2} sx={{color:selectedIndex===2?'primary' : 'text.secondary'}} onClick={handleClick2} />
          <BottomNavigationAction label="RESULTS" icon={< Beenhere/>} value={3} sx={{color:selectedIndex===3?'primary' : 'text.secondary'}} onClick={handleClick3} />
        </BottomNavigation>
      </Box>
    );
  }
  export default BottomNav1