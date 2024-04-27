FROM node:18

WORKDIR /app

COPY ./models/userModel.js /app/models/
COPY ./public/images /app/public/images
COPY ./public/stylesheets /app/public/stylesheets
COPY ./public/javascripts /app/public/javascripts
COPY ./views/*.ejs /app/views/
COPY app.js package.json package-lock.json readme.md /app/
COPY .gitignore /app/.gitignore
COPY /.env/ /app/.env

RUN npm install

CMD ["npm", "run", "dev"]
