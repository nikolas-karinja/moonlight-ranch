import Xerxes from '../xerxes.js'

class SceneLight extends Xerxes.light.directional {

    constructor ( color, intensity, parameters = {} ) {

        super( color, intensity )

        // add sun with shadow

        this.position.set( -50, 100, 50 ) // -1, 0.75, 1
        this.castShadow = true
        this.shadow.mapSize.width = 2048 * 100
        this.shadow.mapSize.height = 2048 * 100
        this.shadow.camera.near = -2000
        this.shadow.camera.far = 2000
        this.shadow.camera.left = -100
        this.shadow.camera.right = 100
        this.shadow.camera.top = 100
        this.shadow.camera.bottom = -100

        this.target.position.set( 0, 0, 0 )

        if ( parameters.parent ) {

            parameters.parent.add( this )
            parameters.parent.add( this.target )

        }

    }

    update ( controlTarget ) {

        this.target.position.x = controlTarget.x
        this.target.position.y = controlTarget.y
        this.target.position.z = controlTarget.z

        this.position.set(
            controlTarget.x + -50,
            controlTarget.y + 100,
            controlTarget.z + 50
        )

    }

}

export default SceneLight