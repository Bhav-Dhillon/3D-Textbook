/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/diamond6-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Empty" scale={0.1}>
          <group name="ZnS_Unit_Cell" rotation={[0, -0.83, 0]}>
            <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.Material} />
            <mesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials['S Material']} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/diamond6-transformed.glb')
