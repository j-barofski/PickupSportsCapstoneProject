Pickup Sports Capstone Project

This application will let users find others to play sports with. By creating an event, others can join at a specified location, which can be found with a search functionality.
When a location is searched and successfully found, events nearby will be found. There you can join the events. 
Events are able to be edited and deleted as well. 

Run frontend:
    cd client &&
    npm install &&
    npm run dev 

Run backend:
    cd server &&
    node index.js

APIs:
    Events:
        Create, update, and join events
    getAddress: 
        Get addresses from mapbox to display and find location to create/join events

Landing page
![Landing page](<Screenshot 2026-04-12 at 10.27.03 PM.png>)

Search location
![Search location](<Screenshot 2026-04-12 at 10.27.50 PM.png>)

Create event
![Create event](<Screenshot 2026-04-12 at 10.28.06 PM.png>)

Events near you
![events near you](<Screenshot 2026-04-12 at 10.29.28 PM.png>)

Edit event
![Edit event](<Screenshot 2026-04-12 at 10.29.43 PM.png>)