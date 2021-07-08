const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../config.json");
const colours = require("../colours.json");
const ytdl = require('ytdl-core');
const {
    RichEmbed
} = require("discord.js")

module.exports.help  = {
    name: "play",
    aliases: [""],
    description: "播放音樂",
    category: "**__:musical_note:音樂指令:__**",
    usage: "play [link]"
}

exports.run = async (bot, message, args, ops) => {
    let validate = await ytdl.validateURL(args[0]);

    if (!validate) {

        let commandFile = require(`./search.js`);
        return commandFile.run(bot, message, args, ops);

    }

    let data = ops.active.get(message.guild.id) || {};
    let info = await ytdl.getInfo(args[0]);

    if (!message.member.voiceChannel) return message.channel.send(':no_entry_sign:**請連接到語音頻道!**');

    if (!args[0]) return message.channel.send('**對不起，請按照命令輸入網址!**');




    
    let ErrorEmbed = new Discord.RichEmbed()
        .setColor(colours.red_dark)
        .setDescription("對不起，請按照命令輸入**有效**網址!")
        .setFooter('機器人制作 | 星河xStarRiver', bot.user.displayAvatarURL);
    if (!validate) return message.channel.send(ErrorEmbed);
    if (!data.connection) data.connection = await message.member.voiceChannel.join();
    if (!data.queue) data.queue = [];
    if (!data.loop) data.loop = false;
    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });
    ql = data.queue.length - 1
    if (!data.dispatcher) play(bot, ops, data);
    else {
        const queueembed = new Discord.RichEmbed()
            .setColor(colours.green_light)
            .setDescription(`:musical_note:**已經加入播放列單**: **__[${data.queue[ql].songTitle}](${data.queue[ql].url})__** | 點歌者: ${message.author.tag}`)
            .setFooter('機器人制作:星河xStarRiver', bot.user.displayAvatarURL);
        message.channel.send(queueembed);
    }

    ops.active.set(message.guild.id, data);
}

async function play(bot, ops, data) {

    if(!data.loop) {
      bot.channels.get(data.queue[0].announceChannel).send(` :musical_note:**正在播放**: \`[${data.queue[0].songTitle}]\` `)


    }

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {
        filter: 'audioonly'
    }));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function () {
        end(bot, ops, this);

    });
}

function end(bot, ops, dispatcher) {

    let fetched = ops.active.get(dispatcher.guildID);
    if(!fetched || !fetched.queue) return

    let np = fetched.queue[0];

    if (fetched.loop) fetched.queue.push(np)

    fetched.queue.shift()
    if (fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched);
        play(bot, ops, fetched);
    } else {
        ops.active.delete(dispatcher.guildID);

        let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel;

        if (vc) vc.leave();

    }

}