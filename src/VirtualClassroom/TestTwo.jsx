import React, { useState } from 'react';
import { Button, Divider, Stack, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import { ToastContainer,toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import { collection, onSnapshot, orderBy, query, where, getDoc, doc, setDoc ,Timestamp, addDoc} from 'firebase/firestore';

function Two() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newChoice, setNewChoice] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [instruction, setInstruction] = useState('');
  const [theory, setTheory] = useState([]);
  const [newTheory, setNewTheory] = useState('');
  const [subject, setSubject] = useState('');
  const [begin, setBegin] = useState(false);
  const [tab, setTab] = useState(false);
  
  //theory
  const addTheory = () => {
    if (!newTheory) return;
    setTheory([...theory, { question: newTheory }]);
    setNewTheory('');
    console.log('Added Question:', theory[theory.length - 1]); // Log the added question
  };
  console.log(theory)
  const deleteLastTheory = () => {
    setTheory((prevTheory) => prevTheory.slice(0, -1));
  };
  console.log(theory)

  //obj

  const addQuestion = () => {
    if (!newQuestion) return;
    setQuestions([...questions, { question: newQuestion, choices: [] }]);
    setNewQuestion('');
    console.log('Added Question:', questions[questions.length - 1]); // Log the added question
  };

  const addChoice = (questionIndex) => {
    if (!newChoice) return;
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].choices.push(newChoice);
      return updatedQuestions;
    });
    setNewChoice('');
  };

  const deleteLastQuestion = () => {
    setQuestions((prevQuestions) => prevQuestions.slice(0, -1));
  };

  const deleteLastChoice = (questionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].choices.pop();
      return updatedQuestions;
    });
  };

  const handleClick= async (e) => {
    e.preventDefault();

    const ref = collection(db, "questions", `${subject}`, `${subject}`)
    await addDoc(ref,{
        questions:questions ,
        title:title,
        time:time,
        instruction:instruction,
        theory:theory,
        begin:begin,
        tab:tab,
        subject:subject,
       
        createdAt:Timestamp.now().toDate(),
      
       
        
     }).then(() => {
         // Profile updated!
        // alert("Successful...");
        // navigate('/ab4')
        toast.success('questions submitted')
       
       
       
         // ...
       }).catch((error) => {
         // An error occurred
         // ...
         toast.error('Operation failed...try again')
         console.log(error)
        // alert(" An error occurred...try again");
       });


  setQuestions("");
  setTime("");
  setInstruction("");
  setTitle("");
  setTheory("");
  setSubject("");

 





  }
 


  return (
    <> 
      <h2>EMPIRE OF GRACE.  QUESTION PORTAL.</h2>
      <ToastContainer/>

      <TextField 
        multiline
        id="standard-basic"
        label="Enter test subject..."
        variant="standard"
        sx={{ marginTop: '5px', width: '50%' }}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      
      <TextField 
        multiline
        id="standard-basic"
        label="Enter test title..."
        variant="standard"
        sx={{ marginTop: '5px', width: '50%' }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField 
        multiline
        id="standard-basic"
        label="Enter time limit..."
        variant="standard"
        sx={{ marginTop: '5px', width: '50%' }}
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

     <TextField 
        multiline
        id="standard-basic"
        label="Enter instruction..."
        variant="standard"
        sx={{ marginTop: '5px', width: '50%' }}
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
      />

    <Divider sx={{margin:"10px"}}/>


       
    <TextField multiline id="standard-basic" label=" Enter theory here..." variant="standard" 
      sx={{marginTop:"5px"}}
       value={newTheory} 
       onChange={(e) => setNewTheory(e.target.value)} />

       <Stack direction="row" sx={{display:"flex" ,justifyContent:"space-between"}}>
       <Button sx={{marginTop:2,width:"30%",bgcolor:blue[600],borderRadius:6,marginBottom:5,marginLeft:"5%"}} variant="contained"  onClick={addTheory}>ADD </Button>
       <Button sx={{marginTop:2,width:"30%",bgcolor:blue[600],borderRadius:6,marginBottom:5,marginRight:"5%"}} variant="contained"  onClick={deleteLastTheory}>DELETE</Button>
       </Stack>
     
      <ol>
    {theory && theory.map(({question})=>(
       <li>{question}</li>
    ))}
 
    </ol>

    <Divider sx={{margin:"10px"}}/>



      <TextField 
        multiline
        id="standard-basic"
        label="Enter question here"
        variant="standard"
        sx={{ marginTop: '5px', width: '50%' }}
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />

      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          sx={{ marginTop: 2, width: '20%', bgcolor: blue[600], borderRadius: 6, marginBottom: 5, marginLeft: '5%' }}
          variant="contained"
          onClick={addQuestion}
        >
          ADD
        </Button>
        <Button
          sx={{ marginTop: 2, width: '20%', bgcolor: blue[600], borderRadius: 6, marginBottom: 5, marginRight: '5%' }}
          variant="contained"
          onClick={deleteLastQuestion}
        >
          DELETE
        </Button>
      </Stack>

      <ol>
        {questions.map((question, index) => (
          <li key={index}>
            {question.question}
            <br/>
            <TextField
              id={`choice-${index}`}
              label="Enter choice"
              variant="standard"
              sx={{ marginTop: '5px', width: '50%' }}
              value={newChoice}
              onChange={(e) => setNewChoice(e.target.value)}
            /><br/>
           
            <Button
              sx={{ marginTop: 2, width: '20%', bgcolor: blue[600], borderRadius: 6 }}
              variant="contained"
              onClick={() => addChoice(index)}
            >
              Add Choice
            </Button>
            <Button
              sx={{ marginTop: 2, width: '20%', bgcolor: blue[600], borderRadius: 6 }}
              variant="contained"
              onClick={() => deleteLastChoice(index)}
            >
              Delete Last Choice
            </Button> <br/>
            {question.question}
          
            <ul>
              {question.choices.map((choice, choiceIndex) => (
                <li key={choiceIndex}>{choice}</li>
               
              ))} 
            </ul>
          </li>
        ))}
      </ol>
      <button onClick={handleClick}>SUBMIT</button>
    </>
  );
}
 
export default Two;
