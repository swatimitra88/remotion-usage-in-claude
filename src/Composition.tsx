import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  // "NEW YORK CITY" slides up and fades in (starts at frame 10)
  const titleOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [10, 40], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "1905" fades in after title (starts at frame 40)
  const yearOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Thin divider line expands from center (starts at frame 35)
  const lineWidth = interpolate(frame, [35, 65], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle "Theo Through Time" fades in last (starts at frame 65)
  const subtitleOpacity = interpolate(frame, [65, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle vignette pulse
  const vignetteOpacity = interpolate(frame, [0, 30], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
          opacity: vignetteOpacity,
        }}
      />

      {/* Subtle sepia grain texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180,140,80,0.02) 2px, rgba(180,140,80,0.02) 4px)",
        }}
      />

      {/* Main content */}
      <div style={{ position: "relative", textAlign: "center" }}>
        {/* Location tag */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            letterSpacing: "0.35em",
            fontSize: 14,
            color: "#c8a96e",
            textTransform: "uppercase",
            marginBottom: 20,
            fontFamily: "'Arial', sans-serif",
            fontWeight: 400,
          }}
        >
          United States of America
        </div>

        {/* Main title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 96,
            fontWeight: "bold",
            color: "#f5f0e8",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textShadow: "0 0 60px rgba(200,169,110,0.3)",
            lineHeight: 1,
          }}
        >
          New York City
        </div>

        {/* Divider line */}
        <div
          style={{
            margin: "24px auto",
            height: 1,
            width: lineWidth,
            backgroundColor: "#c8a96e",
            opacity: 0.7,
          }}
        />

        {/* Year */}
        <div
          style={{
            opacity: yearOpacity,
            fontSize: 52,
            color: "#c8a96e",
            letterSpacing: "0.25em",
            fontStyle: "italic",
          }}
        >
          1905
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            marginTop: 32,
            fontSize: 16,
            color: "rgba(245,240,232,0.5)",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            fontFamily: "'Arial', sans-serif",
            fontWeight: 300,
          }}
        >
          Theo Through Time
        </div>
      </div>
    </div>
  );
};
