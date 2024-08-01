import React, { useState,useEffect } from 'react'
import { collection, onSnapshot,addDoc, orderBy, query, where,orWhere, getDoc, doc, setDoc ,Timestamp} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import { ChooseContext } from './ContextA'

function ChooseContextProvider(props) {
   
   
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('') 
    const [data3, setData3] = useState('')
    const [data4, setData4] = useState('')
    const [data5, setData5] = useState('')

    const { id } = useParams();


    useEffect(()=>{ 
        const  postRef=collection(db,"questions", "science" ,"science");
            const b = query(postRef, orderBy("createdAt","desc"));
  
            onSnapshot(b,(snapshot)=>{
                const data=snapshot.docs.map((doc)=>({ 
                   id:doc.id,   
                   ...doc.data(), 
                }));
  
                console.log("Fetched Data:", data); 
               
                setData1(data);   
                console.log(data1); 
               
            }) 
      },[]);  

      useEffect(()=>{ 
        const  postRef=collection(db,"questions", "social" ,"social");
            const b = query(postRef, orderBy("createdAt","desc"));
  
            onSnapshot(b,(snapshot)=>{
                const data=snapshot.docs.map((doc)=>({ 
                   id:doc.id,   
                   ...doc.data(), 
                }));
  
                console.log("Fetched Data:", data); 
               
                setData2(data);   
                console.log(data2); 
               
            }) 
      },[]); 

      useEffect(()=>{ 
        const  postRef=collection(db,"questions", "english" ,"english");
            const b = query(postRef, orderBy("createdAt","desc"));
  
            onSnapshot(b,(snapshot)=>{
                const data=snapshot.docs.map((doc)=>({ 
                   id:doc.id,   
                   ...doc.data(), 
                }));
  
                console.log("Fetched Data:", data); 
               
                setData3(data);   
                console.log(data3); 
               
            }) 
      },[]); 

      useEffect(()=>{ 
        const  postRef=collection(db,"questions", "maths" ,"maths");
            const b = query(postRef, orderBy("createdAt","desc"));
  
            onSnapshot(b,(snapshot)=>{
                const data=snapshot.docs.map((doc)=>({ 
                   id:doc.id,   
                   ...doc.data(), 
                }));
  
                console.log("Fetched Data:", data); 
               
                setData4(data);   
                console.log(data4); 
               
            }) 
      },[]); 


      const userDetails = async () => {
        try {
          const docRef = doc(db, "questions","science","science" `${id}`);
          const docSnaps = await getDoc(docRef)
    
          if (docSnaps.exists()) { 
            setData5(docSnaps.data());
            console.log("Document data:", docSnaps.data());
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!"); 
          }
        } catch (error) { console.error('an error') }
       
    
      } 
    
      useEffect(() => {
        userDetails();
      }, [id]);
  
   // const [passed, setPassed]=useState([])

    return (
        <div>
            <ChooseContext.Provider 
            value={{data1, data5
                     }}>
              {props.children}
            </ChooseContext.Provider>

        </div>
    )
       

}

export default ChooseContextProvider
