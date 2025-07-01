import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Globe3D: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create a simple earth-like texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Create a gradient for the earth
      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1e40af'); // Deep blue
      gradient.addColorStop(0.3, '#2563eb'); // Blue
      gradient.addColorStop(0.5, '#3b82f6'); // Lighter blue
      gradient.addColorStop(0.7, '#60a5fa'); // Even lighter
      gradient.addColorStop(1, '#93c5fd'); // Light blue
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some land-like patterns
      context.fillStyle = '#10b981'; // Emerald green
      context.globalAlpha = 0.6;
      
      // Draw some continent-like shapes
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 20 + Math.random() * 80;
        
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
      
      context.globalAlpha = 1;
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Rotate the globe
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0, -5]}>
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          transparent
          opacity={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Add some floating particles around the globe */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

export default Globe3D;