import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import One from './VirtualClassroom/TestOne';
import Two from './VirtualClassroom/TestTwo';
import Signup from './VirtualClassroom/Signup';
import VerificationTransition from './VirtualClassroom/VerificationTransit';
import StudentHomePage from './VirtualClassroom/StudentHomePage';
import Profileupdate from './VirtualClassroom/Updateprofile';
import Answers from './VirtualClassroom/Answers';
import Results from './VirtualClassroom/Results';
import Science from './VirtualClassroom/Science';
import Maths from './VirtualClassroom/maths';


import AdminAddResult from './VirtualClassroom/AdminAddResults';
import Studentresult from './VirtualClassroom/Studentresultpage';
import Emaths from './VirtualClassroom/Emaths';
import Ict from './VirtualClassroom/ict';
import IctAnswers from './VirtualClassroom/IctAnswers';
import MathsAnswers from './VirtualClassroom/MathsAnswers';
import ScienceAnswers from './VirtualClassroom/ScienceAnswers';
import EmathsAnswers from './VirtualClassroom/EmathsAnswers';

import AnswerDetail1 from './VirtualClassroom/Answerdetails1';
import AnswerDetail2 from './VirtualClassroom/Answerdetails2';
import AnswerDetail4 from './VirtualClassroom/Answerdetails4';
import AnswerDetail3 from './VirtualClassroom/Answerdetails3';
import QuestionDetail1 from './VirtualClassroom/QuestionDetail1';
import QuestionDetail2 from './VirtualClassroom/QuestionDetail2';
import QuestionDetail3 from './VirtualClassroom/QuestionDetail3';
import QuestionDetail4 from './VirtualClassroom/QuestionDetail4';
import Page1 from './DEMO/Page1';
import Page2 from './DEMO/Page2';
import Page3 from './DEMO/Page3';
import Body1 from './MINI_PROJECT/Body1';
import Body2 from './MINI_PROJECT/Body2';
import Body3 from './MINI_PROJECT/Body3';
import Profile from './MINI_PROJECT/Profile';
import Body4 from './MINI_PROJECT/Body4';
import GoogleSignIn from './MINI_PROJECT/GoogleSignIn';
import Updateprofile from './MINI_PROJECT/Updateprofile';
import VerificationTransitions from './MINI_PROJECT/VerificationTransition';
import ForumDetails from './MINI_PROJECT/ForumDetails';
import Profile2 from './MINI_PROJECT/Profile2';





function App() {
  return (
   
   
    <> 
   
      <BrowserRouter>          
        <Routes>  
        <Route index element={<GoogleSignIn/>}/> 
        <Route path="/home" element={<Body1/>}/> 
        <Route path="/forums" element={<Body2/>}/> 
        <Route path="/more" element={<Body3/>}/>   
        <Route path="/profile" element={<Body4/>}/>
         <Route path="/myprofile" element={<Profile2/>}/>  
        <Route path="/update-profile" element={<Updateprofile/>}/> 
        <Route path="/transitioning" element={<VerificationTransitions/>}/>  
        <Route path="/forumdetails/:id" element={<ForumDetails/>}/>



        <Route path="/page1" element={<Page1/>}/> 
        <Route path="/page2" element={<Page2/>}/>  
        <Route path="/page3" element={<Page3/>}/>




        <Route path="/transition" element={<VerificationTransition/>}/>
        <Route path="/studenthomepage" element={<StudentHomePage/>}/>
        <Route path="/updateprofile" element={<Profileupdate/>}/>
        <Route path="/answers" element={<Answers/>}/>
        <Route path="/results" element={<Results/>}/>
        <Route path="/sciencetest" element={<Science/>}/>
        <Route path="/mathstest" element={<Maths/>}/>
        <Route path="/emathstest" element={<Emaths/>}/>
        <Route path="/icttest" element={<Ict/>}/>
        <Route path="/ictanswers" element={<IctAnswers/>}/>
        <Route path="/mathsanswers" element={<MathsAnswers/>}/>
        <Route path="/scienceanswers" element={<ScienceAnswers/>}/>
        <Route path="/emathsanswers" element={<EmathsAnswers/>}/>
        <Route path="/sciencequestions/:id" element={<QuestionDetail1/>}/>
        <Route path="/cmathsquestions/:id" element={<QuestionDetail2/>}/>
        <Route path="/emathsquestions/:id" element={<QuestionDetail3/>}/>
        <Route path="/ictquestions/:id" element={<QuestionDetail4/>}/>

        <Route path="/answerdetail1/:id" element={<AnswerDetail1/>}/>
        <Route path="/answerdetail2/:id" element={<AnswerDetail2/>}/>
        <Route path="/answerdetail3/:id" element={<AnswerDetail3/>}/>
        <Route path="/answerdetail4/:id" element={<AnswerDetail4/>}/>
        <Route path="/one" element={<One/>}/>
        <Route path="/two" element={<Two/>}/>
        <Route path="/studentresultpage" element={<Studentresult/>}/>
        <Route path="/adminaddresult/:userId" element={<AdminAddResult/>}/>

     
        </Routes> 
      </BrowserRouter>
    
    </>
   

  );
}

export default App;
