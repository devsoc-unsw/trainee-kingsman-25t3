import React from 'react'

function Box() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <cylinderGeometry attach="geometry" args={[0.5, 0.5, 7]} />
      <meshLambertMaterial attach="material" color="brown" />
    </mesh>
  )
}

export default Box