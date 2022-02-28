import Xerxes from '../xerxes.js'

class SceneControls extends Xerxes.control.orbit {

    constructor ( object, domElement ) {

        super( object, domElement )

        // angling

        this.maxPolarAngle = Math.PI / 2
        // this.minPolarAngle =  Math.PI / 2

        // damping (interia)

        this.enableDamping = true
        this.dampingFactor = 0.05

        // distancing

        this.maxDistance =30
        this.minDistance = 1

        // panning

        this.enablePan = false
        this.panSpeed = 2
        this.screenSpacePanning = false

    }

}

export default SceneControls