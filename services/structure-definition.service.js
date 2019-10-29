const { resolveSchema, loggers } = require('@asymmetrik/node-fhir-server-core');
const logger = loggers.get('default');
const structureDefinitionDB = [];
let StructureDefinition = undefined;

module.exports.search = (args) => new Promise((resolve, reject) => {
    logger.info('structure-definition.search');
    const { base_version, _id } = args;
    resolve(_id ? findById(base_version, _id) : findAll(base_version));
});

const findById = (base_version, id) => findAll(base_version).find((p) => p.id == id);

const findAll = (base_version) => {
    if (structureDefinitionDB.length == 0) {
        structureDefinitionDB.push(createEncounterStructureDefinition(base_version));
    }
    return structureDefinitionDB;
}

const createEncounterStructureDefinition = (base_version) => {
    if (StructureDefinition === undefined) {
        StructureDefinition = require(resolveSchema(base_version, 'StructureDefinition'));
    }

    const s = new StructureDefinition();
    s.id = 'Encounter';
    s.fhirVersion = '4.0.0';
    s.version = '4.0.0';
    s.url = 'http://hl7.org/fhir/StructureDefinition/Encounter'
    s.type = 'Encounter';
    s.publisher = 'Ente Ospedaliero Cantonale';
    s.derivation = 'specialization';
    s.status = 'draft';
    s.abstract = false;
    

    return s;
}