import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { ObjectSpaceNormalMap } from 'three'


//loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/texture/NormalMap.png')


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness=0.5
material.roughness=0.1
material.normalMap = normalTexture
// material.color = new THREE.Color(0x000000)



// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)



// Lights

const blue = gui.addFolder('Blue Light')

const pointLight = new THREE.PointLight(0x0077be, 0.1)
pointLight.position.x = -1.53
pointLight.position.y = -1.41
pointLight.position.z = 0.21
pointLight.intensity = 5.14
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x3B5323, 2)
pointLight2.position.x = 0.43
pointLight2.position.y = 0.98
pointLight2.position.z = 0.15

pointLight2.intensity=6.11
scene.add(pointLight2)

const green = gui.addFolder('Green Light')


green.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
green.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
green.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
green.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

blue.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
blue.add(pointLight.position, 'x').min(-6).max(6).step(0.01)
blue.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
blue.add(pointLight, 'intensity').min(0).max(10).step(0.01)


//For better understanding the position of light

// const pointLightHelper1 = new THREE.PointLightHelper(pointLight2,1)
// scene.add(pointLightHelper1)

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight,1)
// scene.add(pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true
 controls.minDistance = 1
 controls.maxDistance = 100




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




/**
 * Animate
 */

// document.addEventListener('mousemove', onDocumentMouseMove)

// let mouseX = 0
// let mouseY = 0

// let targetX = 0
// let targetY = 0

// const windowX = window.innerWidth/2;
// const windowY = window.innerHeight/2;

// function onDocumentMouseMove(event) {
//     mouseX = (event.clientX - windowX);
//     mouseY = (event.clientY - windowY);
// }

const clock = new THREE.Clock()

const tick = () =>
{
    // targetX = mouseX * .001
    // targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // sphere.rotation.y += .05 * (targetX - sphere.rotation.y)
    // sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    // sphere.rotation.z += .05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
     controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

const audio = document.querySelector('#audio');
const id = setInterval(() => {
    audio.play().then(() => {
        clearInterval(id);
    }).catch(() => {
    });
}, 1000);

document.addEventListener("visibilitychange", event => {
    if (document.visibilityState == "visible") {
        audio.play()
    } else {
        audio.pause()
    }
});