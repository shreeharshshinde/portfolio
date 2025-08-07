import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

interface TechSkill {
    name: string;
    logo: string;
    category: string;
    color: string;
    proficiency: number;
}

const techSkills: TechSkill[] = [
    // Frontend
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend", color: "#61DAFB", proficiency: 95 },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Frontend", color: "#3178C6", proficiency: 90 },
    { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", category: "Frontend", color: "#000000", proficiency: 85 },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", category: "Frontend", color: "#06B6D4", proficiency: 92 },
    
    // Backend
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Backend", color: "#3776AB", proficiency: 88 },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend", color: "#339933", proficiency: 85 },
    { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Backend", color: "#000000", proficiency: 82 },
    
    // DevOps
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps", color: "#2496ED", proficiency: 78 },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "DevOps", color: "#F05032", proficiency: 90 },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "DevOps", color: "#336791", proficiency: 75 },
    
    // Languages
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Languages", color: "#F7DF1E", proficiency: 95 },
    { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", category: "Languages", color: "#00ADD8", proficiency: 70 },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Languages", color: "#ED8B00", proficiency: 75 },
];

const categories = [
    { name: "All", color: "from-cyan-400 to-blue-500" },
    { name: "Frontend", color: "from-blue-400 to-cyan-500" },
    { name: "Backend", color: "from-green-400 to-emerald-500" },
    { name: "DevOps", color: "from-orange-400 to-red-500" },
    { name: "Languages", color: "from-purple-400 to-pink-500" }
];

// Hexagonal geometry helper
const createHexagonGeometry = (radius: number, height: number) => {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 6);
    return geometry;
};

// Base Hexagonal Plate Component - Clockwise Rotation
const BaseHexPlate: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Clockwise rotation (negative value)
            meshRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, -1, 0]} receiveShadow>
            <primitive object={createHexagonGeometry(8, 0.5)} />
            <meshStandardMaterial 
                color="#1e293b"
                metalness={0.3}
                roughness={0.7}
                emissive="#0f172a"
                emissiveIntensity={0.1}
            />
        </mesh>
    );
};


// Mini Hexagonal Plate Component
const MiniHexPlate: React.FC<{ position: [number, number, number]; index: number }> = ({ position, index }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime;
            meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + index) * 0.3;
            // Subtle rotation for visual interest
            meshRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.1;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh ref={meshRef} position={position} castShadow>
                <primitive object={createHexagonGeometry(2, 0.3)} />
                <meshStandardMaterial 
                    color="#374151"
                    metalness={0.4}
                    roughness={0.6}
                    emissive="#1f2937"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
};

// Tech Coin Component - Revolving around itself with logos on both sides
const TechCoin: React.FC<{ skill: TechSkill; position: [number, number, number]; index: number }> = ({ skill, position, index }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime;
            // Coin revolves around itself (X-axis rotation like a spinning coin)
            meshRef.current.rotation.y = time * 1.5 + index;
            
            if (hovered) {
                meshRef.current.scale.setScalar(1.2);
            } else {
                meshRef.current.scale.setScalar(1);
            }
        }
    });

    return (
        <group position={position}>
            {/* Coin Base */}
            <mesh 
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                castShadow
            >
                <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
                <meshStandardMaterial 
                    color={hovered ? skill.color : "#374151"}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={hovered ? skill.color : "#000000"}
                    emissiveIntensity={hovered ? 0.3 : 0}
                />
            </mesh>

            {/* Logo on Front Side of Coin */}
            <Html position={[0, 0, 0.46]} center distanceFactor={20}>
                <div className="group relative">
                    <div className={`w-16 h-16 bg-transparent rounded-full p-3 transition-all duration-300 transform hover:scale-110 ${
                        hovered ? 'border-white/60 shadow-lg shadow-cyan-500/30' : ''
                    }`}>
                        <img 
                            src={skill.logo} 
                            alt={skill.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                console.warn(`Failed to load logo for ${skill.name}`);
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                    
                    {/* Tooltip */}
                    <div className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 transition-all duration-300 pointer-events-none ${
                        hovered ? 'opacity-100' : ''
                    }`}>
                        <div className="bg-gray-900/95 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap border border-gray-700/50 shadow-xl">
                            {skill.name} ({skill.proficiency}%)
                        </div>
                        <div className="w-3 h-3 bg-gray-900/95 transform rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2 border-l border-t border-gray-700/50"></div>
                    </div>
                </div>
            </Html>

            {/* Logo on Back Side of Coin */}
            <Html position={[0, 0, -0.46]} center distanceFactor={20}>
                <div className="group relative">
                    <div className={`w-16 h-16 rounded-full p-3 transition-all duration-300 transform hover:scale-110 ${
                        hovered ? 'border-white/60 shadow-lg shadow-cyan-500/30' : ''
                    }`}>
                        <img 
                            src={skill.logo} 
                            alt={skill.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                console.warn(`Failed to load logo for ${skill.name}`);
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                </div>
            </Html>

            {/* Glow Effect */}
            {hovered && (
                <mesh position={[0, 0, 0]} scale={[1.3, 1.3, 1.3]}>
                    <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
                    <meshStandardMaterial 
                        color={skill.color}
                        transparent
                        opacity={0.4}
                        emissive={skill.color}
                        emissiveIntensity={0.6}
                    />
                </mesh>
            )}
        </group>
    );
};

// Main Scene Component
const HexagonalScene: React.FC<{ selectedCategory: string }> = ({ selectedCategory }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Very subtle rotation for the entire group
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
        }
    });

    const filteredSkills = selectedCategory === "All" 
        ? techSkills 
        : techSkills.filter(skill => skill.category === selectedCategory);

    // Calculate positions for mini plates in a hexagonal pattern
    const getMiniPlatePositions = (count: number) => {
        const positions: [number, number, number][] = [];
        const radius = 4;
        const angleStep = (2 * Math.PI) / count;
        
        for (let i = 0; i < count; i++) {
            const angle = i * angleStep;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            positions.push([x, 1.5, z]);
        }
        
        return positions;
    };

    const miniPlatePositions = getMiniPlatePositions(Math.min(filteredSkills.length, 6));

    return (
        <>
            {/* Environment and Lighting */}
            <Environment preset="city" />
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.6} />
            <spotLight 
                position={[0, 15, 0]} 
                angle={0.3} 
                penumbra={1} 
                intensity={1}
                castShadow
            />

            <mesh position={[0, 1.5, 0]} castShadow>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.7} metalness={0.7} roughness={0.2} />
            </mesh>

            {/* Base Hexagonal Plate */}
            <BaseHexPlate />

            {/* Mini Hexagonal Plates */}
            <group ref={groupRef}>
                {miniPlatePositions.map((position, index) => (
                    <MiniHexPlate key={index} position={position} index={index} />
                ))}

                {/* Tech Coins with gap */}
                {filteredSkills.slice(0, 6).map((skill, index) => {
                    const position = miniPlatePositions[index];
                    if (!position) return null;
                    
                    return (
                        <TechCoin 
                            key={skill.name} 
                            skill={skill} 
                            position={[position[0], position[1] + 0.8, position[2]]} 
                            index={index} 
                        />
                    );
                })}
            </group>

            {/* Perfect Camera Controls - Zoomed out */}
            <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                target={[0, 0, 0]}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
        </>
    );
};

export const SkillsSection: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            {/* Header Section */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                    Technical Skills
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                    Explore my expertise through interactive 3D hexagonal platforms
                </p>
                
                {/* Category Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                                selectedCategory === category.name
                                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3D Canvas with Perfect Camera Angle - Zoomed Out */}
            <Canvas 
                camera={{ position: [0, 8, 16], fov: 45 }}
                shadows
                gl={{ antialias: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#0a0a0a');
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = 2;
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.toneMappingExposure = 1.2;
                }}
            >
                <Suspense fallback={null}>
                    <HexagonalScene selectedCategory={selectedCategory} />
                    <Stars radius={40} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
                </Suspense>
            </Canvas>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
    );
};
