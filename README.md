![BookLook](https://i.imgur.com/dteATHq.png "BookLook")
![BookLook](https://i.imgur.com/FcpOAhj.png "BookLook Search Results")

# booklook-app

A Node.js application that allows users to search for books. The application utilizes the [Google Books API](https://developers.google.com/books/ "Google Books API") as its book search service. 


-----

## How to Run the Applicaton

### Inital Steps 

Make sure you have both [Node.js](http://nodejs.org/ "Node.js") and [Heroku CLI](https://cli.heroku.com/ "Heroku CLI") installed on your machine. 

### Clone Repository & Download Frameworks

Once both tools are installed, input the following scripts on your command line : 
```
git clone https://github.com/smorri/booklook-app.git
cd booklook-app
npm install
npm start
```

The application can be accessed [localhost:5000](http://localhost:5000/ "localhost:5000")

### Deploying to Heroku
If you would like to deploy this application to Heroku, input the following scripts into the command line: 
```
$ heroku create
$ git push heroku master
$ heroku open
```

### Run Locally via Heroku
You can run the application locally by typing the following script into the command line: 
```
heroku local web
```

## Sources
All graphic icons used in this application were downloaded from [Flaticon](https://www.flaticon.com/ "Flaticon").
Credit is given to [Freepik](https://www.freepik.com/ "Freepik") and is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/ "CC 3.0 BY") 

## Environments Manually Tested
**Desktop**
- Windows Chrome ver. 71.0.3578.98
- Windows Firefox ver. 64.0.2

**Mobile**
- iPhone iOS ver. 12.1.3 | Safari
- Samsung S6 Edge ver. 7.0 | Chrome, Firefox

## Run Automated Tests

Input the following script into the command line:
```
npm test
```

The application relies on NightwatchJS to run its automated tests.

I have experimented with Selenium WebDriver for Java applications in the past and chose NightwatchJS because : 
- It is similar to Selenium WebDriver for Java, not only in behavior (headless browser allows me to observe the automated actions taken place) but also syntactically the framework is comparable _yet_
- There are some syntatical differences (ie chaining functions, and Expect assertions) that gives the framework a bit of a different 'flavor' to it, allowing me to use this as a learning opportunity. 
