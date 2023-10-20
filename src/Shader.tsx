import { useRef } from "react";
import vertexShader from "./glsl/businessCard.vert";
import fragmentShader from "./glsl/businessCard.frag";
import { ShaderMaterial, Color } from "three";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

export const ShaderComponent = () => {
  const ref = useRef<ShaderMaterial>(null);
  const { progress, colorA, colorB } = useControls({
    progress: {
      step: 0.01,
      value: 0.5,
      max: 1.0,
      min: 0.0,
    },
    colorA: "#ff0000",
    colorB: "#0000ff",
  });

  const shaderMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uProgress: { value: progress },
      // uTime: { value: 0.0 },
      uColorA: { value: new Color(colorA) },
      uColorB: { value: new Color(colorB) },
    }
  });

  useFrame(({ clock }) => {
    // shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh scale={[1.654, 1, 1]}>
      <planeGeometry args={[1, 1, 1]}/>
      <primitive object={shaderMaterial} ref={ref} attach="material"/>
    </mesh>
  )
}