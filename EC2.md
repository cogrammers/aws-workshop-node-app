# Deploy to EC2

<div align="center">![EC2 picture](https://cdn-images-1.medium.com/max/720/1*Y5Pan-z9hAdbeA06UtJyNw.png)</div>

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
