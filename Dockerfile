FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Instalar wget y wait-for-it
RUN apt-get update && \
    apt-get install -y wget && \
    wget -q -O /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV DATABASE_URL=postgresql://postgres:Gta989jm@db:5432/task_db?schema=public

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD /usr/local/bin/wait-for-it db:5432 -- npm run start:prod