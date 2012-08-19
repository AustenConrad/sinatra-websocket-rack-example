sinatra-websocket-rack-example
==============================

Clean example of using websocket-rack with Sinatra. The websocket endpoint is mounted via a route (see config.ru). This allows for the web socket app 
and sinatra app to run on the same port. The example includes detection for for the websocket link going down with automatic reconnection. To see it 
in action stop/start thin and see what the client does in the browser. I also made a quick screencast: http://youtu.be/XVtEyilJD8M

Depends on:
=====
ruby, rack, thin, sinatra, websocket-rack, haml

To run the example (NOTE: must be in production mode):
=====
```bash
git clone https://github.com/AustenConrad/sinatra-websocket-rack-example.git
cd sinatra-websocket-rack-example
thin start -e production
```
(NOTE: If you are not running it on localhost or change the port number or mount point in config.ru then make certain to change the settings at the top of the 'public/scripts/websockets/index.js' file to match.)

To run the example as a daemon:
=====
```bash
thin start -C config/thin.yml
```

Issue a daemon restart to see the client detect the socket going down and automatically reconnecting.
====
```bash
thin restart -C config/thin.yml
```

To stop:
=====
```bash
thin stop -C config/thin.yml
```
