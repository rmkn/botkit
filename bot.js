var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.TOKEN
}).startRTM();

controller.hears('(.*)',[REACTION],function(bot,message) {
    bot.api.users.info({user:message.user},function(err,response) {
      var uname = message.user;
      var rname = message.user;
      if (!err) {
          uname = response.user.name;
          rname = response.user.real_name;
      }

      bot.api.conversations.info({channel:message.channel},function(err,responsec) {
        var cname = message.type;
        if (!err) {
          cname = responsec.channel.name;
        }

        var msg = {
          type: message.type,
          user: message.user,
          text: message.text,
          thread_ts: message.thread_ts,
          channel: message.channel,
          channel_name: cname,
          name: uname,
          real_name: rname,
          ts: message.ts
        }

        try {
          var webclient = require("request");
          webclient.debug = true;
          webclient.post({
            url: process.env.URL,
            headers: {
              "contest-type": "application/json"
            },
            body: JSON.stringify(msg)
          }, function (error, response, body) {
            if (response && response.statusCode == 200) {
              try {
                var mobj = JSON.parse(body);
                if (mobj.text == null) {
                    bot.reply(message, body);
                } else {
                    bot.reply(message, mobj);
                }
              } catch (e) {
                bot.reply(message, body);
              }
            }
          });
        } catch (e) {
          bot.reply(message, "error");
        }
      });
    });
});
