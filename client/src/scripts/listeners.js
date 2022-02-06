import SiteSettings from './settings.js'

import * as InterfaceUtils from './utils/interface.js'

function generateListeners () {

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

}

export { generateListeners }