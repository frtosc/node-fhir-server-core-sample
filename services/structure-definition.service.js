const { resolveSchema, loggers } = require("@asymmetrik/node-fhir-server-core");
const logger = loggers.get("default");
const structureDefinitionDB = [];
let StructureDefinition = undefined;

module.exports.search = args =>
  new Promise((resolve, reject) => {
    logger.info("structure-definition.search");
    const { base_version, _id } = args;
    resolve(_id ? findById(base_version, _id) : findAll(base_version));
  });

const findById = (base_version, id) =>
  findAll(base_version).find(p => p.id == id);

const findAll = base_version => {
  if (structureDefinitionDB.length == 0) {
    structureDefinitionDB.push(
      createEncounterStructureDefinition(base_version)
    );
  }
  return structureDefinitionDB;
};

const createEncounterStructureDefinition = base_version => {
  if (StructureDefinition === undefined) {
    StructureDefinition = require(resolveSchema(
      base_version,
      "StructureDefinition"
    ));
  }

  const s = new StructureDefinition();
  s.id = "Encounter";
  s.fhirVersion = "4.0.0";
  s.version = "4.0.0";
  s.type = "Encounter";
  s.text = { status: "generated", div: "<div><div>" };
  s.kind = "resource";
  s.contact = [
    { name: "Team Leit\nSviluppo e Integrazione\nEnte Ospedaliero Cantonale" }
  ];
  s.publisher = "Ente Ospedaliero Cantonale";
  s.baseDefinition = "http://hl7.org/fhir/StructureDefinition/Encounter";
  s.derivation = "specialization";
  s.status = "draft";
  s.abstract = false;
  s.description =
    "Un'interazione tra un paziente ed un fruitore di prestazioni sanitarie";
  s.meta = { lastUpdated: "2019-10-30T12:00:00Z" };
  s.snapshot = {
    element: [
      {
        id: "Encounter",
        path: "Encounter",
        short:
          "Un'interazione tra un paziente ed un fruitore di prestazioni sanitarie",
        definition:
          "Un'interazione tra un paziente ed un fruitore di prestazioni sanitarie",
        min: 0,
        max: "*",
        alias: ["Visita"],
        isModifier: false,
        isSummary: false
      },
      {
        id: "Encounter.id",
        path: "Encounter.id",
        min: 1,
        max: "1"
      },
      {
        id: "Encounter.status",
        path: "Encounter.status",
        short: "finished",
        definition: "finished",
        comment:
          "Note that internal business rules will determine the appropriate transitions that may occur between statuses (and also classes).",
        min: 1,
        max: "1",
        base: {
          path: "Encounter.status",
          min: 1,
          max: "1"
        },
        type: [
          {
            code: "code"
          }
        ],
        constraint: [
          {
            key: "ele-1",
            severity: "error",
            human: "All FHIR elements must have a @value or children",
            expression: "hasValue() or (children().count() > id.count())",
            xpath: "@value|f:*|h:div",
            source: "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        isModifier: true,
        isModifierReason:
          "This element is labeled as a modifier because it is a status element that contains status entered-in-error which means that the resource should not be treated as valid",
        isSummary: true,
        binding: {
          extension: [
            {
              url:
                "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
              valueString: "EncounterStatus"
            }
          ],
          strength: "required",
          description: "Current state of the encounter.",
          valueSet: "http://hl7.org/fhir/ValueSet/encounter-status|4.0.1"
        }
      }
    ]
  };

  return s;
};
