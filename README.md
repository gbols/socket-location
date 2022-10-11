<div style="display: inline">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/220px-Node.js_logo.svg.png" width="auto" height="64px">
  <img src="https://expressjs.com/images/express-facebook-share.png" width="auto" height="64px">
</div>

# socket-location-boilerplate
A boilerplate for express.js to get started with using Socket.io and and NodeJS.

## Getting Started 

```bash
# Clone the repository
mkdir socket-location

# Clone the repository
git clone https://github.com/gbols/socket-location.git

# Enter into the directory
cd socket-location/

# Install the dependencies
npm install

# Set the environment variables:
cp .env.example .env

# Running the boilerplate:
npm run migrate
npm run start
```

## Configuration

Variables for the environment

| Option | Description |
| ------ | ------ |
| JWT_SECRET_KEY | JWT secret |
| DB_DIALECT | "postgresql"|
| DB_HOST | Database host |
| DB_USER | Database username |
| DB_PASSWORD | Database password |
| DB_NAME | Database name |


## Commands for sequelize 
```bash
# Creates the database
npm sequelize db:create 

# Drops the database
npm sequelize db:drop 

# Load migrations
npm sequelize db:migrate 

# Undo migrations
npm sequelize db:migrate:undo:all 

# Load seeders
npm sequelize db:seed:all
```

<h5 align="center">
  ☕ Code and Coffee gbolahanpaul@gmail.com
</h5>
