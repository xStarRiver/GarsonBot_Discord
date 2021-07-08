const config = require("./config.json");
const token = require("./config.json");
const Discord = require("discord.js");
const colours = require("./colours.json");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
const ops = {
  active: new Map(),
  } 

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`Bot Logging at discord ${bot.user.tag}!`);
    bot.user.setActivity('[嘉神 | JS機械人] | 輸入/help', { type: 'STREAMING' , url:'https://www.twitch.tv/xstarriver'});

});


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./config.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }
  
  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  function set_up (message,xpfile,xpAdd) {
		xp = require(`./json/${xpfile}`);
    console.log(xpfile,message.author.id,xpAdd);
    if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 300;
    xp[message.author.id].xp =  curxp + xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
      xp[message.author.id].level = curlvl + 1;
      let lvlup = new Discord.RichEmbed()
      .setTitle("等級上升!!")
      .setColor(colours.orange_dark)
      .setThumbnail(message.author.displayAvatarURL)
      .addField("新等級", curlvl + 1);
    message.channel.send(lvlup);
    }
    fs.writeFile(`./json/${xpfile}`, JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    });
	}

  fs.readdir("./json", function(err, items) {
    let xpfile;
    let xp;
    for (var i=0; i<items.length & xpfile == null; i++) {
        xp = require(`./json/${items[i]}`);
        if(xp[message.author.id]){
          set_up(message,items[i],xpAdd);
          xpfile = items[i]
        };
    };
    if (xpfile == null & items.length > 0){
      xpfile = items.length - 1
      xp = require(`./json/xp_${xpfile}.json`);
      if ( Object.keys(xp).length < 61){
        set_up(message,`xp_${xpfile}.json`,xpAdd);
      };
    } else if (xpfile == null){
      fs.writeFile(`./json/xp_${items.length}.json`, "{}", (err) => {
        set_up(message,`xp_${items.length}.json`,xpAdd);
      });
    };
  });

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (message.content.startsWith(prefix)){
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args, ops);};

});

bot.login(config.token);