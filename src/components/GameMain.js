import { useState, useEffect } from 'react';
import '../App.css';
import TakeAnswer from './TakeAnswer';
import RespondAnswer from './RespondAnswer';

function GameMain({moveNext, grade, number}) {

    const [dict, setDict] = useState({1:["question","answer"],2:["question","answer"]})

  //   async function CallOpenAIAPI() {

  //     const content = `${number} math questions for a ${grade}th grader. Give a single numeric answer to each question. \
  //     Return each question with its corresponding answer. Label each question with 'Question 1', 'Question 2', and so on. \
  //     The answers should each be a single numeric value without units.`;

  //     const APIBody ={
  //     "model": "gpt-3.5-turbo",
  //     "messages": [{ role: 'system', content: content }],
  //     "temperature": 0,
  //     "max_tokens": 256}

  //     await fetch("https://api.openai.com/v1/completions",{
  //     method: "POST",
  //     headers: {"Content-Type": "application/json",
  //               "Authorization": "Bearer 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"},
  //     body: JSON.stringify(APIBody)
  //   }).then((completion) => {
  //     console.log(completion)
  //     const reply_content = completion.choices[0].message.content;

  //     const question_and_answer = reply_content.split("\n");
  //     let on_question = true;
  //     const questions = [];
  //     const answers = [];

  //     for (const element of question_and_answer) {
  //     if (!element || !["Q", "A"].includes(element[0])) {
  //         continue;
  //     }
  //     const colon_index = element.indexOf(":");
  //     const trimmed_element = element.slice(colon_index + 1).trim();
  //     if (on_question) {
  //         questions.push(trimmed_element);
  //         on_question = false;
  //     } else {
  //         answers.push(trimmed_element);
  //         on_question = true;
  //     }
  //     }

  //     const dict = {};

  //     for (let i = 0; i < questions.length; i++) {
  //     dict[i] = [questions[i],answers[i]];
  //     }
  //     setDict(dict);
  //   });
  // }

  //   useEffect(() => {
  //     CallOpenAIAPI();
  //   }, []);
    
    const maxNumberWrong = Math.max(Math.round(0.25*Object.keys(dict).length)-1,0);
    const [numWrong, setNumWrong] = useState(0);
  
    const [idx, setIdx] = useState(0);
  
    const [correct,setCorrect] = useState(true);
  
    const [won,setWon] = useState(false);
  
    const [died, setDied] = useState(false);

    const [submitOpen, setSubmitOpen] = useState(true);

    //const currentQuestion = dict[idx] ? dict[idx][0] : '';
    //const currentAnswer = dict[idx] ? dict[idx][1] : '';

    const [inputValue,setInputValue] = useState("");
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const handleInputKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    const handleSubmit = () => {
      onSubmit(inputValue);
      setInputValue('');
    };
  
    const onSubmit = () => {
      if (inputValue==dict[idx][1]) {
        setCorrect(true);
      }
      else {
        setCorrect(false);
        setNumWrong(numWrong+1);
        if (numWrong >= maxNumberWrong) {
          console.log("setting died")
          setDied(true);
        }
      }
      
      if (idx==Object.keys(dict).length-1){
        setWon(true);
      }
      
      setSubmitOpen(false);
      setTimeout(() => {
        setSubmitOpen(true);
        setIdx(idx+1);
      }, 1000);
    }

    if (Object.keys(dict).length === 0) {
      // If dict is still empty, display loading or fetching data message
      return (
        <div className="App">
          <header className="App-header">
            <p>Loading...</p>
          </header>
        </div>
      );
    }
  
    if(died) {
      return(
        <div className="App">
          <header className="App-header">
            <p>
              your car tragically exploded due to tomfoolery
            </p>
            <button className="btn" onClick={moveNext}>Play Again!</button>
          </header>
        </div>
      );
  
    }
    if (won!=true) {
    return (
      <div className="App">
        <header className="App-header">
          <p className="special-font">
            Question: {dict[idx][0]}
          </p>
          <video width="640" height="360">
            <source src="C:/Users/seanm/Desktop/hackmit/public/trim.374E7A37-E4D4-4503-9BF7-FB4BC97C15ED.mov" type="video/quicktime"/>
          </video>
          {submitOpen ? 
          <TakeAnswer inputValue={inputValue} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleInputKeyDown={handleInputKeyDown}/> : 
          <RespondAnswer quality = {correct}/>}
        </header>
      </div>
    );}
    else{
      return(
        <div className="App">
          <header className="App-header">
            <p>
              Congrats! You won with score {Object.keys(dict).length - numWrong} / {Object.keys(dict).length}
            </p>
            <button className="btn" onClick={moveNext}>Play Again!</button>
          </header>
        </div>
      );
    }
  }
  
  export default GameMain;
  