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
* Linuxbrew
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

**AMI**: An Amazon Machine Image is a template of a virtual machine environment. Worded another way, it is a snapshot of an operating system created for the purpose of computing in the cloud. Off of this image, the server (or instance) will run. For this demo, we will be using a Linux based operating system image.

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

`PostgreSQL | TCP | port 5432| Anywhere or (preferably) My IP`
This allows us access to our database on the instance. Same as with SSH, if you are physically located where you normally would work on your website, assign `My IP` to the source. Otherwise, choose `Anywhere`.

`All Traffic | TCP | ports 0 — 65535 | Anywhere `
This is dangerous and not recommended for production.

`Custom TCP | TCP | port 3000 | Anywhere` 
This is the port for our Node.js app to be publicly accessible!

Hit **Review and Launch**.

![](https://cdn-images-1.medium.com/max/720/1*cBs-SwnzUQSR3sKV165hZA.png)

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
Adds our key as identity

`$ ssh-add -l`
See key as identity now

`$ ssh ubuntu@<IP>`
And we are in the instance again — this time with a shorter command

`$ sudo apt-get update `
Installs all recent package listings

`$ sudo apt-get install nginx`
Installs NGINX, a super reliable web-server.

`$ Y `
Yes, we want to take up additional space with NGINX.

*“NGINX accelerates content and application delivery, improves security, facilitates availability and scalability for the busiest web sites on the Internet.”*
— As worded on NGINX.com.

### Install Linuxbrew on your Ubuntu instance
Linuxbrew is the Homebrew package manager for Linux.

`$ sudo mkdir /home/linuxbrew`    
`$ sudo chown $USER:$USER /home/linuxbrew`    
`$ git clone https://github.com/Linuxbrew/brew.git /home/linuxbrew/.linuxbrew`    
`$ echo 'export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"' >> ~/.profile`    
`$ echo 'export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"' >> ~/.profile`    
`$ echo 'export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"' >> ~/.profile`    
`$ source ~/.profile`    
`$ brew tap homebrew/core`     
`$ brew update` 
`$ brew doctor`

### Install Node and clone our Node project
If you haven’t already, fork our demo-portfolio [here](https://github.com/cogrammers/aws-workshop-node-app) (as pictured below).

![](https://cdn-images-1.medium.com/max/720/1*byiJPcMS6_8D40xMmUTU1A.png)

Then in our SSH (in our terminal):

`$ brew install node `
Get that Node framework onto our instance (this automatically installs NPM (Node Package Manager) too.

Go to YOUR GitHub forked repo. Mine is pictured below.

![](https://cdn-images-1.medium.com/max/720/1*-R6uVL-buTP6jUPI-uH0Mg.png)

Copy the GitHub repo URL as seen below.

![](https://cdn-images-1.medium.com/max/720/1*oNQX6erUe70FLrklARNxMg.png)

Back in our SSH:

`$ git clone https://github.com/<YOUR_USERNAME>/aws-workshop-node-app.git `
Clone the repo onto our instance from your forked copy of the GitHub repo.

`$ cd aws-workshop-node-app/ `
Change directories into the project

`$ ./setup/mac.sh`
Install dependencies and set up Postgresql database. We have built a magical little script sheet that we are running here. It includes the word mac because it works with Homebrew — a Mac package manager for a console. It also works with Linuxbrew which you set up on our Ubuntu machine earlier :)

To take a closer look at what is happening behind the scenes of this script, we can open up the mac.sh file that is located in our setup directory (./setup/mac.sh) and see this:

``` #! /bin/bash
set -euo pipefail
# Install postgresql
if command -v createdb &> /dev/null; then  
  echo "Posgres already installed, skipping install..."
else
  brew install postgresql  
  brew services start postgresql
  createdb cogrammers-aws-dev
fi 
echo "Installing npm packages"
npm install
npm install --save sequelize-cli
npm install --save pg@6 pg-hstore 
echo "Setting up config file"
export REPLACEMENT="\"username\": \"$USER\","
sed -i.bak 's/"username".*/'"$REPLACEMENT"'/g' server/config.json
rm server/config.json.bak 
echo "Migrating the database"
./node_modules/.bin/sequelize db:migrate 
```

### Editing our config.json file with Vim to include our username
Now, we have to get into the project files and manipulate them a little bit. If we were working with a *local* server, we might just use an IDE (Integrated Development Environment) like Atom or Sublime. The command to open our current directory to work on our project would look something like this: `$ atom .`  — including the period which means current directory.

Since we are working with a remote server, today we are going to use Vim.

*“Vim is a highly configurable text editor built to make creating and changing any kind of text very efficient.”*  
—  vim.org

That being said, it can be difficult to exit out of Vim. If you get stuck and your instincts seem to have run away with the circus in Vim-land, check [this](https://www.digitalocean.com/community/tutorials/installing-and-using-the-vim-text-editor-on-a-cloud-server) & [this](https://www.cyberciti.biz/faq/linux-unix-vim-save-and-quit-command/) out.

In our SSH:

`$ brew install vim` 
Install Vim

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

Using the arrow keys on your keyboard, navigate to the current username and replace `process.env[“USER”]` with `"ubuntu"` so that the line now reads: `"username": "ubuntu",`  — that comma is important at the end there.

Navigate to the current host IP address at `127.0.0.1:5432` and change it to our instance’s IP that we logged into our SSH with. For me, the new host IP is `34.217.73.232`, so now this line reads as follows: `"host": "34.217.73.232",` — again with the comma.

This is setting us up for smooth sailing with our Postgresql database. Postgres likes to know who is in charge of the database in use. We are letting it know that ubuntu is.

Hit `esc` on your keyboard. While you are in edit mode, hitting esc brings you into normal mode and then if you type `:x` and hit enter, our work is saved and we have successfully exited Vim!

Good work.

See if you can use Vim to go back into the doc and confirm that the work we just did is saved.

### The next step is deployment! Dun-dun-dun-daaaa!
