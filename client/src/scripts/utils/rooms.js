import Actors from '../actors.js'
import SiteSettings from '../settings.js'

import * as Tween from '../tween.js'

const target = { x: 0, y: 0, z: 0 }

function setup () {

    return new Promise( ( resolve ) => {

        fetch( '/client/src/rooms.json' )
            .then( ( response ) => response.json() )
            .then( ( data ) => {

                SiteSettings.rooms.data = data

                SiteSettings.rooms.list = []

                for ( const r in SiteSettings.rooms.data ) {

                    SiteSettings.rooms.list.push( r )

                }

                //

                Actors.ui.rooms.set( Object.keys( SiteSettings.rooms.data )[ 0 ] )

                resolve()

            } )

    } )

}

function viewRoom ( name ) {

    if ( SiteSettings.rooms.action != 'selecting' &&
        SiteSettings.rooms.list.includes( name ) ) {

        SiteSettings.rooms.action = 'selecting'

        //

        let roomIndex
    
        for ( let i = 0; i < Actors.house.children.length; i++ ) {

            if ( Actors.house.children[ i ].name == name ) {

                roomIndex = i

                break

            }

        }

        if ( SiteSettings.rooms.selected.current.index != roomIndex ) {

            const newTarget1 = { 
                x: Actors.house.children[ roomIndex ].position.x,
                y: Actors.house.children[ roomIndex ].position.y,
                z: Actors.house.children[ roomIndex ].position.z 
            }
    
            const cameraTween1 = new Tween.Tween( Actors.camera.scene.position )
                .to( {
                    x: newTarget1.x + SiteSettings.rooms.selected.cameraOffset,
                    y: newTarget1.y + SiteSettings.rooms.selected.cameraOffset,
                    z: newTarget1.z + SiteSettings.rooms.selected.cameraOffset,
                }, SiteSettings.rooms.moveToDuration )
                .easing( Tween.Easing.Quadratic.InOut )
                .start()
    
            const targetTween1 = new Tween.Tween( Actors.control.scene.target )
                .to( newTarget1, SiteSettings.rooms.moveToDuration )
                .easing( Tween.Easing.Quadratic.InOut )
                .start()
    
            if ( SiteSettings.rooms.selected.current.index != null ) {
    
                const roomTweenIn = new Tween.Tween( Actors.house.children[ SiteSettings.rooms.selected.current.index ].position )
                    .to( {
                        x: Actors.house.children[ SiteSettings.rooms.selected.current.index ].position.x,
                        y: Actors.house.children[ SiteSettings.rooms.selected.current.index ].position.y,
                        z: SiteSettings.rooms.selected.current.z,
                    }, SiteSettings.rooms.moveToDuration )
                    .easing( Tween.Easing.Quadratic.InOut )
                    .start()
    
            }
    
            SiteSettings.rooms.selected.current.index = roomIndex
            SiteSettings.rooms.selected.current.z = Actors.house.children[ roomIndex ].position.z
    
            setTimeout( () => {
    
                let newZ, camZ
    
                if ( Actors.house.children[ roomIndex ].position.z < 0 ) {
    
                    newZ = Actors.house.children[ roomIndex ].position.z - SiteSettings.rooms.selected.zOffset
    
                    camZ = newZ - SiteSettings.rooms.selected.cameraOffset
        
                } else {
    
                    newZ = Actors.house.children[ roomIndex ].position.z + SiteSettings.rooms.selected.zOffset
    
                    camZ = newZ + SiteSettings.rooms.selected.cameraOffset
    
                }
    
                const newTarget2 = { 
                    x: Actors.house.children[ roomIndex ].position.x,
                    y: Actors.house.children[ roomIndex ].position.y,
                    z: newZ
                }
    
                const cameraTween2 = new Tween.Tween( Actors.camera.scene.position )
                    .to( {
                        x: newTarget2.x + SiteSettings.rooms.selected.cameraOffset,
                        y: newTarget2.y + SiteSettings.rooms.selected.cameraOffset,
                        z: camZ,
                    }, SiteSettings.rooms.pushOutDuration )
                    .easing( Tween.Easing.Quadratic.InOut )
                    .start()
    
                const targetTween2 = new Tween.Tween( Actors.control.scene.target )
                    .to( newTarget2, SiteSettings.rooms.pushOutDuration )
                    .easing( Tween.Easing.Quadratic.InOut )
                    .start()
    
                const roomTweenOut = new Tween.Tween( Actors.house.children[ roomIndex ].position )
                    .to( {
                        x: newTarget2.x,
                        y: newTarget2.y,
                        z: newZ,
                    }, SiteSettings.rooms.pushOutDuration )
                    .easing( Tween.Easing.Quadratic.InOut )
                    .start()
    
                    setTimeout( () => {
    
                        SiteSettings.rooms.action = 'none'
    
                    }, SiteSettings.rooms.pushOutDuration )

                    //

                    Actors.ui.rooms.set( name )
    
            }, SiteSettings.rooms.moveToDuration )

        } else SiteSettings.rooms.action = 'none'

    }

}

export { setup, viewRoom }