import SiteSettings from '../settings.js'

class RoomUI {

    constructor () {

        this.name = document.body.querySelector( 'page#rooms panel name' )
        this.info = document.body.querySelector( 'page#rooms panel info ul' )

    }

    setInfo ( dataName ) {

        this.info.innerHTML = ''

        for ( let i = 0; i < SiteSettings.rooms.data[ dataName ].info.length; i++ ) {

            const element = document.createElement( 'li' )
            element.innerHTML = SiteSettings.rooms.data[ dataName ].info[ i ]

            this.info.appendChild( element )

            //

            let roomIndex = 0

            for ( const r in SiteSettings.rooms.data ) {

                if ( dataName == r ) break

                roomIndex++

            }

            SiteSettings.rooms.selected.index = roomIndex

        }

    }

    setName ( dataName ) {

        this.name.innerHTML = SiteSettings.rooms.data[ dataName ].name

    }

    //

    set ( dataName ) {

        this.setInfo( dataName )
        this.setName( dataName )

    }

}

export default RoomUI