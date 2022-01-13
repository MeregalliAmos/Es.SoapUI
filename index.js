
const { response } = require("express");
var express = require("express");
var apiServer = express();
var fs = require("fs");
console.log("funziona");

var port = 3000;
var host = "localhost";

apiServer.listen(port, host, () => {
  console.log("server running at http://",host, port);
});

apiServer.get("/", (request, response) => {
  console.log("sono in get /", request);
  response.send("<h1> Ciao client sei in home </h1>");
});

var nome = "Amos";
apiServer.get("/nome", (request, response) => {
  console.log("richiesta get su nome");
  response.send("Ciao il mio nome è: " + nome);
});

/*apiServer.get("/mioNome", (request, response) => {
  console.log("richiesta get su mioNome", request.query.nome);
  response.setHeader("Content-Type","application/json");
  response.send(JSON.stringify({"nome":request.query.nome}, null, 3));
});*/

apiServer.post("/mioNome", (request, response) => {
  console.log("richiesta post su mioNome", request.body.nome);
  response.setHeader("Content-Type","application/json");
  response.send(JSON.stringify({"nome":request.body.nome}, null, 3));
});

// http://localhost:3000/somma?a=1&b=2
apiServer.get("/somma", (request, response) => {
  console.log("somma request", request.query.nome);
  response.send("risultato = " + (parseInt(request.query.a) + parseInt(request.query.b)));
});

// http://localhost:3000/student?id=69
apiServer.get("/student", (request, response)=>{
  console.log("student.id: ", request.query.id);
  fs.readFile("students.json",(err, data) => {
    if(err) {
      console.log("error: " + err);
    }else{
      var students = JSON.parse(data);
      for (let index = 0; index < students.length; index++) {
        if(students[index].id == parseInt(request.query.id)){
          console.log("students: " + students[index].surname);
          response.send("students: " + students[index].surname);
        }
      }
    }
  });
});
