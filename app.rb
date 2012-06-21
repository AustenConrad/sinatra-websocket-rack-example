# app.rb

get '/' do

	@pageTitle = "Sinatra Websocket-Rack Example."
	@stylesheet = "index"
	
	# This way we can load seperate javascript websocket client code specific to each route.
	#
	# For example the '/chat' route will need to have different client code and therefore we can load chat.js by
	# specifing @webSocketHandler = "chat"
	@webSocketHandler = "index"

	haml :index
end
