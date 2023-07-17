const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.text()); 

// route for c language
app.post('/c', (req, res) => {
  const code = req.body;

  // Write the C code to a file
  console.log("code "+code);
  const fileName = "code.c";
  if(code===''||code===' ')
  {
    fs.writeFileSync(fileName, `#include <stdio.h>
  int main() {
      printf("Please Write Code to RUN !");
      return 0;
  }`);
  }
  else
    fs.writeFileSync(fileName, code);

  // Execute the compilation command
  exec(`gcc ${fileName}`, (error, stdout, stderr) => {
    if (error) {
      // Compilation error occurred
      const state=`Compile time error: ${error.message}`;
      console.log(state);
      res.status(200).json({ success: false, state:state, message: stderr });
    } 
    else {
      // Compilation successful, execute the compiled program
      exec('a', (error, stdout, stderr) => {
        if (error) {
          // Execution error occurred
          const state=`Run time error: ${error.message}`;
          console.log(state);
          res.status(200).json({ success: false, state:state,  message: stderr });
        } else {
          // Execution successful, return the output
          res.status(200).json({ success: true, output: stdout });
          console.log(stdout);
        }
      });
    }
  });
  
});



// route for java language
app.post('/java', (req, res) => {
  const codeJava = req.body;
  
  console.log("code "+codeJava);

  // Write the java code to a file
  const fileNameJava = "main.java";
  if(codeJava===''||codeJava===' ')
  {
    fs.writeFileSync(fileNameJava, `class main {
      public static void main(String[] args) {
          System.out.println("Please Write Code to RUN !");
      }
  }`);
  }
  else
  {
    fs.writeFileSync(fileNameJava, codeJava);
  }
  //   console.log(code);

  // Execute the compilation command
  exec(`javac ${fileNameJava}`, (error, stdout, stderr) => {
    if (error) {
      // Compilation error occurred
      const state=`Compile time error: ${error.message}`;
      console.log(state);
      res.status(200).json({ success: false, state:state, message: stderr });
    } else {
      // Compilation successful, execute the compiled program
      exec('java main', (error, stdout, stderr) => {
        if (error) {
          // Execution error occurred
          const state=`Run time error: ${error.message}`;
          console.log(state);
          res.status(200).json({ success: false, state:state,  message: stderr });
        } else {
          // Execution successful, return the output
          res.status(200).json({ success: true, output: stdout });
          console.log(stdout);
        }
      });
    }
  });
  
});



// route for python language
app.post('/py', (req, res) => {
  const codePy = req.body;
  console.log("code "+codePy);
  // Write the java code to a file
  const fileNamePy = "main.py";
  if(codePy===''||codePy===' ')
  {
    fs.writeFileSync(fileNamePy, `# Online Python compiler (interpreter) to run Python online.
    # Write Python 3 code in this online editor and run it.
    
    print("Hello world")`);
  }
  else
  {
    fs.writeFileSync(fileNamePy, codePy);
  }
  //   console.log(code);

  // Execute the compilation command
  exec(`python ${fileNamePy}`, (error, stdout, stderr) => {
    if (error) {
      // Compilation error occurred
      const state=`Error: ${error.message}`;
      console.log(state);
      res.status(200).json({ success: false, state:state, message: stderr });
    } else {
      // Execution successful, return the output
      res.status(200).json({ success: true, output: stdout });
      console.log(stdout);
    }
  });
  
});







app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
