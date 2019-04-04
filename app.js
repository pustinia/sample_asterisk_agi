/*
const client = require("ari-client");

console.log("node asterisk ari starting.......");
client.connect(
    "http://ari.js:8088", "user", "secret"
).then(
    function (ari) {
        // use once to start the application
        ari.on('StasisStart',

            function (event, incoming) {
                incoming.answer()
                    .then(function () {
                        return getOrCreateBridge(incoming);
                    })
                    .then(function (bridge) {
                        return joinHoldingBridgeAndPlayMoh(bridge, incoming);
                    })
                    .catch(function (err) {
                    });
            });
    }); // end then.
*/

// https://github.com/antirek/ding-dong/blob/master/API.md
// https://github.com/antirek/ding-dong
//

// npm modules.
const AGIServer = require('ding-dong');
const path = require('path');
const redis = require('redis');

const client = redis.createClient(6380,'127.0.0.1');
client.on("error", function (err) {
    console.log("Error " + err);
});


// user defined modules.
const medisServer = require('./media_server');
const googleTts = require('./google_tts_client');


const handler = function(context){
    let ttsKey = '';
    context.onEvent('variables')
        .then(
            function (vars){
                console.log('vars==> ', vars);
                // get redis tts key value to agi_network_script
                console.log('service name==> ', vars.agi_network_script);
                ttsKey = vars.agi_network_script;
                return context.answer();
            }
        )
        .then(
            function (vars){
                console.log('vars==> ', vars);
                console.log('ttsKey==>', ttsKey);

                // get ttsText in redis database
                // make a mp3 file.
                // call streamFile Method with tts file.

                //return context.streamFile('beep'); // wav beepp file play
                const mp3File = 'http://172.30.1.56:8080/translate_tts.wav';
                //return context.controlStreamFile(mp3File, '1', 0, '#', '*', '2', 1);
                return context.streamFile(mp3File);
            }
        )
        .then(
            function (results){
                return context.setVariable('res', '111111'); // variable set
            }
        )
        .then(
            function (results){
                return context.end(); // 종료
            }
        );
    //.then(
    // context.controlStreamFile(filename, escape_digits, skipms, ffchar, rewchr, pausechr, offsetms)
    // filename - The file extension must not be included in the filename.
    // escape_digits
    // skipms
    // ffchar - Defaults to #
    // rewchr - Defaults to *
    // pausechr
    // offsetms - Offset, in milliseconds, to start the audio playback  -> 오디오 재생 offset ms
    //
    //    function (results){
    //        return context.controlStreamFile()
    //    }
    //);

}

medisServer.start;       // 미디어 서버를 올린다.


// 실제 extrn 에서 url 마지막에 query?user=john&next=3333
const params = new URLSearchParams('keyname=tts_ment_1&next=3333');
//console.log(params.get('user'));
console.log(params.get('keyname'));

// key 값으로 mp3 파일을 만들고, key 값으로 redis 에서 text 를 읽어서 mp3 파일을 만든다.
// 실제 적용에는, tts 가 wav 파일을 변경하기 때문에, 파일의 변경을 막아주는 로직이 필요하다.

const strKey = "tts_ment_1";
// redis get 수행.
client.get(strKey, function (err, reply) {

    console.log('key=>' + reply.toString()); // Will print `OK`
    console.log('path=>' + path.join(__dirname, 'tts_mp3', strKey+'.mp3' ));

    // google 에 tts wav 파일을 요청 한다.
    const fileInfo = {
        textStr : reply.toString(),
        pathStr : path.join(__dirname, 'tts_mp3', strKey+'.mp3' ).toString()
    }
    googleTts.google(fileInfo); // google 에 tts 음성을 요청 하는 function 정의 with parameter 와 함께

});



const agi = new AGIServer(handler, { debug : true });
agi.start(4573);

