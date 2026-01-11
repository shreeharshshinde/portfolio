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
    // { name: "All", color: "from-orange-400 to-amber-500" },
    { name: "Languages", color: "from-orange-400 to-red-500" },
    { name: "Frameworks", color: "from-amber-400 to-orange-500" },
    { name: "Databases", color: "from-yellow-400 to-amber-500" },
    { name: "DevOps", color: "from-red-400 to-orange-500" },
    { name: "Libraries", color: "from-white to-gray-400" },
    { name: "Frontend", color: "from-orange-300 to-amber-400" },
    // { name: "Backend", color: "from-teal-400 to-cyan-500" }
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
            {/* Main Platform Structure - DARKER */}
            <mesh receiveShadow>
                <primitive object={createHexagonGeometry(18, 1)} />
                <meshStandardMaterial
                    color="#050914" // Very dark blue/black
                    metalness={0.8}
                    roughness={0.4}
                    envMapIntensity={0.5}
                />
            </mesh>

            {/* Glowing Horizontal Hex Rings ("Blue lines up") */}
            <group position={[0, 2, 0]}>{/* Raised up above the platform */}
                <HexPrism radius={17} height={4} />
            </group>

            {/* Neon Circuit Pattern - Concentric Hex Rings on the floor */}
            {[14, 10, 6].map((radius, i) => (
                <mesh key={i} position={[0, 0.51, 0]} rotation={[0, i * 0.5, 0]}>
                    <ringGeometry args={[radius, radius + 0.2, 6]} />
                    <meshBasicMaterial
                        color="#0077aa" // Darker cyan for the floor patterns
                        side={THREE.DoubleSide}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            ))}

            {/* Inner Glow Core */}
            <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <circleGeometry args={[4, 32]} />
                <meshBasicMaterial color="#00f3ff" transparent opacity={0.15} />
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
    const baseColor = "#0f172a";
    // Active neon color or default subtle blue
    const neonColor = isGlowing ? glowColor : "#1e293b";

    return (
        <group ref={meshRef} position={[position[0], position[1], position[2]]}>
            {/* Main Hex Body */}
            <mesh castShadow receiveShadow>
                <primitive object={createHexagonGeometry(3, 0.4)} />
                <meshStandardMaterial
                    color={baseColor}
                    metalness={0.8}
                    roughness={0.3}
                />
            </mesh>

            {/* Glowing Border/Rim */}
            <mesh position={[0, 0.05, 0]}>
                <primitive object={createHexagonGeometry(3.1, 0.1)} />
                <meshStandardMaterial
                    color={neonColor}
                    emissive={neonColor}
                    emissiveIntensity={isGlowing ? 2 : 0.5}
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
                    <meshBasicMaterial color={glowColor} transparent opacity={0.6} side={THREE.DoubleSide} />
                </mesh>
            )}

            {/* Skill Name Label */}
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
                        {/* Glitch/HUD Container - Dynamic Color */}
                        <div
                            className="relative px-6 py-3 bg-black/80 backdrop-blur-xl clip-path-polygon-[10%_0,100%_0,100%_70%,90%_100%,0_100%,0_30%]"
                            style={{
                                border: `1px solid ${glowColor}`,
                                boxShadow: `0 0 10px ${glowColor}20` // Subtle glow
                            }}
                        >

                            {/* Corner Decors - Dynamic Color */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: glowColor }}></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: glowColor }}></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: glowColor }}></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: glowColor }}></div>

                            {/* Text Content - Dynamic Gradient */}
                            <span
                                className="text-2xl font-bold bg-clip-text text-transparent font-['Orbitron'] tracking-widest uppercase"
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${glowColor}, #ffffff, ${glowColor})`,
                                    filter: `drop-shadow(0 0 5px ${glowColor})`
                                }}
                            >
                                {skillName}
                            </span>

                            {/* Scanning Line Animation - Dynamic Color via style injection or just keeping it subtle cyan/white? 
                                Let's make it match but transparent 
                            */}
                            <div
                                className="absolute inset-0 animate-scan-fast pointer-events-none"
                                style={{
                                    background: `linear-gradient(to bottom, transparent, ${glowColor}10, transparent)`
                                }}
                            ></div>
                        </div>

                        {/* Connecting Line to Coin - Dynamic Color */}
                        <div
                            className="absolute left-1/2 bottom-0 w-[1px] h-8 transform -translate-x-1/2 translate-y-full"
                            style={{ background: `linear-gradient(to bottom, ${glowColor}, transparent)` }}
                        ></div>
                        <div
                            className="absolute left-1/2 bottom-0 w-2 h-2 rounded-full transform -translate-x-1/2 translate-y-8 blur-[2px]"
                            style={{ backgroundColor: glowColor }}
                        ></div>
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
                {/* Coin Edge/Rim - Metal with grooves */}
                <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <cylinderGeometry args={[1.2, 1.2, 0.2, 64]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        metalness={1}
                        roughness={0.1}
                        envMapIntensity={2}
                    />
                </mesh>

                {/* Coin Face Front - Black Glass backing */}
                <mesh position={[0, 0, 0.11]} rotation={[0, 0, 0]}>
                    <circleGeometry args={[1.1, 64]} />
                    <meshPhysicalMaterial
                        color="#000000"
                        metalness={0.8}
                        roughness={0.1}
                        clearcoat={1}
                    />
                </mesh>

                {/* Logo Decal - Front */}
                <mesh position={[0, 0, 0.12]} rotation={[0, 0, 0]}>
                    <circleGeometry args={[0.9, 64]} />
                    <meshBasicMaterial
                        map={texture}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Coin Face Back - Same as front */}
                <mesh position={[0, 0, -0.11]} rotation={[0, Math.PI, 0]}>
                    <circleGeometry args={[1.1, 64]} />
                    <meshPhysicalMaterial
                        color="#000000"
                        metalness={0.8}
                        roughness={0.1}
                        clearcoat={1}
                    />
                </mesh>
                <mesh position={[0, 0, -0.12]} rotation={[0, Math.PI, 0]}>
                    <circleGeometry args={[0.9, 64]} />
                    <meshBasicMaterial
                        map={texture}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Glow Aura when Hovered */}
                {hovered && (
                    <mesh>
                        <sphereGeometry args={[1.4, 32, 32]} />
                        <meshBasicMaterial
                            color={skill.color}
                            transparent
                            opacity={0.15}
                            depthWrite={false}
                            side={THREE.BackSide} /* Inverted sphere for internal glow feel */
                        />
                    </mesh>
                )}

                {/* Holographic Selection Ring - Orbital */}
                {hovered && (
                    <group ref={orbitRef}>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[1.6, 0.02, 16, 100]} />
                            <meshBasicMaterial color={skill.color} transparent opacity={0.8} />
                        </mesh>
                        <mesh rotation={[0, Math.PI / 2, 0]}>
                            <torusGeometry args={[1.8, 0.02, 16, 100]} />
                            <meshBasicMaterial color={skill.color} transparent opacity={0.5} />
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
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Nebula-like background elements */}
                <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-gradient-radial from-orange-900/10 via-black to-transparent rounded-full animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-5 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '4s' }}></div>
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

            {/* Category Filter Buttons - Mobile (Bottom Horizontal Scroll) */}
            <div className="absolute bottom-8 left-0 right-0 z-20 md:hidden px-4">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar text-sm">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${selectedCategory === category.name
                                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                : 'bg-gray-800/80 text-gray-300 border border-gray-700/50'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Filter Buttons - Desktop Left */}
            <div className="hidden md:block absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
                <div className="flex flex-col gap-3">
                    {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.name
                                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Filter Buttons - Desktop Right */}
            <div className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
                <div className="flex flex-col gap-3">
                    {categories.slice(Math.ceil(categories.length / 2)).map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.name
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
            <div className="absolute top-20 left-10 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
    );
};
