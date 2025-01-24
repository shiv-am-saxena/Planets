/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Sun from './Sun';
import { createRef, useRef } from 'react';
export default function Scene() {
	const radius = 2;
	const segments = 64;
	const orbitRadius = 15;
	const mercury = useLoader(THREE.TextureLoader, './mercury.jpg');
	const venus = useLoader(THREE.TextureLoader, './venus.jpg');
	const earth = useLoader(THREE.TextureLoader, './earth.jpg');
	const mars = useLoader(THREE.TextureLoader, './mars.jpg');
	const jupiter = useLoader(THREE.TextureLoader, './jupiter.jpg');
	const saturn = useLoader(THREE.TextureLoader, './saturn.jpg');
	const uranus = useLoader(THREE.TextureLoader, './uranus.jpg');
	const neptune = useLoader(THREE.TextureLoader, './neptune.jpg');
	const stars = useLoader(THREE.TextureLoader, './stars.jpg');
	const ring = useLoader(THREE.TextureLoader, './saturn_ring_alpha.png');
	mercury.colorSpace = THREE.SRGBColorSpace;
	venus.colorSpace = THREE.SRGBColorSpace;
	earth.colorSpace = THREE.SRGBColorSpace;
	mars.colorSpace = THREE.SRGBColorSpace;
	jupiter.colorSpace = THREE.SRGBColorSpace;
	saturn.colorSpace = THREE.SRGBColorSpace;
	uranus.colorSpace = THREE.SRGBColorSpace;
	neptune.colorSpace = THREE.SRGBColorSpace;
	stars.colorSpace = THREE.SRGBColorSpace;
	ring.colorSpace = THREE.SRGBColorSpace;
	const textures = [
		mercury,
		venus,
		earth,
		mars,
		jupiter,
		saturn,
		uranus,
		neptune,
	];
	const { gl } = useThree();
	gl.setPixelRatio(window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio);
	const planetRefs = useRef(textures.map(() => createRef()));
	useFrame((state, delta) => {
		planetRefs.current.forEach(ref => {
			if (ref.current) {
				ref.current.rotation.y -= delta / 30;
			}
		});
	});
	return (
		<>
			<group rotation={[0.2, -1.96, 0]}>
				<Sun />
				{textures.map((texture, index) =>
					(<mesh
						key={index}
						ref={planetRefs.current[index]}
						position={[
							orbitRadius * Math.cos(Math.PI * 2 * (index / 8)),
							0,
							orbitRadius * Math.sin(Math.PI * 2 * (index / 8)),
						]}
					>
						<sphereGeometry args={[radius, segments, segments]} />
						<meshPhysicalMaterial map={texture} />
					{index === 5 && (
						<mesh rotation={[-1.1,0,0]}>
							<ringGeometry args={[2.4, 5, 64]}  />
							<meshPhysicalMaterial map={ring} side={THREE.DoubleSide} />
						</mesh>
					)}
					</mesh>
				))}
			</group>
			<mesh>
				<sphereGeometry args={[20, 64, 64]} />
				<meshPhysicalMaterial map={stars} side={THREE.BackSide} />
			</mesh>
		</>
	);
}
