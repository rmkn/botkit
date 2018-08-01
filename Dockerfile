FROM node:latest
MAINTAINER rmkn

RUN mkdir /usr/local/botgw
WORKDIR /usr/local/botgw
RUN npm -y init
RUN npm -save install botkit request
RUN npm -save install request-debug

COPY bot.js /usr/local/botgw/
COPY entrypoint.sh /

CMD ["node", "bot.js"]

ENTRYPOINT ["/entrypoint.sh"]
