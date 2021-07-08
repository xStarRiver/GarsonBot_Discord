const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../config.json");
const colours = require("../colours.json");
const ytdl = require('ytdl-core');


module.exports.help = {
    name: "queue",
    aliases: [""],
    description: "加入播放清單",
    category: "**__:musical_note:音樂指令:__**",
    usage: "queue"
}


exports.run = async (bot, message, args, ops) => {
    let fetched = await ops.active.get(message.guild.id);
    let queue = fetched.queue;
        console.log(fetched, queue)

    if (!fetched) return message.channel.send('這個頻道目前沒有任何音樂播放!');

    
    let now = await ytdl.getInfo(queue[0].url)
    let QueueEmbed = new Discord.RichEmbed()
        .setColor(colours.orange_dark)
        .setFooter('機器人制作:星河xStarRiver', bot.user.displayAvatarURL);
    

    if (args[0] && args[0].toLowerCase() === "remove") {
        let toRemove = parseInt(args[1])
        if(toRemove === NaN) return message.channel.send("Nah")
        fetched.queue = fetched.queue.splice(toRemove)
        ops.active.set(message.guild.id, fetched)
        QueueEmbed.setDescription(`**__已移除播放清單 [${toRemove}]__**  |  [${queue[0].songTitle}](${queue[0].url})`);
        message.channel.send(QueueEmbed);
    } else {
        
        let now = await ytdl.getInfo(queue[0].url)
        let sEmbed = new Discord.RichEmbed()
            .setColor(colours.orange_dark)
            .setAuthor(`播放清單 | ${message.guild.name}`, bot.user.displayAvatarURL)
        sEmbed.addField(`1 . 影片長度: ${now.length_seconds} 秒.`, `[${queue[0].songTitle}](${queue[0].url})\n點歌者: ${queue[0].requester}`)
        .setFooter('機器人制作:星河xStarRiver', bot.user.displayAvatarURL);

        for (let i = 1; i < (queue.length > 25 ? 25 : queue.length); i++) {
            let info = await ytdl.getInfo(queue[i].url)
            sEmbed.addField(`${i+1}. 影片長度: ${info.length_seconds} 秒.`, `[${queue[i].songTitle}](${queue[i].url})\n點歌者: ${queue[i].requester}`)
        }
        message.channel.send(sEmbed)
    }

}