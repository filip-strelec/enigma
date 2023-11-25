const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 4436;



app.set('view engine', 'ejs');

app.get('/chat', (req, res) => {
msgs = [];
  res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) => {
  res.render('indexx',{
  msgs:msgs,
});
});



let msgs = [];

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    let ipAddr= socket.handshake.address.substr(7);
    let arrayedIp = ipAddr.split('.');
    let multiplyer = arrayedIp[0]/255;
    let rgbValue =`rgb(${multiplyer*arrayedIp[1]},${multiplyer*arrayedIp[2]},${multiplyer*arrayedIp[3]})`;
console.log(new Date());
msgs.push([msg, rgbValue]);
  });
});

http.listen(port, () => {

});
