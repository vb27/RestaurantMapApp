## Geogram
![geogram](/readme_images/Logo.PNG)

## Description
This application saves locations on a map and allows the user to post a title, review, and image to that location. It is user based so all saved data is for that specific user.

## Installation
To install this application there are a few key steps.
1. `npm init` to get the package json.
2. `npm install` if you have the given package json.
3. If you don't have the give package json file you will need to `npm install bcrypt connect-session-seqelize dotenv express express-handlebars express-session mysql2 sequelize` (this installs all need packages to run the application)
4. Because this is application uses a database you will need to change the `config.json` to connect to your database.

## Usage
The application allows a logged in user to pick a location and enter a name, review, and image and save it on the map.

## Tutorial
There is a tutorial on the front page but also here for convenience:
1. [Login](#login)
2. [Signup](#signup)
3. [Make a Post](#make-a-post)
4. [View All Posts](##view-all-posts)

## Login
![login_ex](/readme_images/login.PNG)
The first page is a login. Like all logins, as long as the account exists and the username and password are correct you will be then taken to a page using the data for that user.

## Signup
![signup_ex](/readme_images/signup.PNG)
If you don't have an account you can make an account. The username has to be unqiue and the password needs to be eight or longer. But with all that you will have a new user to save data to.

## Make-A-Post
![post_ex](/readme_images/post.PNG)
There is a search bar that lets you input: address, name, and image. Once you click save the post will be saved on the map.
For the address you can input restaurant name, address, city, etc. Based on the search it will pick the location with the exact name or if it's a generic name it will choose the closest to Seattle, Washington.

## View-All-Posts
![map_ex](/readme_images/map.PNG)
On the map you will see all the locations that have been saved to that user.

![popup_ex](/readme_images/click.PNG)
If you click on the marker a popup will appear with all the information that was inputed by the user when they made the post.

## Credits
Creators:
* [Paul Lee](https://github.com/vb27)
* [Kridsanapong Daihentob](https://github.com/commiewalker)
* [Amaury Huerta](https://github.com/ushaury)
* [Michael Zuniga](https://github.com/michaelzunigaa)

## API Used
* [Mapbox](https://www.mapbox.com/)

## NPM Packages Used
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [express-session](https://www.npmjs.com/package/express-session)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [sequelize](https://www.npmjs.com/package/sequelize)

## Deployed Example
[Geogram](https://murmuring-waters-09325.herokuapp.com/)