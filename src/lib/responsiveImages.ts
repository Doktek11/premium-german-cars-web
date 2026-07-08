const responsiveWidthsBySrc: Record<string, number[]> = {
  "/amggtr-mobile.webp": [640, 960, 1280, 1920],
  "/audi1.webp": [640, 960, 1280, 1920],
  "/audi2.webp": [640, 960, 1280, 1920],
  "/audi3.webp": [640, 960, 1280, 1920],
  "/audi4.webp": [640, 960, 1280, 1920],
  "/bmwconcesionario.webp": [640, 960, 1280],
  "/bmwconcesionario2.webp": [640, 960, 1280],
  "/calculadora-impuesto-matriculacion-2026.webp": [640, 960, 1280],
  "/cockpit.webp": [640, 960],
  "/depreciacion-boe-bmw-320d-touring.webp": [640, 960, 1280],
  "/interior.webp": [640, 960],
  "/interiordos.webp": [640, 960],
  "/mercedes1.webp": [640, 960, 1280, 1920],
  "/mercedes2.webp": [640, 960, 1280, 1920],
  "/mercedes3.webp": [640, 960, 1280, 1920],
  "/rs6.webp": [640, 960, 1280, 1920],
  "/rs6dos.webp": [640, 960, 1280, 1920],
  "/rs6tres.webp": [640, 960, 1280, 1920],
  "/valor-boe-coche-alemania-ia.webp": [640, 960, 1280],
};

const originalWidthBySrc: Record<string, number> = {
  "/bmwconcesionario.webp": 1536,
  "/bmwconcesionario2.webp": 1536,
  "/calculadora-impuesto-matriculacion-2026.webp": 1684,
  "/cockpit.webp": 1280,
  "/depreciacion-boe-bmw-320d-touring.webp": 1917,
  "/interior.webp": 1280,
  "/interiordos.webp": 1280,
  "/valor-boe-coche-alemania-ia.webp": 1904,
};

const intrinsicDimensionsBySrc: Record<
  string,
  { width: number; height: number }
> = {
  "/amggtr-mobile.webp": { width: 2070, height: 1381 },
  "/audi1.webp": { width: 1920, height: 958 },
  "/audi2.webp": { width: 1920, height: 1276 },
  "/audi3.webp": { width: 1920, height: 1275 },
  "/audi4.webp": { width: 1920, height: 1275 },
  "/bmwconcesionario.webp": { width: 1536, height: 1024 },
  "/bmwconcesionario2.webp": { width: 1536, height: 1024 },
  "/calculadora-impuesto-matriculacion-2026.webp": { width: 1684, height: 930 },
  "/cockpit.webp": { width: 1280, height: 960 },
  "/depreciacion-boe-bmw-320d-touring.webp": { width: 1917, height: 950 },
  "/interior.webp": { width: 1280, height: 960 },
  "/interiordos.webp": { width: 1280, height: 960 },
  "/mercedes1.webp": { width: 1920, height: 2880 },
  "/mercedes2.webp": { width: 1920, height: 2880 },
  "/mercedes3.webp": { width: 1920, height: 2880 },
  "/rs6.webp": { width: 1920, height: 2880 },
  "/rs6dos.webp": { width: 1920, height: 2880 },
  "/rs6tres.webp": { width: 1920, height: 2880 },
  "/valor-boe-coche-alemania-ia.webp": { width: 1904, height: 945 },
};

const variantSrc = (src: string, width: number) =>
  src.replace(/\.webp$/, `-${width}.webp`);

export const getResponsiveImageProps = (
  src: string,
  sizes: string
): {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
} => {
  const widths = responsiveWidthsBySrc[src];
  const dimensions = intrinsicDimensionsBySrc[src];

  if (!widths) {
    return { src, ...dimensions };
  }

  const entries = widths.map((width) => `${variantSrc(src, width)} ${width}w`);
  const originalWidth = originalWidthBySrc[src];

  if (originalWidth) {
    entries.push(`${src} ${originalWidth}w`);
  }

  return {
    src,
    srcSet: entries.join(", "),
    sizes,
    ...dimensions,
  };
};
