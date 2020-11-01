module.exports = {
  name: "oof",
  cooldown: 0,
  description: "Calls bot to vc to play oof sound",
  execute(message, args) {
    const client = message.client;
    client.on("message", async message => {
      // Join the same voice channel of the author of the message
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(
          "https://www.youtube.com/watch?v=0Y8wLmanEb8"
        );

        dispatcher.on("start", () => {
          console.log("oof is now playing!");
        });

        dispatcher.on("finish", () => {
          console.log("oof has finished playing!");
        });

        // Always remember to handle errors appropriately!
        dispatcher.on("error", console.error);
        dispatcher.destroy();
      }
    });

    /*
    const fs = require("fs");

    const broadcast = client.voice.createBroadcast();

    // From a URL
    broadcast.play("https://www.youtube.com/watch?v=0Y8wLmanEb8");
    
    broadcast.end();
    return; 
    */
  }
};
