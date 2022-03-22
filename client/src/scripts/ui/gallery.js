class Gallery {

    /**
     * 
     * @param { Element } container The DOM element in which the gallery will render to.
     * @param { string } imageSize The size of the image, based on the CSS property <background-size>.
     */
    constructor ( container, imageSize, path, type ) {

        this.activeIndex = 0
        this.container = container || this.createContainer()
        this.images = new Array()
        this.imageSize = imageSize || 'cover'
        this.path = path || ''
        this.type = type || ''

		this.setDefaultPath( path || '' )
		this.setDefaultType( type || '' )

		this.container.style.backgroundColor = 'tranparent'

        this.identifiers = this.container.querySelector( 'identifiers' ) || null

    }

    /**
     * 
     * All the arguments are strings the represent image URLs.
     */
    addImages () {

        return new Promise ( resolve => {

            for ( let i = 0; i < arguments.length; i++ ) {

                this.images.push( new GalleryImage(
                    this.container,
                    this.path + arguments[ i ] + this.type, 
                    this.imageSize 
                ) )

            }

            for ( let i = 0; i < this.images.length; i++ ) {

                const bar = document.createElement( 'bar')
                bar.id = `i${ i }`

                if ( this.identifiers ) this.identifiers.appendChild( bar )

                //

                if ( i > 0 ) {

                    this.images[ i ].element.style.animation = 'image-disappear 0.5s forwards'

                } else {

                    this.images[ i ].element.style.display = 'image-appear 0.5s forwards'

                    if ( this.identifiers ) this.identifiers.querySelector( `bar#i${ i }` ).setAttribute( 'selected', '' )

                    this.container.querySelector( 'div#back' ).style.opacity = '0%'
                    this.container.querySelector( 'div#next' ).style.opacity = '100%'

                    this.activeIndex = i
                }

            }

            resolve()

        } )

    }

    back () {

        return new Promise( resolve => {

            if ( this.images.length > 0 ) {

				if ( this.activeIndex > 0 ) {

					this.setImage( this.activeIndex - 1 )

				}

			}

			resolve()

        } )

    }

	next () {

        return new Promise( resolve => {

			if ( this.images.length > 0 ) {

            	if ( this.activeIndex < this.images.length - 1 ) {

					this.setImage( this.activeIndex + 1 )

				}

			}	

			resolve()

        } )

    }

    /**
     * 
     * @returns The created container element.
     */
    createContainer () {

        const element = document.createElement( 'div' )
        element.style.position = 'absolute'
        element.style.backgroundColor = '#212121'
        element.style.height = '200px'
        element.style.width = '300px'

        return element

    }

    /**
     * 
     * @param { string } path The default directory for all your images you will add.
     */
    setDefaultPath ( path = '' ) {

        return new Promise( resolve => {

            this.path = path

            resolve()

        } )

    }

    /**
     * 
     * @param { string } type The default image type when adding images.
     */
    setDefaultType ( type = '' ) {

        return new Promise( resolve => {

            if ( type == 'bmp' ||
                type == 'gif' ||
                type == 'jpg' ||
                type == 'jpeg' ||
                type == 'png' ||
                type == 'svg' ) this.type = `.${ type }`
            else this.type = ''

            resolve()

        } )

    }

	setImage ( index = 0 ) {

		return new Promise( resolve => {

			for ( let i = 0; i < this.images.length; i++ ) {

                if ( i != index ) {

                    this.images[ i ].element.style.animation = 'image-disappear 0.5s forwards'
                    
                    if ( this.identifiers ) {

                        if ( this.identifiers.querySelector( `bar#i${ i }` ).hasAttribute( 'selected' ) ) {

                            this.identifiers.querySelector( `bar#i${ i }` ).removeAttribute( 'selected' )

                        }

                    }

                } else {

                    this.images[ i ].element.style.animation = 'image-appear 0.5s forwards'

                    if ( this.identifiers ) this.identifiers.querySelector( `bar#i${ i }` ).setAttribute( 'selected', '' )

                    this.activeIndex = i

                }

                if ( index == 0 ) this.container.querySelector( 'div#back' ).style.opacity = '0%'
                else this.container.querySelector( 'div#back' ).style.opacity = '100%'

                if ( index == this.images.length - 1 ) this.container.querySelector( 'div#next' ).style.opacity = '0%'
                else this.container.querySelector( 'div#next' ).style.opacity = '100%'

            }

			resolve()

		} )

	}

	clearImages () {

		return new Promise( resolve => {

            if ( this.identifiers ) this.identifiers.innerHTML = ''

			for ( let i = 0; i < this.images.length; i++ ) {

                this.images[ i ].element.remove()

            }

			this.images = new Array()

			resolve()

		} )

	}

}

class GalleryImage {
    constructor ( container, url, size ) {

        this.element = document.createElement( 'div' )
        this.size = size

        this.url = {
            data: '',
            string: url,
        }

        this.element.style.position = 'absolute'
        this.element.style.backgroundImage = `url( ${ this.url.string } )`
        this.element.style.backgroundPosition = 'center'
        this.element.style.backgroundRepeat = 'no-repeat'
        this.element.style.backgroundSize = this.size
        // this.element.style.boxShadow = '0px 0px 30px #212121, inset 0px 0px 30px #212121'
        this.element.style.height = '100%'
        this.element.style.width = '100%'
        this.element.style.zIndex = '1'

        container.appendChild( this.element )

    }

}

class ClickGallery extends Gallery {

    constructor ( container, imageSize, path, type ) {

        super( container, imageSize, path, type )

        this.addButtons()

    }

    addButtons () {

        return new Promise( resolve => {

            for ( let i = 0; i < 2; i++ ) {

                const button = document.createElement( 'div' )
				button.setAttribute( 'gallery-button', '' )
                button.style.width = '50%'
                button.style.height = '100%'
                button.style.zIndex = '2'

                switch ( i ) {

                    case 0: 

                        button.id = 'back'

                        button.style.position = 'absolute'
                        button.style.left = '0'
                        button.style.top = '0'
                        button.style.backgroundImage = 'url( /client/assets/images/interface/back-image-icon.png )'
                        button.style.backgroundPositionX = '0px'
                        button.style.backgroundPositionY = 'center'
                        button.style.backgroundRepeat = 'no-repeat'
                        button.style.backgroundSize = '64px 64px'
                        button.style.transition = '0.5s ease'

						button.onclick = () => this.back()

                        break

                    case 1: 

                        button.id = 'next'

                        button.style.position = 'absolute'
                        button.style.right = '0'
                        button.style.top = '0'
                        button.style.backgroundImage = 'url( /client/assets/images/interface/next-image-icon.png )'
                        button.style.backgroundPositionX = '100%'
                        button.style.backgroundPositionY = 'center'
                        button.style.backgroundRepeat = 'no-repeat'
                        button.style.backgroundSize = '64px 64px'
                        button.style.transition = '0.5s ease'

						button.onclick = () => this.next()

                        break

                }

				this.container.appendChild( button )

            }

			resolve()

        } )

    }

}

export default ClickGallery