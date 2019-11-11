const { resolveSchema, loggers } = require('@asymmetrik/node-fhir-server-core');
const logger = loggers.get('default');
const getPatient = (base_version) => require(resolveSchema(base_version, 'Patient'));
const patientsDB = [];

module.exports.search = (args) => new Promise((resolve, reject) => {
    logger.info('patient.search');
    const { base_version, _id } = args;
    resolve(_id ? findById(base_version, _id) : findAll(base_version));
});

module.exports.searchById = (args) => new Promise((resolve, reject) => {
    logger.info('patient.searcById');
    let { base_version, id } = args;
    resolve(findById(base_version, id));
});

const findById = (base_version, id) => findAll(base_version).find((p) => p.id == id);

const findAll = (base_version) => {
    if (patientsDB.length == 0) {
        const Patient = getPatient(base_version)
        for (let i = 0; i < 20; i++) {
            patientsDB.push(new Patient({ id: i }));
        }
    }
    return patientsDB;
}
