# AMS_Project

Attendance Management System

NOTE: You need to create a file called config.env in the root directory which should contain environment variales named below inorder to make a database connection

      -DB_CONNECT = connection string for the MongoDB Cluster where the password should br replaced like <PASSWORD>
      -DB_PASSWORD = your cluster password
      -JWT_SECRET = your JSON Web Token secret
      -JWT_EXPIRES_IN = Expiration time for the JSON Web Token.

DESCRIPTION - This is my personal project which is made using Nodejs, Express framework and NoSQL Database MongoDB with Mongoose framework. This is an API which can be used to log employees login, logout and breaktime. - This API contains Authorization and Authentication using bcrypt package and JSON Web Token - This API follows MVC Archietecture Data is modelled using Schema in Mongoose framework and routing id done using Express framework - This API I used middleware functions inorder to store or retrieve data from the Database
