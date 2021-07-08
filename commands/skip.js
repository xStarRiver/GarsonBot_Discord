const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../config.json");
const ytdl = require('ytdl-core');

module.exports.help = {
  name: "skip",
  aliases: [""],
  description: "跳過歌曲",
  category: "**__:musical_note:音樂指令:__**",
  usage: "skip"
}

exports.run = async (bot, message, args, ops) => {

  let fetched = ops.active.get(message.guild.id);

  if (!fetched) return message.channel.send('目前在頻道中沒有任何音樂播放!');

  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('對不起，你現在和機器人不在同一個頻道！');

let userCount = message.member.voiceChannel.members.size;


if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`對不起，您已經跳過了! | ${fetched.queue[0].voteSkips.length}`);

fetched.queue[0].voteSkips.push(message.member.id);

ops.active.set(message.guild.id, fetched);

if (fetched.queue[0].voteSkips.length) {

    message.channel.send('成功跳過了一首歌!');

    return fetched.dispatcher.emit('end');


}

message.channel.send(`成功跳過! ${fetched.queue[0].voteSkips.length}`);

}