import React from "react";
import Svg, { Circle, Path, Polyline, Text } from "react-native-svg";

export default function Logo({ width = 200, height = 200 }) {
  return (
    <Svg viewBox="0 0 200 200" width={width} height={height}>
      {/* Background Navy Blue Circle */}
      <Circle cx="100" cy="100" r="95" fill="#023f4e" />
      {/* Cyan Inner Ring */}
      <Circle
        cx="100"
        cy="100"
        r="85"
        fill="none"
        stroke="#05eeff"
        strokeWidth="4"
      />
      {/* Bright Green Upward Trend / Growth Graphic */}
      <Path
        d="M 50 120 L 80 90 L 110 110 L 150 60"
        fill="none"
        stroke="#07e549"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="120,60 150,60 150,90"
        fill="none"
        stroke="#07e549"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* CPD Text */}
      <Text
        x="100"
        y="165"
        fontFamily="sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
        letterSpacing="4"
      >
        CPD
      </Text>
    </Svg>
  );
}
