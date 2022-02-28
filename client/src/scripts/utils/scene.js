import Xerxes from '../xerxes.js'
import Actors from '../actors.js'

import SceneCamera from '../scene/camera.js'
import SceneControls from '../scene/controls.js'
import SceneLight from '../scene/light.js'
import SceneMouse from '../scene/mouse.js'
import SceneRenderer from '../scene/renderer.js'

import * as RoomUtils from './rooms.js'

function setupActors () {

    Actors.scene.main = new Xerxes.scene()

    Actors.camera.scene = new SceneCamera()

    Actors.renderer.scene = new SceneRenderer()

    Actors.control.scene = new SceneControls( Actors.camera.scene, Actors.renderer.scene.domElement )

    Actors.mouse.scene = new SceneMouse()

}

function setupLighting () {

    // add hemisphere

    Actors.light.hemi = new Xerxes.light.hemisphere( 0xffffff, 0xffffff, 1 )
    Actors.light.hemi.position.set( 0, 500, 0 )

    Actors.scene.main.add( Actors.light.hemi )

    // add sun

    Actors.light.sun = new SceneLight( 0xffffff, 1, { parent: Actors.scene.main } )

}

function setupHouse () {

    return new Promise( ( resolve ) => {

        const loader = new Xerxes.loader.gltf()

        loader.load( 'client/assets/models/room-type-2.glb', ( model ) => {

            model.scene.children[ 0 ].material.side = Xerxes.constant.side.double
            model.scene.children[ 0 ].material.needsUpdate = true

            model.scene.children[ 0 ].castShadow = true

            Actors.house = model.scene

            // Actors.house.bounds = new Xerxes.helper.box( Actors.house, 0xff00ff )
            // Actors.house.add( Actors.house.bounds )

            for ( let i = 0; i < Actors.house.children.length; i++ ) {

                if ( Actors.house.children[ i ].name == 'roof' ||
                    Actors.house.children[ i ].name == 'floor-2' ) {
        
                    Actors.house.children[ i ].material = new Xerxes.material.mesh.phong( {
                        color: 0x4d3310,
                        opacity: 0.5,
                        transparent: true,
                    } )
        
                }
        
            }

            Actors.scene.main.add( Actors.house )

            // add plane for shadows

            resolve()

        } )

    } )

}

export { setupActors, setupLighting, setupHouse }