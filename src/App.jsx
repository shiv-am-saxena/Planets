import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';

export default function App() {
	return (
		<>
			<div className="h-screen w-screen overflow-hidden bg-black">
				<div className="absolute top-0 left-0 z-[2] h-screen w-full">
					<nav className="flex h-20 w-full items-center justify-between bg-transparent px-5 py-4 text-white md:px-10">
						<h3 className="font-bai text-3xl">Planets</h3>
						<div className="font-bai flex gap-5 text-xl">
							<a href="#">Home</a>
							<a href="#">Contact</a>
						</div>
					</nav>
					<div className="absolute top-[15%] left-1/2 -translate-x-1/2 text-white">
						<div className="relative mb-3 h-0.25 w-full">
							<div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
						</div>
						<div className="font-bruno h-10 overflow-hidden text-center uppercase md:h-26">
							<h1 className="heading text-4xl font-bold md:text-8xl">Sun</h1>
							<h1 className="heading text-4xl font-bold md:text-8xl">Mercury</h1>
							<h1 className="heading text-4xl font-bold md:text-8xl">Venus</h1>
							<h1 className="heading text-4xl font-bold md:text-8xl">Earth</h1>
							<h1 className="heading text-4xl font-bold md:text-8xl">Mars</h1>
							<h1 className="heading text-4xl font-bold md:text-8xl">Jupiter</h1>
							<h1 className="heading text-4xl font-bold md:text-8xl">Saturn</h1>
							<h1 className="heading text-4xl font-bold md:text-8xl">Uranus</h1>
							<h1 className="heading text-4xl font-bold md:text-8xl">Neptune</h1>
						</div>
						<div className="relative mt-2 h-0.25 w-full">
							<div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
						</div>
					</div>
				</div>
				<Canvas camera={{ fov: 15, position: [0, 0, 50], antialiasing:true }}>
					<Environment files={['./moonlit_golf_4k.hdr']} />
					<ambientLight />
					<Scene />
				</Canvas>
			</div>
		</>
	);
}
