var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.TOKEN
}).startRTM()

controller.hears('(.*)',['direct_message','direct_mention','mention'],function(bot,message) {
    bot.api.users.info({user:message.user},function(err,response) {
      if (!err) {
        var currentUser = response["user"];

        var msg = {
          type: message.type,
          user: message.user,
          text: message.text,
          name: response.user.name,
          real_name: response.user.real_name
        }

        var webclient = require("request");
        webclient.post({
          url: process.env.URL,
          headers: {
            "contest-type": "application/json"
          },
          body: JSON.stringify(msg)
        }, function (error, response, body) {
          if (response.statusCode == 200) {
            bot.reply(message,body);
          }
        });
      }
    });
});
