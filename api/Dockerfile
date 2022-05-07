FROM node:10.19
WORKDIR /home/ubuntu/as-api/
COPY package*.json ./
RUN mkdir -p /root/.ssh
COPY id_rsa /root/.ssh/
RUN chmod 700 /root/.ssh/id_rsa
RUN echo "\tStrictHostKeyChecking no\n" >> /etc/ssh/ssh_config
RUN npm install
COPY . .
CMD ["node", "server"]
