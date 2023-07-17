// import React, { useState } from 'react';
import './CodeOutput.css';

const CodeOutput = ({output,message}) => {

  

  return (
    <div className='outputContainer'>
      <div className="output">
        <h3 className='op'>Output :</h3>
        &gt; {output} 
      </div>

      <div className="message">
        <h3 className='em'>Error Message: </h3>
        <pre>
          {message} 
        </pre>
      </div>
        
    </div>
  );
};

export default CodeOutput;