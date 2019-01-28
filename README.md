# boolook-app

A Node.js application that allows users to search for books. The application utilizes the [Google Books API](https://developers.google.com/books/ "Google Books API") as its book search service. 

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

### Run Locally
You can run the application locally by typing the following script into the command line: 
```
heroku local web
```

The application can be accessed [localhost:5000](http://localhost:5000/ "localhost:5000")

### Deploying to Heroku
If you would like to deploy this applicatio to Heroku, input the following scripts into the command line: 
```
$ heroku create
$ git push heroku master
$ heroku open
```

## Environments Tested
**Desktop**
- Windows Chrome ver. 71.0.3578.98
- Windows Firefox ver. 64.0.2

**Mobile**
- iPhone iOS ver. 12.1.3 | Safari
- Samsung S6 Edge ver. 7.0 | Chrome, Firefox
