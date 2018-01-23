A simple Node app for cogrammers' AWS workshop. Will be used to demonstrate how to upload to EC2 instance on AWS.    
## Installation    
**Fork** and clone down to local machine:    
```shell
$ git clone https://github.com/<YOUR_USERNAME>/aws-workshop-node-app.git
$ cd aws-workshop-node-app
```
Open up repo and install dependencies:    
```shell
$ npm install
$ npm install --save sequelize-cli
```
In `config.json`, change `username` to your root username (you can find this by running `$ echo $USER` in your console)    

Set up database:    
```shell
$ node_modules/.bin/sequelize db:create
$ node_modules/.bin/sequelize db:migrate
```
To start:  
```shell
$ nodemon    
```
Open in browser:
```
localhost:3000
```
