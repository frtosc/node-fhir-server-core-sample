const { resolveSchema, loggers } = require("@asymmetrik/node-fhir-server-core");
const logger = loggers.get("default");
const getPatient = base_version =>
  require(resolveSchema(base_version, "Patient"));

module.exports.search = args =>
  new Promise((resolve, reject) => {
    logger.info("patient.search");
    const { base_version, _id } = args;

    if (_id) resolve(createFhirPatient(base_version, _id));

    this.app.service("/lista-neoc").find().then(neocs =>
      resolve(neocs.map(neoc => createFhirPatient(base_version, neoc)))
    );
  });

module.exports.searchById = args =>
  new Promise((resolve, reject) => {
    logger.info("patient.searcById");
    let { base_version, id } = args;
    resolve(resolve(createFhirPatient(base_version, id)));
  });

const createFhirPatient = (base_version, neoc) => {
  const Patient = getPatient(base_version);
  return new Patient({ id: neoc });
};
