import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { ShaderComponent } from "./Shader";

function App() {
  return (
    <div style={{ height: "100dvh", width: "100dvw" }}>
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 52 }}>
        <ambientLight intensity={1}/>
        <pointLight position={[3, 3, 3]}/>
        <directionalLight position={[-2, 3, 5]}/>
        <ShaderComponent />
        <OrbitControls/>
        <GizmoHelper alignment="top-right" margin={[75, 75]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
      </Canvas>
    </div>
  )
}

export default App