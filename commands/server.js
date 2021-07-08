const Discord = require("discord.js");
const bot = new Discord.Client();
const colours = require("../colours.json");

module.exports.help = {
    name: "server",
    aliases: [""],
    description: "伺服器資訊",
    category: "**__:clipboard:查詢指令:__**",
    usage: "server"
}

exports.run = async (bot, message, args, ops) => {


    let sEmbed = new Discord.RichEmbed()
        .setColor(colours.green_light)
        .setTitle("伺服器資訊")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} 伺服器資訊`, message.guild.iconURL)
        .addField("**:globe_with_meridians:伺服器名字:**", `${message.guild.name}`, true)
        .addField("**:bust_in_silhouette:伺服器擁有者:**", `${message.guild.owner}`, true)
        .addField("** :busts_in_silhouette:伺服器人數:**", `${message.guild.memberCount}`, true)
        .addField("**:scroll:伺服器身份組:**", `${message.guild.roles.size}`, true)
        .setFooter('機器人制作:星河xStarRiver', bot.user.displayAvatarURL);
    
        message.channel.send(sEmbed);
       }
