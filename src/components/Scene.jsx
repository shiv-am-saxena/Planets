/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Sun from './Sun';
import { createRef, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
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
	gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	const planetRefs = useRef(textures.map(() => createRef()));
	useFrame((state, delta) => {
		planetRefs.current.forEach(ref => {
			if (ref.current) {
				ref.current.rotation.y -= delta / 30;
			}
		});
	});
	const grp = useRef();
	const headings = document.querySelectorAll('.heading');
	const [count, setCount] = useState(0);
	useEffect(() => {
		const positions = [-1.965, -1.57, -0.78, 0, 0.79, 1.57, 2.36, 3.14, 3.92];
		let lastScrollTime = 0;
		let touchStartY = 0;
		let touchEndY = 0;

		// Animation for upward movement
		const gsapAnimationUp = () => {
			gsap.to(grp.current.rotation, { x: 0, y: positions[count] });
			gsap.to(headings, { duration: 1, y: `-=${100}%`, ease: 'power2.inOut' });
		};

		// Reset state to the initial position
		const resetState = () => {
			gsap.to(grp.current.rotation, { x: 0.2, y: -1.965 });
			gsap.to(headings, { duration: 1, y: 0, ease: 'power2.inOut' });
		};

		// Scroll handler for wheel event
		const scrollHandler = e => {
			const now = Date.now();
			if (now - lastScrollTime >= 2000) {
				lastScrollTime = now;
				if (e.deltaY > 0) {
					setTimeout(() => {
						setCount((count + 1) % 9);
					}, 2000);
					gsapAnimationUp();
					if (count === 0) {
						resetState();
					}
				}
			}
		};

		// Touch start handler
		const touchStartHandler = e => {
			touchStartY = e.touches[0].clientY;
		};

		// Touch move handler
		const touchMoveHandler = e => {
			touchEndY = e.touches[0].clientY;
		};

		// Touch end handler to detect swipe direction
		const touchEndHandler = () => {
			const now = Date.now();
			if (now - lastScrollTime >= 2000) {
				lastScrollTime = now;
				if (touchStartY - touchEndY > 50) {
					// Swipe Up
					setTimeout(() => {
						setCount((count + 1) % 9);
					}, 2000);
					gsapAnimationUp();
					if (count === 0) {
						resetState();
					}
				}
			}
		};

		// Add event listeners for both wheel and touch events
		window.addEventListener('wheel', scrollHandler);
		window.addEventListener('touchstart', touchStartHandler);
		window.addEventListener('touchmove', touchMoveHandler);
		window.addEventListener('touchend', touchEndHandler);

		// Cleanup event listeners on unmount
		return () => {
			window.removeEventListener('wheel', scrollHandler);
			window.removeEventListener('touchstart', touchStartHandler);
			window.removeEventListener('touchmove', touchMoveHandler);
			window.removeEventListener('touchend', touchEndHandler);
		};
	}, [headings, count]);
	return (
		<>
			<group rotation={[0.2, -1.965, 0]} ref={grp}>
				<Sun />
				{textures.map((texture, index) => (
					<mesh
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
							<mesh rotation={[-1.1, 0, 0]}>
								<ringGeometry args={[2.4, 5, 64]} />
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
