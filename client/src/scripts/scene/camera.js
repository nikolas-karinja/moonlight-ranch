import Xerxes from '../xerxes.js'

class SceneCamera extends Xerxes.camera.perspective {

    constructor () {

        super()

        this.aspect = window.innerWidth / window.innerHeight
        this.far = 2000
        this.fov = 45
        this.near = 0.01

        this.position.set( 50, 80, 50 )

        this.updateProjection()

    }

    updateProjection () {

        this.aspect = window.innerWidth / window.innerHeight
        this.updateProjectionMatrix()

    }

}

export default SceneCamera