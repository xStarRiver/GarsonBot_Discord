const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../config.json");
const colours = require("../colours.json");

module.exports.help = {
    name: "8ball",
    aliases: [""],
    description: "問機械人問題!!!",
    category: "**__:video_game:娛樂:__**",
    usage: "8ball (question)"
}
module.exports.run = async (bot, message, args, ops) => {
    
    if(args.length < 1) {message.channel.send("請問一個完整的問題!")} 
    else {
    let replies = ["是", "不是", "我不知道", "稍後再問"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor(colours.red_dark)
    .addField("**__問題__**", question)
    .addField("**__答案__**", replies[result]);

    message.channel.send(ballembed);
    };

}
