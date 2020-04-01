const Discord = require("discord.js");
const client = new Discord.Client(); 
const config = require("./config.json"); 

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  client.channels.get("688964851157958660").send("**ATENÇÃO** \n O Bot acaba de ser iniciado, por favor não floode comandos. Leia as <#676891806142562367> e tenha um otimo dia!");
  console.log(`BOT INICIADO! Não reinicie pelo Visual Studio Code.`); 
  console.log(`Bot iniciado! Servidor do arthur no momento possui ${client.users.size} membros.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Olá, siga meu canal no youtube: encurtador.com.br/muCEY `);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Olá, siga meu canal no youtube: encurtador.com.br/muCEY`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Olá, siga meu canal no youtube: encurtador.com.br/muCEY`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  if(command === "escrever") {
    if(!message.member.roles.some(r=>["Equipe Arthur"].includes(r.name)) )
    return message.reply("Você não tem permissão para trocar a foto do bot.");
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    console.log(`${message.author} utilizou o comando escrever.`); 
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }

  if(command === "status") {
    if(!message.member.roles.some(r=>["Equipe Arthur"].includes(r.name)) )
    return message.reply("Você não tem permissão para trocar a foto do bot.");
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    console.log(`${message.author} alterou o Activity do bot.`); 
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    client.user.setActivity(sayMessage);
    message.channel.send("Status do bot alterado para:)");
    message.channel.send(sayMessage);
  }
  
  if(command === `dm`){          
    message.delete().catch(O_o=>{}); 
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!dUser) return message.channel.send("User não encontrado.")
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Você não pode utilizar esse comando")
    let dMessage = args.join(" ").slice(22);
    if(dMessage.length < 1) return message.reply('Você tem que colocar uma mensagem.')

    dUser.send(`${dUser} Olá, o ${message.author} staff do servidor do arthur enviou para você essa mensagem: ${dMessage}`)

    message.author.send(`${message.author} Sua mensagem foi enviada com sucesso. ${dUser}`)
}

  if(command === "ping") {
    message.channel.sendMessage(`Ping do bot: \`${Date.now() - message.createdTimestamp} ms\``);
  }


  
  if(command === "infoadm") {
  message.channel.send("**ATENÇÃO** \n Esse comando está dando você acesso as informações do nosso Discord \n E-mail: serverdoarthur@gmail.com \n Senha: serverarthur98 \n Utilize ela para enviar mensagens anonimas em qualquer canal. Sempre deixe-ela online.");
    console.log(`${message.author} acessou as informações de admin.`); 

  }


  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Equipe Arthur"].includes(r.name)) )
      return message.reply("Kkkkk eae sem moral, tu não pode remover esse cara ae não");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Usuario não encontrado.");
    if(!member.bannable) 
      return message.reply("OH FDP esse ai manda mais que eu kkkkkkkkkkk");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Você não deu nenhum motivo pra retirar ele.";
    
    await member.ban(reason)
      .catch(error => message.reply(`**ERRO** ${message.author} Não posso retirar dele! : ${error}`));
      client.channels.get("693901555161759775").send(" {member.user.tag} foi **BANIDO** do servidor \n Quem baniu: ${message.author.tag} \n Motivo? ${reason}");
      console.log(`${message.author} baniu {member.user.tag} motivo  `); 
      message.reply(`${member.user.tag} foi **BANIDO** com sucesso.`);
  }
  
  if(command === "lchat") {
    if(!message.member.roles.some(r=>["Equipe Arthur"].includes(r.name)) )
    return message.reply("Você não tem permissão para trocar a foto do bot.");
    console.log(`Limparam algum chat.`); 
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 5 || deleteCount > 200)
      return message.reply("**ERRO** Você precisa colocar um número de 5 a 200.");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`**ATENÇÃO** Não foi possivel apagar as mensagens: ${error}`));
      message.channel.send("**ATENÇÃO** Chat limpado. \n Total de mensagens apagadas:"); 
      message.channel.send(deleteCount);

   }

   if(command === "profile") {
    if(!message.member.roles.some(r=>["Equipe Arthur"].includes(r.name)) )
      return message.reply("Você não tem permissão para trocar a foto do bot.");
      image = message.attachments.first().url;
      client.user.setAvatar (image);
   }


   
});
client.login(config.token);