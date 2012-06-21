sinatra-websocket-rack-example
==============================

Clean example of using websocket-rack with Sinatra. The websocket endpoint is mounted via a route (see config.ru). This allows for the web socket app 
and sinatra app to run on the same port. The example includes detection for for the websocket link going down with automatic reconnection. To see it 
in action stop/start thin and see what the client does in the browser.

To run the example (NOTE: must be in production mode.):
=====
```bash
thin start -e production

To run the example a daemon:
=====
```bash
thin start -C config/thin.yml

Issue a daemon restart to see the client detect the socket going down and automatically reconnecting.
====
```bash
thin restart -C config/thin.yml

To stop:
=====
```bash
thin stop -C config/thin.yml

Depends on:
====
ruby, rack, thin, sinatra, websocket-rack, haml
