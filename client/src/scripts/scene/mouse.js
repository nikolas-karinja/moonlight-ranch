import Xerxes from '../xerxes.js'
import Actors from '../actors.js'

import * as RoomUtils from '../utils/rooms.js'

class SceneMouse {

    constructor () {

        this.ray = new Xerxes.raycaster()

        this.position = {
            ray: new Xerxes.vec2(),
            screen: new Xerxes.vec2(),
        }

    }

    onMove ( e ) {

        if ( Actors.renderer.scene ) {

            this.position.ray.x = ( ( e.clientX - 612 ) / Actors.renderer.scene.element.clientWidth ) * 2 - 1
	        this.position.ray.y = - ( e.clientY / Actors.renderer.scene.element.clientHeight ) * 2 + 1

        }

        this.position.screen.set( e.clientX, e.clientY )

    }

    onClick ( e ) {

        if ( Actors.camera.scene && Actors.house ) {

            this.ray.setFromCamera( this.position.ray, Actors.camera.scene )

            const intersects = this.ray.intersectObjects( Actors.house.children )

            if ( intersects.length > 0 ) {

                // console.log( intersects[ 0 ].object.name )

                RoomUtils.viewRoom( intersects[ 0 ].object.name )

            }

        }

    }

}

export default SceneMouse