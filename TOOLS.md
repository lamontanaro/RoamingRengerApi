# Installation Guide

This guide will walk you through the installation process for Node.js, Express, and Git on Windows, Linux, and macOS.

## Node.js

### Windows

1. Download the Windows installer from the [official Node.js website](https://nodejs.org/).
2. Run the installer and follow the prompts.
3. Once installed, open Command Prompt and run `node -v` to verify the installation.

### Linux

1. You can install Node.js on Linux using a package manager. For example, on Ubuntu, you can run:
   ```bash
   sudo apt update
   sudo apt install nodejs
   ```
2. To install npm, the Node.js package manager, run:
   ```bash
   sudo apt install npm
   ```
3. Verify the installation by running `node -v` and `npm -v` in the terminal.

### macOS

1. Download the macOS installer from the [official Node.js website](https://nodejs.org/).
2. Run the installer and follow the prompts.
3. To verify the installation, open Terminal and run `node -v`.

## Express

Express is a Node.js web application framework.

1. After installing Node.js, you can install Express globally using npm:
   ```bash
   npm install -g express
   ```
2. You can create a new Express project using the Express Generator:
   ```bash
   npm install -g express-generator
   express RoamingRangerApi
   cd RoamingRangerApi
   npm install
   ```
3. Start the server by running `npm start` in the project directory.

# Installation of MongoDB on Linux:
sudo wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Installation of MongoDB on macOS (using Homebrew):
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew tap mongodb/brew
brew install mongodb-community

# Installation of MongoDB on Windows:
### Download the installer from: https://www.mongodb.com/try/download/community
### Run the installer and follow the instructions.

# Mongoose installation:
```
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data. With Mongoose, you can define schemas to represent your data structures, create models based on these schemas, and perform CRUD operations on your MongoDB database using these models. Mongoose also provides built-in validation, middleware hooks, query building, and other features to simplify database interactions in Node.js applications. Overall, Mongoose is widely used in the Node.js ecosystem for working with MongoDB databases in a structured and efficient manner.
```

1. **Install Mongoose**:
   - Open your terminal.
   - Navigate to your Express API project directory.
   - Run the following command to install Mongoose using npm:
     ```bash
     npm install mongoose
     ```

### Usage:

2. **Import Mongoose in your Express app**:
   - In your Express app file (e.g., `app.js` or `server.js`), import Mongoose at the top of the file:
     ```javascript
     const mongoose = require('mongoose');
     ```

3. **Connect to MongoDB**:
   - Use Mongoose to connect to your MongoDB database. You typically do this when setting up your Express app:
     ```javascript
     mongoose.connect('mongodb://localhost:27017/my_database', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     ```
     Replace `'mongodb://localhost:27017/my_database'` with the URL of your MongoDB database. Make sure MongoDB is running on your local machine.

4. **Define Mongoose Schema**:
   - Define Mongoose schemas to model your data. You typically do this in separate files, for example, `models/User.js`:
     ```javascript
     const mongoose = require('mongoose');

     const userSchema = new mongoose.Schema({
       name: String,
       email: String,
       age: Number,
     });

     module.exports = mongoose.model('User', userSchema);
     ```
     This defines a schema for a user with `name`, `email`, and `age` fields.

## Git

### Windows

1. Download the Windows installer from the [official Git website](https://git-scm.com/).
2. Run the installer and follow the prompts.
3. Once installed, open Command Prompt and run `git --version` to verify the installation.

### Linux

1. You can install Git on Linux using a package manager. For example, on Ubuntu, you can run:
   ```bash
   sudo apt update
   sudo apt install git
   ```
2. Verify the installation by running `git --version` in the terminal.

### macOS

1. Git is pre-installed on macOS. You can verify it by opening Terminal and running `git --version`.
2. If you need to update Git, you can use Homebrew:
   ```bash
   brew update
   brew install git
   ```

That's it! You should now have Node.js, Express, and Git installed on your system.

# Installing Oh My Zsh

1. **Install Oh My Zsh**:
   - Open your terminal.
   - Run the following command to install Oh My Zsh:
     ```bash
     sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
     ```
   This command will download and install Oh My Zsh along with its default configuration.

https://ohmyz.sh/#install