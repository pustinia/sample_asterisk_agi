// http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=%EB%AA%A9%ED%91%9C%EB%AC%BC%20%ED%99%95%ED%9B%84&tl=ko-kr

const https = require('https');
const fs = require('fs');
//const file = fs.createWriteStream("./tts_mp3/google_tts.mp3");
//const google_trans = 'https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=%EB%AA%A9%ED%91%9C%EB%AC%BC%20%ED%99%95%ED%9B%84&tl=ko-kr'
//const textData = '%EB%AA%A9%ED%91%9C%EB%AC%BC%20%ED%99%95%ED%9B%84';
//const textData = '배가고파요';
//const google_template = `https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=3&client=tw-ob&q=${textData}&tl=ko-kr`;

/*
function getgoogletts(textData) {

    const google_template =
        `https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=3&client=tw-ob&q=${textData}&tl=ko-kr`;

    https.get(encodeURI(google_template), (resp) => {
        /*
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
        });
        */
        /*
        let stream = resp.pipe(file);
        stream.on("finish", function () {
            console.log("done");
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}
*/
module.exports.google = function(fileInfo){

    const textData = fileInfo.textStr;
    const wavFilePath = fileInfo.pathStr;
    const file = fs.createWriteStream(wavFilePath);
    const google_template =
            `https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=3&client=tw-ob&q=${textData}&tl=ko-kr`;

    https.get(encodeURI(google_template), (resp) => {

        let stream = resp.pipe(file);
        stream.on("finish", function () {
            console.log("done");
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

}

