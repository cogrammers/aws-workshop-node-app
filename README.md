A simple Node app for cogrammers' AWS workshop. Will be used to demonstrate how to upload to EC2 instance on AWS.    
## Installation    
**Fork** and clone down to local machine:    
```shell
$ git clone https://github.com/<YOUR_USERNAME>/aws-workshop-node-app.git
$ cd aws-workshop-node-app
```    
Make sure postgres is installed:    
```shell
$ brew install postgresql
```    
Install dependencies:    
```shell
$ npm install
$ npm install --save sequelize-cli
$ npm install --save pg@6 pg-hstore
```
In `server/config.json`, change `username` to your root username (you can find this by running `$ echo $USER` in your console)   

Start postgres and create local database:    
```shell 
$ brew services start postgresql
$ createdb cogrammers-aws-dev
```    
Migrate database:    
```shell
$ node_modules/.bin/sequelize db:migrate
```
To start:  
```shell
$ npm start    
```
Open in browser:
```
localhost:3000
```
