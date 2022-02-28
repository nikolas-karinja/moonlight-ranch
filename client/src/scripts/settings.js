class Settings {

    constructor () {

        this.page = {
            selected: document.body.querySelectorAll( 'tool-ui btn' )[ 0 ].id
        }

        this.rooms = {
            action: 'none',
            moveToDuration: 1000,
            pushOutDuration: 1000,

            selected: {
                cameraOffset: 7,
                index: 0,
                zOffset: 15,

                current: {
                    index: null,
                    name: '',
                    z: 0,
                },

                previous: {
                    index: null,
                    name: '',
                    z: 0,
                },
            }
        }

    }

}

const SiteSettings = new Settings()

export default SiteSettings