import { useState } from "react";

const recognition = new webkitSpeechRecognition();
const target = "Sallallahu ala Muhammad"

recognition.continuous = true;
recognition.start();

recognition.onresult = (event) =>{
  const transcript = event.results[0][0].transcript
  console.log(event.resultIndex)
  console.log(transcript)
  
  const cleanTranscript = transcript
  .toLowerCase()
  .replace(/[^\w\s]/g , "")
  .trim()
  .replace(/\s+/g , " ")
  .replace("salallahu ala mohamad", "sallallahu ala muhammad")
  
  const cleanTarget = target
  .toLowerCase()
  .replace(/[^\w\s]/g , "")
  .trim()
  .replace(/\s+/g , " ")

  if(cleanTranscript === cleanTarget){
    setCount(count + 1)
  }

}

function App (){
  const [count, setCount] = useState(0)

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