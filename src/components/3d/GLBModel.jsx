import { useGLTF } from '@react-three/drei'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import { useCursor } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state, modes } from '../../utils/state'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'

useGLTF.preload('/3dObj/chair.glb')
useGLTF.preload('/3dObj/bed.glb')
useGLTF.preload('/3dObj/wardrobe.glb')

const GLBModel = forwardRef(({ id, name, onSelect }, ref) => {
    const { scene } = useGLTF(`/3dObj/${name}.glb`)
    const [hovered, setHovered] = useState(false)
    const snap = useSnapshot(state)
    useCursor(hovered)

    // ✅ Chỉ clone scene đúng 1 lần — tránh render lại không cần thiết
    const clonedScene = useMemo(() => {
        const cloned = clone(scene)
        cloned.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        return cloned
    }, [scene])

    return (
        <primitive
            ref={ref}
            object={clonedScene}
            position={[0, 0.5, 0]}
            onClick={e => {
                e.stopPropagation()
                onSelect()
            }}
            onContextMenu={e => {
                e.stopPropagation()
                if (state.current === id) {
                    state.mode = (snap.mode + 1) % modes.length
                }
            }}
            onPointerOver={e => {
                e.stopPropagation()
                setHovered(true)
            }}
            onPointerOut={e => setHovered(false)}
        />
    )
})

export default GLBModel
