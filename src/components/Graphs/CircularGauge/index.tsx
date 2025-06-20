import React from "react";
import * as d3 from "d3";

interface CircularGaugeProps {
  score: number; // 0 to 100
  title: string;
}

interface CustomArcObject extends d3.DefaultArcObject {
  cornerRadius?: number;
  startAngle: number;
  endAngle: number;
}

const CircularGauge: React.FC<CircularGaugeProps> = ({ title, score }) => {
  // Constants
  const START_ANGLE = -Math.PI / 2;
  const END_ANGLE = Math.PI / 2;
  const INNER_RADIUS = 0.8;
  const OUTER_RADIUS = 0.9;
  const MARKER_RADIUS = 0.07;
  const GAP_PX = 0.1;

  // Normalized for viewBox [-1, -1, 2, 2]
  const AVERAGE_RADIUS = (INNER_RADIUS + OUTER_RADIUS) / 2;
  const CIRCUMFERENCE = Math.PI * AVERAGE_RADIUS; // Half-circle
  const TOTAL_PIXEL_LENGTH = CIRCUMFERENCE * 2;
  const GAP_ANGLE =
    (GAP_PX / (Math.PI * 2)) * 2 * Math.PI * (1 / TOTAL_PIXEL_LENGTH); // in radians

  // Segments
  const segments = [
    { start: 0, end: 50, color: "#DC3545" }, // Red
    { start: 50, end: 75, color: "#FFC107" }, // Yellow
    { start: 75, end: 100, color: "#28A745" }, // Green
  ];

  const totalGapAngle = GAP_ANGLE * (segments.length - 1);
  const totalDrawableAngle = END_ANGLE - START_ANGLE - totalGapAngle;

  // Create arc generator
  const arcGenerator = d3.arc<CustomArcObject>().cornerRadius(2);

  // Build arcs with gaps
  const arcs = segments.map((segment, index) => {
    const startAngle =
      START_ANGLE +
      index * GAP_ANGLE +
      totalDrawableAngle * (segment.start / 100);
    const endAngle =
      START_ANGLE +
      index * GAP_ANGLE +
      totalDrawableAngle * (segment.end / 100);

    return {
      innerRadius: INNER_RADIUS,
      outerRadius: OUTER_RADIUS,
      startAngle: startAngle + GAP_ANGLE / 2,
      endAngle: endAngle - GAP_ANGLE / 2,
      color: segment.color,
    };
  });

  // Get angle for score respecting gaps
  const getAngleForScore = (value: number) => {
    const clamped = Math.min(Math.max(value, 0), 100);
    const segment = segments.find(
      (s) => clamped >= s.start && clamped <= s.end
    );
    if (!segment) return START_ANGLE;

    const segmentIndex = segments.indexOf(segment);
    const segmentRange = segment.end - segment.start;
    const percentWithinSegment = (clamped - segment.start) / segmentRange;

    const gapBefore = GAP_ANGLE * segmentIndex;
    const segmentAnglePortion = totalDrawableAngle * (segmentRange / 100);
    const angle =
      START_ANGLE +
      gapBefore +
      totalDrawableAngle * (segment.start / 100) +
      percentWithinSegment * segmentAnglePortion;

    return angle;
  };

  const markerAngle = getAngleForScore(score);
  const markerRadius = AVERAGE_RADIUS;
  const markerLocation: [number, number] = [
    markerRadius * Math.sin(markerAngle),
    -markerRadius * Math.cos(markerAngle),
  ];

  // Determine marker color
  const getBlobColor = (value: number) => {
    const segment =
      segments.find((s) => value >= s.start && value < s.end) ||
      segments[segments.length - 1];
    return segment.color;
  };

  return (
    <div className="w-100 h-auto flex flex-col items-center justify-center relative">
      <svg viewBox="-1 -1 2 1" className="w-full h-auto">
        {arcs.map((arc, i) => (
          <path
            key={i}
            d={
              arcGenerator({
                innerRadius: arc.innerRadius,
                outerRadius: arc.outerRadius,
                startAngle: arc.startAngle,
                endAngle: arc.endAngle,
              }) || ""
            }
            fill={arc.color}
          />
        ))}
        <circle
          cx={markerLocation[0]}
          cy={markerLocation[1]}
          r={MARKER_RADIUS}
          strokeWidth="0.02"
          fill="white"
          stroke={getBlobColor(score)}
        />
      </svg>

      <div className="absolute bottom-4 text-center">
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-bold">{score}</p>
      </div>
    </div>
  );
};

export default CircularGauge;
