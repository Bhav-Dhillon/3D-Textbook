/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/newFullerene13-transformed.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes['atom-dope'].geometry} material={materials['dope-material']} scale={0.62} />
      <mesh geometry={nodes.text.geometry} material={materials['text-material']} position={[0, -4, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes['bonds-rest'].geometry} material={materials['carbon-material']} />
      <mesh geometry={nodes['bonds-soccer'].geometry} material={materials['soccer-material']} />
      <mesh geometry={nodes.proteaseModel.geometry} material={materials.proteaseMaterial} position={[0, 0.83, 0]} rotation={[Math.PI, -1.38, Math.PI]} scale={0.17} />
    </group>
  )
}

useGLTF.preload('/newFullerene13-transformed.glb')
