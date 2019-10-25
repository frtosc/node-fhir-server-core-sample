Sandbox
=======
sperimentazione della libreria `@asymmetrik/node-fhir-server-core`

## Esempi chiamate
- Metadata: http://localhost:3000/4_0_0/metadata
- Patients 
  - http://localhost:3000/4_0_0/Patient
  - http://localhost:3000/4_0_0/Patient?_id=patient-19
  - http://localhost:3000/4_0_0/Patient/patient-19
- Encounters
  - http://localhost:3000/4_0_0/Encounter

## Todo list
- esposizione Encounters
- esposizione Documenti
- implementazione di un server ibrido [feather.js](https://feathersjs.com/) con `@asymmetrik/node-fhir-server-core`
