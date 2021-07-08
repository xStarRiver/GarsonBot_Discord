const Discord = require("discord.js");
const botconfig = require("../config");
const colours = require("../colours.json");
const fs = require("fs");

module.exports.help = {
    name: "level",
    aliases: [""],
    description: ":robot:指令列表",
    category: "**__:clipboard:查詢指令:__**",
    usage: "level"
}

module.exports.run = async (bot, message, args) => {
  function level_info (message,xpfile) {
    xp = require(`../json/${xpfile}`);
    if(!xp[message.author.id]){
      xp[message.author.id] = {
      xp: 0,
      level: 1
      };
    }
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvlXp = curlvl * 300;
    let difference = nxtLvlXp - curxp;

    let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username ,message.guild.iconURL)
    .setColor(colours.green_light)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("Level", curlvl, true)
    .addField("XP", curxp, true)
    .setFooter(`距離下次升級還要 ${difference}XP `);

    message.channel.send(lvlEmbed);
  };

  fs.readdir("./json", function(err, items) {
    let xpfile;
    let xp;
    console.log(items)
    for (var i=0; i<items.length & xpfile == null; i++) {
        xp = require(`../json/${items[i]}`);
        if(xp[message.author.id]){
          level_info(message,items[i]);
          xpfile = items[i];
        };
    };
    if (xpfile == null & items.length > 0){
      xpfile = items.length - 1
      xp = require(`../json/xp_${xpfile}.json`);
      if ( Object.keys(xp).length < 61){
        level_info(message,`xp_${xpfile}.json`);
      };
    } else if (xpfile == null){
      fs.writeFile(`../json/xp_${items.length}.json`, "{}", (err) => {
        level_info(message,`xp_${items.length}.json`);
      });
    };
  });
}
