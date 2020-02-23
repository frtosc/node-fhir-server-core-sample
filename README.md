FHIR API Server Example
=======
learning by doing a FHIR API server with `@asymmetrik/node-fhir-server-core`

## Call examples
- Simple Express service: http://localhost:3000/lista-neoc
- Metadata: http://localhost:3000/fhir/4_0_0/metadata
- Patients 
  - http://localhost:3000/fhir/4_0_0/Patient
  - http://localhost:3000/fhir/4_0_0/Patient?_id=patient-19
  - http://localhost:3000/fhir/4_0_0/Patient/patient-19
- Encounters
  - http://localhost:3000/fhir/4_0_0/Encounter
  - http://localhost:3000/fhir/4_0_0/Encounter?_id=encounter-10
- Documents
  - http://localhost:3000/fhir/4_0_0/Bundle?_type=document
  - http://localhost:3000/fhir/4_0_0/Bundle?_id=document-10
- StructureDefinition
  - http://localhost:3000/fhir/4_0_0/StructureDefinition

## Todo list
- Operatrions
  - http://localhost:3000/fhir/4_0_0/Patient/[id]/$everything
    - see https://github.com/Asymmetrik/node-fhir-server-core/blob/master/docs/CustomOperations.md
- Modify CapabilityStatement
  - see https://github.com/Asymmetrik/node-fhir-server-core/blob/master/docs/CustomCapability.md
- Generate Documentation
  - see https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation
