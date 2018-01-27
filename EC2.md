# Deploy to EC2    

![EC2 picture](https://cdn-images-1.medium.com/max/720/1*Y5Pan-z9hAdbeA06UtJyNw.png)

Cogrammers is stoked to bring you a no-frills, minimalist, step-by-step guide to deploying a dynamic Node app to AWS via EC2. No previous experience necessary.

## What you need:    

1. An AWS account (it’s free even though they ask for your credit card info)
2. A GitHub account
3. Access to your computer’s terminal (also known as shell or command line). Check out a youtube video on how to find it on your operating system (Mac, Windows, etc.) if you’re new to this.    

## What will happen:    

1. Create EC2 instance
2. Connect to that EC2 instance
3. Deploy our Node app

## Technologies we will use:    
* EC2
* Ubuntu
* NGINX
* Node.js && NPM
* Postgresql
* Sequelize
* Vim    

It doesn’t matter what operating system you are working on today because we will be doing all of our work in the cloud. Cogrammers is inclusive by design :)

## Terminology:    
**Cloud**: The cloud refers to hosted space on the internet. It can be thought of like this: instead of storing <blank> on my local computer, I am going to push it to the cloud where it will be stored remotely.

**Server**: A computer with centralized data that feeds information to other computers.

**Instance**: An EC2 instance refers to virtual server space. These instances are created on an Amazon Machine Image (AMI).

**AMI**: An Amazon Machine Image is a template of a virtual machine environment. Worded another way, it is a snapshot of an operating system created for the purpose of computing in the cloud. Off of this image, the server (or instance) will run. For this demo, we will be using a Ubuntu-based operating system image.

**Container**: A container holds the whole of our virtual environment including operating system, server, code, libraries, and settings. Containers compartmentalize virtual working environments like keeping staging (the final draft of code before publishing) separate from development (rough drafts of code in test mode).

### Let’s get started by navigating to the EC2 launchpad    
Make your way to the AWS management console and select EC2 from the Services drop-down menu (under the Compute category).

Notice that there is a geographical location listed in your top navigation bar. This is the physical region in which your server lives. Feel free to choose your preferred location.

Click on `Launch Instance`.

![](https://cdn-images-1.medium.com/max/720/1*hD41xo0wtUDzOB_rHjtZcA.png)

### Choosing which AMI to launch    
We are going to launch our instance with the latest Ubuntu virtual machine (VM) in the form of an AMI.

In the left-hand dashboard, select the AWS Marketplace tab and search for `Ubuntu`. There are many options here. Some are official images and some are unofficial or out of date.

![](https://cdn-images-1.medium.com/max/720/1*cZLjVcIbVJUoGOvpvNf2YQ.png)

The way to know that you are choosing the right one is via the [Ubuntu Cloud Image Finder](https://cloud-images.ubuntu.com/locator/).
Once there, search for your server’s region. You can find your server’s searchable region in your aws console url. 

![](https://cdn-images-1.medium.com/max/720/1*TpPNVsznZ3gfzRbNitD98Q.png)

In the results you’ll be looking for:

Amazon AWS, _your server’s region_, _the latest version of Ubuntu_, and an instance type of **hvm-ssd** (stands for Hardware Virtual Machine & Solid State Drive).
  
Copy the AMI that matches your search results. In this case, our AMI is `ami-2eb40856`.

![](https://cdn-images-1.medium.com/max/720/1*s4Ejy3U1A_ngIm2Qp3W29w.png)

Now, back to the AWS instance launch screen — choose the `Community AMIs` tab from the left-hand dashboard and search for your AMI key (as seen below). **It is important to note the root device type of ebs (Elastic Block Store). The root device is where your persistent storage (backup) of this instance lives. Without this, every time your instance is ever stopped and then started again, any state on your VM is considered temporary and is wiped clean.** Select your machine image.

![](https://cdn-images-1.medium.com/max/720/1*xckBCTaSHi8wBkOBcuG8sA.png)

### Choosing the instance type

Next, we are going to choose the instance type. **The instance type is simply choosing how many resources you want to use.** We are going with the free tier version for our portfolio since we won’t need that many resources. Free tier is available for the first year of your AWS account.

Hit Next until `Step 6: Configure Security Group` is reached.

![](https://cdn-images-1.medium.com/max/720/1*0Y3OxB-Yp52NoqONUeOhUg.png)

### Set up your security group

Security groups filter outgoing/incoming traffic from an instance. This is AWS’s EC2 firewall settings.

There are 2 ways to enable security settings: create new rules or select an existing set of rules. We are going to create new rules.

Let’s label it as: `General SG`. Add a description of: *This SG will be assigned to all web based instances.*

=> **NOTE**: If this was a larger project with a development environment and a separate production environment, we would have separate security groups for that. We won’t go over that right now, but it is essential when working on larger projects.

Here is how we want to set up our secgroup rules:

`SSH | TCP | port 22 | Anywhere or (preferably) My IP`
SSH allows us remote private access to our instance. If you are physically located where you normally would work on your website, assign `My IP` to the source. Otherwise, choose `Anywhere`.

`HTTP | TCP | port 80| Anywhere`
Client access to our website. This is standard.

`HTTPS | TCP | port 443| Anywhere `
_Secure_ client access to our website. This is standard and necessary if taking in any client info (username, password, etc.).

`Custom TCP | TCP | port 3000 | Anywhere` 
This is the port for our Node.js app to be publicly accessible!

Hit **Review and Launch**.

Hit **Launch**.

![](https://cdn-images-1.medium.com/max/720/1*t4jx7waOWKEMks5I-qPqtw.png)

### Downloading the key-pair
 
=> **NOTE**: This is the only time we will be able to download this key pair. It should go straight to our downloads  —-  leave it there for now.

Select `Create a new key pair` from the dropdown menu. Let’s name it `demo-portfolio`.

Click on `Download Key Pair` and make sure it is saved.

Now click on `Launch.`

![](https://cdn-images-1.medium.com/max/720/1*PmK2PUfmxzypTGKklwrjVw.png)

**Instances are launching…**
This might take a few minutes.

Click on our instance id.

![](https://cdn-images-1.medium.com/max/720/1*_tx44_gxU3dJOpyEK73Y8A.png)

### Now for connecting to our instance!
Copy the instance’s IP.

![](https://cdn-images-1.medium.com/max/720/1*lckzhiulN6Rm-PVBb8NMHA.png)

### Open up your local terminal and set permissions on our instance

*(If at any point, you would like to know more about what exactly these commands are doing, check out [this beautiful site](https://www.explainshell.com/).)*

We are going to move the instance into our ssh folder and give read-and-write access to only ourselves with these commands.

`$ cd ~ `    
This makes sure that we are in our root directory:

`$ mv Downloads/demo-portfolio.pem ~/.ssh/`    
This moves the instance download to your ssh directory.

**If the response is that you do not have an ssh directory, then use this command:** `$ mkdir .ssh && chmod 700 .ssh` **Then proceed with the previous command.** 

`$ ls -alh .ssh`    
This will list the accessibility permissions. You can see in the image below that too many people have permissions: -rw-r — r — (owner can read/write, group can read, everyone can read)

`$ chmod 600 .ssh/demo-portfolio.pem`    
This command ensures that only I have access to read/write now as seen with the following command.    

`$ ls -alh .ssh `    
Now that our permissions are set, let’s log in to the instance’s SSH.    

`$ ssh ubuntu@<paste IP> -i .ssh/demo-portfolio.pem`    
Logging into our instance.    

`$ yes `    
The first time you log into an instance, you need to give your fingerprint.    

`$ exit`    
We will exit the instance for now and add our key as an identity so that we don’t always have to specify which key we want to use.    

`$ ssh-add -l`    
Lists identities. Our key is not listed yet.    

`$ ssh-add .ssh/demo-portfolio.pem`    
Adds our key as identity.    

`$ ssh-add -l`    
See key as identity now    

`$ ssh ubuntu@<IP>`    
And we are in the instance again — this time with a shorter command    

`$ sudo apt-get update `    
Installs all recent package listings    

`$ sudo apt-get install -y nginx nodejs npm postgresql postgresql-contrib`    
Installs NGINX, a super reliable web-server.    

`$ sudo update-rc.d postgresql enable`    
Set Postgres to start every time the instance launches    

`$ sudo -u postgres psql --command "ALTER USER postgres WITH PASSWORD '<YOUR-PASSWORD-HERE>';" `    

`$ sudo vim /etc/postgresql/9.6/main/pg_hba.conf`    
Change peer to trust (restart required)    

`$ sudo vim /etc/postgresql/9.6/main/postgresql.conf`    
Change `listen_addresses = 'localhost'` to `listen_addresses = '*'`    

```
$ sudo service postgresql restart
$ sudo psql -h localhost -p 5432 -U postgres -W
```

Hit `ctrl-d`

**FORK first**: `$ git clone https://github.com/<YOUR_USERNAME>/aws-workshop-node-app.git`    

![](https://cdn-images-1.medium.com/max/720/1*-R6uVL-buTP6jUPI-uH0Mg.png)    
![](https://cdn-images-1.medium.com/max/720/1*oNQX6erUe70FLrklARNxMg.png)

`$ sudo -u postgres createdb cogrammers-aws-dev`    
Create our database    

```
$ cd aws-workshop-node-app
$ npm install
```
Open up our project, install dependencies    

Since we are working with a remote server today, we are going to use Vim (instead of an external text editor) to modify our config. Run the following commands: 

`$ ls`  
List items in the root project folder. We want to edit our config.json file which is located in the server directory.

`$ cd server && ls`   
Now we see config.json listed and we will edit it in the console with Vim.

`$ echo $USER `    
This command tells us our root username that we will apply in the config.json file. Root user is ubuntu.

`$ vim config.json`    
This opens our file in Vim

`$ i `    
This puts us into edit-text mode

Using the arrow keys on your keyboard, navigate to the current username and replace `process.env[“USER”]` with `"ubuntu"` so that the line now reads: `"username": "ubuntu",`  —  that comma is important at the end there. 

Hit `esc` on your keyboard. While you are in edit mode, hitting esc brings you into normal mode and then if you type `:x` and hit enter, our work is saved and we have successfully exited Vim!   

```
$ node_modules/.bin/sequelize db:migrate
$ sudo npm install -g pm2
$ pm2 start ./bin/www
```
Migrates our database, installs our dependencies, and sets our app to always be running in the background    

### The next step is deployment! Dun-dun-dun-daaaa!

`$ wget -q -O - 'http://169.254.169.254/latest/meta-data/local-ipv4'`    
Gives us the IP address of the machine    

`$ sudo vim /etc/nginx/sites-available/default`    
Change `server_name: _` to `server_name: *.amazonaws.com`    

```
$ location / {
        proxy_pass http://172.31.27.59:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
     }
```

```
$ sudo nginx -t
$ sudo /etc/init.d/nginx reload
$ sudo service nginx start
```

Grab the public DNS from our EC2 console and enter it into the address bar. Voila!



