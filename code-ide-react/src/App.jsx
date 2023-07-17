import './App.css';
import axios from 'axios';
import CodeEditor from './CodeEditor';
import CodeOutput from './CodeOutput';
import React, { useState } from 'react';

function App() {

  const [code,setCode]=useState("");
  const [output,setOutput]=useState("");
  const [message,setMessage]=useState("");
  const [lang, setLang] = useState("c");


  


  const runCode = (e)=>{
    e.preventDefault();
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/'+lang,
      headers: { 
        'Content-Type': 'text/plain'
      },
      data : code
    };
        axios.request(config)
        .then(res => {

          // console.log("code "+code);
          // console.log("res "+res.data.output);
          if(res.data.success===false)
          {
            setMessage(res.data.message);
            setOutput(res.data.output);
            // console.log("msg "+output);
          }
          else{
            setOutput(res.data.output);
            setMessage(res.data.message);
            // console.log("op "+output);
          }
        });
  }

  const langChange = (e)=>{
    setLang(e.target.value);
  }
 
  return (
    <div className="App">
      <div className='nav'>
        <h2 className='heading'>Code Editor</h2>
        <div className='right'>
          <select name="lang" id="lang" className='langs' onChange={langChange}>
              <option value="c">C</option>
              <option value="java">Java</option>
              <option value="py">Python</option>
          </select>
          <button className='btn' onClick={runCode}>Run</button>
        </div>
      </div>
      <div className='body'>
        <CodeEditor setCode={setCode} lang={lang}/>
        <CodeOutput output={output} message={message}/>
      </div>
    </div>
  );
}

export default App;
