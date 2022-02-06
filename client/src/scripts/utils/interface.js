import SiteSettings from '../settings.js'

function setPage ( pageId ) {

    return new Promise( ( resolve ) => {

        if ( pageId != 'home' ) {

            document.body.querySelector( `text-ui` ).style.animation = 'disappear 1s forwards'

            document.body.querySelector( `page#${ pageId }` ).style.animation = 'appear 1s forwards'

            SiteSettings.page.previous = `${ SiteSettings.page.selected }`

            SiteSettings.page.selected = pageId

        } else {

            document.body.querySelector( `page#${ SiteSettings.page.selected }` ).style.animation = 'disappear 1s forwards'

            document.body.querySelector( `text-ui` ).style.animation = 'appear 1s forwards'

            SiteSettings.page.previous = `${ SiteSettings.page.selected }`

            SiteSettings.page.selected = pageId

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