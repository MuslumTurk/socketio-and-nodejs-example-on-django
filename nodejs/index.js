var http = require('http').createServer().listen(4000);
var io = require('socket.io')(http);
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// creating an instance of XMLHttpRequest
var xhttp = new XMLHttpRequest();

// host of the server
var host = 'localhost';
var port = '8001';
var users = [];

io.on('connection', function(socket) {
    console.log('A Client Connnected..',socket.id);
    socket.on('message', function(msgObject) {
        
        if(msgObject.type == 'user'){
            users.push({'name': msgObject.user_name, 'id': socket.id});
            io.emit('getUser', users);
        } else if (msgObject.type == 'message') {
            io.emit('getMessage', msgObject);
            var url = 'http://' + host +':' + port + '/save_message/';

            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200) {
                    if(xhttp.responseText === "error")
                        console.log("error saving message");
                    else if(xhttp.responseText === "success")
                        console.log("the message was posted successfully");
                }
            };
            xhttp.open('POST', url, true);
            xhttp.send(JSON.stringify(msgObject));
        }
    });

    socket.on('disconnect', function () {
        for(let i=0; i<users.length; i++){
            if(users[i].id == socket.id){
                users.splice(i,1);
            }
        }
        io.emit('getUser', users);
    });
});
