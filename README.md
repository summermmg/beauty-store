# Beauty Store App

## Table of contents
  - [General info](#general-info)
  - [Screenshots](#screenshots)
  - [Technologies](#technologies)
  - [Features](#features)
  - [Setup](#setup)

## General info
A full-stack eCommerce website built with React, Django DRF and PostgreSQL database.  
[View Demo Video ✨](https://youtu.be/CAYvYxYgBu0)  
[Live Demo](https://www.summerbeautystore.com)  

## Screenshots
<div align="center"><img src="/frontend/public/assets/beautystore_screenshot.png" width="70%" /></div>

## Technologies
* Django version: 3.1.7
* djangorestframework version: 3.12.2
* react version: 17.0.1
* redux version: 4.0.5
* bootstrap version: 4
* PostgreSQL

## Features
* Full featured shopping cart
* User authentication (JSON Web Token)
* Implemented Redux for state management
* User profile page (update user profile, view order status)
* Full checkout process (shipping, payment, place order, etc)
* PayPal integration
* Product reviews & search bar
* Admin management pages (orders, inventory/products, users)


## Setup
To run this project, install it locally using npm:

```
//Create & activate virtual environment
$ pip install virtualenv
$ virtualenv env
$ env\Scripts\activate

//run server
$ pip install -r requirements.txt
$ python manage.py runserver

//run frontend
$ cd frontend
$ npm install
$ npm start
``` 