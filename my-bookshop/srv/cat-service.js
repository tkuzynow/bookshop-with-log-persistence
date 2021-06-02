const cds = require('@sap/cds')
var bodyParser = require('body-parser')
module.exports = (srv) => {

  const { Books } = cds.entities('my.bookshop')
  const { Logs } = cds.entities('my.bookshop')

  // create application/json parser
  // create application/x-www-form-urlencoded parser
  var urlencodedParser = bodyParser.urlencoded({ extended: false })

  var app = cds.app;
  app.post("/logs", urlencodedParser, (req, res) => {
    let aLog = req.body;
    console.log(req.body);
    insertLog(req, Logs, aLog);
    console.log("inserted into Logs: ", aLog)
    res.status(200).end();
  });

  app.get("/logs", (req, res, next) => {
    let query = SELECT.from(Logs)
    let logPromise = cds.run(query)
    logPromise.then(value => {
      console.log('Promise resolved');
      console.log(JSON.stringify(value));
      res.end(JSON.stringify(value));
    }, reject => {
      console.log('rejected')
      console.log(reject)
    });
  });

  srv.on('READ', 'Books', (req) => {
    let aLog = { "tenantId": "anExampleTenant", "level": "D" }
    insertLog(req, Logs, aLog);
    console.log("inserted into Logs that somebody tried to get books.")
    let query = SELECT.from(Books)
    return cds.run(query);
  })
}

function insertLog(req, Logs, aLog) {
  const tx = cds.transaction(req);
  tx.run(
    INSERT.into(Logs).entries(aLog)
  );
}
