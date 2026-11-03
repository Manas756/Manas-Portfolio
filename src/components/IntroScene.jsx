import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { MONOGRAM_POINTS } from '../lib/monogram'

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

/** Polished chrome, lit entirely by the light panels in the environment below. */
function useChrome() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#eceef1'),
        metalness: 1,
        roughness: 0.16,
        clearcoat: 0.7,
        clearcoatRoughness: 0.12,
        envMapIntensity: 0,
      }),
    [],
  )
}

function Monogram({ material }) {
  const group = useRef()
  const geometry = useMemo(() => {
    const shape = new THREE.Shape(MONOGRAM_POINTS.map(([x, y]) => new THREE.Vector2(x, y)))
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.34,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.038,
      bevelSegments: 6,
      curveSegments: 1,
    })
    g.center()
    return g
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // Emerge: light rises out of black while the mark turns to face the camera.
    const light = easeInOut(clamp01((t - 0.35) / 1.9))
    const turn = easeOut(clamp01((t - 0.2) / 2.6))
    material.envMapIntensity = light * 1.05
    const g = group.current
    g.rotation.y = THREE.MathUtils.lerp(-0.8, 0.1, turn) + Math.sin(t * 0.6) * 0.03 * turn
    g.rotation.x = THREE.MathUtils.lerp(0.22, -0.03, turn)
    g.position.z = THREE.MathUtils.lerp(-1.4, 0, turn)
    g.position.y = Math.sin(t * 0.9) * 0.02
  })

  return (
    <group ref={group}>
      <mesh geometry={geometry} material={material} />
    </group>
  )
}

/** Moving light panels. Their reflections are what make the metal read as metal. */
function Lights() {
  const sweep = useRef()
  const top = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // A soft vertical strip slides across, behind the camera, so its reflection crosses the face.
    sweep.current.position.x = THREE.MathUtils.lerp(-9, 9, easeInOut(clamp01((t - 0.9) / 2.6)))
    top.current.position.x = Math.sin(t * 0.4) * 1.5
  })
  return (
    <>
      <Lightformer ref={top} form="rect" intensity={2.4} position={[0, 6, -1]} rotation-x={Math.PI / 2} scale={[12, 3, 1]} />
      <Lightformer form="rect" intensity={1.8} position={[-6, 1.2, 0]} rotation-y={Math.PI / 2} scale={[10, 0.9, 1]} />
      <Lightformer form="rect" intensity={1.1} position={[6, -1.5, 0]} rotation-y={-Math.PI / 2} scale={[10, 0.6, 1]} />
      <Lightformer form="rect" intensity={0.35} position={[0, -6, 0]} rotation-x={-Math.PI / 2} scale={[12, 6, 1]} color="#9aa3b2" />
      {/* Horizon bands behind the camera: bright sky, dark seam, soft ground, like the hero's chrome type. */}
      <Lightformer form="rect" intensity={1.25} position={[0, 1.1, 9]} rotation-y={Math.PI} scale={[16, 1.6, 1]} />
      <Lightformer form="rect" intensity={0.55} position={[0, 2.6, 9]} rotation-y={Math.PI} scale={[16, 1.2, 1]} />
      <Lightformer form="rect" intensity={0.22} position={[0, -1.1, 9]} rotation-y={Math.PI} scale={[16, 1.4, 1]} color="#b9c2d0" />
      <Lightformer ref={sweep} form="rect" intensity={3.2} position={[-9, 0, 8]} rotation-y={Math.PI} scale={[1.4, 14, 1]} />
      <Lightformer form="ring" intensity={0.9} position={[0, 3, -8]} scale={4} />
    </>
  )
}

function CameraFit() {
  const { camera, size } = useThree()
  const aspect = size.width / size.height
  camera.position.z = aspect < 1 ? 9 / Math.max(aspect, 0.55) : 9
  camera.updateProjectionMatrix()
  return null
}

export default function IntroScene({ onReady }) {
  const material = useChrome()
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 30 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
        onReady?.()
      }}
    >
      <color attach="background" args={['#000000']} />
      <CameraFit />
      <Monogram material={material} />
      <Environment resolution={256} frames={Infinity}>
        <Lights />
      </Environment>
    </Canvas>
  )
}
