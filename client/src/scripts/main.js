import Xerxes from './xerxes.js'
import Actors from './actors.js'
import SiteSettings from './settings.js'

import * as RoomUtils from './utils/rooms.js'
import * as SceneUtils from './utils/scene.js'
import * as UIUtils from './utils/ui.js'

import * as Tween from './tween.js'

import { generateListeners } from './listeners.js'

class App extends Xerxes.app.default {

    constructor () {

        super()

        this.actors = Actors

    }

    init () {

        RoomUtils.preloadImages()

        SceneUtils.setupActors()
        SceneUtils.setupLighting()
        SceneUtils.setupHouse()

        UIUtils.setup()

        RoomUtils.setup()

        generateListeners()

        this.animateLogo()

        this.resize()
        this.visualize()

    }

    update () {

        if ( screen.orientation.type == 'landscape-primary' ) {

            if ( Actors.camera.scene && SiteSettings.page.selected == 'rooms' ) {
            
                Actors.renderer.scene.render( Actors.scene.main, Actors.camera.scene )
    
            }
    
            if( Actors.light.sun && Actors.control.scene ) Actors.light.sun.update( Actors.control.scene.target )
    
            if ( Object.keys( Actors.control ).length > 0 ) {
    
                for ( const c in Actors.control ) Actors.control[ c ].update()
    
            }
            
        }

        Tween.update()

    }

    resize () {

        window.onresize = () => {

            if ( Actors.camera.scene ) Actors.camera.scene.updateProjection()
            if ( Actors.renderer.scene ) Actors.renderer.scene.resize()

        }

    }

    animateLogo () {

        setTimeout( () => {

            document.body.querySelector( 'text-ui' ).style.animation = 'recolor--ui 4s forwards'
            document.body.querySelector( 'text-ui content' ).style.animation = 'move-to-left--content 2s forwards'
            document.body.querySelector( 'text-ui content ul#title li' ).style.animation = 'move-to-left--text 4s forwards'
            document.body.querySelector( 'text-ui content hr#title' ).style.animation = 'move-to-left--hr 2s forwards'
            document.body.querySelector( 'text-ui content ul#loading li' ).style.animation = 'disappear--loading 2s forwards'
        
            const description = document.body.querySelectorAll( 'text-ui content ul#description li' )

            for ( let i = 0; i < description.length; i++ ) {
                description[ i ].style.animation = 'move-to-left--text 4s forwards'
            }

            setTimeout ( () => {

                document.body.querySelector( 'tool-ui' ).style.animation = 'tools-appear 2s forwards'
                document.body.querySelector( 'page#home' ).style.animation = 'appear 2s forwards'

            }, 2000 )

        }, 1000 )

    }

}

window.app = new App( {
    useSRGBEncoding: true
} )

window.app.init()