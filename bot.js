//require("dotenv").config()
//투명: [ ]
const os = require('os')
const Discord = require("discord.js")
const { Client, MessageAttachment } = require('discord.js');
const dbcm = require("dbcm")
const config = require("./config")
const chalk = require("chalk").default
const moment = require("moment")
const dbConnect = require('mongoose').connect
const db = require('mongoose').connection
moment.locale('ko-KR')
const client = new dbcm.Client({
    dev: ["435800525389430804"],
    autoReconnect: true,
    locale: "ko-KR"
})
client.registerCommands(__dirname + "/commands")
// client.database.registerModels()

client.on("debug", info => {
    if (!info.startsWith("[ws]")) return

    let text = info

    console.log(text)
})

dbConnect(config.MONGO_ACCESS, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }).then((err) => {
    if(!err){ console.log(`[MongoDB] Error! ${err}`) }
    if(err){ console.log(`[MongoDB] Connected`) }
}
)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  

client.on("ready", () => {
    console.log(`───────────────────── [ OpenCountry v1.1 ] ─────────────────────\nClient_Name: ${client.user.username}\nClient_ID: ${client.user.id}\nClient_CreatedAt: ${client.user.createdAt}\nHOST_OS: ${os.platform}\nHOST_HOSTNAME: ${os.hostname}\n───────────────────── [ OpenCountry v1.1 ] ─────────────────────`)

    if(os.platform === 'win32') return

    function setStatus() {
        let s = [
          {
            name: `D_help | 흑룡봇`,
            type: "WATCHING"
        },
        {
            name: `커뮤니티 사용자 : ${client.guilds.get("436048224617365524").memberCount} | 흑룡봇`,
            type: "PLAYING"
        },
        {
            name: `개발자 | 흑룡, ArdanKR`,
            type: "PLAYING"
        },
        {  
            name: `Ping: ${Math.round(client.ping)}ms`,
            type: "WATCHING"
            }
        ]
        let rs = s[Math.floor(Math.random() * s.length)];
        client.user.setPresence({ game: rs , status: 'offline' });

    }

    // function setStatus() {
    //     if (client.user.presence.status !== "dnd") {
    //         let rs = s[Math.floor(Math.random() * s.length)]

    //         let status
    //         if (rs.name === "{} Users | OpenSchool") {
    //             status = {
    //                 name: rs.name.replace("{}", client.users.size)
    //             }
    //         }
    //         else status = rs
    //         client.user.setPresence({ game: status })
    //     }
    // }

    setStatus()
    setInterval(() => setStatus(), 5000)

    
})


let prefix = config.HOSTPREFIX

client.on("message", async message => {
    if(message.system || message.author.bot || !message.content.startsWith(prefix)) return
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    client.runCommand(command, message, args)
})


  client.on('guildMemberRemove', (member) => {
    if(member.guild.id === "436048224617365524"){
      if(moment.duration(Date.now() - member.joinedTimestamp)._data.days === 0 && moment.duration(Date.now() - member.joinedTimestamp)._data.months === 0 && moment.duration(Date.now() - member.joinedTimestamp)._data.years === 0){
        member.ban()
        member.send(`들낙으로 인해 서버에서 영구 밴되셨습니다.`)
      }
    }
  });

setInterval(() => {
let guild = client.guilds.get("436048224617365524");
let ping = guild.channels.get("705297983767576607")
ping.setName(`⌛Ping: ${Math.round(client.ping)} ms`)
},10000)


client.on('ready', () => {
  // 봇을 작동할 시 cmd에 연결된 서버 목록을 가져온다
  console.log("Servers list")
  client.guilds.forEach((guild) => {
      console.log(" - " + guild.name)
  })
})



  client.on('ready', () => {
    console.log('I am ready!');
  });


  

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


// client.on("ready", () => {
//     function pingStatus() {
//     if(Math.round(client.ping) > 50){
//         client.user.setPresence({ status: 'idle' })
//     }
//     if(Math.round(client.ping) > 100){
//         client.user.setPresence({ status: 'dnd' })
//     }
//     }
//     setInterval(() => pingStatus(), 4000)
// })

// client.command.on("error", (error, cmd, channelid) => {
//      client.channels.get(channelid).send("error")

//      for (let dev of client.devs) {
//          client.users.get(dev).send(`\`이 메세지는 모든 개발자들에게 자동 전송됩니다.\`\n\`\`\`md\n# 오류 명령어:\n- ${cmd}\n\n# 오류 채널:\n- ${client.channels.get(channelid).name}(${channelid})\n\n# 오류:\n- ${error}\n\`\`\``)
//      }

//      throw new Error(error)
// })


client.login(config.HOSTTOKEN)