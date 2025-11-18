"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

type WebGLShaderProps = {
  className?: string
}

export function WebGLShader({ className }: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const refs = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: {
      resolution: { value: THREE.Vector2 }
      time: { value: number }
      xScale: { value: number }
      yScale: { value: number }
      distortion: { value: number }
    } | null
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        float d = length(p) * distortion;
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);
        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

    const initScene = () => {
      const scene = new THREE.Scene()
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setClearColor(new THREE.Color(0x000000), 0)

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)
      const uniforms = {
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        time: { value: 0 },
        xScale: { value: 1 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      }

      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array([
        -1.0, -1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, 1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
      ])
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
      })

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      refs.current.scene = scene
      refs.current.renderer = renderer
      refs.current.camera = camera
      refs.current.mesh = mesh
      refs.current.uniforms = uniforms

      handleResize()
    }

    const animate = () => {
      if (refs.current.uniforms) refs.current.uniforms.time.value += 0.01
      if (refs.current.renderer && refs.current.scene && refs.current.camera) {
        refs.current.renderer.render(refs.current.scene, refs.current.camera)
      }
      refs.current.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      const { renderer, uniforms } = refs.current
      if (!renderer || !uniforms || !canvas) return
      const width = canvas.clientWidth || window.innerWidth
      const height = canvas.clientHeight || window.innerHeight
      renderer.setSize(width, height, false)
      uniforms.resolution.value.set(width, height)
    }

    initScene()
    animate()
    window.addEventListener("resize", handleResize)

    return () => {
      const { scene, mesh, renderer, animationId } = refs.current
      if (animationId) cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      if (mesh) {
        scene?.remove(mesh)
        mesh.geometry.dispose()
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose())
        } else {
          mesh.material.dispose()
        }
      }
      renderer?.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className={className ?? "absolute inset-0 h-full w-full"} />
}

export default WebGLShader

