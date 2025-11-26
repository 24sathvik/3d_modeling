import { db } from '@/db';
import { products } from '@/db/schema';

async function main() {
    const sampleProducts = [
        {
            name: 'Dragon Figurine',
            category: 'Fantasy',
            price: 29.99,
            description: 'Majestic dragon figurine with intricate scales and wings. This high-detail 3D model is optimized for FDM and resin printing. Features customizable wing positions and tail articulation. Perfect for fantasy enthusiasts and collectors. Supports voice frequency integration for creating unique roar sound patterns that can be embedded in the base. Print time: 8-12 hours at 0.2mm layer height. Recommended material: PLA or ABS for FDM, Standard resin for SLA.',
            imageUrl: '/images/dragon-figurine.jpg',
            modelUrl: '/models/dragon-figurine.stl',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Robot Warrior',
            category: 'Sci-Fi',
            price: 34.99,
            description: 'Futuristic robot warrior with poseable joints and modular armor plates. This advanced 3D model features snap-fit assembly for easy printing and assembly. Customize armor colors, weapon configurations, and LED light placements. Voice frequency integration enables custom battle sound effects. Includes optional display stand. Print time: 10-14 hours. Best with PETG or ABS for durability. Multiple color printing compatible.',
            imageUrl: '/images/robot-warrior.jpg',
            modelUrl: '/models/robot-warrior.stl',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Medieval Castle',
            category: 'Architecture',
            price: 49.99,
            description: 'Detailed medieval castle with towers, walls, and intricate stonework. Modular design allows printing in sections for large-scale builds. Features removable roofs for interior access, working drawbridge mechanism, and customizable flag designs. Perfect for tabletop gaming or display. Voice frequency system can add ambient medieval sounds. Print time: 20-30 hours total. Recommended: PLA for ease, 0.15mm layer height for detail.',
            imageUrl: '/images/medieval-castle.jpg',
            modelUrl: '/models/medieval-castle.stl',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Sports Car Model',
            category: 'Vehicles',
            price: 39.99,
            description: 'Sleek sports car model with opening doors, detailed interior, and rotating wheels. Print-in-place wheel mechanisms require no assembly. Customize paint schemes, add custom decals, or modify body kit components. Voice frequency integration for authentic engine sound effects. Perfect for car enthusiasts and collectors. Print time: 12-16 hours. Best results with ABS or PETG. Supports multi-color printing.',
            imageUrl: '/images/sports-car.jpg',
            modelUrl: '/models/sports-car.stl',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Dinosaur T-Rex',
            category: 'Prehistoric',
            price: 44.99,
            description: 'Anatomically accurate T-Rex model with articulated jaw and poseable limbs. Features detailed skin texture and optional feather attachments based on latest paleontological research. Perfect for education or display. Customizable size scaling from desktop to large display models. Voice frequency feature adds realistic roar sound patterns. Print time: 15-20 hours at standard scale. Recommended: PLA or resin for fine details.',
            imageUrl: '/images/t-rex.jpg',
            modelUrl: '/models/t-rex.stl',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Spaceship Enterprise',
            category: 'Sci-