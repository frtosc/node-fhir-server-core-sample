const { resolveSchema, loggers } = require('@asymmetrik/node-fhir-server-core');
const logger = loggers.get('default');
const encounterDB = [];
let Bundle = undefined;

module.exports.search = (args) => new Promise((resolve, reject) => {
    logger.info('bundle.search');
    const { base_version, _id, _type } = args;
    resolve(_id ? findById(base_version, _id) : findAll(base_version));
});

const findById = (base_version, id) => findAll(base_version).find((p) => p.id == id);

const findAll = (base_version) => {
    if (encounterDB.length == 0) {
        for (let i = 0; i < 20; i++) {
            encounterDB.push(create(base_version, i));
        }
    }
    return encounterDB;
}

const create = (base_version, id) => {
    if (Bundle === undefined) {
        Bundle = require(resolveSchema(base_version, 'Bundle'));
    }

    const b = new Bundle();
    b.id = 'document-' + id;
    b.type = 'document';
    b.entry = [
        {
            resource: {
                resourceType: 'Composition',
                status: 'final',
                date: '2019-10-25',
                title: 'Lettera ambulatoriale',
                subject: { reference: 'Patient/patient-' + id, display: 'Personcina Malatina' },
                encounter: { reference: 'Encounter/encounter-' + id },
                meta: {lastUpdate: "2019-10-26T22:12:21Z" },
                type: {text: 'Lettera ambulatoriale'},
                custodian: {display: 'Ente Ospadaliero Cantonale'},
                confidentiality: 'N',
                section: [
                    {title: 'Diagnosi', text: {div: '<div><ul><li>diagnosi1</li><li>diagnosi2</li></ul><div>'}},
                    {text: {div: '<div>Egregio Dottore<br/>la ringrazio bla bla bla <br/> ciao ciao </div>'}}
                ],
                author: [
                    {reference: 'Practitioner/xpl-1', display: 'Prof. Dr. med. Dottorone Oneone'},
                    {reference: 'Practitioner/xpl-1^2', display: 'Dr. med. Dottorino Inoino'}
                ],  
            }
        }
    ];
    return b;
}