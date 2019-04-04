
const http = require('http');
const fs = require('fs');
const server = http.createServer();

function startServer() {
    server.listen(8080, function () {
        console.log('server start');
    });
    server.on('request', function (req, res) {

        //const reqUrl = url.parse(req.url, true);
        console.log('==>'+ req.url);
        //console.log(reqUrl.pathname);
        if (req.method === 'GET') {
            fs.readFile('./tts_mp3/translate_tts_8000.wav', function (err, data) {
                res.writeHead(200, {"Content-Type": "audio/wav"});
                res.write(data);
                res.end();
            });
        }
    });
}
module.exports.start = startServer();
