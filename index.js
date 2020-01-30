const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const {
  initialize,
  loggers,
  constants
} = require("@asymmetrik/node-fhir-server-core");
const { VERSIONS } = constants;

const logger = loggers.get("default");

const app = express(feathers());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());
app.use(express.errorHandler());
app.use("/lista-neoc", {
  async find() {
    logger.info("/lista-neoc ");
    return [1234567, 9999999, 7777777, 5556667];
  }
});

app.get("/fhir/*", (req, res) => {
  res.redirect(req.path.substr(5));
});

const config = {
  profiles: {
    patient: {
      service: "./fhir-services/patient.service.js",
      versions: [VERSIONS["4_0_0"]]
    },
    encounter: {
      service: "./fhir-services/encounter.service.js",
      versions: [VERSIONS["4_0_0"]]
    },
    bundle: {
      service: "./fhir-services/bundle.service.js",
      versions: [VERSIONS["4_0_0"]]
    },
    structureDefinition: {
      service: "./fhir-services/structure-definition.service.js",
      versions: [VERSIONS["4_0_0"]]
    }
  }
};

initialize(config, app);

require("./fhir-services/patient.service.js").app = app;

app.listen(3000).on("listening", () => {
  logger.info("Starting the FHIR Server at localhost:3000");
});
