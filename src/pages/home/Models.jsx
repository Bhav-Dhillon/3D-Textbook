import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload(`/transformed_models_home/testosterone2-transformed.glb`);
console.log('home models loaded');



function Models(props) {
    const ref = useRef()
    const { nodes, materials } = useGLTF('/transformed_models_home/testosterone2-transformed.glb')

    useFrame((state) => {
        // console.log(state.clock.getDelta());
        ref.current.rotation.z = Math.sin((state.clock.elapsedTime) * 1.5) / 6
        // ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, props.flipped ? (Math.PI / 2) : (Math.PI * 1.5), 0.25)
    })

    return (
    <group position={[-.1, .55, -1]} {...props} dispose={null}>
        <group ref={ref} scale={0.055} rotation={[(Math.PI / 2), 0, 0]}>
            <mesh geometry={nodes.SurfSphere.geometry} material={materials.Oxygen} />
            <mesh geometry={nodes.SurfSphere_1.geometry} material={materials.Carbon} />
            <mesh geometry={nodes.SurfSphere_2.geometry} material={materials.Hydrogen} />
        </group>
    </group>
    )
}

export default Models;