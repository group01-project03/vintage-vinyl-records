# UofT Bootcamp Project 3 Group 1: Vintage Vinyl Records
## Your one stop shop for browsing through and purchasing authentic vinyl records. 

## Description: 
An e-commerce website which allows the user to browse through records stored in the application’s database, save their selected items to their cart once they create an account, and checkout their selected items for purchase using [Stripe](https://stripe.com/en-ca/). 

## Table of Contents
* [Installation](#installation)
* [License](#license)
* [Usage](#usage)
* [Guidelines](#guidelines)
* [Links](#links)
* [Tools](#tools)
* [Credits](#credits)


## Installation
This application can be accessed using the deployed Heroku URL as found [here]( https://vintage-vinyls.herokuapp.com//) or in the [Links](#links) tab. 

To connect to the application on their local host address, the user must clone the repository from GitHub. Once cloned, the user will open their terminal and `npm install` the dependencies as found in the package.json files for the client and sevrer folders. They must also assure that they have MongoDB installed on their computer and then run `npm run seed`. Finally, the user will connect to the server by running `npm run develop` in the root directory. 

## License
MIT [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

## Usage
The application allows the user to access, store, and save items of interest to their account and also allows them to securely complete their transaction. 

### Application GIF

https://user-images.githubusercontent.com/81194686/134813575-46138f48-8920-4e37-b792-e4cbcabdeb93.mp4

## Guidelines 
### User Story:
```
AS a shopper,
I WANT to easily browse through a number of records, 
SO THAT I can add items to my cart for checkout.
```
### Acceptance Test for User Story: 
```
GIVEN an e-commerce website, 
WHEN I open the site,
THEN I am able to see the app’s name, logo, and content. 
WHEN I click on “Create an Account”,
THEN I am directed to creating a new account which will later be saved. 
IF I click the “Sign In’ button and did not previously make an account, 
THEN I will not be able to access any account. 
IF I do not enter a valid username or password,
THEN I will also be unable to access any account. 
WHEN I click on the “Sign In” button and do already have an account, 
THEN I can sign into a previously made account and view saved items. 
IF I chose to browse the website without creating an account, 
THEN I can continue to browse and add items to my cart without creating an account. 
BUT I will not be able to proceed to the checkout unless I make an account. 

WHEN I go through the application’s inventory, 
THEN I have the ability to view items based on genre or trending selections and see available records for purchase. 
WHEN I click on a record, 
THEN I am given the option to view a larger size of the record along with a brief description and price AND I can add the record to my cart.
WHEN I click on a record, 
THEN I will be shown a number of similar items. 
WHEN I select on my cart, 
THEN I am able to view the items I have saved for checkout and proceed with the order. 
WHEN I go through my cart,
THEN I am able to see my saved items in a list and a total price for all items.
IF I have not placed any items in my cart,
THEN if I click on my cart, it will tell me that it is empty. 
WHEN I navigate through the application on a tablet or smartphone,              
THEN the application is still responsive, and I can still view and save records to my cart.
 ```

## Links
*	[Heroku Deployment]( https://vintage-vinyls.herokuapp.com/)


## Tools
*	Apollo client
*	Apollo-server-express
*	Graphql
*	Jsonwebtoken
*	Jwt-decode
*	React
*	React-dom
*	React-router-dom
*	React-scripts
*	Bcrypt
*	Express
*	Mongoose

## Credits
Created By:
 * [Ankur Shahi](https://github.com/ankurshahi80/)
 * [Mayuran Sweentherarajah](https://github.com/mayuranswee23/)
 * [Joseph Ndububa](https://github.com/josephn90/)
 * [Amna Syeda](https://github.com/amnasyeda/)
