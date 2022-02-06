class Settings {

    constructor () {

        this.page = {
            selected: document.body.querySelectorAll( 'tool-ui btn' )[ 0 ].id
        }

    }

}

const SiteSettings = new Settings()

export default SiteSettings