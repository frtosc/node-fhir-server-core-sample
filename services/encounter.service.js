const { resolveSchema, loggers} = require('@asymmetrik/node-fhir-server-core');
const logger = loggers.get('default');
const encounterDB = [];
let Encounter = undefined;
let Coding = undefined;
let Reference = undefined;

module.exports.search = (args) => new Promise((resolve, reject) => {
    logger.info('encounter.search');
    const { base_version, _id } = args;
    resolve(findAll(base_version));
});

const findAll = (base_version) => {
    if (encounterDB.length == 0) {
        for (let i = 0; i < 20; i++) {
            encounterDB.push(create(base_version, i));
        }
    }
    return encounterDB;
}

const create = (base_version, id) => {
    if (Encounter === undefined) {
        Encounter = require(resolveSchema(base_version, 'Encounter'));
    }
    if (Coding === undefined) {
        Coding = require(resolveSchema(base_version, 'Coding'))
    }
    if (Reference === undefined) {
        Reference = require(resolveSchema(base_version, 'Reference'))
    }

    const e = new Encounter();
    e.id = 'encunter-' + id;
    e.status = 'finished';
    e.class = new Coding();
    e.class.system = 'http://terminology.hl7.org/CodeSystem/v3-ActCode';
    e.class.code = 'AMB';
    e.class.display = 'ambulatory';
    e.subject = new Reference();
    //e.subject.reference = 'Patient/patient-5';
    e.subject = {reference: 'Patient/patient-5'};
    e.participant = [];
    e.period = {start: "2015-01-17", end: "2015-01-17"};

    return e;
}