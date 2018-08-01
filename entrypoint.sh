#!/bin/sh

R=${REACTION:-"'direct_message','direct_mention','mention'"}

sed -i -e "s/REACTION/${R}/" /usr/local/botgw/bot.js

exec "$@"
