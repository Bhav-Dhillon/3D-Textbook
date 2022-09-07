import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload(`/home_models/steroid.glb`);

function Models(props) {
    const ref = useRef()
    const { nodes, materials } = useGLTF('/home_models/steroid.glb')

    useFrame((state) => {
        ref.current.rotation.z = Math.sin((state.clock.elapsedTime) * 1.5) / 6
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, props.flipped ? (Math.PI * 1.5) : Math.PI / 2 , 0.25)

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