import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const objLoader = new OBJLoader()
const cache = new Map()

export const loadOBJWithCache = async (url) => {
    if (cache.has(url)) {
        return cache.get(url).clone()
    }

    const model = await objLoader.loadAsync(url)
    cache.set(url, model)
    return model.clone()
}
