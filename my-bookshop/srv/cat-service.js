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
    insertLog(req, Logs, aLog);
    console.log("inserted into Logs: ", aLog)
    res.status(200).end();
  });

  app.get("/logs", async (req, res, next) => {
    await readLogs(Logs, req, res)
  });

  app.get("/version", async (req, res, next) => {
    res.json("{'version': '1.0'}")
  });

  srv.on('READ', 'Books', (req) => {
    let aLog = { "tenantId": "anExampleTenant", "message": "Attempting to read a book", "level": "D" }
    console.log("inserted into DB Logs that somebody tried to get books.")
    insertLog(req, Logs, aLog);
    let query = SELECT.from(Books)
    return cds.run(query);
  })
}

async function readLogs(Logs, req, res) {
  response = await SELECT.from(Logs)
  res.json(response)    
}

function insertLog(req, Logs, aLog) {
  const tx = cds.transaction(req);
  tx.run(
    INSERT.into(Logs).entries(aLog)
  );
}
