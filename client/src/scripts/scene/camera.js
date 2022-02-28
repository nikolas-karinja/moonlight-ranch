import Xerxes from '../xerxes.js'

class SceneCamera extends Xerxes.camera.perspective {

    constructor () {

        super()

        this.element = document.body.querySelector( 'page#rooms' )
            .querySelector( 'renderer' )

        this.aspect =  this.element.clientWidth / this.element.clientHeight 
        this.far = 2000
        this.fov = 45
        this.near = 0.01

        this.position.set( 50, 80, 50 )

        this.updateProjection()

    }

    updateProjection () {

        this.aspect =  this.element.clientWidth / this.element.clientHeight 
        this.updateProjectionMatrix()

    }

}

export default SceneCamera