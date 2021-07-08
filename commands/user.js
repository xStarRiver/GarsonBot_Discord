const Discord = require("discord.js");
const bot = new Discord.Client();
const colours = require("../colours.json");

module.exports.help = {
    name: "user",
    aliases: [""],
    description: "**__查詢個人資料__**",
    category: "**__:clipboard:查詢指令:__**",
    usage: "user"
}

exports.run = async (bot, message, args, ops) => {
        
    let sEmbed = new Discord.RichEmbed()
        .setColor(colours.red_dark)
        .setTitle("伺服器資訊")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.author.username} 個人資料`, message.author.displayAvatarURL)
        .addField("**:bust_in_silhouette:使用者:**", `${message.author.username}`, true)
        .addField("**:pencil2:ID:**", `${message.author.discriminator}`, true)
        .addField("**:file_folder:個人編號:**", `${message.author.id}`, true)
        .addField("**:busts_in_silhouette:狀態:**", `${message.author.presence.status}`, true)
        .addField("**機械人創建時間:**", `${message.author.createdAt}`, true)
        .setFooter('機器人制作:星河xStarRiver', bot.user.displayAvatarURL);

        message.channel.send({embed: sEmbed});
    }