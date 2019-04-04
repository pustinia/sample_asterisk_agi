# asterisk agi

Create AGI server with ding-dong. 
Use with Asterisk for fast telephony apps.
testing ding-dong apps. 

2019.04.04 adding
1. make a mp3 file by google tts api request
2. connect local redis
3. using redis key in asterisk 'agi_network_script' parameter
4. can do TTS with redis database.

## Confgure asterisk

extensions.conf


`````
[default]   //your context
exten => 1000,1,AGI(agi://localhost:3000)
`````

use 'agi_network_script' parameter then,
````` 
exten => 1234,1,Agi(agi://172.30.1.56:4573/hello_service)
`````
