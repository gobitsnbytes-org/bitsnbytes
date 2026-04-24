"use client";

import dynamic from "next/dynamic";

const FaultyTerminal = dynamic(() => import("@/components/ui/faulty-terminal"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0908] via-[#2f0a13] to-[#8f2d0c]" />
  ),
});

type WebGLShaderProps = {
  className?: string;
};

export function WebGLShader({ className = "" }: WebGLShaderProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()} aria-hidden="true">
      <FaultyTerminal
        scale={1.35}
        gridMul={[1.2, 1.2]}
        digitSize={1.65}
        timeScale={0.18}
        pause={false}
        scanlineIntensity={0.12}
        glitchAmount={0.06}
        flickerAmount={0.015}
        noiseAmp={0.18}
        chromaticAberration={0}
        dither={0}
        curvature={0}
        tint="#ffffff"
        mouseReact={false}
        mouseStrength={0}
        pageLoadAnimation={false}
        brightness={0.5}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-[#060403]/62" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(151,21,52,0.14)_0%,rgba(151,21,52,0)_55%),radial-gradient(70%_55%_at_100%_100%,rgba(255,122,27,0.12)_0%,rgba(255,122,27,0)_66%),radial-gradient(55%_40%_at_0%_100%,rgba(255,176,36,0.1)_0%,rgba(255,176,36,0)_72%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/24" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/12" />
    </div>
  );
}
