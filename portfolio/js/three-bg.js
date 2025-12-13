// 3D Particle Network Animation using Three.js

const initThreeJS = () => {
    const container = document.getElementById('canvas-container');

    // Scene Setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        // Spread particles in a wide area
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const material = new THREE.PointsMaterial({
        size: 0.2,
        color: 0x38bdf8, // Cyan accent
        transparent: true,
        opacity: 0.8,
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // Connecting Lines (Optional - can be heavy, let's stick to floating particles for performance)
    // Instead, let's add some geometric shapes to represent "Data"

    const geometry = new THREE.IcosahedronGeometry(10, 1);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x818cf8,
        transparent: true,
        opacity: 0.15
    });
    const sphere = new THREE.LineSegments(wireframe, lineMaterial);
    scene.add(sphere);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Rotate entire system slowly
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        sphere.rotation.y -= 0.002;
        sphere.rotation.x -= 0.002;

        // Mouse interaction
        particlesMesh.rotation.y += mouseX * 0.05;
        particlesMesh.rotation.x += mouseY * 0.05;

        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initThreeJS);
