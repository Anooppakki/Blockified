const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require("web3");
const truffle_connect = require("./connection/app.js");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", express.static("public_static"));

app.get("/getCand", (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.getCandidate(function(answer) {
    res.send(answer);
  });
});

app.get("/listInstitutes", (req, res) => {
  console.log("**** GET /getInstitutes ****");
  truffle_connect.listInstitutes(function(answer) {
    res.send(answer);
  });
});
app.get("/listStudents", (req, res) => {
  console.log("**** GET /getStudents ****");
  truffle_connect.listStudents(function(answer) {
    res.send(answer);
  });
});
app.get("/listEmployers", (req, res) => {
  console.log("**** GET /getEmployers ****");
  truffle_connect.listEmployers(function(answer) {
    res.send(answer);
  });
});
app.get("/listCertificates", (req, res) => {
  console.log("**** GET /getCertificates ****");
  truffle_connect.listCertificates(function(answer) {
    res.send(answer);
  });
});
app.post("/listPendingCertificates", (req, res) => {
  console.log("**** POST /getPendingCertificates ****");
  let instituteID = req.body.instituteID;
  truffle_connect.listCertificates(function(answer) {
    pending = [];
    answer.forEach(element => {
      if (Number(element[4]) == 0 && Number(element[5]) == instituteID)
        pending.push(element);
    });

    res.send(pending);
  });
});
app.post("/listStudentCertificates", (req, res) => {
  console.log("**** POST /getStudentCertificates ****");
  let studentID = req.body.studentID;
  truffle_connect.listCertificates(function(answer) {
    certs = [];
    answer.forEach(element => {
      if (Number(element[2]) == studentID) certs.push(element);
    });

    res.send(certs);
  });
});

app.post("/addInstitute", (req, res) => {
  console.log("**** POST /addInstitute ****");
  let name = req.body.name;
  let password = req.body.password;
  let field = req.body.field;
  truffle_connect.addInstitute(name, password, field, function(answer) {
    res.send(answer);
  });
});
app.post("/addEmployer", (req, res) => {
  console.log("**** POST /addEmployer ****");
  let name = req.body.name;
  let password = req.body.password;
  let field = req.body.field;
  truffle_connect.addEmployer(name, password, field, function(answer) {
    res.send(answer);
  });
});
app.post("/addStudent", (req, res) => {
  console.log("**** POST /addStudent ****");
  let name = req.body.name;
  let password = req.body.password;
  truffle_connect.addStudent(name, password, function(answer) {
    res.send(answer);
  });
});
app.post("/addCertificate", (req, res) => {
  console.log("**** POST /addCertificate ****");
  let title = req.body.title;
  let studentID = req.body.studentID;
  let img = req.body.img;
  let instituteID = req.body.instituteID;
  truffle_connect.addCertificate(title, studentID, img, instituteID, function(
    answer
  ) {
    res.send(answer);
  });
});
app.post("/verifyCertificate", (req, res) => {
  console.log("**** POST /verifyCertificate ****");
  let certificateID = req.body.certificateID;
  truffle_connect.verifyCertificate(certificateID, function(answer) {
    res.send(answer);
  });
});
app.post("/rejectCertificate", (req, res) => {
  console.log("**** POST /rejectCertificate ****");
  let certificateID = req.body.certificateID;
  truffle_connect.rejectCertificate(certificateID, function(answer) {
    res.send(answer);
  });
});

app.post("/loginStudent", (req, res) => {
  console.log("**** POST /loginStudent ****");
  let name = req.body.name;
  let password = req.body.password;
  truffle_connect.listStudents(function(answer) {
    var data = { verified: false };
    answer.forEach(element => {
      if (element[1] == name && element[2] == password)
        data = { verified: true, user: element };
    });
    res.send(data);
  });
});

app.post("/loginInstitute", (req, res) => {
  console.log("**** POST /loginInstitute ****");
  let name = req.body.name;
  let password = req.body.password;
  truffle_connect.listInstitutes(function(answer) {
    var data = { verified: false };
    answer.forEach(element => {
      if (element[1] == name && element[2] == password)
        data = { verified: true, user: element };
    });
    res.send(data);
  });
});

app.post("/loginEmployer", (req, res) => {
  console.log("**** POST /loginEmployer ****");
  let name = req.body.name;
  let password = req.body.password;
  truffle_connect.listEmployers(function(answer) {
    var data = { verified: false };
    answer.forEach(element => {
      if (element[1] == name && element[2] == password)
        data = { verified: true, user: element };
    });
    res.send(data);
  });
});

app.get("/getAccounts", (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function(answer) {
    res.send(answer);
  });
});

app.listen(port, () => {
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:9545")
  );

  console.log("Express Listening at http://localhost:" + port);
});

// app.get("/getAccounts", (req, res) => {
//     console.log("**** GET /getAccounts ****");
//     truffle_connect.start(function(answer) {
//         res.send(answer);
//     });
// });

// app.post("/getBalance", (req, res) => {
//     console.log("**** GET /getBalance ****");
//     console.log(req.body);
//     let currentAcount = req.body.account;

//     truffle_connect.refreshBalance(currentAcount, answer => {
//         let account_balance = answer;
//         truffle_connect.start(function(answer) {
//             // get list of all accounts and send it along with the response
//             let all_accounts = answer;
//             response = [account_balance, all_accounts];
//             res.send(response);
//         });
//     });
// });

// app.post("/sendCoin", (req, res) => {
//     console.log("**** GET /sendCoin ****");
//     console.log(req.body);

//     let amount = req.body.amount;
//     let sender = req.body.sender;
//     let receiver = req.body.receiver;

//     truffle_connect.getCounter(balance => {
//         res.send(balance);
//     });
// });
