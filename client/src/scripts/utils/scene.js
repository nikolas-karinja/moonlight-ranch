import Xerxes from '../xerxes.js'
import Actors from '../actors.js'

import SceneCamera from '../scene/camera.js'
import SceneControls from '../scene/controls.js'
import SceneLight from '../scene/light.js'
import SceneRenderer from '../scene/renderer.js'

function setupActors () {

    Actors.scene.main = new Xerxes.scene()

    Actors.camera.scene = new SceneCamera()

    Actors.renderer.scene = new SceneRenderer()

    Actors.control.scene = new SceneControls( Actors.camera.scene, Actors.renderer.scene.domElement )

}

function setupLighting () {

    // add hemisphere

    Actors.light.hemi = new Xerxes.light.hemisphere( 0xffffff, 0xffffff, 1 )
    Actors.light.hemi.position.set( 0, 500, 0 )

    Actors.scene.main.add( Actors.light.hemi )

    // add sun

    Actors.light.sun = new SceneLight( 0xffffff, 1, { parent: Actors.scene.main } )

}

function setupTestRoom () {

    return new Promise( ( resolve ) => {

        const loader = new Xerxes.loader.gltf()

        loader.load( 'client/assets/models/room-type-2.glb', ( model ) => {

            model.scene.children[ 0 ].material.side = Xerxes.constant.side.double
            model.scene.children[ 0 ].material.needsUpdate = true

            model.scene.children[ 0 ].castShadow = true

            Actors.scene.main.add( model.scene )

            // add plane for shadows

            resolve()

        } )

    } )

}

export { setupActors, setupLighting, setupTestRoom }