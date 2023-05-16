Sample microservice for communicating with chat GPT 

can be invoked by the following curl:

curl --location 'http://localhost:4002/chat' \
--header 'Content-Type: application/json' \
--data '{"message": "Hello, ChatGPT!"}'