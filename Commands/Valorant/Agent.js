const fetch = require("node-fetch"),
agents = {
    breach: '5f8d3a7f-467b-97f3-062c-13acf203c006',
    raze: 'f94c3b30-42be-e959-889c-5aa313dba261',
    'kay/o': '601dbbe7-43ce-be57-2a40-4abd24953621',
    kayo: '601dbbe7-43ce-be57-2a40-4abd24953621',
    skye: '6f2a04ca-43e0-be17-7f36-b3908627744d',
    cypher: '117ed9e3-49f3-6512-3ccf-0cada7e3823b',
    sova: '320b2a48-4d9b-a075-30f1-1f93a9b638fa',
    killjoy: '1e58de9c-4950-5125-93e9-a0aee9f98746',
    viper: '707eab51-4836-f488-046a-cda6bf494859',
    phoenix: 'eb93336a-449b-9c1b-0a54-a891f7921d69',
    astra: '41fb69c1-4189-7b37-f117-bcaf1e96f1bf',
    brimstone: '9f0d8ba9-4140-b941-57d3-a7ad57c6b417',
    yoru: '7f94d92c-4234-0a36-9646-3a87eb8b5c89',
    sage: '569fdd95-4d10-43ab-ca70-79becc718b46',
    reyna: 'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc',
    omen: '8e253930-4c05-31dd-1b6c-968525494517',
    jett: 'add6443a-41bd-e414-f6ad-e58d267f4e95'
};

module.exports = {
    //Command Information
    name: "agent",
    usage: [],
    enabled: true,
    aliases: [],
    category: "Valorant",
    memberPermissions: [ ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    cooldown: 5000,

    async execute(client, message, args, data) {
        if(!args[0]) return client.embed.usage(message, data);
        if(!agents[args[0].toLowerCase()]) return client.embed.usage(message, data);
        let agent = await fetch(`https://valorant-api.com/v1/agents/${agents[args[0].toLowerCase()]}`).then(x => x.json()).catch(err => console.log(err));
        if(!agent || agent.status !== 200) return message.channel.send("Issue fetching information about agent.")
        let abilities = agent.data.abilities.map(x => {
            return {name: x.displayName, value: x.description, inline: true};
        })
        let embed = {
            color: "#fa4454",
            author: {
                name: agent.data.displayName,
                icon_url: agent.data.displayIcon,
                url: '',
            },
            description: agent.data.description,
            thumbnail: {
                url: agent.data.displayIcon,
            },
            fields: abilities,
            timestamp: new Date(),
            footer: {
                text: `${message.author.tag} - ${message.author.id}`,
                icon_url: message.author.displayAvatarURL(),
            },
        };

        return client.embed.send(message, embed);
    },
};