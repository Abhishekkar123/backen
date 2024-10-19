FROM node


#temporary

#  set inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install





COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Start the Node.js server
CMD ["node", "index.js"] 