import GLBModel from './GLBModel'
import OBJModel from './OBJModel'

const ModelLoader = (props) => {
    const { model_name } = props
    const isGLB = model_name.toLowerCase().endsWith('.glb')

    return isGLB
        ? <GLBModel {...props} path={model_name} />
        : <OBJModel {...props} path={model_name} />
}

export default ModelLoader
