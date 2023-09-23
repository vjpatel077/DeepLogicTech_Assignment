const express = require('express');
const request = require('request');

const app = express();

// Define a route to fetch and display Time stories
app.get('/getTimeStories', (req, res) => {
    // Create an array to store the result data
    const vijayData = [];

    // Send a GET request to the Time website
    request.get('https://time.com', (err, response, body) => {
        if (err) {
            return res.status(200).send({ error: 'An error occurred while fetching the data.' });
        }

        // Extract the latest stories using string manipulation
        const startTag = "latest-stories";
        const endTag = "latest-stories__item-timestamp";
        const latestStories = body.slice(body.indexOf(startTag), body.lastIndexOf(endTag)).split("</li>");

        // Loop through the latestStories array and extract relevant information
        for (let i = 0; i < latestStories.length; i++) {
            const linkText = latestStories[i].slice(latestStories[i].indexOf("href="), latestStories[i].indexOf("<h3"));
            const link = "https://time.com" + linkText.substring(6, linkText.length - 19);

            const titleText = latestStories[i].slice(latestStories[i].indexOf("<h3"), latestStories[i].indexOf("</h3>")).substring(42);
            const title = titleText.replace(/<i>/g, "").replace(/<[/]i>/g, "").replace(/<em>/g, "").replace(/<[/]em>/g, "");

            // Push each story data into the vijaytData array
            vijayData.push({ link, title });
        }

        // Log the result data to the console
        console.log(vijayData);

        // Send the result as a JSON response
        res.json(vijayData);
    });
});

// Start the Express server
app.listen(5000, () => {
    console.log("Connected to PORT: 5000");
});
