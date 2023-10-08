import logo from './logo.svg';
import './App.css';
import GameMain from './components/GameMain';
import Home from './components/Home';
import Selector from './components/Selector';
import { useState } from 'react';


function App() {
  const [state, setState] = useState('home');

  const [grade, setGrade] = useState(5);
  const [number, setNumber] = useState(10);

  const handleGradeInputChange = (event) => {
      setGrade(event.target.value);
    }
  
  const handleNumberInputChange = (event) => {
      setNumber(event.target.value);
    }
//TODO: have selector update some state things that actually impact the game

  if (state=='home'){
    return(<Home moveNext={() => setState('selector')}/>);}
  else if (state=='selector'){
    return(<Selector moveNext={() => setState('game')} handleGradeInputChange = {handleGradeInputChange} handleNumberInputChange = {handleNumberInputChange} grade={grade} number={number}/>);
  }
  else if (state=='game'){
    return(<GameMain moveNext={() => setState('selector')} grade={grade} number={number}/>);
  }
}

export default App;
