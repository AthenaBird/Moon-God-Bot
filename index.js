const http = require("http");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const SQLite = require("better-sqlite3");
const sql_rps = new SQLite("./databases/rps.sqlite");
const sql_cuddles = new SQLite("./databases/cuddles.sqlite");
const sql_emojis = new SQLite("./databases/emojis.sqlite")
const fs = require('fs');
const cooldowns = new Discord.Collection();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

var bToggle = false;

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.once("ready", () => {
  console.log("Ready!");
  
  //RPS table
  const rps_table = sql_rps
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'rps';"
    )
    .get();
  if (!rps_table["count(*)"]) {
    // If the table isn't there, create it and setup the database correctly.
    sql_rps
      .prepare(
        "CREATE TABLE rps (id TEXT PRIMARY KEY, user TEXT, guild TEXT, score INTEGER);"
      )
      .run();
    // Ensure that the "id" row is always unique and indexed.
    sql_rps.prepare("CREATE UNIQUE INDEX idx_rps_id ON rps (id);").run();
    sql_rps.pragma("synchronous = 1");
    sql_rps.pragma("journal_mode = wal");
  }

  // And then we have two prepared statements to get and set the score data.
  client.getScore = sql_rps.prepare(
    "SELECT * FROM rps WHERE user = ? AND guild = ?"
  );
  client.setScore = sql_rps.prepare(
    "INSERT OR REPLACE INTO rps (id, user, guild, score) VALUES (@id, @user, @guild, @score);"
  );
  
  // cuddle SQL 
  const cuddle_sql = sql_cuddles
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'cuddles';"
    )
    .get();
  if (!cuddle_sql["count(*)"]) {
    // If the table isn't there, create it and setup the database correctly.
    sql_cuddles
      .prepare(
        "CREATE TABLE cuddles (id TEXT PRIMARY KEY, user TEXT, guild TEXT, sent INTEGER, received INTEGER);"
      )
      .run();
    // Ensure that the "id" row is always unique and indexed.
    sql_cuddles.prepare("CREATE UNIQUE INDEX idx_cuddles_id ON cuddles (id);").run();
    sql_cuddles.pragma("synchronous = 1");
    sql_cuddles.pragma("journal_mode = wal");
  }
  
  // emote SQL 
  const emojis_sql = sql_emojis
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'emojis';"
    )
    .get();
  if (!emojis_sql["count(*)"]) {
    // If the table isn't there, create it and setup the database correctly.
    sql_emojis
      .prepare(
        "CREATE TABLE emojis (id TEXT PRIMARY KEY, name TEXT, count INT);"
      )
      .run();
    // Ensure that the "id" row is always unique and indexed.
    sql_cuddles.prepare("CREATE UNIQUE INDEX idx_emojis_id ON emojis (id);").run();
    sql_cuddles.pragma("synchronous = 1");
    sql_cuddles.pragma("journal_mode = wal");
  }

  client.getEmojis = sql_emojis.prepare(
    "SELECT * FROM emojis WHERE id = ?"
  );
  client.setEmojis = sql_emojis.prepare(
    "INSERT OR REPLACE INTO emojis (id, name, count) VALUES (@id, @name, @count);"
  );
  // And then we have two prepared statements to get and set the score data.
  /*client.getCuddles = sql_cuddles.prepare(
    "SELECT * FROM cuddles WHERE user = ? AND guild = ?"
  );
  client.setCuddles = sql_cuddles.prepare(
    "INSERT OR REPLACE INTO cuddles (id, user, guild, sent, received) VALUES (@id, @user, @guild, @sent, @received)"
  );*/
  
  
  
  
  client.user.setActivity("the demise of Sun God Bot", { type: "WATCHING" });
});

client.on("message", message => {
  //format the command and the arguments
  if (message.author.bot) return;
  
  //logging ttalk messages
  var message_content = message.content + "\n";
  if (message.channel.id == "425873171431030786") {
    fs.appendFileSync('./files/ttalk.txt', message_content, 'utf8');
  
  }
  
  //auto response to non commands
  if (message.content.toLowerCase() === "69") {
    message.channel.send("nice");
  }

  if (message.content.toLowerCase() === "wtf") {
    const cursecat = client.emojis.find(emoji => emoji.name === "cursecat");
    message.channel.send(`${cursecat}`);
  }

  if (message.content.toLowerCase() === "420") {
    message.channel.send("**blaze it**");
  }

  if (
    message.content.toLowerCase().includes("fuck you moon") ||
    message.content.toLowerCase().includes("stupid moon")
  ) {
    message.channel.send("fuck you too 🖕");
  }
    
      //"aight" == "imma head out"
  if (message.content.toLowerCase() === "aight") {
    message.channel.send("imma head out");
  }
    
      //press E to pay respects
  if (
    message.content.toLowerCase() === "press f to pay respects" ||
    message.content.toLowerCase() === "f in chat"
  ) {
    message.channel.send("E");
  }

  //goodnight
  if (message.content.toLowerCase() === "goodnight") {
    message.channel.send("nobody cares that you're going to sleep lol");
  }
  
  if(message.content.toLowerCase() === "test") {
    var randomN = Math.floor(Math.random() * 10); 
    
    if (randomN < 4) {
		  message.channel.send('Yea I know generally testing sucks and all, but if you really want to think about it, it\'s only one of the ways that our current education system is able to make sure that we are able to proficiently learn the material of the class. The quarter system is really rough and moves forward at a rally fast pace, so make sure you don\'t procrastinate and try to go to office hours/discussions if you don\'t understand the material.' + 
                           ' I have a friend who does completely fine in the class itself and has a lot of nerves that get in their way when they do testing, and the best advice I can give you is to study to the point where you can teach your friends about the material, and during the tests just pretend that you\'re explaining the problem to your friend and write it down. This quarter is also really wack but it also applied to all the professors and TA\'s as this is also their first time doing something like this. ' + 
                           'Alot of classes also have comprehension quizzes but as long as you make an attempt at the reading material or any pre-work that should be done you should be fine. GL on all your first and maybe last online quarter 🙂');
    }
    
  }
    
  
  
  //--EMOJI COUNT--//
  if(message.content.toLowerCase().includes("<:")){
    var emoji_info = message.content.split(":");
    // "<, name, "id>"
    if (emoji_info.length < 3 || emoji_info.length > 3) {
      return;  
    } 
    
    var emoji_name = emoji_info[1];
    var emoji_id = emoji_info[2].substring(0, emoji_info[2].length-1);
    
    var emoji_find = client.emojis.find(emoji => emoji.name === emoji_name.toString());
  
    //emoji cannot be found in server;
    if (emoji_find === null) {
      console.log("Emoji not found in server: " + emoji_name);
      return;
    
    //emoji is found in the server and added to sql database
    } else {
      console.log("Emoji found: " + emoji_name);
      var emoji_data = client.getEmojis.get(emoji_id);
      if (!emoji_data) {
        emoji_data = {
          id: `${emoji_id}`,
          name: `${emoji_name}`,
          count: 0
        };
      }
    
    emoji_data.count = emoji_data.count + 1;
    console.log(emoji_data.count);
    client.setEmojis.run(emoji_data);
      
    }
  }
    
  //--COMMANDS--//
      
  if (!message.content.startsWith(config.prefix)) return;
  
  //ARGS SLICING
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);
  
  //COOLDOWNS
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  } else {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  
  //COMMAND RUNNER
  //Todo: how to send sql thru it
  try {
    //special case for emoji since it needs client;
    //TODO: add client in the command file itself?
    if (commandName === "emojicount") {
      console.log("emojicount");
      command.execute(message, args, client);
      
    } else if (commandName === "poll") {
      console.log("poll");
      command.execute(message, args, client);
    } else {
    
      command.execute(message, args);
      
    }
    
  } catch (error) {
	  console.error(error);
	  message.reply('there was an error trying to execute that command!');
  }

  
  
    if (
    (message.content.toLowerCase().includes("vore") ||
      message.content.toLowerCase().includes("v o r e")) &&
    message.content.indexOf(config.prefix) !== 0
  ) {
    if (message.content.toLowerCase().includes("vore")) {
    
      

      /* let extra = Math.floor(Math.random() * Math.floor(100));
      if (message.author.id === "175792267590762496") {
        message.channel.send("I\'m starting to think that you're saying vore on purpose...");
      } else if (5 <= extra && extra < 10) {
        message.channel.send("*sigh* here we go again");
      } */
    }
    /* if (message.content.toLowerCase().includes("v o r e"))
      message.channel.send(
        "*you thought you could get away with that vore mention, didja?'*"
      );*/
    /* var last_vore = config.last_vore;
    var current_vore = Math.round(new Date().getTime() / 1000);

    var difference = current_vore - last_vore;
    var time_difference = Math.round(difference / 60);
    config.last_vore = current_vore;

    message.channel.send(
      "The last mention had been " + time_difference + " minutes ago." 
    ); */
  }
  //for later       .setThumbnail('https://i.imgur.com/hEg8Pkn.png')
  
  let user_pinged = message.mentions.users.first();
  if (!user_pinged) {
    
  } /*else if (user_pinged.id === "433774411682938890") {
  }*/

  

  /*if (command === "vorecount") {
    //ideally want to store this in a json but global var is good for now
    var last_vore = config.last_vore;
    var current_vore = Math.round(new Date().getTime() / 1000);

    var difference = current_vore - last_vore;
    var hour_difference = Math.round(difference);
    config.last_vore = current_vore;

    message.channel.send(
      "It had been **" +
        hour_difference +
        "** seconds since the last vore mention...but thanks to you, it's at 0 now."
    );
  } else if (command === "updaterps") {
    /* const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, {
      maxMatches: 1,
      time: 15000
    });
    message.channel.send(
      "Please enter your rice purity score. Keep in mind that this can be checked by any member publically so only input if you feel comfortable. Type cancel to cancel the action."
    );

    var score;

    collector.on("collect", m => {
     if (m.content === "cancel") {
        message.channel.send("Action cancelled by user.");
        collector.stop();
        //exception likely
      } 
    if (
        !m.content.isNaN() ||
        m.content.parseInt() < 0 ||
        m.content.parseInt() > 100
      ) {
        message.channel.send("Input a valid rice purity score please.");
        collector.stop();
      } else {
        message.channel.send("hi");
        score = m.content.parseInt();
      }
    }); 8? */

  /*if (!args.length) {
      message.channel.send("The proper way to use this command is `mg!updateRPS <your_score>`");
    } else if (!isNaN(args[0].toString()) || args[0] < 0 || args[0] > 100) {
      message.channel.send("I seriously doubt your rice purity score is " + args[0].toString() + "...");
    } else if (args[0] === "help") {
      message.channel.send("Update your rice purity score by running `mg!updateRPS <your_score>`. Keep in mind that this will be public and can be accessed by other people.");
    } else {
      message.channel.send("yay you have passed");
    }*/

  //============WRITE CODE BELOW================//

  
  
  // TEST BOT HELPER BM
  if(message.isMentioned('637806606775615498')){
    console.log("mentioned a role");
    var statements = [
      "Have you tried putting it in rice?",
      "Maybe turn it off and turn it back on again?",
      "You know the TAs have an email for a reason...",
      "check semicolons dumbass",
      "well look who didnt attend their discussion section",
      "you can retake a class but you cant retake a party"
    ];
    message.channel.send(
      statements[Math.floor(Math.random() * statements.length)]
    );
  }
  
  //ENG HELPER BM
  if(message.isMentioned('585683246055161863')){
    console.log("mentioned a role");
    var statements = [
      "KNOW YOUR FORMULAS",
      "CHECK YOUR SIG FIGS",
      "DROP THE MAJOR",
      "This answer is trivial",
      "TF YOU DONT KNOW HOW TO SOLVE A PARTIAL DIFF EQ with 3 boundry conditions?",
      "matlab it",
      "Clearly not top 10 public engineering school material"
    ];
    message.channel.send(
      statements[Math.floor(Math.random() * statements.length)]
    );
  }
  
  //CS HELPER BM
  if(message.isMentioned('585681474779349024')){
    console.log("mentioned a role");
    var statements = [
      "DID YOU FORGET *ANOTHER* SEMICOLON? ",
      "CHECK YOUR SIG FIGS",
      "DROP THE MAJOR",
      "This answer is trivial",
      "you should have been taught this in the intro class",
      "You belong in the dungeon"
    ];
    message.channel.send(
      statements[Math.floor(Math.random() * statements.length)]
    );
  }
  
  //MATH HELPER BM
  if(message.isMentioned('585681297645764627')){
    console.log("mentioned a role");
    var statements = [
      "you can't count ",
      "switch your degrees and radians dummy",
      "https://www.wolframalpha.com/",
      "just add lol",
      "you should have been taught this in the intro class",
      "matlab it"
    ];
    message.channel.send(
      statements[Math.floor(Math.random() * statements.length)]
    );
  }
  
  //BIO HELPER BM
  if(message.isMentioned('585681666312241162')){
    console.log("mentioned a role");
    var statements = [
      "mitochondria is the powerhouse of the cell ",
      "you're missing brain cells",
      "maybe don't apply to med school",
      "",
      "you should have been taught this in the intro class",
      "matlab it"
    ];
    message.channel.send(
      statements[Math.floor(Math.random() * statements.length)]
    );
  }
  
  //CHEM HELPER BM
  if(message.isMentioned('585681519054422016')){
    console.log("mentioned a role");
    var statements = [
      "just add HCl",
      "switch your degrees and radians dummy",
      "YOU'RE STUPID",
      "This answer is trivial",
      "you should have been taught this in the intro class",
      "matlab it"
    ];
    message.channel.send(
      statements[Math.floor(Math.random() * statements.length)]
    );
  }
  
  //PHYSICS HELPER BM
  if(message.isMentioned('585681575740571650')){
    console.log("mentioned a role");
    var statements = [
      "PHYSUCKS ",
      "Did you remember air resistance?",
      "are you metric or imperial smh",
      "Just Taylor expand it lmao",
      "did you try F=ma",
      "gravity isnt always earth"
    ];
    message.channel.send(
      statements[Math.floor(Math.random() * statements.length)]
    );
  }
  
  
  if (message.content.indexOf(config.prefix) !== 0) return;

  /*if (command === "ping") {
    client.commands.get("ping").execute(message, args);
  } else if (command === "b") {
    client.commands.get("b").execute(message, args);
  } else if (command === "speak") {
    client.commands.get("speak").execute(message, args, client);
  } else if (command === "snap") {
    client.commands.get("snap").execute(message, args);
  } else if (command === "unsnap") {
    client.commands.get("unsnap").execute(message, args);
  } else if (command === "poll") {
    client.commands.get("poll").execute(message, args, client);
  } else if (command === "howdy") {
    client.commands.get("howdy").execute(message, args, client);
  } else if (command === "cuddle") {
    client.commands.get("cuddle").execute(message, args, client, sql_cuddles);
  } else if (command === "cuddles" || command === "cuddlescore") {
    //client.commands.get("cuddleScore").execute(message, args, client, sql_cuddles);
  } else {
    message.channel.send("I don't know what you're trying to tell me, but that is not a valid commnad.");
  }*/

});

client.login(process.env.TOKEN);
