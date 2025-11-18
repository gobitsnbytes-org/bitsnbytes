"use client";
import React from "react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function TeamGlobe() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#3E1E68",
    showAtmosphere: true,
    atmosphereColor: "#E45A92",
    atmosphereAltitude: 0.15,
    emissive: "#5D2F77",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#E45A92",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#E45A92",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 26.8467, lng: 80.9462 }, // Lucknow coordinates
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#E45A92", "#FFACAC", "#5D2F77"];

  // Placeholder arcs - you'll add your team member locations later
  const teamArcs = [
    {
      order: 1,
      startLat: 26.8467,
      startLng: 80.9462,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.1,
      color: colors[0],
    },
    {
      order: 2,
      startLat: 26.8467,
      startLng: 80.9462,
      endLat: 19.076,
      endLng: 72.8777,
      arcAlt: 0.2,
      color: colors[1],
    },
    {
      order: 3,
      startLat: 26.8467,
      startLng: 80.9462,
      endLat: 22.5726,
      endLng: 88.3639,
      arcAlt: 0.15,
      color: colors[2],
    },
  ];

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 h-full w-full">
        <World data={teamArcs} globeConfig={globeConfig} />
      </div>
    </div>
  );
}

