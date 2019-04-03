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

const AGIServer = require('ding-dong');

// method 참조.
// https://github.com/antirek/ding-dong/blob/master/API.md
// https://github.com/antirek/ding-dong
const handler = function(context){
    context.onEvent('variables')
        .then(
            function (vars){
                return context.streamFile('beep');
            }
        )
        .then(
            function (results){
                return context.setVariable('RECOGNITION_RESULT', 'I\'m your father, Luc');
            }
        )
        .then(
            function (results){
                return context.end();
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

const agi = new AGIServer(handler);
agi.start(3000);

