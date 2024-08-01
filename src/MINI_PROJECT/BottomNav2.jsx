
import React from "react";
import { useState } from "react";
import { Box,BottomNavigation,BottomNavigationAction } from "@mui/material";
import { CastForEducationOutlined,Home, CreateOutlined, BookOutlined, School, Business, Person, Quiz, LibraryBooks, Beenhere, CarRental, Assistant, GroupWork } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function BottomNav2() {
    
    const [selectedIndex, setSelectedIndex] =useState(2);

    const handleSelect = (event,index)=>{
      setSelectedIndex(index); 
    };

   let navigate = useNavigate();
 
  const handleClick1 = () => {
    navigate("/home")
  }
  const handleClick2 = () => {
    navigate("/forums")
  }
  const handleClick3 = () => {
    navigate("/more")
  }
  const handleClick4 = () => {
    navigate("/profile")
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
          <BottomNavigationAction label="HOME" icon={<Home/>} value={1} sx={{color:selectedIndex===1?'primary' : 'text.secondary'}} onClick={handleClick1} />
          <BottomNavigationAction label="FORUMS" icon={<GroupWork/>} value={2} sx={{color:selectedIndex===2?'primary' : 'text.secondary'}} onClick={handleClick2} />
          <BottomNavigationAction label="MORE" icon={<Assistant/>} value={3} sx={{color:selectedIndex===3?'primary' : 'text.secondary'}} onClick={handleClick3} />
          <BottomNavigationAction label="PROFILE" icon={< Person/>} value={4} sx={{color:selectedIndex===4?'primary' : 'text.secondary'}} onClick={handleClick4} />
         
        </BottomNavigation>
      </Box>
    );
  }
  export default BottomNav2