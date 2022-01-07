
class Socket {


    constructor(socket, {containerCallback, plateCallback, wagonCallback}){
        socket.on('/client/container', data => containerCallback(data) );
        socket.on('/client/plate', data => plateCallback(data) );
        socket.on('/client/wagon', data => wagonCallback(data) );
    }

}

export { Socket }