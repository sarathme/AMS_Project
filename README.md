# AMS_Project
Attendance Management System

NOTE: You need to create a file called config.env in the root directory which should contain environment variales named below inorder to make a database connection
     
      - DB_CONNECTION --> should contain the connection url for the MongoDB database where the password in the url should replaced like PASSWORD
      - PASSWORD --> should contain your password for the Database connection


DESCRIPTION
      - This is my personal project which is made using Nodejs, Express framework and NoSQL Database MongoDB with Mongoose framework. This is an API which can be used to log employees login, logout and breaktime.
      - This API contains Authorization and Authentication using bcrypt package and JSON Web Token
      - This API follows MVC Archietecture Data is modelled using Schema in Mongoose framework and routing id done using Express framework
      - This API I used middleware functions inorder to store or retrieve data from the Database 
      
