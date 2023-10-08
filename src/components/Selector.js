import { useState } from 'react';
import '../App.css';

function Selector({ moveNext,handleGradeInputChange,handleNumberInputChange,grade,number }) {
    

    return(
        <div className="App">
          <header className="App-header">
            <label htmlFor="gradeInput">Grade:    </label>
            <input className="custom-input" type="text" id ="gradeInput" value={grade} onChange={handleGradeInputChange}/>
            <label htmlFor="numberInput">Number:    </label>
            <input className="custom-input" type="text" id ="numberInput" value={number} onChange={handleNumberInputChange}/>

            <button className='btn' onClick={moveNext}>Play!</button>
          </header>
        </div>

    )
}

export default Selector;