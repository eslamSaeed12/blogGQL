
# mongo stage
FROM mongo:4.2.8 as mongo

ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=123456

VOLUME  /data/db:/etc/mongo

# node stage

FROM node:16.5.0

ENV DB_URI=mongodb://root:123456@mongo:27017/

ENV PORT=4000

ENV NODE_ENV=development

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "npm","run","dev" ]