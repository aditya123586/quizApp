FROM node:12.20.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy source
COPY . .

# overwrite .env with devl.env to use devl parameters
COPY devl.env .env 
# Expose port for API calls
EXPOSE 9000

# Command
CMD [ "npm", "start" ]