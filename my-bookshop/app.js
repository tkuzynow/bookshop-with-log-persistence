const bootstrap = require('./cds-bootstrap')

let cdsConfiguration = {
    //  'service':'all'
}
bootstrap.cds_server(cdsConfiguration)
    .then(text => {
        console.log(text);
    })
    .catch(err => {
        console.log('Exception on CDS bootstrapping');
        // Deal with the fact the chain failed
    });