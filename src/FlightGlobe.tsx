import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import * as d3geo from "d3-geo";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import worldData from "world-atlas/countries-50m.json";

// City coordinates [longitude, latitude]
const MUMBAI: [number, number] = [72.8777, 18.9402];
const NEW_YORK: [number, number] = [-74.006, 40.7128];

// Smooth ease in-out cubic
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Great-circle intermediate points for the flight arc
function greatCirclePoints(
  from: [number, number],
  to: [number, number],
  steps: number
): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push(d3geo.geoInterpolate(from, to)(t) as [number, number]);
  }
  return pts;
}

// Map pin path (teardrop): tip at bottom center (0,0), centered on city dot
function mapPinPath(size: number): string {
  const w = size * 0.6;
  const h = size;
  void w;
  return `M 0,${h * 0.5} C ${-w * 0.55},${h * 0.1} ${-w * 0.55},${-h * 0.5} 0,${-h * 0.5} C ${w * 0.55},${-h * 0.5} ${w * 0.55},${h * 0.1} 0,${h * 0.5} Z`;
}
// Unused — replaced by inline SVG pin below
void mapPinPath;

export const FlightGlobe: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.38;

  // Rotation: center on Mumbai at start, rotate westward so Mumbai goes back,
  // NYC comes forward. Mumbai lon=72.8°E → rotation=-72.8; NYC lon=-74°W → rotation=+74
  const startLon = -MUMBAI[0];   // -72.8 (centers Mumbai)
  const endLon = -NEW_YORK[0];   // +74.0 (centers NYC)

  // Rotation phase: hold Mumbai (0–60), then ease rotate to NYC (60–210), hold (210–270)
  const rotProgress = interpolate(frame, [60, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const easedProgress = easeInOutCubic(rotProgress);
  const globeRotation = startLon + (endLon - startLon) * easedProgress;

  // Gentle tilt stays mostly constant
  const tiltRotation = -20;

  // Projection
  const projection = useMemo(() => {
    return d3geo
      .geoOrthographic()
      .scale(radius)
      .translate([cx, cy])
      .rotate([globeRotation, tiltRotation, 0])
      .clipAngle(90);
  }, [radius, cx, cy, globeRotation, tiltRotation]);

  const pathGenerator = useMemo(
    () => d3geo.geoPath().projection(projection),
    [projection]
  );

  // Graticule (grid lines)
  const graticule = useMemo(() => d3geo.geoGraticule()(), []);
  const graticulePath = pathGenerator(graticule) ?? "";

  // Sphere outline
  const spherePath =
    pathGenerator({ type: "Sphere" } as d3geo.GeoPermissibleObjects) ?? "";

  // Country features from world atlas
  const countries = useMemo(() => {
    const topo = worldData as unknown as Topology;
    const geom = topo.objects.countries as GeometryCollection;
    return topojson.feature(topo, geom) as unknown as GeoJSON.FeatureCollection;
  }, []);

  // Country borders mesh
  const bordersMesh = useMemo(() => {
    const topo = worldData as unknown as Topology;
    const geom = topo.objects.countries as GeometryCollection;
    return topojson.mesh(topo, geom, (a, b) => a !== b);
  }, []);

  const countryPaths = useMemo(() => {
    return countries.features.map((f) => ({
      id: (f as any).id as string,
      d: pathGenerator(f as d3geo.GeoPermissibleObjects) ?? "",
    }));
  }, [countries, pathGenerator]);

  const bordersPath = useMemo(
    () => pathGenerator(bordersMesh as d3geo.GeoPermissibleObjects) ?? "",
    [bordersMesh, pathGenerator]
  );

  // All great-circle points (200 for smooth arc)
  const arcPoints = useMemo(() => greatCirclePoints(MUMBAI, NEW_YORK, 200), []);

  // Arc draws in sync with globe rotation
  const arcProgress = interpolate(frame, [70, 215], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const visibleCount = Math.max(2, Math.floor(arcProgress * arcPoints.length));
  const visibleArcPoints = arcPoints.slice(0, visibleCount);

  // Use pathGenerator (d3 geoPath) with a GeoJSON LineString — correctly clips at hemisphere edge
  const arcSvgPath = useMemo(() => {
    if (visibleArcPoints.length < 2) return "";
    const lineString: GeoJSON.Feature<GeoJSON.LineString> = {
      type: "Feature",
      geometry: { type: "LineString", coordinates: visibleArcPoints },
      properties: {},
    };
    return pathGenerator(lineString as d3geo.GeoPermissibleObjects) ?? "";
  }, [visibleArcPoints, pathGenerator]);

  // Plane: tip of arc — find last point visible on front hemisphere
  const planeGeoPos = visibleArcPoints[visibleCount - 1];
  const planePos = projection(planeGeoPos);
  const planePrevGeoPos = visibleCount > 1 ? visibleArcPoints[visibleCount - 2] : null;
  const planePrevPos = planePrevGeoPos ? projection(planePrevGeoPos) : null;

  let planeAngle = 0;
  if (planePos && planePrevPos) {
    planeAngle = (Math.atan2(
      planePos[1] - planePrevPos[1],
      planePos[0] - planePrevPos[0]
    ) * 180) / Math.PI;
  }

  // Hide plane when it goes behind the globe (projection returns null)
  const planeVisible = planePos !== null && arcProgress > 0.01;

  // City projected positions (null when on back of globe)
  const mumbaiPos = projection(MUMBAI);
  const nycPos = projection(NEW_YORK);

  // Mumbai label opacity
  const mumbaiOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // NYC label opacity
  const nycOpacity = interpolate(frame, [190, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse ring for cities
  const pulseScale = 1 + 0.5 * Math.sin(frame * 0.15);

  // Background star opacity
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title card
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Estimated flight time" label
  const infoOpacity = interpolate(frame, [210, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Simple star field
  const stars = useMemo(() => {
    const s = [];
    for (let i = 0; i < 120; i++) {
      s.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        r: Math.random() * 1.5 + 0.3,
        o: Math.random() * 0.6 + 0.2,
      });
    }
    return s;
  }, []);

  return (
    <div
      style={{
        width,
        height,
        background: "radial-gradient(ellipse at 30% 40%, #0d1b2e 0%, #020810 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Georgia, serif",
      }}
    >
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <defs>
          {/* Ocean gradient — Google Maps style ocean blue */}
          <radialGradient id="oceanGrad" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#4fc3f7" />
            <stop offset="45%" stopColor="#29b6f6" />
            <stop offset="100%" stopColor="#0288d1" />
          </radialGradient>

          {/* Ocean shimmer highlight */}
          <radialGradient id="shineGrad" cx="30%" cy="28%">
            <stop offset="0%" stopColor="rgba(180,230,255,0.18)" />
            <stop offset="70%" stopColor="rgba(100,180,255,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Glow filter for cities */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arc glow */}
          <filter id="arcGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip to globe */}
          <clipPath id="globeClip">
            <path d={spherePath} />
          </clipPath>
        </defs>

        {/* Stars */}
        <g opacity={bgOpacity}>
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.o} />
          ))}
        </g>

        {/* Ocean (globe base) — blue */}
        <path d={spherePath} fill="url(#oceanGrad)" />

        {/* Graticule grid lines over ocean */}
        <path
          d={graticulePath}
          fill="none"
          stroke="rgba(150,210,255,0.15)"
          strokeWidth={0.5}
          clipPath="url(#globeClip)"
        />

        {/* Countries — white fill */}
        <g clipPath="url(#globeClip)">
          {countryPaths.map(({ id, d }) =>
            d ? (
              <path
                key={id}
                d={d}
                fill="#f0ede6"
                stroke="none"
              />
            ) : null
          )}
        </g>

        {/* Country borders — dark thin lines */}
        <path
          d={bordersPath}
          fill="none"
          stroke="rgba(80,60,40,0.55)"
          strokeWidth={0.6}
          clipPath="url(#globeClip)"
        />

        {/* Ocean shine highlight on top */}
        <path d={spherePath} fill="url(#shineGrad)" />

        {/* Globe outer border */}
        <path
          d={spherePath}
          fill="none"
          stroke="rgba(100,180,255,0.4)"
          strokeWidth={1.5}
        />

        {/* Flight arc — d3 pathGenerator handles hemisphere clipping natively */}
        {arcSvgPath && (
          <>
            <path
              d={arcSvgPath}
              fill="none"
              stroke="rgba(220,50,50,0.3)"
              strokeWidth={7}
              strokeLinecap="round"
              filter="url(#arcGlow)"
            />
            <path
              d={arcSvgPath}
              fill="none"
              stroke="#e53935"
              strokeWidth={2.5}
              strokeDasharray="10 5"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Mumbai — map pin + label */}
        {mumbaiPos && (
          <g opacity={mumbaiOpacity}>
            {/* Pulse ring */}
            <circle
              cx={mumbaiPos[0]}
              cy={mumbaiPos[1]}
              r={14 * pulseScale}
              fill="rgba(234,67,53,0.15)"
              stroke="rgba(234,67,53,0.4)"
              strokeWidth={1}
            />
            {/* Pin body (teardrop) */}
            <g transform={`translate(${mumbaiPos[0]}, ${mumbaiPos[1] - 18})`}>
              <path
                d="M 0,18 C -9,8 -9,-6 0,-14 C 9,-6 9,8 0,18 Z"
                fill="#EA4335"
                stroke="white"
                strokeWidth={1.2}
                filter="url(#glow)"
              />
              <circle cx={0} cy={-4} r={4} fill="white" />
            </g>
            {/* Label box */}
            <rect
              x={mumbaiPos[0] + 16}
              y={mumbaiPos[1] - 28}
              width={110}
              height={36}
              rx={6}
              fill="white"
              opacity={0.92}
            />
            <text
              x={mumbaiPos[0] + 22}
              y={mumbaiPos[1] - 12}
              fill="#202124"
              fontSize={14}
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
            >
              Mumbai
            </text>
            <text
              x={mumbaiPos[0] + 22}
              y={mumbaiPos[1] + 4}
              fill="#5f6368"
              fontSize={11}
              fontFamily="Arial, sans-serif"
            >
              India
            </text>
          </g>
        )}

        {/* New York City — map pin + label */}
        {nycPos && (
          <g opacity={nycOpacity}>
            <circle
              cx={nycPos[0]}
              cy={nycPos[1]}
              r={14 * pulseScale}
              fill="rgba(66,133,244,0.15)"
              stroke="rgba(66,133,244,0.4)"
              strokeWidth={1}
            />
            <g transform={`translate(${nycPos[0]}, ${nycPos[1] - 18})`}>
              <path
                d="M 0,18 C -9,8 -9,-6 0,-14 C 9,-6 9,8 0,18 Z"
                fill="#4285F4"
                stroke="white"
                strokeWidth={1.2}
                filter="url(#glow)"
              />
              <circle cx={0} cy={-4} r={4} fill="white" />
            </g>
            <rect
              x={nycPos[0] - 170}
              y={nycPos[1] - 28}
              width={148}
              height={36}
              rx={6}
              fill="white"
              opacity={0.92}
            />
            <text
              x={nycPos[0] - 164}
              y={nycPos[1] - 12}
              fill="#202124"
              fontSize={14}
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
            >
              New York City
            </text>
            <text
              x={nycPos[0] - 164}
              y={nycPos[1] + 4}
              fill="#5f6368"
              fontSize={11}
              fontFamily="Arial, sans-serif"
            >
              United States
            </text>
          </g>
        )}

        {/* Plane icon — only when visible on front hemisphere */}
        {planeVisible && planePos && (
          <g
            transform={`translate(${planePos[0]}, ${planePos[1]}) rotate(${planeAngle + 90})`}
            filter="url(#glow)"
          >
            <polygon points="0,-12 7,8 0,3 -7,8" fill="#ffffff" stroke="#e53935" strokeWidth={1} />
          </g>
        )}
      </svg>

      {/* Title card top */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.4em",
            color: "rgba(245,200,66,0.7)",
            textTransform: "uppercase",
            fontFamily: "Arial, sans-serif",
            marginBottom: 8,
          }}
        >
          Flight Route
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#f5f0e8",
            fontFamily: "Georgia, serif",
            fontWeight: "bold",
            letterSpacing: "0.05em",
          }}
        >
          Mumbai → New York City
        </div>
      </div>

      {/* Bottom info card */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: infoOpacity,
          display: "flex",
          gap: 60,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(245,200,66,0.3)",
          borderRadius: 12,
          padding: "20px 50px",
          backdropFilter: "blur(10px)",
        }}
      >
        {[
          { label: "Distance", value: "12,556 km" },
          { label: "Flight Time", value: "~16 hrs" },
          { label: "Direction", value: "North Atlantic" },
        ].map(({ label, value }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 12,
                color: "rgba(245,200,66,0.6)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: "Arial, sans-serif",
                marginBottom: 6,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#f5f0e8",
                fontFamily: "Georgia, serif",
                fontWeight: "bold",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
