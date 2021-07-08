const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../config.json");
const colours = require("../colours.json");
const ytdl = require('ytdl-core');
const search = require('yt-search');


module.exports.help = {
    name: "search",
    aliases: [""],
    description: "搜尋歌曲",
    category: "**__:musical_note:音樂指令:__**",
    usage: "search song"
}

exports.run = (bot, message, args, ops) => {
    let data = ops.active.get(message.guild.id) || {};
     
      
    
    message.channel.send(` :mag_right:**正在搜尋中**: \`[${args.join(' ')}]\` `);


    search(args.join(' '), function(err, res){
        

        if (err) return message.channel.send('對不起! 有些東西錯誤了.');
        let videos = res.videos.slice(0, 10);
        let resp = ''; 

        
        for (var i in videos) {
            resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
        }
        resp += `\n**在以下選擇一個數字 \`1-${videos.length}\``;
        message.channel.send(resp);

        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
        const collector = message.channel.createMessageCollector(filter);

        collector.videos = videos;

        collector.once('collect' , function (m) {

            let commandFile = require(`./play.js`);
            commandFile.run(bot,message, [this.videos[parseInt(m.content)-1].url], ops);
        });
    });
}