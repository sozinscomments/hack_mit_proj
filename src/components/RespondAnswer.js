import { useState } from 'react';
import '../App.css';

function RespondAnswer({quality}) {
    if (quality==true) {
        return(
            <div>
                <p>
                    Nice!
                </p>
            </div>
        );
    }
    else {
        return(
            <div>
                <p>
                    Wrong!
                </p>
            </div>

        )
    }
}

export default RespondAnswer;