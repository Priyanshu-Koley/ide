import React, { useState,useEffect } from 'react';
import './CodeEditor.css';
const CodeEditor = ({setCode,lang}) => {

const prefilledC = `// Online C compiler to run C program online

#include <stdio.h>
int main() {
  printf("Hello world");
  return 0;
}`;
    
const prefilledJava = `// Online Java Compiler
// Use this editor to write, compile and run your Java code online
// Use class name as 'main'
    
class main {
  public static void main(String[] args) 
  {
    System.out.println("Hello, World!");
  }
}`;
    
const prefilledPy = `# Online Python compiler (interpreter) to run Python online.
# Write Python 3 code in this online editor and run it.

print("Hello world")`;


  const [lineCount, setLineCount] = useState(1);
  const [precode, setPreCode] = useState();


useEffect(()=>{
  console.log("editor useeffect");
  let defaultCode;
  
  if(lang==='c')
  {
    defaultCode=prefilledC;
  }
  else if(lang==='java')
  {
    defaultCode=prefilledJava;
  }
  else if(lang==='py')
  {
    defaultCode=prefilledPy;
  }       
  setPreCode(defaultCode);
  console.log(precode);
  setCode(defaultCode);
  setLineCount(defaultCode.split('\n').length);
},[lang]);

const codeChange = (e) => {
  const val = e.target.value;
  setCode(val);
  // console.log(code);
  const valArray = val.split('\n');
  setLineCount(valArray.length);
}
  

//for scrolling both the line number and editor at same time
var isSyncingLeftScroll = false;
var isSyncingRightScroll = false;
var leftDiv = document.getElementById('left');
var rightDiv = document.getElementById('right');
// console.log(leftDiv);
const leftDivScroll = function() {
  if (!isSyncingLeftScroll) {
    isSyncingRightScroll = true;
    rightDiv.scrollTop = leftDiv.scrollTop;
  }
  isSyncingLeftScroll = false;
}

const rightDivScroll = function() {
  if (!isSyncingRightScroll) {
    isSyncingLeftScroll = true;
    leftDiv.scrollTop = rightDiv.scrollTop;
  }
  isSyncingRightScroll = false;
}


  return (
    <div>
      <div className="code-editor">
        <div onScroll={leftDivScroll} className="line-numbers" id="left">
          {Array.from({ length: lineCount }, (_, index) => (
            <div key={index + 1}>{index + 1}</div>
          ))}
        </div>
                <textarea 
                  spellCheck="false" 
                  onScroll={rightDivScroll} 
                  id="right" 
                  className=" code-input" 
                  onChange={codeChange} 
                  defaultValue={precode}>
                </textarea>
      </div>
    </div>
  );

};

export default CodeEditor;