import Xerxes from '../xerxes.js'

const defaults = {
    alpha: true,
    antialias: true
}

class SceneRenderer extends Xerxes.renderer.webgl {

    constructor ( parameters = defaults ) {

        super( parameters )

        this.element = document.body.querySelector( 'page#rooms' )
            .querySelector( 'renderer' )

        this.outputEncoding = Xerxes.constant.encoding.srgb
        this.shadowMap.enabled = true

        this.setPixelRatio( window.devicePixelRatio )
        this.setSize( this.element.clientWidth, this.element.clientHeight )

        this.element.appendChild( this.domElement )

    }

    resize () {

        this.setSize( this.element.clientWidth, this.element.clientHeight )

    }

}

export default SceneRenderer