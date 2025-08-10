import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Html, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei'
import { Stars } from '@react-three/drei';
import { Nebula } from '../stars/Nebula';
import { CosmicParticles } from '../stars/CosmicParticles';
import { DeepSpace9 } from './ScifiTower';



interface TechSkill {
    name: string;
    logo: string;
    category: string;
    color: string;
    proficiency: number;
}

const techSkills: TechSkill[] = [
    // Languages
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Languages", color: "#ED8B00", proficiency: 75 },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Languages", color: "#3776AB", proficiency: 88 },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Languages", color: "#00599C", proficiency: 70 },
    { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", category: "Languages", color: "#00ADD8", proficiency: 70 },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Languages", color: "#F7DF1E", proficiency: 95 },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Languages", color: "#3178C6", proficiency: 90 },
    
    // Databases
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Databases", color: "#4479A1", proficiency: 80 },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Databases", color: "#336791", proficiency: 75 },
    { name: "Drizzle ORM", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Databases", color: "#C5F74F", proficiency: 70 },
    
    // Frameworks
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frameworks", color: "#FFFFFF", proficiency: 85 },
    { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", category: "Frameworks", color: "#6DB33F", proficiency: 80 },
    { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Frameworks", color: "#FFFFFF", proficiency: 82 },
    { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", category: "Frameworks", color: "#009688", proficiency: 75 },
    { name: "Streamlit", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg", category: "Frameworks", color: "#FF4B4B", proficiency: 70 },
    
    // DevOps
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps", color: "#2496ED", proficiency: 78 },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "DevOps", color: "#F05032", proficiency: 90 },
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "DevOps", color: "#181717", proficiency: 85 },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", category: "DevOps", color: "#232F3E", proficiency: 70 },
    { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg", category: "DevOps", color: "#D24939", proficiency: 65 },
    { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg", category: "DevOps", color: "#326CE5", proficiency: 60 },
    
    // Libraries
    { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", category: "Libraries", color: "#013243", proficiency: 85 },
    { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", category: "Libraries", color: "#150458", proficiency: 80 },
    { name: "Scikit-learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", category: "Libraries", color: "#F7931E", proficiency: 75 },
    { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", category: "Libraries", color: "#5C3EE8", proficiency: 70 },
    { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "Libraries", color: "#FF8F00", proficiency: 65 },
    
    // Frontend (additional)
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend", color: "#61DAFB", proficiency: 95 },
    { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", category: "Frontend", color: "#FFFFFF", proficiency: 85 },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend", color: "#06B6D4", proficiency: 92 },
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "Frontend", color: "#F24E1E", proficiency: 80 },
    { name: "Shadcn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend", color: "#FFFFFF", proficiency: 75 },
    
    // Backend (additional)
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend", color: "#339933", proficiency: 85 },
];

const categories = [
    // { name: "All", color: "from-cyan-400 to-blue-500" },
    { name: "Languages", color: "from-purple-400 to-pink-500" },
    { name: "Frameworks", color: "from-blue-400 to-cyan-500" },
    { name: "Databases", color: "from-green-400 to-emerald-500" },
    { name: "DevOps", color: "from-orange-400 to-red-500" },
    { name: "Libraries", color: "from-yellow-400 to-amber-500" },
    { name: "Frontend", color: "from-indigo-400 to-purple-500" },
    // { name: "Backend", color: "from-teal-400 to-cyan-500" }
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
        <mesh ref={meshRef} position={[0, -2, 0]} receiveShadow>
            <primitive object={createHexagonGeometry(18, 0.8)} />
            <meshStandardMaterial
                color="#1e293b"
                metalness={0.8}
                roughness={0.2}
                emissive="#0f172a"
                emissiveIntensity={0.3}
            />
        </mesh>
    );
};


// Mini Hexagonal Plate Component
const MiniHexPlate: React.FC<{
    position: [number, number, number];
    index: number;
    isGlowing?: boolean;
    glowColor?: string;
    skillName?: string;
}> = ({ position, index, isGlowing = false, glowColor = "#374151", skillName = "" }) => {
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
        <group position={[position[0], position[1], position[2]]}>
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
                <mesh ref={meshRef} castShadow>
                    <primitive object={createHexagonGeometry(3, 0.5)} />
                    <meshStandardMaterial
                        color={isGlowing ? glowColor : "#374151"}
                        metalness={0.7}
                        roughness={0.3}
                        emissive={isGlowing ? glowColor : "#1f2937"}
                        emissiveIntensity={isGlowing ? 0.8 : 0.4}
                    />
                </mesh>
            </Float>
            {/* Skill Name Popup - Visible when hexagon is glowing */}
            {isGlowing && (
                <Html
                    position={[0, 3, 0]}
                    center
                    style={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transform: 'translate3d(-50%, -50%, 0)',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {skillName}
                </Html>
            )}
        </group>
    );
};

// Tech Coin Component - Revolving around itself with logos on both sides
const TechCoin: React.FC<{
    skill: TechSkill;
    position: [number, number, number];
    index: number;
    onHover?: (isHovered: boolean) => void;
}> = ({ skill, position, index, onHover }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    
    // Load the logo as a texture
    const texture = useTexture(skill.logo);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime;
            meshRef.current.position.y = position[1] * 2 + Math.sin(time * 0.8 + index) * 0.4;
            // Coin revolves around itself (X-axis rotation like a spinning coin)
            meshRef.current.rotation.x = time * 1.5 + index;
            // meshRef.current.rotation.z = - time * 0.5 + index;
            
            if (hovered) {
                meshRef.current.scale.setScalar(1.2);
            } else {
                meshRef.current.scale.setScalar(1);
            }
        }
    });

    return (
        <group position={[position[0], position[1], position[2]]}>
            {/* Coin Base */}
            <mesh
                ref={meshRef}
                onPointerOver={() => {
                    setHovered(true);
                    onHover && onHover(true);
                }}
                onPointerOut={() => {
                    setHovered(false);
                    onHover && onHover(false);
                }}
                castShadow
            >
                <cylinderGeometry args={[1.1, 1.1, 0.1, 32]} />
                <meshStandardMaterial
                    map={texture}
                    color={hovered ? skill.color : "#374151"}
                    metalness={0.9}
                    roughness={0.5}
                    emissive={hovered ? skill.color : "#000000"}
                    emissiveIntensity={hovered ? 0.5 : 0.2}
                />
            </mesh>

            {/* Glow Effect */}
            {hovered && (
                <mesh position={[0, 0, 0]} scale={[1.3, 1.3, 1.3]}>
                    <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
                    <meshStandardMaterial
                        color={skill.color}
                        transparent
                        opacity={0.6}
                        emissive={skill.color}
                        emissiveIntensity={0.8}
                    />
                </mesh>
            )}
        </group>
    );
};

// Main Scene Component
const HexagonalScene: React.FC<{ selectedCategory: string }> = ({ selectedCategory }) => {
    const groupRef = useRef<THREE.Group>(null);
    const buildingRef = useRef<THREE.Group>(null);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    useFrame((state) => {
        if (buildingRef.current) {
            buildingRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
        
        if (groupRef.current) {
            // Very subtle rotation for the entire group
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
        }
    });

    const filteredSkills = techSkills.filter(skill => skill.category === selectedCategory);

    // Calculate positions for mini plates in a hexagonal pattern
    const getMiniPlatePositions = (count: number) => {
        // Handle edge case where count is 0
        if (count <= 0) return [];
        
        const positions: [number, number, number][] = [];
        const layers = Math.ceil(count / 6); // Number of layers needed
        
        for (let layer = 0; layer < layers; layer++) {
            const layerCount = Math.min(6, count - layer * 6); // Number of plates in this layer
            // Handle edge case where layerCount is 0
            if (layerCount <= 0) break;
            
            const radius = 12 + layer * 10; // Increase radius for each layer
            const y = 2.0 + layer * 3; // Increase height for each layer
            const angleOffset = layer * Math.PI / 6; // Rotate each layer slightly
            
            for (let i = 0; i < layerCount; i++) {
                const angle = i * (2 * Math.PI / layerCount) + angleOffset;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                // Ensure positions are valid numbers
                positions.push([x || 0, y || 0, z || 0]);
            }
        }
        
        return positions;
    };

    const miniPlatePositions = getMiniPlatePositions(filteredSkills.length);

    return (
        <>
            {/* Environment and Lighting */}
            <Environment preset="city"/>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a00e0" />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#00c9ff" />
            <spotLight
                position={[0, 15, 0]}
                angle={0.3}
                penumbra={1}
                intensity={0.8}
                castShadow
            />
            
            {/* Nebula background for the 3D scene */}
            <Nebula/>
            
            {/* Cosmic particles */}
            <CosmicParticles />


            {/* Base Hexagonal Plate */}
            <BaseHexPlate />
            
            {/* Central Building Model */}
            <DeepSpace9/>

            {/* Mini Hexagonal Plates */}
            <group ref={groupRef}>
                {miniPlatePositions.map((position, index) => {
                    const skill = filteredSkills[index];
                    // Check if position is valid
                    if (!skill || !position || !Array.isArray(position) || position.length < 3) return null;
                    
                    const isGlowing = hoveredSkill === skill.name;
                    return (
                        <MiniHexPlate
                            key={index}
                            position={[position[0] || 0, position[1] || 0, position[2] || 0]}
                            index={index}
                            isGlowing={isGlowing}
                            glowColor={skill.color}
                            skillName={skill.name}
                        />
                    );
                })}

                {/* Tech Coins with gap */}
                {filteredSkills.map((skill, index) => {
                    const position = miniPlatePositions[index];
                    // Check if position is valid
                    if (!position || !Array.isArray(position) || position.length < 3) return null;
                    
                    return (
                        <TechCoin
                            key={skill.name}
                            skill={skill}
                            position={[position[0] || 0, (position[1] || 0) + 0.5, position[2] || 0]}
                            index={index}
                            onHover={(isHovered) => setHoveredSkill(isHovered ? skill.name : null)}
                        />
                    );
                })}
            </group>

            {/* Perfect Camera Controls - Zoomed out */}
            <OrbitControls
                enablePan={true}
                enableZoom={false}
                enableRotate={true}
                target={[0, 0, 0]}
            />
        </>
    );
};

export const SkillsSection: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("Languages");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Nebula-like background elements */}
                <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-gradient-radial from-purple-900/20 via-indigo-900/10 to-transparent rounded-full animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            {/* Header Section */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center z-10">
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                        Technical Skills
                    </h2>
                <p className="text-lg text-gray-300 mb-6">
                    Explore my expertise through interactive Space Base
                </p>
            </div>
            
            {/* Category Filter Buttons - Left Side */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
                <div className="flex flex-col gap-3">
                    {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => (
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
            
            {/* Category Filter Buttons - Right Side */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
                <div className="flex flex-col gap-3">
                    {categories.slice(Math.ceil(categories.length / 2)).map((category) => (
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
                camera={{ position: [20, 15, 30], fov: 45 }}
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
                    <Stars radius={60} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
                </Suspense>
            </Canvas>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
    );
};
