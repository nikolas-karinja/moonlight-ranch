import Xerxes from '../xerxes.js'

class SceneControls extends Xerxes.control.orbit {

    constructor ( object, domElement ) {

        super( object, domElement )

        // angling

        this.maxPolarAngle = 0.7238392541543307
        this.minPolarAngle = 0.7238392541543307

        // damping (interia)

        this.enableDamping = true
        this.dampingFactor = 0.05

        // distancing

        this.maxDistance = 20
        this.minDistance = 5

        // panning

        this.panSpeed = 2
        this.screenSpacePanning = false

    }

}

export default SceneControls