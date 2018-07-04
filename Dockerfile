FROM node:latest
MAINTAINER rmkn

COPY bot.js /usr/local/botkit/
WORKDIR /usr/local/botkit
RUN npm -save install botkit request
RUN npm -save install request-debug

CMD ["node", "bot.js"]
