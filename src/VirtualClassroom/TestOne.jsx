import React, { useState} from 'react'
import { Avatar, Button, Stack, TextField, Typography ,Card,Box} from '@mui/material';
import { blue, grey, pink } from '@mui/material/colors';
import { db } from '../firebase-config';
import { ToastContainer,toast } from 'react-toastify';
import { collection, onSnapshot, orderBy, query, where, getDoc, doc, setDoc ,Timestamp, addDoc} from 'firebase/firestore';

function One() {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    
    const [multiples, setMultiples] = useState([]);
    const [newMultiples, setNewMultiples] = useState('');

    const [subject, setSubject] = useState('');
    const [title, setTitle] = useState('');
    const [begin, setBegin] = useState(false);
   
    const addQuestion = () => {
      if (!newQuestion) return;
      setQuestions([...questions, { question: newQuestion }]);
      setNewQuestion('');
      console.log('Added Question:', questions[questions.length - 1]); // Log the added question
    };
    console.log(questions)
    const deleteLastQuestion = () => {
      setQuestions((prevQuestions) => prevQuestions.slice(0, -1));
    };
    console.log(questions)  


    const addMultiples = () => {
      if (!newMultiples) return;
      setMultiples([...multiples, { question: newMultiples }]);
      setNewMultiples('');
      console.log('Added Question:', multiples[multiples.length - 1]); // Log the added question
    };
    console.log(multiples)
    const deleteLastMultiples = () => {
      setMultiples((prevMultiples) => prevMultiples.slice(0, -1));
    };
    console.log(multiples)  

    const handleClick= async (e) => {
      e.preventDefault();
  
      const ref = collection(db, "answers", `${subject}`,`${subject}`)
      await addDoc(ref,{
          questions:questions ,
          title:title,
          subject:subject,
          multiples:multiples,
          begin:begin,
         
          createdAt:Timestamp.now().toDate(),
        
         
          
       }).then(() => {
           // Profile updated!
          // alert("Successful...");
          // navigate('/ab4')
          toast.success('answers submitted')
         
         
         
           // ...
         }).catch((error) => {
           // An error occurred
           // ...
           toast.error('Operation failed...try again')
           console.log(error)
          // alert(" An error occurred...try again");
         });
  
  
    setQuestions("");
    setTitle("");
    
    setTitle("");
    setMultiples("");
  
   
  
  
  
  
  
    }
   

  return (
    <>
    <h2>EMPIRE OF GRACE  COLLEGE. ANSWERS PORTAL</h2>
    <ToastContainer/>
    <TextField multiline id="standard-basic" label=" Enter subject here" variant="standard" 
    sx={{marginTop:"5px", width:"50%"}}
     value={subject} 
     onChange={(e) => setSubject(e.target.value)} />

    <TextField multiline id="standard-basic" label=" Enter title here" variant="standard" 
    sx={{marginTop:"5px", width:"50%"}}
     value={title}
     onChange={(e) => setTitle(e.target.value)} />

    <h3>FOR MULTIPLE CHOICE</h3>
    <TextField multiline id="standard-basic" label=" Enter question here" variant="standard" 
    sx={{marginTop:"5px", width:"50%"}}
     value={newMultiples} 
     onChange={(e) => setNewMultiples(e.target.value)} />

     <Stack direction="row" sx={{display:"flex" ,justifyContent:"space-between"}}>
     <Button sx={{marginTop:2,width:"30%",bgcolor:blue[600],borderRadius:6,marginBottom:5,marginLeft:"5%"}} variant="contained"  onClick={addMultiples}>ADD </Button>
     <Button sx={{marginTop:2,width:"30%",bgcolor:blue[600],borderRadius:6,marginBottom:5,marginRight:"5%"}} variant="contained"  onClick={deleteLastMultiples}>DELETE</Button>
     </Stack>

    <ol>
    {multiples && multiples.map(({question})=>(
    <li>{question}</li>
    ))}

    </ol>

    <h3>FOR THEORY</h3>

    <TextField multiline id="standard-basic" label=" Enter question here" variant="standard" 
    sx={{marginTop:"5px", width:"50%"}}
     value={newQuestion} 
     onChange={(e) => setNewQuestion(e.target.value)} />

     <Stack direction="row" sx={{display:"flex" ,justifyContent:"space-between"}}>
     <Button sx={{marginTop:2,width:"30%",bgcolor:blue[600],borderRadius:6,marginBottom:5,marginLeft:"5%"}} variant="contained"  onClick={addQuestion}>ADD </Button>
     <Button sx={{marginTop:2,width:"30%",bgcolor:blue[600],borderRadius:6,marginBottom:5,marginRight:"5%"}} variant="contained"  onClick={deleteLastQuestion}>DELETE</Button>
     </Stack>

    <ol>
    {questions && questions.map(({question})=>(
    <li>{question}</li>
    ))}

    </ol>
    <button onClick={handleClick}>SUBMIT</button>
    </>
  )

}

export default One