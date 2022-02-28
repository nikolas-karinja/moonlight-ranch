import SiteSettings from '../settings.js'

import * as RoomUtils from '../utils/rooms.js' 

function setPage ( pageId ) {

    return new Promise( ( resolve ) => {

        if ( pageId != 'home' ) {

            document.body.querySelector( `text-ui` ).style.animation = 'disappear 1s forwards'

            if ( SiteSettings.page.selected ) {

                document.body.querySelector( `page#${ SiteSettings.page.selected }` )
                    .style.animation = 'disappear 1s forwards'

            }

            document.body.querySelector( `page#${ pageId }` ).style.animation = 'appear 1s forwards'

            SiteSettings.page.previous = `${ SiteSettings.page.selected }`

            SiteSettings.page.selected = pageId

            if ( pageId == 'rooms' ) {

                setTimeout( () => {

                    RoomUtils.viewRoom( Object.keys( SiteSettings.rooms.data )[ 0 ] )

                }, 1500 )

            }

        } else {

            document.body.querySelector( `page#${ SiteSettings.page.selected }` )
                .style.animation = 'disappear 1s forwards'

            document.body.querySelector( `page#home` ).style.animation = 'appear 1s forwards'

            document.body.querySelector( `text-ui` ).style.animation = 'appear-text-ui 1s forwards'

            SiteSettings.page.previous = `${ SiteSettings.page.selected }`

            SiteSettings.page.selected = pageId

        }

        for ( let i = 0; i < document.querySelectorAll( 'iframe' ); i++ ) {

            console.log( 'ass' )

            const iframe = document.querySelectorAll( 'iframe' )[ i ]

            iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')

        }

        updatePageLabel( pageId )

        resolve()

    } )

}

function updatePageLabel ( pageId, color ) {

    return new Promise( ( resolve ) => {

        document.body.querySelector( 'tool-ui label' ).innerHTML = document.body.querySelector( `tool-ui btn#${ pageId }` ).getAttribute( 'label' )

        if ( color ) document.body.querySelector( 'tool-ui label' ).style.color = color

        resolve()

    } )

}

export { setPage, updatePageLabel }