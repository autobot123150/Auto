module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'Develeoper',
};
module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 20;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `🌟𝗠𝗬 𝗔𝗩𝗔𝗜𝗟 𝗖𝗠𝗗 𝗟𝗜𝗦𝗧🌟\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. ╚═❯❯ ${prefix} \n╔═➳➳➳➳➳⋇⊶┫${commands[i]}💟 \n`;
      }
      helpMessage += '\n👀Event List:🆔\n\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}. ╚═❯❯ ${prefix} \n╔═➳➳➳➳➳⋇⊶┫${eventCommand}☀️\n`;
      });
      helpMessage += `\nPage ${page}/${Math.ceil(commands.length / pages)}. To view the next page, type '${prefix}help page number'. To view information about a specific command, type '${prefix}help command name'.`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 20;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `🌟𝗠𝗬 𝗔𝗩𝗔𝗜𝗟 𝗖𝗠𝗗 𝗟𝗜𝗦𝗧🌟\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. ╚═❯❯ ${prefix} \n╔═➳➳➳➳➳⋇⊶┫${commands[i]} ☀️\n`;
      }
      helpMessage += '\n❤️‍🔥🌟𝗠𝗬 𝗘𝗩𝗘𝗡𝗧 𝗟𝗜𝗦𝗧🌟\n\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}. ╚═❯❯ ${prefix} \n╔═➳➳➳➳➳⋇⊶┫${eventCommand} ☀️\n`;
      });
      helpMessage += `\nPage ${page} of ${Math.ceil(commands.length / pages)}`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? '➛ Permission: user' : (role === 1 ? '➛ Permission: admin' : (role === 2 ? '➛ Permission: thread Admin' : (role === 3 ? '➛ permission to love my admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `➛ Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `Description: ${description}\n` : '';
        const usageMessage = usage ? `➛ Usage: ${usage}\n` : '';
        const creditsMessage = credits ? `➛ Credits: ${credits}\n` : '';
        const versionMessage = version ? `➛ Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `➛ Cooldown: ${cooldown} second(s)\n` : '';
        const message = ` 「 Command 」\n\n➛ Name: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.handleEvent = async function({
  api,
  event,
  prefix
}) {
  const {
    threadID,
    messageID,
    body
  } = event;
  const message = prefix ? '🙃 system prefix : \n😏 you chat prefix: ' + prefix: "Sorry i don't have prefix";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
}
