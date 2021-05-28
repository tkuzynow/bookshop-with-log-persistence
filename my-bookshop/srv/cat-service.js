const { Log, LogLevel } = require('../gen/srv/srv/Log');
const cds = require('@sap/cds')
module.exports = (srv) => {

  const { Books } = cds.entities('my.bookshop')
  const { Logs } = cds.entities('my.bookshop')

  srv.on('READ', 'Books', (req) => {
    let aLog = new Log("anExampleTenant", LogLevel.DEBUG);
    const affectedRows = insertLog(req, Logs, aLog);
    console.log("insterted into Logs that somebody tried to get books. New rows added {}", affectedRows.count)
    let query = SELECT.from(Books)
    return cds.run(query);
  })
}

function insertLog(req, Logs, aLog) {
  const tx = cds.transaction(req);
  const affectedRows = tx.run(
    INSERT.into(Logs).entries(aLog)
  );
  return affectedRows;
}
