# asterisk agi

Create AGI server with ding-dong. 
Use with Asterisk for fast telephony apps.
testing ding-dong apps. 

## Confgure asterisk

extensions.conf


`````
[default]   //your context
exten => 1000,1,AGI(agi://localhost:3000)
`````

and call to 1000
