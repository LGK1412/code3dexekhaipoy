// OBJModel.jsx
import { useLoader } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { forwardRef, useMemo, useState } from 'react'
import { useSnapshot } from 'valtio'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { Box3, Vector3 } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { state, modes } from '../../utils/state'

const OBJModel = forwardRef(({ id, path, name, onSelect }, ref) => {
    const scene = useLoader(OBJLoader, `/3dObj/${name}`)
    const [hovered, setHovered] = useState(false)
    const snap = useSnapshot(state)
    useCursor(hovered)

    const clonedScene = useMemo(() => {
        const cloned = clone(scene)
        cloned.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        const box = new Box3().setFromObject(cloned)
        const size = new Vector3()
        box.getSize(size)
        console.log(`📦 Kích thước của ${name}:`, size)

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
            onPointerOut={() => setHovered(false)}
        />
    )
})

export default OBJModel
