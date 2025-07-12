import GLBModel from './GLBModel'
import OBJModel from './OBJModel'

const ModelLoader = (props) => {
    const { name } = props
    const isGLB = name.toLowerCase().endsWith('.glb')

    return isGLB
        ? <GLBModel {...props} path={name} />
        : <OBJModel {...props} path={name} />
}

export default ModelLoader
