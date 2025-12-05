# Stremio Shuffle Addon  
Information from this project partially sourced from `https://github.com/Stremio/stremio-addon-sdk/blob/master/README.md`  

## ToDo List  
1. Change from JSON to database (IMDB api)  
2. Include episode descriptions
3. Run from server constantly or host cloud-based  

## How To Run  
Open the folder in an IDE and open the terminal and run  
`npm install node.js`   
after that installs, run  
`npm install stremio-addon-sdk express cors` or `npm install -g stremio-addon-sdk`
Now that you have that installed, run  
`node index.js`  
now copy and paste the url it outputs into the addons page search bar on Stremio. This however, only works on the devide hosting it. You will need to install ngrok and run that in another terminal window to use on other devices.   

### Running with ngrok  
install ngrok and in another terminal, run  
`ngrok http 7000`  
Once ngrok is running in another terminal window, copy the link into the addons search bar and then at the end of the url put '/manifest.json'  
