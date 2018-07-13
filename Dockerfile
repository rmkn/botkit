FROM node:latest
MAINTAINER rmkn

COPY bot.js /usr/local/botgw/
WORKDIR /usr/local/botgw
RUN npm -y init
RUN npm -save install botkit request
RUN npm -save install request-debug

CMD ["node", "bot.js"]
