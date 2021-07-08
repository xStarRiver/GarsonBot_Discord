const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../config.json");
const colours = require("../colours.json");
const ytdl = require('ytdl-core');
const {
    RichEmbed
} = require("discord.js")

module.exports.help = {
    name: "loop",
    aliases: [""],
    description: "循環播放歌曲",
    category: "**__:musical_note:音樂指令:__**",
    usage: "loop"
}

exports.run = async (bot, message, args, ops) => {
    let data = ops.active.get(message.guild.id) || {};
    const SongnoEmbed = new RichEmbed()
    .setDescription(`🎶 沒有歌曲播放`)
    if(!data.queue || data.queue.length <= 0) return message.channel.send(SongnoEmbed)

    if(data.loop) data.loop = false
    else data.loop = true

    ops.active.set(message.guild.id, data)

    const SongallowEmbed = new RichEmbed()
    .setDescription(`✅ 歌曲現在循環播放 `)

    const NoMusicEmbed = new RichEmbed()
    .setDescription(`❎ 現在沒有歌曲 `)

    
    if(data.loop) return message.channel.send(SongallowEmbed)
    else return message.channel.send(NoMusicEmbed)
}
