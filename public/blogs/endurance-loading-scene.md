---
title: "Building the Endurance Loading Scene"
subtitle: "A deep dive into utilizing Three.js and React Three Fiber to create a cinematic loading sequence."
date: "Oct 10, 2026"
author: "Shreeharsh Shinde"
readTime: "4 min read"
heroImage: "/blogs/images/endurance_hero.png"
---

The first impression of a portfolio is crucial. I wanted the loading screen to be an immersive experience rather than a standard spinner. By utilizing Three.js and React Three Fiber, I created a cinematic gravity-assist maneuver inspired by the movie Interstellar.

## The Technical Setup

We load a Draco-compressed GLTF model of the Endurance. This drastically reduces the file size, allowing the 3D model to load in milliseconds rather than seconds.

```typescript
const endurance = useGLTF('/assets/endurance_draco.glb');
```

## The Gravity Assist Animation

The animation isn't just a simple linear translation. It uses a sine wave to calculate a curve in the Z-axis, simulating a slingshot maneuver around a massive celestial body. 

```typescript
// Z Position: GRAVITY CURVE / SLINGSHOT
// Smoothly arcs into the screen towards the planet
const currentZ = -Math.sin(progress * Math.PI) * 8;
```

This mathematical approach, paired with an ambient starfield that slowly rotates, creates a highly dynamic and visually stunning introduction.

### Next Steps

Future iterations might include dynamic lighting that reacts to the background music's frequency bands, pushing the WebGL capabilities even further.
