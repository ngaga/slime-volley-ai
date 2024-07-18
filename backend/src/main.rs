use tokio::net::TcpListener;
use tokio_tungstenite::accept_async;
use futures_util::stream::StreamExt;
use futures_util::SinkExt;
use tokio_tungstenite::tungstenite::protocol::Message;

#[tokio::main]
async fn main() {
    println!("Hello, world!");
    // use actix web to create a server

    let addr = "127.0.0.1:8080";
    let listener = TcpListener::bind(&addr).await.expect("Failed to bind");

    println!("Listening on: {}", addr);

    while let Ok((stream, _)) = listener.accept().await {
        tokio::spawn(async move {
            let ws_stream = accept_async(stream).await.expect("Error during the websocket handshake occurred");
            println!("New WebSocket connection: {}", addr);

            let (mut write, mut read) = ws_stream.split();

            while let Some(message) = read.next().await {
                let message = message.expect("Error reading message");
                println!("Received a message: {}", message);

                if let Message::Text(text) = message {
                    write.send(Message::Text(format!("Echo: {}", text))).await.expect("Error sending message");
                }
            }
        });
    }
}



