const deep_thoughts = require('./deep_thoughts.js').quotes

exports.commands = function(message, bot) {
	if (message.content.startsWith(".")) {
		if (message.content.includes("deep_thoughts")|| message.content.includes("deep_thought")) {
			message.channel.send(deep_thoughts[Math.floor(Math.random() * deep_thoughts.length)] + " - Jaq Huundi");
			return;
		}
		if (message.content.includes("animeme")) {
			animeme(message, bot);
			return;
		}
		if (message.content.includes("jojo")) {
			jojo(message, bot);
			return;
		}
		if (message.content.includes("dank")) {
			dank(message, bot);
			return;
		}
		if (message.content.includes("history_meme")|| message.content.includes("meme")) { 
			history_meme(message, bot);
			return;
		}
		if (message.content.includes("kmtomiles")) {
			kmtomiles(message, bot);
			return;
		}
		if (message.content.includes("milestokm")) {
			milestokm(message, bot);
			return;
		}
		if (message.content.includes("finals")) {
			finals(message, bot);
			return;
		}
		if (message.content.includes("github")) {
			message.channel.send("https://github.com/reachomk/Mr.-Murphy");
			return;
		}
		if (message.content.includes("help")) {
			help(message);
			return;
		}
	}
	else if (message.content.includes("km to miles")) {
		var msg = message.content;
		var msgArr = msg.split(" ");
		var km = parseFloat(msgArr[0]);
		kmtomiles(km, message, bot)
	}
	else if (message.content.includes("miles to km")) {
		var msg = message.content;
		var msgArr = msg.split(" ");
		var miles = parseFloat(msgArr[0]);
		milestokm(miles, message, bot)
	}
}

//
history_meme = async (message, bot) => {
	const snekfetch = require('snekfetch');
    try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/historymemes.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        message.channel.send(allowed[randomnumber].data.url)
    } catch (err) {
        return console.log(err);
    }
}

jojo = async (message, bot) => {
	const snekfetch = require('snekfetch');
    try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/ShitPostCrusaders.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        message.channel.send(allowed[randomnumber].data.url)
    } catch (err) {
        return console.log(err);
    }
}

dank = async (message, bot) => {
	const snekfetch = require('snekfetch');
    try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        message.channel.send(allowed[randomnumber].data.url)
    } catch (err) {
        return console.log(err);
    }
}

animeme = async (message, bot) => {
	const snekfetch = require('snekfetch');
    try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/animemes.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        message.channel.send(allowed[randomnumber].data.url)
    } catch (err) {
        return console.log(err);
    }
}

/*history_meme = function(message, bot) { //Stolen from https://github.com/sodiumkid/Dr-Ferrel/blob/13f2bc9329983e579e1ca8b72cd7b5ad5fd0bb37/functions.js#L29
	var random = (Math.floor(Math.random() * Math.floor(527))) + 1
 			var number = "";
 			if (random < 10) {
   				number = "00" + random;
 			}
 			else if (random > 9 && random < 100) {
   				number = "0" + random;
 			}
 			else {
   				number = random;
 			}
 			try {
 				var imageName = "https://res.cloudinary.com/drferrel/image/upload/v1568689715/memes/meme" + random + ".jpg";
 			}
 			catch(error) {
 				history_meme();
 			}
 			message.channel.send({
     		file: imageName
 			});
} */

kmtomiles = function(message, bot) {
	var msg = message.content;
	var msgArr = msg.split(" ");
	var km = parseFloat(msgArr[1]);
	message.channel.send(km/1.609 + " miles. ");
}


finals = function(message, bot) {
	var msg = message.content;
	var msgArr = msg.split(" ");
	var current = parseFloat(msgArr[1]);
	var want = parseFloat(msgArr[2]);
	let out = ((want-current*(1-0.234))/0.234);
	message.channel.send("You need "+ out + "% on the final to get what you want. ");
}

kmtomiles = function(km, message, bot) {
	//console.log(km);
	message.channel.send(km/1.609 + " miles. ");
}

milestokm = function(message, bot) {
	var msg = message.content;
	var msgArr = msg.split(" ");
	var miles = parseFloat(msgArr[1]);
	message.channel.send(miles*1.609 + " km. ");
}

milestokm = function(miles, message, bot) {
	message.channel.send(miles*1.609 + " km. ");
}

help = function(message) { 

	message.channel.send({embed: {
    color: 1237308,
    author: {},
    title: 'Mr. Murphy commands. ',
    description: 'List of things Mr. Murphy can do. ',
    fields: [{
        name: ".deep_thoughts",
        value: "Sends an extremely deep thought by Jack Handy."
      },
      {
        name: ".meme",
        value: "Sends a history meme. "
      },
      {
        name: ".animeme",
        value: "Sends an animeme. "
      },
      {
        name: ".jojo",
        value: "Sends an meme from r/shitpostcrusaders. "
      },
      {
        name: ".jojo",
        value: "Sends an meme from r/dankmemes. "
      },
      {
        name: ".milestokm (number)",
        value: "Converts (number) miles to km. Can also be accessed by \"(number) miles to km. \""
      },
      {
        name: ".kmtomiles (number)",
        value: "Converts (number) km to miles. Can also be accessed by \"(number) km to miles. \""
      },
      {
        name: ".finals (current) (want)",
        value: "Calculates how much % you need on the final to get your desired grade. "
      },
      {
        name: ".github",
        value: "Sends link to Mr. Murphy source code. "
      },
      {
        name: ".youtube (name)",
        value: "Queue a song/playlist by URL or name"
      },
            {
        name: ".play",
        value: "Play songs. "
      },
      {
        name: ".remove",
        value: "Remove a song from the queue by position in the queue"
      },
      {
        name: ".skip",
        value: "Skip a song or songs with skip [number]"
      },
      {
        name: ".leave",
        value: "Leaves the voice channel"
      },
      {
        name: ".search",
        value: "Searchs for up to 10 videos from YouTube"
      },
      {
        name: ".pause",
        value: "Pauses playing music"
      },
      {
        name: ".volume",
        value: "Changes the volume output of the bot."
      },
      {
        name: ".queue",
        value: "View the current queue."
      },
      {
        name: ".np",
        value: "Shows the now playing text."
      },
      {
        name: ".clear",
        value: "Clears the entire queue."
      }
    ],
    }
    });

}

