# RDS, or Relational Database Service

RDS acts as a relational database for your app, and can be configured for Postgres, Aurora, MySQL, MariaDB, Oracle, and Microsoft SQL Server database engines. RDS has become very popular over the past few years due to the relative ease with which users can set up, maintain, and scale relational databases. (If you’re looking to use a non-relational database instead, check out the AWS docs for DynamoDB and other NoSQL options.) The services provided by RDS make it ‘relatively’ easy to manage and configure your database, in addition to providing automated, built-in backups to prevent data loss. In short, RDS makes it easy for companies to create, use, and protect their databases. 

If you already have the database you’d like to use for your application, you can use AWS’ Database Migration service to move your database to the cloud. If we have enough time left, we’ll set up an RDS ‘instance’ to store information about our personal projects for our portfolio. 

**Important**: RDS is _not_ required to deploy an app with a database to AWS. Based on your specific needs, you can elect to store your database directly in the EC2 instance instead. Both options allow you to securely host your database in the cloud, but they differ in the degree of configuration; RDS takes care of most setup, maintenance, and operation tasks for you (saving time at the expense of flexibility), while EC2 leaves you to do most of the configuration yourself (but allows you greater flexibility). If you’re dealing with a smaller database, RDS is usually the way to go.

### Let's get started!

Open up your AWS RDS console (https://console.aws.amazong.com/rds) and click `Launch a DB Instance`. When prompted to choose an engine option, select `PostgreSQL` and click `Next`. 

You’ll now be prompted to choose a use case. We’re just playing around here, so choose `Dev/Test`. Next, we have to specify the details of our database instance. Leave the default license model info and DB engine version info values, and select the checkbox in the `Free Tier` box. Scroll down until you get to `Settings`, and add a name for your database instance as well as a master username and password for yourself. Click `Next`. 

<img scr="public/stylesheets/Screen Shot 2018-01-25 at 2.38.21 PM.png"/>

<img scr="public/stylesheets/Screen Shot 2018-01-25 at 2.40.00 PM.png"/>

You should now be on the `Configure advanced settings` page. Leave all of the default values except for the database name at the very bottom of the page under `Database options`, and then click `Launch DB instance`. 

Now we have to wait a few minutes for our RDS instance to launch. Once it’s ready, you’ll see the status change from _**creating**_ to _**available**_. (Warning: this could take a while!)

<img scr="public/stylesheets/Postgres-Launch06.png"/>

It’s important to remember that the database we set up is completely empty. We’ll go over migrating our local database to this RDS instance in a few minutes, but first, let’s just try connecting to it from the command line using the following prompt:

```
psql \
  --host=mypostgresql.c6c8mwvfdgv0.us-west-2.rds.amazonaws.com \
  --port=5432 \
  --username=awsuser \
  --password \     ** LEAVE BLANK! **
  --dbname=mypgdb 
```

You’ll be asked to enter your password you had set while creating your master user for the RDS instance. Once you enter it, you should be inside your database!


At this point, we could manually insert out tables and data (since we don’t have any data yet!). Obviously, this isn’t what you would want to do if you were working on a production database. For now, let's just leave as is. We can talk more in depth about migrating our database later.

