YUI().use('node', 'event', 'anim', function (Y) {

	// Select the page element to insert messages into.
	var messagebox = Y.one("#messages");

	// Select the send message items.
	var sendButton = Y.one("#sendButton");
	var sendInput = Y.one("#instructions");
	var sendForm = Y.one("#sendForm");

	// Configure the submit form animations.
	// We display it on websocket connection, and hide it when the connection goes down.
	var displaySendForm = new Y.Anim({node: sendForm, to: { height: 25, opacity: 1}, easing: 'backIn'});
	var hideSendForm = new Y.Anim({node: sendForm, to: { height: 0, opacity: 0}, easing: 'backOut'});

	// initial state must be true for our output logic to work.
	var connected = true; 
	
	// Verify that the browser supports web sockets.
	if (window.WebSocket)
	{

		// Announce that the browser does support web sockets.
		messagebox.prepend('Websocket is supported by this browser!<br />', top);
		
		// Initial connection attempt to the web socket app.
		connect();

		function connect() {
			// Create websocket connection by connecting to the mount point we specified in config.ru
			var ws = new WebSocket("ws://127.0.0.1:3000/example");

			// On web socket established.
			ws.onopen = function() {

				// Only output to the user if the connection was previously down. 
				if (connected == false) {
					messagebox.prepend("Websocket connection is UP.<br />");
				}

				// Set the connected flag.
				connected = true;

				// Display the submit fields.
				displaySendForm.run();

				// Send a greeting message to the server.
				hwmsg = "Hello Server!";
				ws.send(hwmsg);
				messagebox.prepend("<span class='client'>@server " + hwmsg + "</span><br />");
			}

			// On connection close or connection attempt failure.
			ws.onclose = function() {

				// Only output to the user that the connection is down if it was previously up.
				if (connected == true) {
					// Display message.
					messagebox.prepend("<br />Websocket connection is DOWN.<br />");
				}else {
					messagebox.prepend(".");
				}

				// Set the connected flag.
				connected = false;

				// Display the submit fields.
				hideSendForm.run();

				// Attempt reconnect once a second until we're reconnected.
				Y.later(1000, this, connect);
			
			}

			// On message received.
			ws.onmessage = function(e) {
				var msg = e.data;
				messagebox.prepend(msg + "<br />");
			}

			// Avoid duplicating event bindings due to re-running the 'connect' function while attempting to reconnect to the websocket mount point.
			sendButton.detach();

			// Send the message we typed in the input field to the web socket server. 
			sendButton.on('click', function(e) {

				// Disable the send button's default action of posting data since it'll 
				// cause a page reload and therefore requiring a rebuilding of the websocket.
				e.preventDefault(); 

				// Retrieve the value of the input field.
				message = sendInput.get('value');

				// Add the message to the messagebox.
				messagebox.prepend("<span class='client'>@server " + message + "</span><br />");

				// Send the message to the server over the websocket.
				ws.send(message);

				// Clear the input field.
				sendInput.set('value', '');
			});


		}

	}
	else
	{
		// WebSockets are not supported by this browser. Either fall back to alternate method or display error page.
		messagebox.prepend("Web sockets are not supported by this browser :(");
	}


});
