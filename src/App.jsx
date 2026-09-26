import { useState } from "react";

const recognition = new webkitSpeechRecognition();
const target = "Sallallahu ala Muhammad"

recognition.continuous = false;
recognition.start();

function levenshteinDistance (string1 , string2){

  const string1Len = string1.length
  const string2Len = string2.length
  const matrix = []

  //Levenshtein Distance

  for(let i = 0; i < string1Len + 1; i ++){
    matrix.push([])

    for(let j=0; j < string2Len + 1; j++){
      if(i===0){
        matrix[i].push(j);
    
      } else if(j===0){
        matrix[i].push(i)
      } else {
        const char1 = string1[i - 1]
        const char2 = string2[j - 1]

        if(char1 === char2){
          matrix[i][j] = matrix[i - 1][j - 1];

        }else {
          matrix[i][j] =
            Math.min(
              matrix[i][j - 1],
              matrix[i - 1][j],
              matrix[i - 1][j - 1]
            ) + 1;
        }
      }
    }
  }
  
  return(
    matrix[string1Len][string2Len]
  )
}
console.log(levenshteinDistance("cat", "cut"));



function App (){
  const [count, setCount] = useState(0)

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
  .replace("salallahu ala mohamed", "sallallahu ala muhammad")
  .replace(/salalah wala mohammad|salalah wala mohammed/g , "sallallahu ala muhammad")
  .replace("salalah allah muhammad", "sallallahu ala muhammad")
  .replace("sallallahu alaihi mohammed", "sallallahu ala muhammad")
  
  const cleanTarget = target
  .toLowerCase()
  .replace(/[^\w\s]/g , "")
  .trim()
  .replace(/\s+/g , " ")

    const levendist = levenshteinDistance(cleanTranscript, cleanTarget)

    console.log("Distance:", levendist);

    if (levendist <=7){
      setCount(count + 1)
    }

  }

  let reco = false

  recognition.onend = () => {
    if(reco === true){

   } else {
    recognition.start()
   }
  }

  const stopbtn = () => {
    reco = true
    recognition.stop()
  }

  return (
  <>
    <h1>{count}</h1>
    <button onClick={stopbtn}>Stop</button>  
  </>
  ) 
  
}

export default App