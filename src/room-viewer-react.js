import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const RoomViewer = () => {
    const canvasContainerRef = useRef(null);

    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const isNightModeRef = useRef(false);
    const selectedObjectRef = useRef(null);
    const currentModeRef = useRef('move');
    const objectsRef = useRef([]);
    const lightsRef = useRef([]);
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseRef = useRef(new THREE.Vector2());
    const isDraggingRef = useRef(false);
    const dragOffsetRef = useRef(new THREE.Vector3());
    const isVerticalDragRef = useRef(false);
    const initialMouseYRef = useRef(0);
    const isPanningRef = useRef(false);
    const panStartRef = useRef(new THREE.Vector2());
    const targetXRef = useRef(0);
    const targetYRef = useRef(0);
    const radiusRef = useRef(10);
    const initialMouseXRef = useRef(0);
    const lightAngleDegRef = useRef(0);
    const lightDistanceRef = useRef(5);
    const lightHeightRef = useRef(10);
    const isVerticalRotateRef = useRef(false);
    const floorRef = useRef(null); // Reference to floor mesh
    const floorMaterialRef = useRef(null); // Reference to floor material

    const ROOM_WIDTH_REF = useRef(5);
    const ROOM_DEPTH_REF = useRef(5);
    const ROOM_HEIGHT_REF = useRef(5);
    const ROOM_PADDING = 0.5;

    const [wallsWithWindow, setWallsWithWindow] = useState({
        right: false,
        left: false
    });

    const [windowPositionLeft, setWindowPositionLeft] = useState({ x: 0, y: 2 });

    const [windowLeftSize, setWindowLeftSize] = useState({
        width: 2,
        height: 1.5,
    });

    const [windowPositionRight, setWindowPositionRight] = useState({ x: 0, y: 2 });

    const [windowRightSize, setWindowRightSize] = useState({
        width: 2,
        height: 1.5,
    });

    const [showExperience, setShowExperience] = useState(false);
    const [roomWidth, setRoomWidth] = useState(10);
    const [roomDepth, setRoomDepth] = useState(10);
    const [roomHeight, setRoomHeight] = useState(10);
    const [lightRotation, setLightRotation] = useState(0);
    const [lightIntensity, setLightIntensity] = useState(0.8);
    const [lightHeight, setLightHeight] = useState(10);
    const [lightDistance, setLightDistance] = useState(5);
    const [currentMode, setCurrentMode] = useState('move');
    const [isNightMode, setIsNightMode] = useState(false);
    const [selectedTexture, setSelectedTexture] = useState('/woodTextures/wood-floor.png'); // Track selected texture
    const [selectedWallTexture, setSelectedWallTexture] = useState('/wallTextures/wall.png');

    // List of available wood textures
    const woodTextures = [
        '/woodTextures/wood-floor.png',
        '/woodTextures/wood-floor1.png',
        '/woodTextures/wood-floor2.png',
        '/woodTextures/wood-floor3.png',
        '/woodTextures/wood-floor4.png',
    ];

    const wallTextures = [
        '/wallTextures/wall.png',
        '/wallTextures/wall1.png',
        '/wallTextures/wall2.png',
        '/wallTextures/wall3.png',
    ];


    const startExperience = () => {
        setShowExperience(true);
    };

    const backToLanding = () => {
        setShowExperience(false);
    };

    const changeWallTexture = (texture) => {
        setSelectedWallTexture(texture);
        updateBackWall(texture);
        updateLeftWall(texture)
    };

    const updateLightPosition = () => {
        const angleRad = lightAngleDegRef.current * Math.PI / 180;
        const light = lightsRef.current.find(l => l.type === 'DirectionalLight');

        if (light) {
            light.position.set(
                Math.cos(angleRad) * lightDistanceRef.current,
                lightHeightRef.current,
                Math.sin(angleRad) * lightDistanceRef.current
            );
            light.target.position.set(0, 0, 0);
            light.target.updateMatrixWorld();
            if (light.userData.helper) {
                light.userData.helper.update();
            }
        }
    };

    const init3D = () => {
        const container = canvasContainerRef.current;

        sceneRef.current = new THREE.Scene();
        sceneRef.current.background = new THREE.Color(0x6CA5BC);

        cameraRef.current = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        cameraRef.current.position.set(8, 4, 8);
        cameraRef.current.lookAt(0, 1, 0);

        rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current.shadowMap.enabled = true;
        rendererRef.current.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current.toneMapping = THREE.ACESFilmicToneMapping;
        rendererRef.current.toneMappingExposure = 1.0;
        container.appendChild(rendererRef.current.domElement);

        setupControls();
        setupLighting();
        createRoom();
        setupEventListeners();
        animate();
    };

    const setupControls = () => {
        let isMouseDown = false;
        let mouseX = 0, mouseY = 0;

        const offset = cameraRef.current.position.clone().sub(new THREE.Vector3(0, 1, 0));
        radiusRef.current = offset.length();
        targetYRef.current = Math.asin(offset.y / radiusRef.current);
        targetXRef.current = Math.atan2(offset.z, offset.x);

        rendererRef.current.domElement.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                if (currentModeRef.current === 'move' && !selectedObjectRef.current && !isDraggingRef.current) {
                    isMouseDown = true;
                    mouseX = event.clientX;
                    mouseY = event.clientY;
                }
            } else if (event.button === 1) {
                isPanningRef.current = true;
                panStartRef.current.set(event.clientX, event.clientY);
            }
        });

        rendererRef.current.domElement.addEventListener('mousemove', (event) => {
            if (isMouseDown && currentModeRef.current === 'move' && !isDraggingRef.current) {
                const deltaX = event.clientX - mouseX;
                const deltaY = event.clientY - mouseY;

                targetXRef.current -= deltaX * 0.005;
                targetYRef.current -= deltaY * 0.005;

                targetYRef.current = Math.max(-Math.PI / 2 + 0.2, Math.min(Math.PI / 2 - 0.2, targetYRef.current));

                cameraRef.current.position.x = Math.cos(targetXRef.current) * Math.cos(targetYRef.current) * radiusRef.current;
                cameraRef.current.position.y = Math.sin(targetYRef.current) * radiusRef.current + 1;
                cameraRef.current.position.z = Math.sin(targetXRef.current) * Math.cos(targetYRef.current) * radiusRef.current;

                cameraRef.current.lookAt(0, 1, 0);

                mouseX = event.clientX;
                mouseY = event.clientY;
            } else if (isPanningRef.current) {
                const deltaX = (event.clientX - panStartRef.current.x) * 0.005;
                const deltaY = (event.clientY - panStartRef.current.y) * 0.005;

                const offset = new THREE.Vector3();
                cameraRef.current.getWorldDirection(offset);
                offset.y = 0;
                offset.normalize();

                const right = new THREE.Vector3().crossVectors(cameraRef.current.up, offset).normalize();
                const up = new THREE.Vector3(0, 1, 0);

                const move = new THREE.Vector3();
                move.addScaledVector(right, -deltaX);
                move.addScaledVector(up, deltaY);

                cameraRef.current.position.add(move);

                panStartRef.current.set(event.clientX, event.clientY);
            }
        });

        rendererRef.current.domElement.addEventListener('mouseup', () => {
            isMouseDown = false;
            isPanningRef.current = false;
        });

        rendererRef.current.domElement.addEventListener('wheel', (event) => {
            event.preventDefault();
            const scale = event.deltaY > 0 ? 1.05 : 0.95;
            radiusRef.current *= scale;
            radiusRef.current = Math.max(2, Math.min(15, radiusRef.current));

            cameraRef.current.position.x = Math.cos(targetXRef.current) * Math.cos(targetYRef.current) * radiusRef.current;
            cameraRef.current.position.y = Math.sin(targetYRef.current) * radiusRef.current + 1;
            cameraRef.current.position.z = Math.sin(targetXRef.current) * Math.cos(targetYRef.current) * radiusRef.current;

            cameraRef.current.lookAt(0, 1, 0);
        });
    };

    const setupLighting = () => {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        sceneRef.current.add(ambientLight);
        lightsRef.current.push(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xfff8e7, 0.8);
        directionalLight.position.set(10, 15, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 4096;
        directionalLight.shadow.mapSize.height = 4096;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -15;
        directionalLight.shadow.camera.right = 15;
        directionalLight.shadow.camera.top = 15;
        directionalLight.shadow.camera.bottom = -15;
        directionalLight.shadow.bias = -0.00005;
        directionalLight.shadow.normalBias = 0.1;
        directionalLight.shadow.radius = 4;
        sceneRef.current.add(directionalLight);
        lightsRef.current.push(directionalLight);

        const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1, 0xffff00);
        sceneRef.current.add(lightHelper);
        directionalLight.userData.helper = lightHelper;
    };
    //Room
    const updateBackWall = (texturePath = selectedWallTexture) => {
        console.log(texturePath)
        if (!sceneRef.current) return;

        const thickness = 0.2;
        const wallWidth = ROOM_WIDTH_REF.current;
        const wallHeight = ROOM_HEIGHT_REF.current;
        const wallDepth = ROOM_DEPTH_REF.current;

        sceneRef.current.children
            .filter(obj => obj.userData?.roomPart && obj.position.z < 0)
            .forEach(obj => sceneRef.current.remove(obj));

        if (wallsWithWindow.right) {
            const clampedX = Math.max(
                -wallWidth / 2 + windowRightSize.width / 2,
                Math.min(wallWidth / 2 - windowRightSize.width / 2, windowPositionRight.x)
            );

            const clampedY = Math.max(
                -wallHeight / 2 + windowRightSize.height / 2,
                Math.min(wallHeight / 2 - windowRightSize.height / 2, windowPositionRight.y)
            );

            const wallShape = new THREE.Shape();
            wallShape.moveTo(-wallWidth / 2, -wallHeight / 2);
            wallShape.lineTo((wallWidth + thickness) / 2, -wallHeight / 2);
            wallShape.lineTo((wallWidth + thickness) / 2, wallHeight / 2);
            wallShape.lineTo(-(wallWidth + thickness) / 2, wallHeight / 2);
            wallShape.lineTo(-wallWidth / 2, -wallHeight / 2);

            const windowHole = new THREE.Path();
            windowHole.moveTo(clampedX - windowRightSize.width / 2, clampedY - windowRightSize.height / 2);
            windowHole.lineTo(clampedX + windowRightSize.width / 2, clampedY - windowRightSize.height / 2);
            windowHole.lineTo(clampedX + windowRightSize.width / 2, clampedY + windowRightSize.height / 2);
            windowHole.lineTo(clampedX - windowRightSize.width / 2, clampedY + windowRightSize.height / 2);
            windowHole.lineTo(clampedX - windowRightSize.width / 2, clampedY - windowRightSize.height / 2);

            wallShape.holes.push(windowHole);

            const geometry = new THREE.ExtrudeGeometry(wallShape, {
                depth: thickness,
                bevelEnabled: false
            });

            // Tính UV thủ công cho BufferGeometry
            geometry.computeBoundingBox();

            const max = geometry.boundingBox.max;
            const min = geometry.boundingBox.min;
            const offset = new THREE.Vector2(0 - min.x, 0 - min.y);
            const range = new THREE.Vector2(max.x - min.x, max.y - min.y);

            const uvAttribute = [];

            for (let i = 0; i < geometry.attributes.position.count; i++) {
                const x = geometry.attributes.position.getX(i);
                const y = geometry.attributes.position.getY(i);

                uvAttribute.push((x + offset.x) / range.x);
                uvAttribute.push((y + offset.y) / range.y);
            }

            geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvAttribute, 2));

            const texture = new THREE.TextureLoader().load(texturePath);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);

            const material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.8,
                metalness: 0.2
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.z = -wallDepth / 2 - thickness / 2;
            mesh.position.y = wallHeight / 2;
            mesh.userData.roomPart = true;
            mesh.receiveShadow = true;
            mesh.castShadow = true;

            sceneRef.current.add(mesh);
        } else {
            const geometry = new THREE.BoxGeometry(wallWidth + thickness, wallHeight, thickness);

            const texture = new THREE.TextureLoader().load(texturePath);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);

            const material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.8,
                metalness: 0.2
            });


            const backWall = new THREE.Mesh(geometry, material);
            backWall.position.z = -wallDepth / 2;
            backWall.position.y = wallHeight / 2;
            backWall.userData.roomPart = true;
            backWall.receiveShadow = true;
            backWall.castShadow = true;

            sceneRef.current.add(backWall);
        }
    };

    const updateLeftWall = (texturePath = selectedWallTexture) => {
        if (!sceneRef.current) return;

        const thickness = 0.2;
        const wallWidth = ROOM_DEPTH_REF.current;
        const wallHeight = ROOM_HEIGHT_REF.current;
        const roomWidth = ROOM_WIDTH_REF.current;

        sceneRef.current.children
            .filter(obj => obj.userData?.roomPart && obj.position.x < 0)
            .forEach(obj => sceneRef.current.remove(obj));

        const texture = new THREE.TextureLoader().load(texturePath);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        const material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.8,
            metalness: 0.2
        });

        if (wallsWithWindow.left) {
            const clampedX = Math.max(
                -wallWidth / 2 + windowLeftSize.width / 2,
                Math.min(wallWidth / 2 - windowLeftSize.width / 2, windowPositionLeft.x)
            );

            const clampedY = Math.max(
                -wallHeight / 2 + windowLeftSize.height / 2,
                Math.min(wallHeight / 2 - windowLeftSize.height / 2, windowPositionLeft.y)
            );

            const wallShape = new THREE.Shape();
            wallShape.moveTo(-wallWidth / 2, -wallHeight / 2);
            wallShape.lineTo(wallWidth / 2, -wallHeight / 2);
            wallShape.lineTo(wallWidth / 2, wallHeight / 2);
            wallShape.lineTo(-(wallWidth + thickness) / 2, wallHeight / 2);
            wallShape.lineTo(-(wallWidth + thickness) / 2, -wallHeight / 2);

            const hole = new THREE.Path();
            hole.moveTo(clampedX - windowLeftSize.width / 2, clampedY - windowLeftSize.height / 2);
            hole.lineTo(clampedX + windowLeftSize.width / 2, clampedY - windowLeftSize.height / 2);
            hole.lineTo(clampedX + windowLeftSize.width / 2, clampedY + windowLeftSize.height / 2);
            hole.lineTo(clampedX - windowLeftSize.width / 2, clampedY + windowLeftSize.height / 2);
            hole.closePath();

            wallShape.holes.push(hole);

            const geo = new THREE.ExtrudeGeometry(wallShape, {
                depth: thickness,
                bevelEnabled: false
            });

            // Tính UV
            geo.computeBoundingBox();
            const max = geo.boundingBox.max;
            const min = geo.boundingBox.min;
            const offset = new THREE.Vector2(0 - min.x, 0 - min.y);
            const range = new THREE.Vector2(max.x - min.x, max.y - min.y);
            const uvAttribute = [];

            for (let i = 0; i < geo.attributes.position.count; i++) {
                const x = geo.attributes.position.getX(i);
                const y = geo.attributes.position.getY(i);
                uvAttribute.push((x + offset.x) / range.x);
                uvAttribute.push((y + offset.y) / range.y);
            }

            geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvAttribute, 2));

            const mesh = new THREE.Mesh(geo, material);
            mesh.position.x = -roomWidth / 2 - thickness / 2;
            mesh.position.y = wallHeight / 2;
            mesh.rotation.y = Math.PI / 2;
            mesh.userData.roomPart = true;
            mesh.receiveShadow = true;
            mesh.castShadow = true;

            sceneRef.current.add(mesh);
        } else {
            const geometry = new THREE.BoxGeometry(thickness, wallHeight, wallWidth + thickness);

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = -roomWidth / 2;
            mesh.position.y = wallHeight / 2;
            mesh.userData.roomPart = true;
            mesh.receiveShadow = true;
            mesh.castShadow = true;

            sceneRef.current.add(mesh);
        }
    };

    const rebuildRoom = () => {
        ROOM_WIDTH_REF.current = roomWidth;
        ROOM_DEPTH_REF.current = roomDepth;
        ROOM_HEIGHT_REF.current = roomHeight;

        const toRemove = [];
        sceneRef.current?.traverse(obj => {
            if (obj.userData && obj.userData.roomPart) toRemove.push(obj);
        });
        toRemove.forEach(obj => sceneRef.current?.remove(obj));

        createRoom();
    };

    const toggleWallWindow = (side) => {
        setWallsWithWindow(prev => {
            const newState = { ...prev, [side]: !prev[side] };
            if (side === 'right') updateBackWall();
            if (side === 'left') updateLeftWall();
            return newState;
        });
    };

    const changeFloorTexture = (texturePath) => {
        setSelectedTexture(texturePath);
        const loader = new THREE.TextureLoader();
        const newTexture = loader.load(texturePath, () => {
            if (floorMaterialRef.current) {
                floorMaterialRef.current.map = newTexture;
                floorMaterialRef.current.needsUpdate = true;
            }
        });
        newTexture.wrapS = THREE.RepeatWrapping;
        newTexture.wrapT = THREE.RepeatWrapping;
        newTexture.repeat.set(4, 4);
    };

    useEffect(() => {
        updateBackWall();
    }, [wallsWithWindow.right, windowRightSize, windowPositionRight]);

    useEffect(() => {
        updateLeftWall();
    }, [wallsWithWindow.left, windowLeftSize, windowPositionLeft]);

    const createRoom = () => {
        if (!sceneRef.current) return;

        const loader = new THREE.TextureLoader();
        const woodTexture = loader.load(selectedTexture);
        woodTexture.wrapS = THREE.RepeatWrapping;
        woodTexture.wrapT = THREE.RepeatWrapping;
        woodTexture.repeat.set(4, 4);

        const floorThickness = 0.2;

        const floorGeometry = new THREE.BoxGeometry(
            ROOM_WIDTH_REF.current + floorThickness,
            floorThickness,
            ROOM_DEPTH_REF.current + floorThickness
        );

        const floorMaterial = new THREE.MeshStandardMaterial({
            map: woodTexture,
            roughness: 0.7,
            metalness: 0.1
        });
        floorMaterialRef.current = floorMaterial;

        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -floorThickness / 2;
        floor.receiveShadow = true;
        floor.castShadow = true;
        floor.userData.roomPart = true;
        floorRef.current = floor;

        sceneRef.current.add(floor);

        updateBackWall();
        updateLeftWall();
    };

    const addObject = (type) => {
        let geometry, material, mesh;
        const position = new THREE.Vector3(0, 0, 0);

        switch (type) {
            case 'chair':
                const loader = new GLTFLoader();
                loader.load('/3DObj/chair.glb', (gltf) => {
                    const model = gltf.scene;
                    model.position.copy(position);
                    model.scale.set(1, 1, 1);
                    sceneRef.current.add(model);

                    requestAnimationFrame(() => {
                        model.updateMatrixWorld(true);

                        model.traverse((child) => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;

                                const worldPos = new THREE.Vector3();
                                child.getWorldPosition(worldPos);

                                child.userData = {
                                    type: 'chair',
                                    originalColor: child.material.color.getHex(),
                                    originalY: child.position.y,
                                    initialPosition: worldPos.clone(),
                                    parent: model
                                };

                                objectsRef.current.push(child);
                            }
                        });
                    });
                });
                break;

            default:
                return;
        }

        if (mesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = {
                type: type,
                originalColor: mesh.material.color.getHex(),
                originalY: mesh.position.y,
                initialPosition: new THREE.Vector3().copy(position)
            };
            sceneRef.current.add(mesh);
            objectsRef.current.push(mesh);
        }
    };

    const setupEventListeners = () => {
        rendererRef.current.domElement.addEventListener('mousedown', onMouseDown);
        rendererRef.current.domElement.addEventListener('mousemove', onMouseMove);
        rendererRef.current.domElement.addEventListener('mouseup', onMouseUp);
        window.addEventListener('resize', onWindowResize);
    };

    const onMouseDown = (event) => {
        event.preventDefault();

        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(objectsRef.current);

        if (intersects.length > 0) {
            const clicked = intersects[0].object;
            const clickedObject = clicked;

            if (currentModeRef.current === 'delete') {
                const root = clickedObject.userData.parent || clickedObject;
                sceneRef.current.remove(root);
                objectsRef.current = objectsRef.current.filter(obj => obj.userData.parent !== root && obj !== root);
                selectedObjectRef.current = null;
            } else if (currentModeRef.current === 'move') {
                selectedObjectRef.current = clickedObject;
                selectedObjectRef.current.userData.originalY = selectedObjectRef.current.position.y;
                isDraggingRef.current = true;
                initialMouseYRef.current = event.clientY;
                isVerticalDragRef.current = event.shiftKey;

                const intersectionPoint = intersects[0].point;
                dragOffsetRef.current.copy(intersectionPoint).sub(clickedObject.position);

                rendererRef.current.domElement.style.cursor = isVerticalDragRef.current ? 'ns-resize' : 'grabbing';

                objectsRef.current.forEach(obj => {
                    if (obj.material && obj.material.emissive) {
                        obj.material.emissive.setHex(obj === selectedObjectRef.current ? 0xffcc00 : 0x000000);
                    }
                });
            } else if (currentModeRef.current === 'rotate') {
                selectedObjectRef.current = clickedObject;
                isDraggingRef.current = true;
                initialMouseXRef.current = event.clientX;
                initialMouseYRef.current = event.clientY;

                isVerticalRotateRef.current = event.shiftKey;

                rendererRef.current.domElement.style.cursor = isVerticalRotateRef.current ? 'ns-resize' : 'ew-resize';

                objectsRef.current.forEach(obj => {
                    if (obj.material?.emissive) {
                        obj.material.emissive.setHex(obj === selectedObjectRef.current ? 0xffcc00 : 0x000000);
                    }
                });
            }
        }

        if (intersects.length === 0 || !selectedObjectRef.current) {
            selectedObjectRef.current = null;

            objectsRef.current.forEach(obj => {
                if (obj.material && obj.material.emissive) {
                    obj.material.emissive.setHex(0x000000);
                }
            });

            rendererRef.current.domElement.style.cursor = 'default';
        }
    };

    const onMouseMove = (event) => {
        if (!isDraggingRef.current || !selectedObjectRef.current) return;

        event.preventDefault();

        if (event.shiftKey !== isVerticalDragRef.current) {
            isVerticalDragRef.current = event.shiftKey;
            rendererRef.current.domElement.style.cursor = isVerticalDragRef.current ? 'ns-resize' : 'grabbing';
        }

        if (selectedObjectRef.current && currentModeRef.current === 'rotate') {
            if (event.shiftKey) {
                const deltaY = (event.clientY - initialMouseYRef.current) * 0.01;
                selectedObjectRef.current.rotation.x += deltaY;
                initialMouseYRef.current = event.clientY;
            } else {
                const deltaX = (event.clientX - initialMouseXRef.current) * 0.01;
                selectedObjectRef.current.rotation.y += deltaX;
                initialMouseXRef.current = event.clientX;
            }
        }

        if (currentModeRef.current === 'move') {
            if (isVerticalDragRef.current) {
                const deltaY = (initialMouseYRef.current - event.clientY) * 0.01;
                const maxY = ROOM_HEIGHT_REF.current - ROOM_PADDING;
                const newY = Math.max(0.1, Math.min(maxY, selectedObjectRef.current.userData.originalY + deltaY));
                selectedObjectRef.current.position.y = newY;
            } else {
                mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

                raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

                const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -selectedObjectRef.current.position.y);
                const intersectionPoint = new THREE.Vector3();

                if (raycasterRef.current.ray.intersectPlane(plane, intersectionPoint)) {
                    intersectionPoint.sub(dragOffsetRef.current);

                    const initial = selectedObjectRef.current.userData.initialPosition;

                    if (!initial) {
                        console.warn("initialPosition is missing!", selectedObjectRef.current);
                        return;
                    }

                    const halfWidth = ROOM_WIDTH_REF.current / 2 - ROOM_PADDING;
                    const halfDepth = ROOM_DEPTH_REF.current / 2 - ROOM_PADDING;

                    intersectionPoint.x = Math.max(-(initial.x + halfWidth), Math.min(halfWidth - initial.x, intersectionPoint.x));
                    intersectionPoint.z = Math.max(-(initial.z + halfDepth), Math.min(halfDepth - initial.z, intersectionPoint.z));

                    selectedObjectRef.current.position.x = intersectionPoint.x;
                    selectedObjectRef.current.position.z = intersectionPoint.z;

                    if (selectedObjectRef.current.userData.type === 'lamp') {
                        lightsRef.current.forEach(light => {
                            if (light.type === 'PointLight') {
                                const distance = light.position.distanceTo(selectedObjectRef.current.position);
                                if (distance < 2) {
                                    light.position.x = selectedObjectRef.current.position.x;
                                    light.position.z = selectedObjectRef.current.position.z;
                                }
                            }
                        });
                    }
                }
            }
        }
    };

    const onMouseUp = (event) => {
        if (isDraggingRef.current) {
            isDraggingRef.current = false;
            isVerticalDragRef.current = false;
            rendererRef.current.domElement.style.cursor = 'default';
        }
    };

    const toggleLight = () => {
        const newNightMode = !isNightModeRef.current;
        isNightModeRef.current = newNightMode;
        setIsNightMode(newNightMode);

        sceneRef.current.background = new THREE.Color(newNightMode ? 0x131313 : 0x6CA5BC);
        const ambientLight = lightsRef.current.find(l => l.type === 'AmbientLight');
        if (ambientLight) {
            ambientLight.intensity = newNightMode ? 0.1 : 0.5;
        }
    };

    const setMode = (mode) => {
        currentModeRef.current = mode;
        setCurrentMode(mode);

        selectedObjectRef.current = null;
        objectsRef.current.forEach(obj => {
            if (obj.material && obj.material.emissive) {
                obj.material.emissive.setHex(0x000000);
            }
        });
    };

    const onWindowResize = () => {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
        requestAnimationFrame(animate);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    useEffect(() => {
        if (lightsRef.current.length > 0) {
            lightAngleDegRef.current = lightRotation;
            updateLightPosition();
        }
    }, [lightRotation]);

    useEffect(() => {
        if (lightsRef.current.length > 0) {
            lightsRef.current.forEach(light => {
                if (light.type === 'DirectionalLight') {
                    light.intensity = lightIntensity;
                }
            });
        }
    }, [lightIntensity]);

    useEffect(() => {
        if (lightsRef.current.length > 0) {
            lightHeightRef.current = lightHeight;
            updateLightPosition();
        }
    }, [lightHeight]);

    useEffect(() => {
        if (lightsRef.current.length > 0) {
            lightDistanceRef.current = lightDistance;
            updateLightPosition();
        }
    }, [lightDistance]);

    useEffect(() => {
        if (showExperience && canvasContainerRef.current) {
            init3D();

            return () => {
                if (rendererRef.current) {
                    rendererRef.current.dispose();
                }
            };
        }
    }, [showExperience]);

    if (!showExperience) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-6xl font-bold text-white mb-6 animate-pulse">
                        3D Room Viewer
                    </h1>
                    <p className="text-xl text-white/80 mb-8 leading-relaxed">
                        Khám phá không gian 3D tương tác với khả năng di chuyển, xoay và tùy chỉnh đối tượng trong thời gian thực
                    </p>
                    <button
                        onClick={startExperience}
                        className="bg-white text-purple-900 px-8 py-4 rounded-full text-xl font-semibold hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    >
                        Bắt đầu trải nghiệm
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <div ref={canvasContainerRef} className="absolute inset-0 z-0"></div>

            <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white max-w-xs">
                <div className="space-y-4">
                    <button
                        onClick={backToLanding}
                        className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
                    >
                        ← Về trang chủ
                    </button>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Chế độ:</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setMode('move')}
                                className={`px-3 py-1 rounded text-sm transition-colors ${currentMode === 'move' ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                            >
                                Di chuyển
                            </button>
                            <button
                                onClick={() => setMode('rotate')}
                                className={`px-3 py-1 rounded text-sm transition-colors ${currentMode === 'rotate' ? 'bg-green-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                            >
                                Xoay
                            </button>
                            <button
                                onClick={() => setMode('delete')}
                                className={`px-3 py-1 rounded text-sm transition-colors ${currentMode === 'delete' ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={toggleLight}
                        className={`w-full px-4 py-2 rounded transition-colors ${isNightMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isNightMode ? '🌙 Đêm' : '☀️ Ngày'}
                    </button>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Thêm đối tượng:</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => addObject('chair')}
                                className="px-3 py-1 bg-brown-600 hover:bg-brown-700 rounded text-sm transition-colors"
                            >
                                Ghế
                            </button>
                            <button
                                onClick={() => addObject('bed')}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                            >
                                Giường
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white max-w-xs space-y-4">
                <details>
                    <summary className="font-semibold cursor-pointer">🏠 Kích thước phòng</summary>
                    <div className="space-y-2 mt-2">
                        <label className="block text-sm">
                            Rộng:
                            <input
                                type="number"
                                value={roomWidth}
                                onChange={(e) => setRoomWidth(parseFloat(e.target.value))}
                                className="ml-2 w-16 bg-gray-700 rounded px-2 py-1 text-sm"
                                step="0.5"
                                min="5"
                                max="20"
                            />
                        </label>
                        <label className="block text-sm">
                            Ngang:
                            <input
                                type="number"
                                value={roomDepth}
                                onChange={(e) => setRoomDepth(parseFloat(e.target.value))}
                                className="ml-2 w-16 bg-gray-700 rounded px-2 py-1 text-sm"
                                step="0.5"
                                min="5"
                                max="20"
                            />
                        </label>
                        <label className="block text-sm">
                            Cao:
                            <input
                                type="number"
                                value={roomHeight}
                                onChange={(e) => setRoomHeight(parseFloat(e.target.value))}
                                className="ml-2 w-16 bg-gray-700 rounded px-2 py-1 text-sm"
                                step="0.5"
                                min="3"
                                max="15"
                            />
                        </label>
                        <button
                            onClick={rebuildRoom}
                            className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm transition-colors"
                        >
                            Xây lại phòng
                        </button>
                    </div>
                </details>

                <details>
                    <summary className="font-semibold cursor-pointer">💡 Điều khiển ánh sáng</summary>
                    <div className="space-y-2 mt-2">
                        <label className="block text-sm">
                            Xoay ánh sáng: {lightRotation}°
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={lightRotation}
                                onChange={(e) => setLightRotation(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </label>
                        <label className="block text-sm">
                            Cường độ: {lightIntensity}
                            <input
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={lightIntensity}
                                onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </label>
                        <label className="block text-sm">
                            Độ cao: {lightHeight}
                            <input
                                type="range"
                                min="2"
                                max="20"
                                step="0.5"
                                value={lightHeight}
                                onChange={(e) => setLightHeight(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </label>
                        <label className="block text-sm">
                            Khoảng cách: {lightDistance}
                            <input
                                type="range"
                                min="1"
                                max="15"
                                step="0.5"
                                value={lightDistance}
                                onChange={(e) => setLightDistance(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </label>
                    </div>
                </details>

                <details>
                    <summary className="font-semibold cursor-pointer">🪟 Cửa sổ</summary>
                    <div className="space-y-2 mt-2">
                        <h4 className="font-semibold">Chọn tường có cửa sổ:</h4>
                        <div className="flex gap-4">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={wallsWithWindow.right}
                                    onChange={() => toggleWallWindow("right")}
                                />
                                Tường phải
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={wallsWithWindow.left}
                                    onChange={() => toggleWallWindow("left")}
                                />
                                Tường trái
                            </label>
                        </div>

                        {wallsWithWindow.left && (
                            <details open>
                                <summary className="font-semibold mt-2">Tường trái</summary>
                                <div className="space-y-2 mt-2">
                                    <label className="block text-sm">
                                        Ngang (X): {windowPositionLeft.x.toFixed(2)}
                                        <input
                                            type="range"
                                            min={(-ROOM_DEPTH_REF.current / 2)}
                                            max={(ROOM_DEPTH_REF.current / 2)}
                                            step={0.1}
                                            value={windowPositionLeft.x}
                                            onChange={(e) =>
                                                setWindowPositionLeft((prev) => ({
                                                    ...prev,
                                                    x: parseFloat(e.target.value),
                                                }))
                                            }
                                            className="w-full"
                                        />
                                    </label>

                                    <label className="block text-sm mt-2">
                                        Cao (Y): {windowPositionLeft.y.toFixed(2)}
                                        <input
                                            type="range"
                                            min={-ROOM_HEIGHT_REF.current / 2}
                                            max={ROOM_HEIGHT_REF.current / 2}
                                            step={0.1}
                                            value={windowPositionLeft.y}
                                            onChange={(e) =>
                                                setWindowPositionLeft((prev) => ({
                                                    ...prev,
                                                    y: parseFloat(e.target.value),
                                                }))
                                            }
                                            className="w-full"
                                        />
                                    </label>

                                    <label className="block text-sm mt-2">
                                        Rộng:
                                        <input
                                            type="range"
                                            min="0.25"
                                            max={ROOM_HEIGHT_REF.current - 1}
                                            step="0.1"
                                            value={windowLeftSize.width}
                                            onChange={(e) =>
                                                setWindowLeftSize((s) => ({ ...s, width: parseFloat(e.target.value) }))
                                            }
                                        />
                                        {windowLeftSize.width.toFixed(2)}
                                    </label>
                                    <label className="block text-sm mt-2">
                                        Cao:
                                        <input
                                            type="range"
                                            min="0.25"
                                            max={ROOM_HEIGHT_REF.current - 1}
                                            step="0.1"
                                            value={windowLeftSize.height}
                                            onChange={(e) =>
                                                setWindowLeftSize((s) => ({ ...s, height: parseFloat(e.target.value) }))
                                            }
                                        />
                                        {windowLeftSize.height.toFixed(2)}
                                    </label>
                                </div>
                            </details>
                        )}

                        {wallsWithWindow.right && (
                            <details open>
                                <summary className="font-semibold mt-2">Tường phải</summary>
                                <div className="space-y-2 mt-2">
                                    <label className="block text-sm">
                                        Ngang (X): {windowPositionRight.x.toFixed(2)}
                                        <input
                                            type="range"
                                            min={((-ROOM_DEPTH_REF.current / 2))}
                                            max={((ROOM_DEPTH_REF.current / 2))}
                                            step={0.1}
                                            value={windowPositionRight.x}
                                            onChange={(e) =>
                                                setWindowPositionRight((prev) => ({
                                                    ...prev,
                                                    x: parseFloat(e.target.value),
                                                }))
                                            }
                                            className="w-full"
                                        />
                                    </label>

                                    <label className="block text-sm mt-2">
                                        Cao (Y): {windowPositionRight.y.toFixed(2)}
                                        <input
                                            type="range"
                                            min={((-ROOM_DEPTH_REF.current / 2))}
                                            max={((ROOM_DEPTH_REF.current / 2))}
                                            step={0.1}
                                            value={windowPositionRight.y}
                                            onChange={(e) =>
                                                setWindowPositionRight((prev) => ({
                                                    ...prev,
                                                    y: parseFloat(e.target.value),
                                                }))
                                            }
                                            className="w-full"
                                        />
                                    </label>

                                    <label className="block text-sm mt-2">
                                        Rộng:
                                        <input
                                            type="range"
                                            min="0.25"
                                            max={ROOM_HEIGHT_REF.current - 1}
                                            step="0.1"
                                            value={windowRightSize.width}
                                            onChange={(e) =>
                                                setWindowRightSize((s) => ({ ...s, width: parseFloat(e.target.value) }))
                                            }
                                        />
                                        {windowRightSize.width.toFixed(2)}
                                    </label>
                                    <label className="block text-sm mt-2">
                                        Cao:
                                        <input
                                            type="range"
                                            min="0.25"
                                            max={ROOM_HEIGHT_REF.current - 1}
                                            step="0.1"
                                            value={windowRightSize.height}
                                            onChange={(e) =>
                                                setWindowRightSize((s) => ({ ...s, height: parseFloat(e.target.value) }))
                                            }
                                        />
                                        {windowRightSize.height.toFixed(2)}
                                    </label>
                                </div>
                            </details>
                        )}
                    </div>
                </details>

                <details>
                    <summary className="font-semibold cursor-pointer">🪵 Sàn gỗ</summary>
                    <div className="space-y-2 mt-2">
                        <h4 className="font-semibold">Chọn loại gỗ:</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {woodTextures.map((texture, index) => (
                                <img
                                    key={index}
                                    src={texture}
                                    alt={`Wood texture ${index + 1}`}
                                    className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${selectedTexture === texture ? 'border-blue-500' : 'border-transparent'} hover:border-blue-300`}
                                    onClick={() => changeFloorTexture(texture)}
                                />
                            ))}
                        </div>
                    </div>
                </details>

                <details>
                    <summary className="font-semibold cursor-pointer">🧱 Tường</summary>
                    <div className="space-y-2 mt-2">
                        <h4 className="font-semibold">Chọn texture:</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {wallTextures.map((texture, index) => (
                                <img
                                    key={index}
                                    src={texture}
                                    alt={`Wall texture ${index + 1}`}
                                    className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${selectedWallTexture === texture ? 'border-blue-500' : 'border-transparent'
                                        } hover:border-blue-300`}
                                    onClick={() => changeWallTexture(texture)}
                                />
                            ))}
                        </div>
                    </div>
                </details>

            </div>

            <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white max-w-md">
                <details>
                    <summary className="font-semibold cursor-pointer mb-2">📘 Hướng dẫn</summary>
                    <ul className="text-sm space-y-1 mt-2 list-disc list-inside">
                        <li>Chuột trái: Xoay camera</li>
                        <li>Chuột giữa: Di chuyển camera</li>
                        <li>Cuộn chuột: Zoom in/out</li>
                        <li>Click đối tượng: Chọn để di chuyển/xoay</li>
                        <li>Shift + kéo: Di chuyển theo chiều dọc</li>
                        <li>Chế độ xóa: Click để xóa đối tượng</li>
                    </ul>
                </details>
            </div>
        </div>
    );
};

export default RoomViewer;