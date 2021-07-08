const Discord = require("discord.js")
const config = require("../config.json");
const colours = require("../colours.json");

module.exports.help = {
    name: "help",
    aliases: [""],
    description: ":robot:指令列表",
    category: "**__:clipboard:查詢指令:__**",
    usage: "help (command)"
}
exports.run = async (bot, message, args, ops) => {
    let commandSize = 0
    let embed = new Discord.RichEmbed().setColor("green_light")

    if(!args[0]){
        let categories = 
        bot.commands 
         .map(c => c.help.category)
         .reduce((a, b) => {
             if (a.indexOf(b) < 0) a.push(b)
             return a
         }, []).sort()
         
         embed.setThumbnail(message.guild.iconURL)
         embed.setAuthor("指令列表",message.guild.iconURL)
         .setColor(colours.green_light)
         categories.forEach(c=>{
             let commands = bot.commands.filter(
                 command => command.help.category == c
             )
             commands = commands.map(cmd=> cmd.help.name)
             if(commands.length <= 0)return;
             commandSize += commands.length
             embed.addField(c, `\`${commands.join("`, `")}\``)
         })
         embed.setFooter(`總共指令: ${commandSize} | 機器人制作:星河xStarRiver `, bot.user.displayAvatarURL)
      
         return message.channel.send(embed)
   }else{
       let command = bot.commands.get(args[0])
       if(!command) return message.reply("找不到這個命令，對不起")
       command = command.command
       embed.setAuthor(`命令幫助 ${command.name}`, message.author.avatarURL)
       embed.setDescription(command.description)
       embed.setColor(colours.red_dark)
       if(command.usage != null) embed.addField("使用方法[usage] :", "/" + command.usage)

       return message.channel.send(embed)
   }
}  