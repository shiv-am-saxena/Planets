/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
export default function Sun() {
    const sun = useLoader(THREE.TextureLoader, './sun.jpg');
    sun.colorSpace = THREE.SRGBColorSpace;
    const ball = useRef(null);
    useFrame((state, delta)=>{
        ball.current.rotation.y += delta/50;
    })
    return (
        <mesh ref={ball}>
            <sphereGeometry args={[5, 64, 64]} />
            <meshPhysicalMaterial map={sun}  />
        </mesh>
    );
}
