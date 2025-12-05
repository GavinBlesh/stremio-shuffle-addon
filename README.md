# Stremio Shuffle Addon  

##ToDo List  
1. Change from JSON to database (IMDB api)  
2. Include episode descriptions  

## How To Run  
Open the folder in an IDE and open the terminal and run  
`npm install node.js`   
after that installs, run  
`npm install stremio-addon-sdk express cors`  
Now that you have that installed, run  
`node index.js`  
now copy and paste the url it outputs into the addons page search bar on Stremio. This however, only works on the devide hosting it. You will need to install ngrok and run that in another terminal window to use on other devices.   

### Running with ngrok  
Once ngrok is running in another terminal window, copy the link into the addons search bar and then at the end of the url put '/manifest.json'  
