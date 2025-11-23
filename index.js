const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const fs = require("fs");
const path = require("path");

const manifest = require("./manifest.json");
const episodeFile = path.join(__dirname, "episodes.json");
const collectionID = "Monster_Of_The_Week_collection_main";

//Loads in JSON Data
let allEpisodes = [];
try {
    const data = fs.readFileSynch(episodeFile, "utf8");
    allEpisodes = JSON.parse(data);
} catch (error){
    console.error("You Fucked Up Something");
    process.exit();
}

const builder = new addonBuilder(manifest);

const collectionMeta = {
    id: collectionID,
    type: "series",
    name: "Monster of The Week Shuffle",
    poster: "https://m.media-amazon.com/images/M/MV5BMTg1NTEyNjc4NV5BMl5BanBnXkFtZTYwMzk1NTc2._V1_QL75_UX496.5_.jpg",
    background: "https://www.google.com/search?client=firefox-b-1-d&udm=2&q=aliens%20in%20the%20attic%20imdb#vhid=m5ZorHGvOmC59M&vssid=mosaic",
    description: "Shuffled playlist containing MOTW episodes from Fringe, The X-Files, and all versions of The Twilight Zone",
};

//Makes show up on discover page
builder.defineCatalogHandler(({ type, id }) => {
    if (type === "series" && id === "motw_shuffle") {
        return Promise.resolve({ metas: [collectionMeta] });
    }
    return Promise.resolve({ metas: [] });
});

//Shuffles episodes and pulls in their details
builder.defineMetaHandler(({ id }) => {
    if (id !== collectionID) { 
        return Promise.resolve({ meta: null });
    }

    const shuffledEpisodes = [...allEpisodes].sort(() => Math.random() - 0.5);

    const videoObjects = shuffledEpisodes.map((ep, index) => {
        const standardId = `${ep.imdb_id}:${ep.season}:${ep.episode}`;
        
        return {
            id: standardId,
            season: 1, //used for shuffle override
            episode: index + 1, //used for shuffle override
            title: `${ep.name} (S${ep.season}:E${ep.episode})`,
            released: new Date(ep.released * 1000).toISOString(),
            thumbnail: ep.img,
            overview: `${ep.name}\nOriginal Air Date: ${new Date(ep.released * 1000).toDateString()}`
            //TODO: THE UPDATES IN MIND WOULD GO HERE!
            //Include season + episode + description + name
            //test
        };
    });

    const detailedMeta = {
        ...collectionMeta,
        videos: videoObjects,
        cacheMaxAge: 0, //Prevents Stremio from overriding the shuffle override from earlier
        staleRevalidate: 0,
        staleError: 0
    };

    return Promise.resolve({ meta: detailedMeta });
});

builder.defineStreamHandler(({ type, id }) => {
    if (type === "series" && id.startsWith('tt')){
        return Promise.resolve({
            streams: [{
                url: `stremio://auto/${id}`
            }]
        });
    }
    
    return Promise.resolve({ streams: [] });
});

const PORT = process.env.PORT || 7000;
const addonInterface = builder.getInterface();

serveHTTP(addonInterface, { port: PORT });

console.log(`Addon server running at http://127.0.0.1:${PORT}`);