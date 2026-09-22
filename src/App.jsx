import { useState } from "react";

const recognition = new webkitSpeechRecognition();
const target = "Sallallahu ala Muhammad"

recognition.continuous = true;
recognition.start();

// function levenshteinDistance (string1 , string2){
//   return(
//     console.log(0)
//   )
// }



function App (){
  const [count, setCount] = useState(0)

  recognition.onresult = (event) =>{
  const transcript = event.results[0][0].transcript
  console.log("RESULT EVENT FIRED");
  console.log(event.resultIndex)
  console.log(transcript)
  
  const cleanTranscript = transcript
  .toLowerCase()
  .replace(/[^\w\s]/g , "")
  .trim()
  .replace(/\s+/g , " ")
  .replace("salallahu ala mohamad", "sallallahu ala muhammad")
  .replace("salallahu ala mohamed", "sallallahu ala muhammad")
  .replace(/salalah wala mohammad|salalah wala mohammed/g , "sallallahu ala muhammad")
  .replace("salalah allah muhammad", "sallallahu ala muhammad")
  .replace("sallallahu alaihi mohammed", "sallallahu ala muhammad")
  
  const cleanTarget = target
  .toLowerCase()
  .replace(/[^\w\s]/g , "")
  .trim()
  .replace(/\s+/g , " ")

    if(cleanTranscript === cleanTarget){
    setCount(count + 1)
    }

  }

  function stopCounter(){
    recognition.stop()
  }

  return (
  <>
    <h1>{count}</h1>
    <button onClick={stopCounter}>Stop</button>  
  </>
  ) 
  
}

export default App