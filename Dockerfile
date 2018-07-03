FROM node:latest
MAINTAINER rmkn

COPY bot.js /usr/local/botkit/
WORKDIR /usr/local/botkit
RUN npm -ssave install botkit request

CMD ["node", "bot.js"]
