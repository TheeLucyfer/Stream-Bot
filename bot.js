const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json")

client.once('ready', () => {
	console.log('Ready!');
});

client.login(config.token);


client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong.');
	}
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (!isUserStreaming(oldPresence) && isUserStreaming(newPresence)) {
        onUserStartStreaming(newPresence.member)
    } else if (isUserStreaming(oldPresence) && !isUserStreaming(newPresence)){
        onUserStopStreaming(newPresence.member)
    }
});

/**
 * Checks if the user is streaming
 * @param {Discord.Presence} presence - A Discord presence object
 */
function isUserStreaming(presence) {
    const activities = presence.activities
    if (!activities || activities.length === 0) {
        return false; 
    }
//Loops over the activities status's to see what it is
    for (let index = 0; index < activities.length; index++) {
        const activity = activities[index];
        if (activity.type === "STREAMING")
            return true;
    }

    return false;
}

function onUserStartStreaming(member){
    member.roles.add("721142930525519903")
}
function onUserStopStreaming(member){
    member.roles.remove("721142930525519903")
}