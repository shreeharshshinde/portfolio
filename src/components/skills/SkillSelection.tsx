import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
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
    // Languages - Blue/Cyan
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Languages", color: "#06b6d4", proficiency: 75 },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Languages", color: "#3776AB", proficiency: 88 },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Languages", color: "#00599C", proficiency: 70 },
    { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", category: "Languages", color: "#00ADD8", proficiency: 70 },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Languages", color: "#F7DF1E", proficiency: 95 },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Languages", color: "#3178C6", proficiency: 90 },

    // Databases - Emerald/Teal
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Databases", color: "#4479A1", proficiency: 80 },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Databases", color: "#336791", proficiency: 75 },
    { name: "Drizzle ORM", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Databases", color: "#C5F74F", proficiency: 70 },

    // Frameworks - Amber/Orange
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", category: "Frameworks", color: "#ffffff", proficiency: 85 },
    { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", category: "Frameworks", color: "#6DB33F", proficiency: 80 },
    { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Frameworks", color: "#ffffff", proficiency: 82 },
    { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", category: "Frameworks", color: "#009688", proficiency: 75 },
    { name: "Streamlit", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg", category: "Frameworks", color: "#FF4B4B", proficiency: 70 },

    // DevOps - Slate/Gray
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps", color: "#2496ED", proficiency: 78 },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "DevOps", color: "#F05032", proficiency: 90 },
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "DevOps", color: "#ffffff", proficiency: 85 },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", category: "DevOps", color: "#232F3E", proficiency: 70 },
    { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg", category: "DevOps", color: "#D24939", proficiency: 65 },
    { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg", category: "DevOps", color: "#326CE5", proficiency: 60 },

    // Libraries - Indigo/Purple
    { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", category: "Libraries", color: "#013243", proficiency: 85 },
    { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", category: "Libraries", color: "#150458", proficiency: 80 },
    { name: "Scikit-learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", category: "Libraries", color: "#F7931E", proficiency: 75 },
    { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", category: "Libraries", color: "#5C3EE8", proficiency: 70 },
    { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "Libraries", color: "#FF8F00", proficiency: 65 },

    // Frontend - Sky/Cyan
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend", color: "#61DAFB", proficiency: 95 },
    { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", category: "Frontend", color: "#ffffff", proficiency: 85 },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend", color: "#06B6D4", proficiency: 92 },
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "Frontend", color: "#F24E1E", proficiency: 80 },
    { name: "Shadcn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend", color: "#ffffff", proficiency: 75 },
    
    // Backend - Node
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend", color: "#339933", proficiency: 85 },
];

const categories = [
    // { name: "All", color: "from-cyan-500 to-blue-600" },
    { name: "Languages", color: "from-cyan-400 to-blue-600" }, // Cooper Station Blue
    { name: "Frameworks", color: "from-amber-400 to-orange-600" }, // Endurance/Space Suit Orange
    { name: "Databases", color: "from-emerald-400 to-teal-600" }, // Data Green
    { name: "DevOps", color: "from-slate-400 to-gray-600" }, // TARS/CASE Metal
    { name: "Libraries", color: "from-indigo-400 to-purple-600" }, // Deep Space
    { name: "Frontend", color: "from-sky-400 to-cyan-500" }, // Ice Planet
    // { name: "Backend", color: "from-violet-500 to-fuchsia-600" }
];

// Hexagonal geometry helper
const createHexagonGeometry = (radius: number, height: number) => {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 6);
    return geometry;
};

// Base Hexagonal Plate Component - Spacebase Platform
const BaseHexPlate: React.FC = () => {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Slow, majestic rotation
            meshRef.current.rotation.y = -state.clock.elapsedTime * 0.05;
        }
    });

    // Helper for the wireframe box look - Horizontal Rings Only
    const HexPrism = ({ radius, height }: { radius: number, height: number }) => {
        return (
            <group>
                {/* Top Hexagon Ring */}
                <mesh position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[radius - 0.1, radius, 6]} />
                    <meshBasicMaterial color="#00f3ff" side={THREE.DoubleSide} />
                </mesh>
                {/* Bottom Hexagon Ring */}
                <mesh position={[0, -height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[radius - 0.1, radius, 6]} />
                    <meshBasicMaterial color="#00f3ff" side={THREE.DoubleSide} />
                </mesh>
            </group>
        )
    }

    return (
        <group ref={meshRef} position={[0, -2, 0]}>
            {/* Main Platform Structure - DARKER - Interstellar Docker Module */}
            <mesh receiveShadow>
                <primitive object={createHexagonGeometry(18, 1)} />
                <meshStandardMaterial
                    color="#020617" // Deep Space Black/Blue
                    metalness={0.9}
                    roughness={0.2}
                    envMapIntensity={1}
                />
            </mesh>

            {/* Glowing Horizontal Hex Rings ("Blue lines up") - Cyan/Holographic */}
            <group position={[0, 2, 0]}>
                <HexPrism radius={17} height={4} />
            </group>

            {/* Neon Circuit Pattern - Concentric Hex Rings on the floor */}
            {[14, 10, 6].map((radius, i) => (
                <mesh key={i} position={[0, 0.51, 0]} rotation={[0, i * 0.5, 0]}>
                    <ringGeometry args={[radius, radius + 0.2, 6]} />
                    <meshBasicMaterial
                        color="#0891b2" // Cyan
                        side={THREE.DoubleSide}
                        transparent
                        opacity={0.4}
                    />
                </mesh>
            ))}

            {/* Inner Glow Core - Reactor */}
            <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <circleGeometry args={[4, 32]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
            </mesh>
        </group>
    );
};


// Mini Hexagonal Plate Component - Satellite Nodes
const MiniHexPlate: React.FC<{
    position: [number, number, number];
    index: number;
    isGlowing?: boolean;
    glowColor?: string;
    skillName?: string;
}> = ({ position, index, isGlowing = false, glowColor = "#374151", skillName = "" }) => {
    const meshRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime;
            // Float animation with index offset
            meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + index) * 0.5;

            // Gentle rotation
            meshRef.current.rotation.y = Math.sin(time * 0.2 + index * 0.5) * 0.1;

            if (ringRef.current && isGlowing) {
                ringRef.current.rotation.z += 0.02;
            }
        }
    });

    // Dark tech base color
    const baseColor = "#020617"; // Deep dark
    // Active neon color
    const neonColor = isGlowing ? glowColor : "#1e293b";

    return (
        <group ref={meshRef} position={[position[0], position[1], position[2]]}>
            {/* Main Hex Body */}
            <mesh castShadow receiveShadow>
                <primitive object={createHexagonGeometry(3, 0.4)} />
                <meshStandardMaterial
                    color={baseColor}
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Glowing Border/Rim */}
            <mesh position={[0, 0.05, 0]}>
                <primitive object={createHexagonGeometry(3.1, 0.1)} />
                <meshStandardMaterial
                    color={neonColor}
                    emissive={neonColor}
                    emissiveIntensity={isGlowing ? 3 : 0.5}
                    toneMapped={false}
                />
            </mesh>

            {/* Top Pattern - Tech Lines */}
            <mesh position={[0, 0.21, 0]} rotation={[0, Math.PI / 6, 0]}>
                <ringGeometry args={[1.5, 1.6, 6]} />
                <meshBasicMaterial color={isGlowing ? glowColor : "#334155"} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>

            {/* Floating Selection Ring (Holographic) */}
            {isGlowing && (
                <mesh ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[3.5, 3.6, 32]} />
                    <meshBasicMaterial color={glowColor} transparent opacity={0.8} side={THREE.DoubleSide} />
                </mesh>
            )}

            {/* Skill Name Label - PREMIUM HUD */}
            {isGlowing && (
                <Html
                    position={[0, 5, 0]}
                    center
                    style={{
                        pointerEvents: 'none',
                        width: '300px',
                        textAlign: 'center',
                    }}
                >
                    <div className="relative inline-block group">
                        {/* Glitch/HUD Container - Glassmorphism */}
                        <div
                            className="relative px-8 py-4 bg-black/40 backdrop-blur-xl clip-path-polygon-[10%_0,100%_0,100%_70%,90%_100%,0_100%,0_30%]"
                            style={{
                                border: `1px solid ${glowColor}80`,
                                boxShadow: `0 0 20px ${glowColor}30`,
                            }}
                        >
                            {/* Corner Decors - Top Left/Bottom Right only for asymmetry */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: glowColor }}></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: glowColor }}></div>

                            {/* Digital Scan Line */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[1px] w-full animate-scan-fast opacity-30"></div>

                            {/* Text Content - Orbitron Bold */}
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-white/60 tracking-[0.3em] mb-1 font-mono uppercase">System Node</span>
                                <span
                                    className="text-3xl font-bold text-white font-['Orbitron'] tracking-wider uppercase"
                                    style={{
                                        textShadow: `0 0 10px ${glowColor}`,
                                    }}
                                >
                                    {skillName}
                                </span>
                            </div>
                        </div>

                        {/* Connection Line */}
                        <div className="absolute left-1/2 bottom-0 w-[1px] h-8 transform -translate-x-1/2 translate-y-full bg-gradient-to-b from-transparent to-transparent"
                             style={{ backgroundImage: `linear-gradient(to bottom, ${glowColor}, transparent)` }}>
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
};

// Proficiency Ring Component
// const ProficiencyRing: React.FC<{ proficiency: number; color: string }> = ({ proficiency, color }) => {
//     const arc = (proficiency / 100) * Math.PI * 2;

//     return (
//         <mesh rotation={[Math.PI / 2, 0, 0]}>
//             <torusGeometry args={[1.3, 0.05, 16, 100, arc]} />
//             <meshStandardMaterial
//                 color={color}
//                 emissive={color}
//                 emissiveIntensity={2}
//                 transparent
//                 opacity={0.8}
//             />
//         </mesh>
//     );
// };

// Tech Coin Component - Premium Sci-Fi Token
const TechCoin: React.FC<{
    skill: TechSkill;
    position: [number, number, number];
    index: number;
    onHover?: (isHovered: boolean) => void;
}> = ({ skill, position, index, onHover }) => {
    const coinRef = useRef<THREE.Group>(null);
    const orbitRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Load the logo as a texture
    const texture = useTexture(skill.logo);

    // Animate
    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (coinRef.current) {
            // Float animation synced with socket
            coinRef.current.position.y = position[1] + 1.5 + Math.sin(time * 0.8 + index) * 0.5;

            // Coin spin - faster when hovered
            coinRef.current.rotation.y += hovered ? 0.05 : 0.01;

            // Tilt slightly
            coinRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
        }

        if (orbitRef.current) {
            // Orbital rings rotation
            orbitRef.current.rotation.z = time * 0.5;
            orbitRef.current.rotation.x = time * 0.3;
        }
    });

    return (
        <group>
            {/* The Floating Coin Token */}
            <group
                ref={coinRef}
                position={[position[0], position[1] + 1.5, position[2]]}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    onHover && onHover(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                    onHover && onHover(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                {/* Coin Edge/Rim - Dark Titanium */}
                <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <cylinderGeometry args={[1.2, 1.2, 0.2, 64]} />
                    <meshStandardMaterial
                        color="#1e293b" // Slate 800
                        metalness={1}
                        roughness={0.2}
                        envMapIntensity={2}
                    />
                </mesh>

                {/* Coin Face Front - Holographic Black Glass backing */}
                <mesh position={[0, 0, 0.11]} rotation={[0, 0, 0]}>
                    <circleGeometry args={[1.1, 64]} />
                    <meshPhysicalMaterial
                        color="#000000"
                        metalness={0.9}
                        roughness={0.05}
                        clearcoat={1}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Glowing Ring Insert */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                     <torusGeometry args={[1.2, 0.02, 16, 100]} />
                     <meshBasicMaterial color={hovered ? skill.color : "#334155"} />
                </mesh>

                {/* Logo Decal - Front */}
                <mesh position={[0, 0, 0.12]} rotation={[0, 0, 0]}>
                    <circleGeometry args={[0.9, 64]} />
                    <meshBasicMaterial
                        map={texture}
                        transparent
                        opacity={hovered ? 1 : 0.8}
                    />
                </mesh>

                {/* Coin Face Back - Same as front */}
                <mesh position={[0, 0, -0.11]} rotation={[0, Math.PI, 0]}>
                    <circleGeometry args={[1.1, 64]} />
                    <meshPhysicalMaterial
                        color="#000000"
                        metalness={0.9}
                        roughness={0.05}
                        clearcoat={1}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
                <mesh position={[0, 0, -0.12]} rotation={[0, Math.PI, 0]}>
                    <circleGeometry args={[0.9, 64]} />
                    <meshBasicMaterial
                        map={texture}
                        transparent
                        opacity={hovered ? 1 : 0.8}
                    />
                </mesh>

                {/* Glow Aura when Hovered - Enhanced */}
                {hovered && (
                    <mesh>
                        <sphereGeometry args={[1.6, 32, 32]} />
                        <meshBasicMaterial
                            color={skill.color}
                            transparent
                            opacity={0.1}
                            depthWrite={false}
                            side={THREE.BackSide}
                        />
                    </mesh>
                )}

                {/* Holographic Selection Ring - Orbital */}
                {hovered && (
                    <group ref={orbitRef}>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[1.8, 0.01, 16, 100]} />
                            <meshBasicMaterial color={skill.color} transparent opacity={0.6} />
                        </mesh>
                        <mesh rotation={[0, Math.PI / 2, 0]}>
                            <torusGeometry args={[2.0, 0.01, 16, 100]} />
                            <meshBasicMaterial color={skill.color} transparent opacity={0.4} />
                        </mesh>
                    </group>
                )}
            </group>
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
            <Environment preset="city" />
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d97706" />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#f59e0b" />
            <spotLight
                position={[0, 15, 0]}
                angle={0.3}
                penumbra={1}
                intensity={0.8}
                castShadow
            />

            {/* Nebula background for the 3D scene */}
            <Nebula />

            {/* Cosmic particles */}
            <CosmicParticles />


            {/* Base Hexagonal Plate */}
            <BaseHexPlate />

            {/* Central Building Model */}
            <DeepSpace9 />

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
                enableZoom={true}
                enableRotate={true}
                target={[0, 0, 0]}
            />
        </>
    );
};

export const SkillsSection: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("Languages");

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* Animated Background Elements - REMOVED to let 3D Nebula shine */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black/80"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            {/* Header Section - Sci-Fi Title */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
                <div className="flex flex-col items-center">
                    <span className="text-orange-500 tracking-[0.5em] text-xs font-mono uppercase mb-2 animate-pulse">System Diagnostic</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white font-['Orbitron'] tracking-widest uppercase relative inline-block">
                        Technical Skills
                        {/* Decorative lines */}
                        <div className="absolute -left-12 top-1/2 w-8 h-[2px] bg-orange-500/50"></div>
                        <div className="absolute -right-12 top-1/2 w-8 h-[2px] bg-orange-500/50"></div>
                    </h2>
                    <p className="text-sm md:text-md text-cyan-400/60 font-mono tracking-wider mt-4">
                        // INITIALIZING KNOWLEDGE BASE VISUALIZATION...
                    </p>
                </div>
            </div>

            {/* Category Filter Buttons - Mobile (Bottom Horizontal Scroll) */}
            <div className="absolute bottom-8 left-0 right-0 z-20 md:hidden px-4">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 border relative overflow-hidden backdrop-blur-md ${selectedCategory === category.name
                                ? `border-orange-500 text-white bg-orange-500/20`
                                : 'border-white/10 text-white/50 hover:text-white hover:border-white/30 bg-black/40'
                                }`}
                            style={{
                                clipPath: 'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)'
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Filter Buttons - Desktop Left */}
            <div className="hidden md:block absolute left-8 top-1/2 transform -translate-y-1/2 z-10 space-y-4">
                <div className="space-y-4">
                    {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => (
                        <div key={category.name} className="relative group">
                            {/* Connector Line */}
                            <div className={`absolute top-1/2 -right-8 w-6 h-[1px] transition-all duration-300 ${
                                selectedCategory === category.name ? 'bg-orange-500' : 'bg-white/10 group-hover:bg-white/30'
                            }`}></div>
                            
                            <button
                                onClick={() => setSelectedCategory(category.name)}
                                className={`w-40 py-3 text-right pr-4 font-mono text-xs uppercase tracking-widest transition-all duration-300 border-r-2 ${selectedCategory === category.name
                                    ? `border-orange-500 text-white bg-gradient-to-l from-orange-500/20 to-transparent`
                                    : 'border-white/10 text-white/40 hover:text-white hover:border-white/40 hover:bg-white/5'
                                    }`}
                            >
                                {category.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Filter Buttons - Desktop Right */}
            <div className="hidden md:block absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
                 <div className="space-y-4">
                    {categories.slice(Math.ceil(categories.length / 2)).map((category) => (
                        <div key={category.name} className="relative group">
                            {/* Connector Line */}
                            <div className={`absolute top-1/2 -left-8 w-6 h-[1px] transition-all duration-300 ${
                                selectedCategory === category.name ? 'bg-orange-500' : 'bg-white/10 group-hover:bg-white/30'
                            }`}></div>

                            <button
                                onClick={() => setSelectedCategory(category.name)}
                                className={`w-40 py-3 text-left pl-4 font-mono text-xs uppercase tracking-widest transition-all duration-300 border-l-2 ${selectedCategory === category.name
                                    ? `border-orange-500 text-white bg-gradient-to-r from-orange-500/20 to-transparent`
                                    : 'border-white/10 text-white/40 hover:text-white hover:border-white/40 hover:bg-white/5'
                                    }`}
                            >
                                {category.name}
                            </button>
                        </div>
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
                    {/* Enhanced Stars - Denser and deeper */}
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                </Suspense>
            </Canvas>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
    );
};
