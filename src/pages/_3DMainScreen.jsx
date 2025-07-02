import { useRef, useEffect, useState } from 'react'
import { SoftShadows, useHelper, OrbitControls, TransformControls } from '@react-three/drei'
import { DirectionalLightHelper } from 'three'
import Room from '../components/3d/room'
import GLBModel from '../components/3d/GLBModel'
import { useSnapshot } from 'valtio'
import { state, modes } from '../utils/state'
import { useThree } from '@react-three/fiber'

export default function _3DMainScreen({ models, setModels, setPopupInfo }) {
    const directionalLightRef = useRef()
    const transform = useRef()
    const modelRefs = useRef({})
    const snap = useSnapshot(state)
    const { gl } = useThree()

    // useHelper(directionalLightRef, DirectionalLightHelper, 1, 'white')

    // Để sau này dùng
    // useEffect(() => {
    //     models.forEach(({ name }) => {
    //         useGLTF.preload(`/3dObj/${name}.glb`)
    //     })
    // }, [models])


    useEffect(() => {
        const control = transform.current
        if (!control) return

        const clampPosition = () => {
            const obj = control.object
            if (!obj) return

            const min = { x: -4, y: 0.5, z: -7.5 } // min x = -x sàn / 2 + dày(z sàn) + 0.1  
            const max = { x: 4, y: 8, z: 7.5 }

            obj.position.x = Math.max(min.x, Math.min(max.x, obj.position.x))
            obj.position.y = Math.max(min.y, Math.min(max.y, obj.position.y))
            obj.position.z = Math.max(min.z, Math.min(max.z, obj.position.z))
        }

        control.addEventListener('objectChange', clampPosition)
        return () => control.removeEventListener('objectChange', clampPosition)
    }, [snap.current])

    useEffect(() => {
        const onPointerMissed = (e) => {
            if (e.button === 0) { // left click ngoài object
                state.current = null
            }
        }
        gl.domElement.addEventListener('pointermissed', onPointerMissed)
        return () => gl.domElement.removeEventListener('pointermissed', onPointerMissed)
    }, [gl.domElement])

    return (
        <>
            {/* <SoftShadows size={25} samples={20} /> */}
            <directionalLight
                ref={directionalLightRef}
                position={[-8, 10, -3]}
                intensity={2.5}
                color="#ffeb87"
                castShadow
            />
            <ambientLight intensity={0.4} />
            <Room size={[1, 1, 1]} color="#ffffff" />

            {models.map(({ name, id }) => (
                    <GLBModel
                        id={id}
                        name={name}
                        position={[0, 0, 0]}
                        ref={el => {
                            if (el) modelRefs.current[id] = el
                            else delete modelRefs.current[id]
                        }}
                        onSelect={() => {
                            if (state.deleteMode) {
                                setModels(prev => prev.filter(m => m.id !== id))
                                if (state.current === id) state.current = null
                                setPopupInfo(null)
                            } else {
                                state.current = id
                                const menh = 'Hỏa'
                                const huong = 'Bắc'
                                setPopupInfo({ menh, huong, name })
                            }
                        }}
                    />
            ))}

            {snap.current && modelRefs.current[snap.current] && (
                <TransformControls
                    ref={transform}
                    object={modelRefs.current[snap.current]}
                    mode={modes[snap.mode]}
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerUp={(e) => e.stopPropagation()}
                />
            )}

            {/* makeDefault để OrbitControls tự disable khi TransformControls active */}
            <OrbitControls
                makeDefault
                minDistance={2}
                maxDistance={20}
            />
        </>
    )
}
