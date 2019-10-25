const { resolveSchema, loggers} = require('@asymmetrik/node-fhir-server-core');
const logger = loggers.get('default');
const encounterDB = [];
let Encounter = undefined;

module.exports.search = (args) => new Promise((resolve, reject) => {
    logger.info('encounter.search');
    const { base_version, _id } = args;
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
    if (Encounter === undefined) {
        Encounter = require(resolveSchema(base_version, 'Encounter'));
    }

    const e = new Encounter();
    e.id = 'encounter-' + id;
    e.status = 'finished';
    e.class = {system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode', code: 'AMB', display: 'ambulatory'};
    e.subject = {reference: 'Patient/patient-5', display: 'Personcina Malatina'};
    e.participant = [
        {individual: {reference: 'Practitioner/xpln-123456', display: 'Prof. Dr. med. Medicone Professorone'}},
        {individual: {reference: 'Practitioner/xpln-789012', display: 'Infermierino Inoino'}}
    ];
    e.period = {start: "2015-01-17", end: "2015-01-17"};
    e.appointment = {reference: 'Appointment/appointment-' + id, display: 'Appuntamento Follow up 3 mesi'};
    e.episodeOfCare = {reference: 'EpisodeOfCare/labelnumber-' + id};
    e.location = [{location: {reference: 'Location/areaGuid-' + id, display:'Ambulatorio di Fuffologia' }}];
    e.reasonCode = {text: 'Motivo della visita'};
    e.diagnosis = [{condition: {display:'diagnosi 2'}, rank: 1}, {condition: {display:'diagnosi 2'}, rank: 2}];
    return e;
}