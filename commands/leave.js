const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../config.json");

module.exports.help = {
    name: "leave",
    aliases: [""],
    description: "離開語音頻道",
    category: "**__:musical_note:音樂指令:__**",
    usage: "leave"
}

exports.run = async (bot, message, args, ops) => {

    if (!message.member.voiceChannel) return message.channel.send('請連接到語音頻道.');

    if (!message.guild.me.voiceChannel) return message.channel.send('對不起，機器人沒有連接到頻道');

    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('對不起，您沒有連接到同一頻道');

    message.guild.me.voiceChannel.leave();

    message.channel.send('正在離開頻道...')

    ops.active.set(message.guild.id, [])
}
