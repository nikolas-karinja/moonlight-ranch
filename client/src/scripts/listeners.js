import Actors from './actors.js'
import SiteSettings from './settings.js'

import * as InterfaceUtils from './utils/interface.js'
import * as RoomUtils from './utils/rooms.js'

function generateListeners () {

    Actors.renderer.scene.element.onclick = ( e ) => {

        if ( Actors.mouse.scene ) Actors.mouse.scene.onClick( e )

    }

    Actors.renderer.scene.element.onmousemove = ( e ) => {

        if ( Actors.mouse.scene ) Actors.mouse.scene.onMove( e )

    }

    //

    const toolButtons = document.body.querySelectorAll( 'tool-ui btn' )

    console.log( toolButtons )

    for ( let i = 0; i < toolButtons.length; i++ ) {

        toolButtons[ i ].onclick = function ( e ) {

            InterfaceUtils.setPage( this.id )

        }

        toolButtons[ i ].onmouseenter = function ( e ) {

            InterfaceUtils.updatePageLabel( this.id, 'turquoise' )

        }

        toolButtons[ i ].onmouseleave = function ( e ) {

            InterfaceUtils.updatePageLabel( SiteSettings.page.selected, 'white' )

        }

    }

    //

    const backRoomButton = document.body.querySelector( 'page#rooms panel shifter#back' ),
        nextRoomButton = document.body.querySelector( 'page#rooms panel shifter#next' )

    backRoomButton.onclick = () => {

        if ( SiteSettings.rooms.action == 'none' ) {

            if ( SiteSettings.rooms.selected.index > 0 ) {

                SiteSettings.rooms.selected.index--
    
            } else {

                SiteSettings.rooms.selected.index = Object.keys( SiteSettings.rooms.data ).length - 1

            }

            RoomUtils.viewRoom( Object.keys( SiteSettings.rooms.data )[ SiteSettings.rooms.selected.index ] )

        }

    }

    nextRoomButton.onclick = () => {

        if ( SiteSettings.rooms.action == 'none' ) {

            if ( SiteSettings.rooms.selected.index < Object.keys( SiteSettings.rooms.data ).length - 1 ) {

                SiteSettings.rooms.selected.index++
    
            } else {

                SiteSettings.rooms.selected.index = 0

            }

            RoomUtils.viewRoom( Object.keys( SiteSettings.rooms.data )[ SiteSettings.rooms.selected.index ] )

        }

    }

    //

    document.body.querySelector( 'page#contact' ).onmousemove = ( e ) => {

        if ( screen.orientation.type == 'landscape-primary' ) {

            const panelElement = document.body.querySelector( 'page#contact panel' )

            const bounds = panelElement.getBoundingClientRect()

            const x = -( e.clientY - bounds.y - ( bounds.height / 2 ) ) / 500,
                y = -( e.clientX - bounds.x - ( bounds.width / 2 ) ) / 500

            panelElement.style.transition = '0s ease'
            
            panelElement.style.transform 
                = `translate( -50%, -50% ) perspective( 100px ) rotateX( ${ x }deg ) rotateY( ${ -y }deg )`

        }

    }

}

export { generateListeners }