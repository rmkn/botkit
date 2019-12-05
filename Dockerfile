FROM node:latest
MAINTAINER rmkn

RUN mkdir /usr/local/botgw
WORKDIR /usr/local/botgw
RUN npm -y init
RUN npm -save install botkit@0.7 request request-debug

COPY bot.js /usr/local/botgw/
COPY entrypoint.sh /

CMD ["node", "bot.js"]

ENTRYPOINT ["/entrypoint.sh"]
