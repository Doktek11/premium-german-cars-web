import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateRegistrationTax,
  getTerritoryFromParam,
  parseRateParam,
} from "./registrationTax.mjs";

const calculateRate = ({
  emissions,
  territory,
  noAccreditedEmissions = false,
  tramo = null,
}) =>
  calculateRegistrationTax({
    price: 61200,
    emissions,
    months: 11,
    territoryId: getTerritoryFromParam(territory)?.id,
    noAccreditedEmissions,
    urlRate: parseRateParam(tramo),
  });

const assistantTerritoryRates = new Map([
  ["asturias", 16],
  ["baleares", 16],
  ["cataluna", 16],
  ["comunidad_valenciana", 16],
  ["murcia", 15.9],
  ["cantabria", 15],
  ["canarias", 13.75],
  ["ceuta_melilla", 0],
  ["peninsula_general", 14.75],
]);

test("slugs del Asistente PGC y tipos territoriales", () => {
  for (const [slug, rate] of assistantTerritoryRates) {
    const territory = getTerritoryFromParam(slug);

    assert.equal(territory?.id, slug);
    assert.equal(territory?.rate, rate);
  }
});

test("CO2 180 sin territorio -> 9,75%", () => {
  assert.equal(calculateRate({ emissions: 180 }).rate, 9.75);
});

test("CO2 180 con territorio Cataluna -> 9,75%", () => {
  const result = calculateRate({ emissions: 180, territory: "cataluna" });

  assert.equal(result.rate, 9.75);
  assert.equal(result.needsTerritory, false);
});

test("CO2 210 sin territorio -> 14,75% provisional", () => {
  const result = calculateRate({ emissions: 210 });

  assert.equal(result.rate, 14.75);
  assert.equal(result.isProvisionalTerritory, true);
});

test("CO2 210 en Cataluna -> 16%", () => {
  assert.equal(calculateRate({ emissions: 210, territory: "cataluna" }).rate, 16);
});

test("CO2 210 en Canarias -> 13,75%", () => {
  assert.equal(calculateRate({ emissions: 210, territory: "canarias" }).rate, 13.75);
});

test("CO2 210 en Murcia -> 15,9%", () => {
  assert.equal(calculateRate({ emissions: 210, territory: "murcia" }).rate, 15.9);
});

test("emisiones no acreditadas en Cataluna -> 16%", () => {
  assert.equal(
    calculateRate({
      emissions: 120,
      territory: "cataluna",
      noAccreditedEmissions: true,
    }).rate,
    16
  );
});

test("emisiones no acreditadas en Madrid -> 14,75%", () => {
  assert.equal(
    calculateRate({
      emissions: 0,
      territory: "madrid",
      noAccreditedEmissions: true,
    }).rate,
    14.75
  );
});

test("emisiones no acreditadas en peninsula_general -> 14,75%", () => {
  assert.equal(
    calculateRate({
      emissions: 0,
      territory: "peninsula_general",
      noAccreditedEmissions: true,
    }).rate,
    14.75
  );
});

test("territorio invalido no rompe y usa tipo provisional seguro", () => {
  const result = calculateRate({ emissions: 210, territory: "territorio_inventado" });

  assert.equal(result.rate, 14.75);
  assert.equal(result.isProvisionalTerritory, true);
  assert.equal(result.territory, null);
});

test("origen asistente_pgc no activa emisiones no acreditadas", () => {
  const params = new URLSearchParams(
    "valor_boe=61200&co2=110&antiguedad_meses=11&territorio=cataluna&origen=asistente_pgc"
  );
  const result = calculateRate({
    emissions: Number(params.get("co2")),
    territory: params.get("territorio"),
  });

  assert.equal(params.get("origen"), "asistente_pgc");
  assert.equal(result.rate, 0);
  assert.equal(result.needsTerritory, false);
});

test("tramo URL coherente", () => {
  const result = calculateRate({
    emissions: 210,
    territory: "cataluna",
    tramo: "16",
  });

  assert.equal(result.rate, 16);
  assert.equal(result.isUrlRateConsistent, true);
});

test("tramo URL incoherente", () => {
  const result = calculateRate({
    emissions: 180,
    territory: "cataluna",
    tramo: "16",
  });

  assert.equal(result.rate, 9.75);
  assert.equal(result.isUrlRateConsistent, false);
});

test("enlace antiguo sin territorio", () => {
  const result = calculateRate({
    emissions: 200,
    tramo: "14.75",
  });

  assert.equal(result.rate, 14.75);
  assert.equal(result.isUrlRateConsistent, true);
  assert.equal(result.isProvisionalTerritory, true);
});

test("enlace nuevo con territorio y origen", () => {
  const params = new URLSearchParams(
    "valor_boe=61200&co2=210&antiguedad_meses=11&tramo=16&territorio=cataluna&origen=asistente_pgc"
  );
  const result = calculateRate({
    emissions: Number(params.get("co2")),
    territory: params.get("territorio"),
    tramo: params.get("tramo"),
  });

  assert.equal(params.get("origen"), "asistente_pgc");
  assert.equal(result.rate, 16);
  assert.equal(result.territory?.id, "cataluna");
});


test("etiquetas visibles territoriales", () => {
  assert.equal(getTerritoryFromParam("peninsula_general")?.label, "Resto de la Península");
  assert.equal(getTerritoryFromParam("baleares")?.label, "Islas Baleares / Illes Balears");
  assert.equal(getTerritoryFromParam("cataluna")?.label, "Cataluña / Catalunya");
  assert.equal(
    getTerritoryFromParam("comunidad_valenciana")?.label,
    "Comunidad Valenciana / Comunitat Valenciana"
  );
});

test("peninsula_general seleccionado no es provisional", () => {
  const result = calculateRate({ emissions: 210, territory: "peninsula_general" });

  assert.equal(result.rate, 14.75);
  assert.equal(result.isProvisionalTerritory, false);
  assert.equal(result.territory?.label, "Resto de la Península");
});
