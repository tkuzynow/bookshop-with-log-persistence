const cds = require('@sap/cds')
const express = require('express')

async function cds_server(o) {    //> o = options from CLI
    console.log('inside cds_server 1')
    const app = cds.app = express()

    cds.emit('bootstrap', app)                      //> hook for project-local server.js

    // mount static resources and logger middleware
    if (o.static) app.use(express.static(o.static))  //> defaults to ./app
    if (o.favicon) app.use('/favicon.ico', o.favicon)  //> if none in ./app
    if (o.index) app.get('/', o.index)                //> if none in ./app
    if (o.correlate) app.use(o.correlate)                //> request correlation
    if (o.logger) app.use(o.logger)                   //> basic request logging

    // load specified models or all in project
    const csn = await cds.load(o.from || '*')
    cds.model = o.from = cds.linked(cds.compile.for.odata(csn))

    // connect to essential framework services if required
    // note: cds.deploy() is not a public API
    const _init = o.in_memory && (db => cds.deploy(csn).to(db, o))
    if (cds.requires.db) cds.db = await cds.connect.to('db').then(_init)
    if (cds.requires.messaging) await cds.connect.to('messaging')
    if (cds.requires.multitenancy) await cds.mtx.in(app)

    // serve all services declared in models
    await cds.serve(o.service, o).in(app)
    cds.emit('served', cds.services)
    //> hook for listeners

    // start http server
    const port = (o.port !== undefined) ? o.port : (process.env.PORT || 4004)
    console.log('listening on port: ' + port)
    app.listen(port)
};

module.exports = {
    cds_server: cds_server
}