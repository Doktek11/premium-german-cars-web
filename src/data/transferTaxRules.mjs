export const TRANSFER_TAX_TERRITORY_STATUSES = {
  SUPPORTED: "SUPPORTED",
  SUPPORTED_WITH_CONDITIONS: "SUPPORTED_WITH_CONDITIONS",
  REQUIRES_REVIEW: "REQUIRES_REVIEW",
  UNSUPPORTED: "UNSUPPORTED",
};

const OFFICIAL_SOURCE_VERIFIED_AT = "2026-07-29";

const haciendaNormadoc = (path) => `https://www.hacienda.gob.es/DocLeyes/onlinelt/${path}`;
const stateTpoSource = {
  title: "AEAT, Base imponible y tipos TPO",
  url: "https://www3.agenciatributaria.gob.es/Sede/no-residentes/impuesto-sobre-transmisiones-patrimoniales-actos-documentados/base-imponible-tipos-tpo.html",
  article: "Transmision de bienes muebles o semovientes: tipo estatal 4% si la comunidad autonoma no aprueba otro tipo",
  verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
};
const andalusiaSources = [
  stateTpoSource,
  {
    title: "Ley 5/2021 de Andalucia, de Tributos Cedidos",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-17915",
    article: "Articulos 46, 47, 69 y 73",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Decreto-ley 8/2024 de Andalucia, medidas fiscales por DANA",
    url: "https://ws040.juntadeandalucia.es/sedeboja/lconsolidada/eli/es-an/dl/2024/12/05/8/dof/20241206/spa/html/LE0000939999_20241206.html",
    article: "Articulo 2",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const balearicSources = [
  stateTpoSource,
  {
    title: "Decreto Legislativo 1/2014 de Illes Balears",
    url: "https://boe.es/buscar/act.php?id=BOE-A-2014-6925",
    article: "Articulo 14",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];const cataloniaSources = [
  {
    title: "ATC, declarar la compraventa de un vehiculo usado o de una embarcacion usada (modelo 620)",
    url: "https://atc.gencat.cat/es/tributs/itpajd/tpo/tramit-compravenda-vehicle/",
    article: "Modelo 620, base imponible, tipo impositivo y no obligacion de presentar",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "ATC, tarifas, tipos impositivos y cuota tributaria",
    url: "https://atc.gencat.cat/es/tributs/itpajd/tpo/tarifes-tipus/",
    article: "Transmisiones de medios de transporte (modelo 620)",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Portal Juridic de Catalunya, Decret llei 5/2025, articulo 5",
    url: "https://portaljuridic.gencat.cat/ca/document-del-pjur/?documentId=1009990",
    article: "Articulo 5; modificacion del articulo 641-1 del Codi tributari de Catalunya",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Portal Juridic de Catalunya, Codi tributari de Catalunya",
    url: "https://portaljuridic.gencat.cat/ca/document-del-pjur/?documentId=980772",
    article: "Articulos 641-1.4 y 683-6",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const valenciaSources = [
  {
    title: "Ley 13/1997 de la Comunitat Valenciana",
    url: "https://boe.es/buscar/act.php?id=BOE-A-1998-8202&p=20250531&tn=0",
    article: "Articulo 13.Tres",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const galiciaSources = [
  {
    title: "Decreto Legislativo 1/2011 de Galicia",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2011-18161&p=20241111&tn=1",
    article: "Articulo 14.Seis",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "ATRIGA, Guia del impuesto de compraventa de vehiculos usados",
    url: "https://www.atriga.gal/es_ES/informacion-tributaria/tributos/compraventa-de-vehiculos/informacion-del-tributo/imposto-sobre-transmisions-patrimoniais-compravenda-de-determinados-medios-de-transporte-usado-entre-particulares/guia-do-imposto",
    article: "Base imponible, modelo 620 y tipo impositivo",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const murciaSources = [
  stateTpoSource,
  {
    title: "Decreto Legislativo 1/2010 de la Region de Murcia",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2011-10542",
    article: "Articulo 6.10",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "ATRM, compraventa de vehiculo o embarcacion usados",
    url: "https://agenciatributaria.carm.es/modelos-y-formularios?_101_assetEntryId=1094313&_101_struts_action=%2Fasset_publisher%2Fview_content&_101_type=content&_101_urlTitle=compraventa-de-vehiculo-usado&inheritRedirect=false&p_p_id=101&p_p_lifecycle=0&p_p_mode=view&p_p_state=maximized",
    article: "Modelo 620, base imponible y no obligacion de presentar en cuota cero por antiguedad/cilindrada",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const canarySources = [
  stateTpoSource,
  {
    title: "Decreto Legislativo 1/2009 de Canarias",
    url: "https://boe.es/buscar/act.php?id=BOC-j-2009-90008&p=20241230&tn=0",
    article: "Articulos 31.d, 38 ter y 39",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Agencia Tributaria Canaria, modelo 620",
    url: "https://sede.gobiernodecanarias.org/sede/procedimientos_servicios/tramites/4027",
    article: "Modelo 620 y plazo de presentacion",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const castillaLaManchaSources = [
  {
    title: "Ley 8/2013 de Medidas Tributarias de Castilla-La Mancha",
    url: "https://boe.es/buscar/act.php?id=BOE-A-2014-1368",
    article: "Articulo 20",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Portal Tributario de Castilla-La Mancha, modelo 620",
    url: "https://portaltributario.jccm.es/oficina-electronica/modelos/620-transmision-de-determinados-medios-de-trasporte-usados-vehiculos-6",
    article: "Modelo 620 vigente 2026",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const extremaduraSources = [
  {
    title: "Decreto Legislativo 1/2018 de Extremadura",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-8159",
    article: "Articulos 38, 45 y 75",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const madridSources = [
  {
    title: "Comunidad de Madrid, compraventa de vehiculos",
    url: "https://www.comunidad.madrid/atencion-contribuyente/compraventa-vehiculos",
    article: "Tipo de gravamen y reduccion de valor para taxi, autoescuela o alquiler sin conductor",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Comunidad de Madrid, transmisiones patrimoniales onerosas",
    url: "https://www.comunidad.madrid/atencion-contribuyente/transmisiones-patrimoniales-onerosas",
    article: "Tipo bienes muebles y exclusion de vehiculos en bonificacion de escaso valor",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const laRiojaSources = [
  {
    title: "Gobierno de La Rioja, compraventa de vehiculos usados",
    url: "https://www.larioja.org/tributos/es/asistencia-tributaria-contribuyente/guias-breves/compraventa-vehiculos-usados",
    article: "Modelo 620, base imponible y tipo 4%",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Gobierno de La Rioja, transmisiones patrimoniales onerosas",
    url: "https://www.larioja.org/tributos/en/enlaces-interes/tributos-cedidos/impuesto-transmisiones-patrimoniales-actos-juridicos/informacion/transmisiones-patrimoniales-onerosas",
    article: "Base imponible y modelo 620",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const ceutaMelillaSources = [
  stateTpoSource,
  {
    title: "TRLITPAJD",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-1993-25359",
    article: "Articulo 57 bis.3.c",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "AEAT, informacion residentes en Ceuta y Melilla, modelo 620",
    url: "https://www3.agenciatributaria.gob.es/Sede/declaraciones-informativas-otros-impuestos-tasas/impuesto-sobre-transmisiones-patrimoniales-actos-juridicos/itp-ajd-vehiculos-embarcaciones-recreo-usados.html",
    article: "Punto de conexion, modelo 620, base, tipo 4% y bonificacion 50%",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];

const navarraSources = [
  {
    title: "Convenio Economico Estado-Navarra",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-1990-31117",
    article: "Articulos 8 y 38",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Texto Refundido ITPAJD de Navarra, Decreto Foral Legislativo 129/1999",
    url: "https://www.navarra.es/NR/rdonlyres/3BF801CC-5A0D-40A4-8B3D-5C54EA6D18EE/0/TRTPAJDwebv20.html?v=v20250101",
    article: "Articulos 2 y 8.1.c",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Hacienda Tributaria de Navarra, modelo 620 vehiculos usados",
    url: "https://www.navarra.es/es/tramites/on/-/line/Impuesto-sobre-Transmisiones-Patrimoniales-y-AJD-Transmision-de-determinados-medios-de-transporte-usados",
    article: "Residencia del adquirente, valoracion, modelo 620 y plazo de dos meses",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Normativa Hacienda Navarra",
    url: "https://www.navarra.es/es/web/normativa-hacienda/normativa",
    article: "Precios medios de venta en 2026 vehiculos usados, OF 6/2026",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const basqueConnectionSources = [
  {
    title: "Concierto Economico con el Pais Vasco",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-9969",
    article: "Articulos 31 y 43",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Gobierno Vasco, ITP-AJD y puntos de conexion",
    url: "https://www.euskadi.eus/impuestos-de-transmisiones-patrimoniales-y-actos-juridicos-documentados/web01-s2oga/es/",
    article: "Puntos de conexion y normativa por Territorio Historico",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const alavaSources = [
  ...basqueConnectionSources,
  {
    title: "Hacienda Foral de Alava, preguntas frecuentes ITP-AJD",
    url: "https://web.araba.eus/es/hacienda/impuestos/preguntas-frecuentes-impuesto-transmisiones-y-actos-juridicos-documentados",
    article: "Compraventa de vehiculo usado: base, tipo 4%, modelo 620-TV y exencion provisional de revendedor",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Sede electronica de Alava, modelo 620-TV",
    url: "https://egoitza.araba.eus/es/-/modelo-620",
    article: "Modelo 620-TV y plazo de 30 dias habiles",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Hacienda Foral de Alava, normativa ITP-AJD",
    url: "https://web.araba.eus/es/hacienda/normativa/disposiciones-sobre-transmisiones-y-actos-jur%C3%ADdicos-documentados",
    article: "Decreto Foral 5/2026, precios medios de venta de vehiculos",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const bizkaiaSources = [
  ...basqueConnectionSources,
  {
    title: "Hacienda Foral de Bizkaia, Gure Gida bienes muebles",
    url: "https://www.bizkaia.eus/ogasuna/guregida/fitxabisorea.asp?IdPublicoMostrar=1052&IdPublicoMostrarAnterior=1829&Idioma=ca&Tem_Codigo=7884&bnetmobile=0&codpath_biz=5%7C3405%7C7884&dpto_biz=5",
    article: "NF 1/2011, articulo 13: bienes muebles 4% y tipo 0% condicionado para determinados revendedores",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Hacienda Foral de Bizkaia, modelos tributarios",
    url: "https://www.bizkaia.eus/es/tramites-tributarios/presentacion-declaraciones-y-modelos-tributarios",
    article: "Modelo 620 y modelo 621 para impuesto de transmision de vehiculos usados",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Hacienda Foral de Bizkaia, adquisicion de vehiculo usado en la UE",
    url: "https://www.bizkaia.eus/ogasuna/faq/faq_detalle.asp?Estado=C&IdEtiquetaBuscar2=84&Idioma=CA&N1=1&Previsualizar=SI&Tem_Codigo=7120&Tem_CodigoPrev=5758&Version=1&btnFiltrar1=&btnFiltrar2=&idregistro=900003494&opttipo=&pant=listado",
    article: "Compra a particular UE: modelo 620 o 621; compra a empresario gravada en origen/no TPO Bizkaia",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
const gipuzkoaSources = [
  ...basqueConnectionSources,
  {
    title: "Hacienda Foral de Gipuzkoa, modelo 620",
    url: "https://www.gipuzkoa.eus/es/web/ogasuna/impuestos/modelo/620",
    article: "Modelo 620, plazo de 30 dias habiles, normativa y tablas de valoracion",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "Hacienda Foral de Gipuzkoa, modelos ITP-AJD",
    url: "https://www.gipuzkoa.eus/es/web/ogasuna/impuestos/transmisiones-patrimoniales-ajd/descripcion-y-modelos-a-utilizar",
    article: "Modelo 620 para quien adquiere un vehiculo usado a otro particular",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
  {
    title: "BOG, Norma Foral 18/1987 modificada por Norma Foral 1/2025",
    url: "https://egoitza.gipuzkoa.eus/es/bog?_BoletinOficial_WAR_LEEboletinOficialportlet_anio=2025&_BoletinOficial_WAR_LEEboletinOficialportlet_numBoletin=90&_BoletinOficial_WAR_LEEboletinOficialportlet_url=https%3A%2F%2Fegoitza.gipuzkoa.eus%2Fgao-bog%2Fcastell%2Fbog%2F2025%2F05%2F15%2Fc2503564.htm",
    article: "Articulo 11.1.d: bienes muebles y semovientes 4%",
    verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
  },
];
export const TRANSFER_TAX_TERRITORY_RULES = [
  {
    id: "andalucia",
    aliases: ["andalucia", "andalucia"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2022-01-01",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [
      {
        id: "andalucia_zero_emissions_1_percent",
        kind: "rate",
        vehicleCategories: ["passenger_car"],
        zeroEmissionStatus: "confirmed",
        rate: 0.01,
      },
      {
        id: "andalucia_passenger_over_15_fiscal_hp",
        kind: "rate",
        vehicleCategories: ["passenger_car", "suv"],
        minFiscalHorsepowerExclusive: 15,
        rate: 0.08,
      },
    ],
    source: andalusiaSources[1],
    sources: andalusiaSources,
    note: "Se automatizan tipo estatal general 4%, tipo reducido 1% para turismos con categoria ambiental 0 emisiones, tipo 8% para turismos/todoterrenos que superen 15 CVF y escenario excepcional DANA 0% hasta 2025-12-31 condicionado a evidencia. Las cuotas fijas antiguas no se automatizan porque la Ley 5/2021 vigente derogo el texto refundido anterior.",
  },
  {
    id: "aragon",
    aliases: ["aragon", "aragÃƒÂ³n"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED,
    effectiveFrom: "2005-09-27",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [
      {
        id: "aragon_passenger_over_10_years_up_to_1000cc",
        kind: "fixed_fee",
        vehicleCategories: ["passenger_car", "suv", "mixed_adaptable", "motorcycle"],
        minAgeMonthsExclusive: 120,
        maxEngineDisplacement: 1000,
        fixedFee: 0,
      },
      {
        id: "aragon_passenger_over_10_years_1001_to_1500cc",
        kind: "fixed_fee",
        vehicleCategories: ["passenger_car", "suv", "mixed_adaptable", "motorcycle"],
        minAgeMonthsExclusive: 120,
        minEngineDisplacement: 999,
        maxEngineDisplacement: 1500,
        fixedFee: 20,
      },
      {
        id: "aragon_passenger_over_10_years_1501_to_2000cc",
        kind: "fixed_fee",
        vehicleCategories: ["passenger_car", "suv", "mixed_adaptable", "motorcycle"],
        minAgeMonthsExclusive: 120,
        minEngineDisplacement: 1499,
        maxEngineDisplacement: 2000,
        fixedFee: 30,
      },
    ],
    source: {
      title: "Decreto Legislativo 1/2005 de Aragon, art. 121-6",
      url: haciendaNormadoc("C13.10.tributos_cedidos_aragon.htm"),
      article: "Articulo 121-6",
      verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
    },
  },
  {
    id: "asturias",
    aliases: ["asturias", "principado_asturias", "principado_de_asturias"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED,
    effectiveFrom: "2014-01-01",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [
      {
        id: "asturias_passenger_over_15_fiscal_hp",
        kind: "rate",
        vehicleCategories: ["passenger_car", "suv"],
        minFiscalHorsepowerExclusive: 15,
        rate: 0.08,
      },
    ],
    source: {
      title: "Normativa tributaria del Principado de Asturias, art. 32",
      url: haciendaNormadoc("C13.11.tributos_cedidos_asturias.htm"),
      article: "Articulo 32",
      verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
    },
  },
  {
    id: "baleares",
    aliases: ["baleares", "illes_balears", "islas_baleares"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2014-06-08",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [
      {
        id: "baleares_passenger_over_15_fiscal_hp",
        kind: "rate",
        vehicleCategories: ["passenger_car", "suv"],
        minFiscalHorsepowerExclusive: 15,
        rate: 0.08,
      },
    ],
    source: balearicSources[1],
    sources: balearicSources,
    note: "Se automatizan tipo estatal general 4% y tipo balear 8% para turismos/todoterrenos que superen 15 CVF. El tipo 0% y no presentacion del articulo 14.1 solo aplica a ciclomotores, fuera de las categorias soportadas.",
  },
  {
    id: "canarias",
    aliases: ["canarias", "islas_canarias"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.055,
    specialRules: [
      {
        id: "canarias_tourism_over_10_years_up_to_1000cc",
        kind: "fixed_fee",
        vehicleCategories: ["passenger_car"],
        excludesHistoricVehicle: true,
        minAgeMonthsExclusive: 120,
        maxEngineDisplacement: 1000,
        fixedFee: 40,
      },
      {
        id: "canarias_tourism_over_10_years_1001_to_1500cc",
        kind: "fixed_fee",
        vehicleCategories: ["passenger_car"],
        excludesHistoricVehicle: true,
        minAgeMonthsExclusive: 120,
        minEngineDisplacement: 1000,
        maxEngineDisplacement: 1500,
        fixedFee: 70,
      },
      {
        id: "canarias_tourism_over_10_years_1501_to_2000cc",
        kind: "fixed_fee",
        vehicleCategories: ["passenger_car"],
        excludesHistoricVehicle: true,
        minAgeMonthsExclusive: 120,
        minEngineDisplacement: 1500,
        maxEngineDisplacement: 2000,
        fixedFee: 115,
      },
    ],
    source: canarySources[1],
    sources: canarySources,
    note: "Regla automatizada para operaciones actuales 2025-2026: tipo general 5,5% para bienes muebles y cuotas fijas de turismos a motor usados con mas de diez anos hasta 2000 cc, salvo historicos que tributan al tipo general.",
  },
  {
    id: "cantabria",
    aliases: ["cantabria"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED,
    effectiveFrom: "2002-12-24",
    effectiveTo: null,
    generalRate: 0.08,
    specialRules: [
      {
        id: "cantabria_tourism_over_10_years_up_to_999cc",
        kind: "fixed_fee",
        vehicleCategories: ["passenger_car", "suv"],
        excludesHistoricVehicle: true,
        minAgeMonthsExclusive: 120,
        maxEngineDisplacement: 999,
        fixedFee: 55,
      },
      {
        id: "cantabria_tourism_over_10_years_1000_to_1499cc",
        kind: "fixed_fee",
        vehicleCategories: ["passenger_car", "suv"],
        excludesHistoricVehicle: true,
        minAgeMonthsExclusive: 120,
        minEngineDisplacement: 999,
        maxEngineDisplacement: 1499,
        fixedFee: 75,
      },
      {
        id: "cantabria_tourism_over_10_years_1500_to_1999cc",
        kind: "fixed_fee",
        vehicleCategories: ["passenger_car", "suv"],
        excludesHistoricVehicle: true,
        minAgeMonthsExclusive: 120,
        minEngineDisplacement: 1499,
        maxEngineDisplacement: 1999,
        fixedFee: 115,
      },
    ],
    source: {
      title: "Ley de Cantabria 11/2002 y medidas fiscales actualizadas, art. 11",
      url: haciendaNormadoc("c13.14.tributos_cedidos_cantabria.htm"),
      article: "Articulo 11",
      verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
    },
  },
  {
    id: "castilla_la_mancha",
    aliases: ["castilla_la_mancha", "castilla_mancha"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.06,
    specialRules: [],
    source: castillaLaManchaSources[0],
    sources: castillaLaManchaSources,
    note: "Regla automatizada para operaciones actuales 2025-2026: tipo general 6% para transmisiones de bienes muebles y modelo 620 para medios de transporte usados. No se ha verificado tipo incrementado especifico para turismos.",
  },
  {
    id: "castilla_leon",
    aliases: ["castilla_leon", "castilla_y_leon", "castilla_y_leÃƒÂ³n"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED,
    effectiveFrom: "2014-01-01",
    effectiveTo: null,
    generalRate: 0.05,
    specialRules: [
      {
        id: "castilla_leon_passenger_over_15_fiscal_hp",
        kind: "rate",
        vehicleCategories: ["passenger_car", "suv"],
        minFiscalHorsepowerExclusive: 15,
        rate: 0.08,
      },
    ],
    source: {
      title: "Normas tributarias de Castilla y Leon, arts. 24 y 25",
      url: haciendaNormadoc("c07.03.cd.transmisiones.autonomias_te_23162.htm"),
      article: "Articulos 24 y 25",
      verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
    },
  },
  {
    id: "cataluna",
    aliases: ["cataluna", "catalunya", "cataluÃ±a"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: "2025-06-26",
    generalRate: 0.05,
    specialRules: [],
    source: cataloniaSources[0],
    sources: cataloniaSources,
    note: "Regla actual verificada para operaciones de 2025 inmediatamente anteriores al tipo cero emisiones; fechas anteriores quedan fuera de automatizacion.",
  },
  {
    id: "cataluna",
    aliases: ["cataluna", "catalunya", "cataluÃ±a"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-06-27",
    effectiveTo: null,
    generalRate: 0.05,
    specialRules: [
      {
        id: "cataluna_zero_emissions_from_2025_06_27",
        kind: "rate",
        vehicleCategories: ["passenger_car", "suv", "mixed_adaptable"],
        zeroEmissionStatus: "confirmed",
        rate: 0,
      },
    ],
    source: cataloniaSources[0],
    sources: cataloniaSources,
    note: "Tipo 0% desde 2025-06-27 solo para vehiculos clasificados con distintivo ambiental 0 emisiones; sigue sujeto y obliga a modelo 620.",
  },
  {
    id: "comunidad_valenciana",
    aliases: ["comunidad_valenciana", "valencia", "comunitat_valenciana"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.06,
    specialRules: [],
    source: valenciaSources[0],
    sources: valenciaSources,
    note: "Regla automatizada solo para operaciones actuales 2025-2026: tipo general 6%, 8% por valor igual o superior a 20000 euros o vehiculo de hasta 5 anos y mas de 2000 cc, cuotas fijas por valor inferior a 20000 euros/antiguedad/cilindrada excluyendo historicos y 2% fin de vida util.",
  },
  {
    id: "extremadura",
    aliases: ["extremadura"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.06,
    specialRules: [],
    source: extremaduraSources[0],
    sources: extremaduraSources,
    note: "Regla automatizada para turismos usados ordinarios en operaciones actuales 2025-2026: tipo general 6% para bienes muebles. El tipo 4% de comerciales e industriales ligeros afectos a actividad queda fuera de automatizacion por falta de campos estructurados y no se aplica a turismos normales.",
  },
  {
    id: "galicia",
    aliases: ["galicia"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.03,
    specialRules: [],
    source: galiciaSources[0],
    sources: galiciaSources,
    note: "Regla automatizada para operaciones actuales 2025-2026: tipo general 3%, tipo 0% para categoria ambiental 0 emisiones y cuotas fijas de 22/38 euros para turismos/todoterrenos con uso igual o superior a 15 anos hasta 1599 cc. Si supera 1599 cc se aplica el tipo general.",
  },
  {
    id: "madrid",
    aliases: ["madrid", "comunidad_madrid", "comunidad_de_madrid"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [],
    source: madridSources[0],
    sources: madridSources,
    note: "Regla automatizada para operaciones actuales 2025-2026: tipo general 4% en vehiculos usados. La bonificacion de escaso valor excluye vehiculos registrables. La reduccion de valor al 70% para taxi, autoescuela o alquiler sin conductor se trata por evidencia.",
  },
  {
    id: "murcia",
    aliases: ["murcia", "region_murcia", "region_de_murcia"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [],
    source: murciaSources[1],
    sources: murciaSources,
    note: "Regla automatizada para operaciones actuales 2025-2026: tipo general 4% y cuotas fijas para vehiculos con mas de 12 anos por cilindrada; cuota cero hasta 1000 cc sin obligacion de presentar.",
  },
  {
    id: "navarra",
    aliases: ["navarra", "nafarroa", "comunidad_foral_navarra", "comunidad_foral_de_navarra"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [],
    source: navarraSources[1],
    sources: navarraSources,
    valuationSource: "Precios medios de venta forales de Navarra vigentes en la fecha de devengo; para 2026, OF 6/2026.",
    filingForm: "620",
    note: "Regla automatizada para operaciones actuales 2025-2026: bienes muebles al 4%, modelo 620 y plazo de dos meses. El valor oficial de entrada debe proceder de la valoracion foral navarra aplicable.",
  },
  {
    id: "pais_vasco",
    aliases: ["pais_vasco", "pais_vasco", "euskadi"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: null,
    specialRules: [],
    requiresProvince: true,
    source: basqueConnectionSources[0],
    sources: basqueConnectionSources,
    note: "Regimen foral por territorio historico; buyerRegion=pais_vasco requiere buyerProvince y no selecciona provincia por defecto.",
  },
  {
    id: "alava",
    aliases: ["alava", "araba", "araba_alava", "alava_araba"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [],
    source: alavaSources[2],
    sources: alavaSources,
    valuationSource: "Decreto Foral alaves vigente de precios medios de venta de vehiculos; para 2026, Decreto Foral 5/2026.",
    filingForm: "620",
    note: "Regla automatizada para operaciones actuales 2025-2026: base como mayor entre precio y valor asignado por el Decreto de Valoracion de Vehiculos, tipo 4% y modelo 620-TV.",
  },
  {
    id: "bizkaia",
    aliases: ["bizkaia", "vizcaya"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [],
    source: bizkaiaSources[2],
    sources: bizkaiaSources,
    valuationSource: "Tablas de valoracion forales de Bizkaia vigentes en la fecha de devengo.",
    filingForm: "620",
    note: "Regla automatizada para operaciones actuales 2025-2026: bienes muebles al 4%; vehiculos usados se presentan por modelo 620 o 621, manteniendo 620 como forma canonica del motor.",
  },
  {
    id: "gipuzkoa",
    aliases: ["gipuzkoa", "guipuzcoa"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [],
    source: gipuzkoaSources[2],
    sources: gipuzkoaSources,
    valuationSource: "Tablas de valoracion forales de Gipuzkoa vigentes en la fecha de devengo.",
    filingForm: "620",
    note: "Regla automatizada para operaciones actuales 2025-2026: bienes muebles al 4%, modelo 620 y plazo de 30 dias habiles.",
  },  {
    id: "la_rioja",
    aliases: ["la_rioja", "rioja"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [],
    source: laRiojaSources[0],
    sources: laRiojaSources,
    note: "Regla automatizada para operaciones actuales 2025-2026: tipo general 4% y modelo 620 para vehiculos usados entre particulares.",
  },
  {
    id: "ceuta",
    aliases: ["ceuta"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [],
    source: ceutaMelillaSources[2],
    sources: ceutaMelillaSources,
    note: "Regla automatizada para operaciones actuales 2025-2026: tipo 4% y bonificacion estatal del 50% sobre cuota cuando el comprador reside o tiene domicilio fiscal en Ceuta; resultado economico equivalente al 2% de la base.",
  },
  {
    id: "melilla",
    aliases: ["melilla"],
    status: TRANSFER_TAX_TERRITORY_STATUSES.SUPPORTED_WITH_CONDITIONS,
    effectiveFrom: "2025-01-01",
    effectiveTo: null,
    generalRate: 0.04,
    specialRules: [],
    source: ceutaMelillaSources[2],
    sources: ceutaMelillaSources,
    note: "Regla automatizada para operaciones actuales 2025-2026: tipo 4% y bonificacion estatal del 50% sobre cuota cuando el comprador reside o tiene domicilio fiscal en Melilla; resultado economico equivalente al 2% de la base.",
  },
];

function reviewRule(id, aliases, { note, requiresProvince = false } = {}) {
  return {
    id,
    aliases,
    status: TRANSFER_TAX_TERRITORY_STATUSES.REQUIRES_REVIEW,
    effectiveFrom: null,
    effectiveTo: null,
    generalRate: null,
    specialRules: [],
    requiresProvince,
    source: {
      title: "Pendiente de verificacion oficial completa para automatizacion",
      url: "",
      article: "",
      verifiedAt: OFFICIAL_SOURCE_VERIFIED_AT,
    },
    note,
  };
}

export function normalizeTransferTaxTerritoryKey(value = "") {
  return String(value)
    .trim()
    .toLocaleLowerCase("es-ES")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

const transferTaxTerritoryAliases = TRANSFER_TAX_TERRITORY_RULES.reduce((aliases, rule) => {
  for (const alias of rule.aliases) {
    const normalizedAlias = normalizeTransferTaxTerritoryKey(alias);
    const existingRules = aliases.get(normalizedAlias) ?? [];
    aliases.set(normalizedAlias, [...existingRules, rule]);
  }

  return aliases;
}, new Map());

export function getTransferTaxTerritoryRules(value) {
  const normalizedValue = normalizeTransferTaxTerritoryKey(value);

  if (!normalizedValue) {
    return [];
  }

  return transferTaxTerritoryAliases.get(normalizedValue) ?? [];
}

export function getTransferTaxTerritoryRule(value) {
  const rules = getTransferTaxTerritoryRules(value);

  if (rules.length === 0) {
    return null;
  }

  return [...rules].sort((left, right) => compareRuleEffectiveFromDescending(left, right))[0];
}

function compareRuleEffectiveFromDescending(left, right) {
  return String(right.effectiveFrom ?? "").localeCompare(String(left.effectiveFrom ?? ""));
}
