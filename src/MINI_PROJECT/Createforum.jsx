import React,{useState} from 'react'
import { Button, Fab, Modal,Box ,styled, Stack, Avatar, TextField,Typography} from '@mui/material'
import {  PostAdd,UploadFile} from '@mui/icons-material'
//import sonsol from './sonsol.jpg'
import { pink, blue } from '@mui/material/colors';


import { Link, useNavigate } from 'react-router-dom';

const StyledModal=styled(Modal)({  
  display:"flex",
  alignItems:"center",
  justifyContent:"center"

})

function Createforum() {
  const [open,setOpen]=useState(false);
  
   

            

  return (
    <>
    <div>
    
     <Fab variant='extended'  onClick={e=>setOpen(true)} sx={{width:150,height:25,bgcolor:blue[500]}}>
       
       CREATE FORUM
     </Fab>
     
    </div>  
    <div> 
    <StyledModal
        open={open}
        onClose={e=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={300} height={300} bgcolor="white" p={3} borderRadius={5} sx={{}}>
         <Typography>AI ASSISTANT</Typography>
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
    </>
  )
}

export default Createforum
