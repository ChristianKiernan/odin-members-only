# Members Only Express Application
This was implemented as a submission for the NodeJS Course in the Odin Project
(full-stack JavaScript track). It's a simple express app that allows users to
post and view messages from other users. The focus of the project is back-end
logic, so there is no front-end / CSS styling.

## How It's Made
**Tech used:** PostgreSQL, Express, JavaScript, HTML, EJS\
The app utilizes a connection to a PostgreSQL database that stores user 
information, and data about user messages. The app has three tiers of 
membership. The first tier is a user (requires sign-up and log-in), the second
tier is a member (user requirements, + submission of a special password), and 
the third tier is admin(status given at sign-up). The app follows an MVC layout.
It utilizes the Node.js library Passport.js as authentication middlware, and
bcrypt for password hashing. 

## Lessons Learned
The main goals of this project were to practice integrating a database into an
application, sharpening authentication skills in express 
(through the use of middleware), and validating/sanitizing user input.
A couple things that I want to learn/improve upon for future projects;
* Best practices in MVC layouts
* Implement tests for database operations, routes, and controllers



