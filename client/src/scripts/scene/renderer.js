import Xerxes from '../xerxes.js'

const defaults = {
    alpha: true,
    antialias: true
}

class SceneRenderer extends Xerxes.renderer.webgl {

    constructor ( parameters = defaults ) {

        super( parameters )

        this.outputEncoding = Xerxes.constant.encoding.srgb
        this.shadowMap.enabled = true

        this.setPixelRatio( window.devicePixelRatio )
        this.setSize( window.innerWidth, window.innerHeight )

        document.body.querySelector( 'page#rooms' ).appendChild( this.domElement )

    }

    resize () {

        this.setSize( window.innerWidth, window.innerHeight )

    }

}

export default SceneRenderer