const NPM = {
    express: require( 'express' ),
    http: require( 'http' ),
    socket: require( 'socket.io' ),
}

const Express = NPM.express()
const Server = NPM.http.Server( Express )
const IO = NPM.socket( Server )

const port = process.env.PORT || 3000

Express.set( 'port', port )
Express.use( '/client', NPM.express.static( `${ __dirname }/client` ) )

Express.get( '/', ( request, response ) => {

    response.sendFile( `${ __dirname }/client/src/index.html` )

} )

//

Server.listen( port, '0.0.0.0', () => {} )