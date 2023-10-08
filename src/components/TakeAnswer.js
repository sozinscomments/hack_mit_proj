import { useState } from 'react';
import '../App.css';

function TakeAnswer({inputValue,handleInputChange,handleSubmit,handleInputKeyDown}) {
    
    return( //got rid of classname="App" for the div, might make it look bad
    <div>
        <input className="custom-input" type="text" id="answerInput" value={inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown}/>
        <button className="btn" onClick={handleSubmit}>Submit</button>
    </div>
    );
}

export default TakeAnswer;