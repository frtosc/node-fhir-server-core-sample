const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const { initialize, loggers, constants } = require('@asymmetrik/node-fhir-server-core');
const { VERSIONS } = constants;

const logger = loggers.get('default');

const app = express(feathers());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());
app.use(express.errorHandler());
app.use('/feathers', {
	async find(params) {
		logger.info('feathers ', params.query);
		return params;
	}
});

const config = {
	profiles: {
		patient: { service: './services/patient.service.js', versions: [VERSIONS['4_0_0']] },
		encounter: { service: './services/encounter.service.js', versions: [VERSIONS['4_0_0']] },
		bundle: { service: './services/bundle.service.js', versions: [VERSIONS['4_0_0']] },
		structureDefinition: { service: './services/structure-definition.service.js', versions: [VERSIONS['4_0_0']] }
	}
};

initialize(config, app);

app.listen(3000).on('listening', () =>
	logger.info('Starting the FHIR Server at localhost:3000')
);