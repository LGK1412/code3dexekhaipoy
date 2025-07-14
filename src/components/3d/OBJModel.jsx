import React, { useState, useEffect, useMemo } from 'react'
import { useCursor } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { forwardRef } from 'react'
import { Box3, Vector3 } from 'three'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import { state, modes } from '../../utils/state'
import { loadOBJWithCache } from './objCache'

const OBJModel = forwardRef(({ id, name, onSelect }, ref) => {
    const [object, setObject] = useState(null)
    const [hovered, setHovered] = useState(false)
    const snap = useSnapshot(state)
    useCursor(hovered)

    useEffect(() => {
        loadOBJWithCache(`/3dObj/file3dobj/${name}`)
            .then(setObject)
            .catch(err => console.error("Load OBJ error:", err))
    }, [name])

    const clonedScene = useMemo(() => {
        if (!object) return null
        const cloned = clone(object)
        cloned.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        const box = new Box3().setFromObject(cloned)
        const size = new Vector3()
        box.getSize(size)

        return cloned
    }, [object])

    if (!clonedScene) return null

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

export default React.memo(OBJModel)
