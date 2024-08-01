import React,{useState} from 'react'
import { Button, Fab, Modal,Box ,styled, Stack, Avatar, TextField,Typography} from '@mui/material'
import {  PostAdd,UploadFile} from '@mui/icons-material'
//import sonsol from './sonsol.jpg'
import { pink, blue } from '@mui/material/colors';


import { Link, useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'

const StyledModal=styled(Modal)({  
  display:"flex",
  alignItems:"center",
  justifyContent:"center"

})

function Createpost() {
  const [open,setOpen]=useState(false); 
  const [typing,setTyping]=useState(false);   
  const [messages, setMessages] = useState([
    { 
      message: "Hello, i am your AI Tutor", 
      sender: "Gemini",
      direction: 'incoming'
    }
  ])

  const API_KEY = "AIzaSyANkrzxkdsGoWHhu4823YyfA-cG6TY29Tw"; // Replace with your actual Google Gemini API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  

  const handleSend = async(message) =>{  
    const newMessage = {
      message: message,
      sender: 'user',
      direction: 'outgoing'
    } 

    const newMessages = [...messages, newMessage]
    setMessages(newMessages) 


    setTyping(true) 

    await processMessageToGemini(newMessages); 
  }

  async function processMessageToGemini(chatMessages) { 
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = chatMessages.map((msg) => msg.message).join('\n');  

    

    const result = await model.generateContent(prompt); 
    const response = await result.response; 
    console.log(response) 
    const text = await response.text();   
    setMessages([...chatMessages, {  
      message: text, 
      sender: "Gemini", 
      direction: 'incoming'
    }]);
    setTyping(false);
  }

  const handleClose = () =>{
    setOpen(false)
  }

            

  return (
    <>
    <div>
    
     <Fab variant='extended'  onClick={e=>setOpen(true)} sx={{width:100,height:35,bgcolor:blue[500]}}>
       
       AI TUTOR
     </Fab>
     
    </div> 
    <div>
    <StyledModal
        open={open}
        onClose={e=>setOpen(false)}  
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={300} height={400} marginBottom={5} bgcolor="white" p={3} borderRadius={5} sx={{}}>
        <Stack direction="row" justifyContent="space-between" > 
         <Typography>AI ASSISTANT</Typography>  
         <Button sx={{ width: 70,height:20, marginTop:0, marginLeft:5}} variant="outlined" color="primary" onClick={handleClose} >EXIT</Button>
         </Stack> 
        {/*  <Stack direction="row" marginTop={30}> 
          <TextField id="standard-basic" label="chat with AI" variant="standard"/>
         
         
        
          <Button sx={{ width: 70,height:30, marginTop:2, marginLeft:5}} variant="outlined" color="primary"  >SEND</Button>
          </Stack>  */}

          <MainContainer>
            <ChatContainer>
              <MessageList 
              typingIndicator={typing ? <TypingIndicator content="AI Tutor is typing"/> : null }>
                {messages.map((message, i)=>{
                   return <Message key ={i} model={message} />
                })}
              </MessageList> 
              <MessageInput placeholder='type message here' onSend={handleSend}/> 
            </ChatContainer>
          </MainContainer> 
        </Box>
      </StyledModal> 
    </div>
    </>
  )
}

export default Createpost 
