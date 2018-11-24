# Confluence
A distributed computing approach to computationally heavy algorithms.

## Abstract
This is an exploratory project into the domains of distributed computing and evolutionary AI. 
Confluence uses a Node server on a Raspberry Pi (RPi) to communicate tasks between devices by turning the RPi into a WiFi access point.
Devices can connect as workers to the RPi and access a React based dashboard to see their status, UUID and active tasks. 
On the RPi, an administrator page is shown with the connected nodes, parameters and function inputs. 
The training is started from the administrator dashboard from where the evolution process can be viewed.

## In Our Repository
`client/`: A real-time dashboard for workers and admins built in React to show information about the machine state, users connected, and current generation .  
`server/`: A Node.js server to split up computational tasks amongst connected nodes   
`tron-ai-java/`: The Java implementation of our evolutionary AI (experimental part of prototype)
proposal  

## What We Learned:
- Use the Raspberry Pi as an access point.
- Use webhooks to asynchronously send data to other devices and receive back completed tasks.
- How to model and build an evolutionary AI.

## Challenges
- Creating a reliable method of distributing data and securing it when it comes back.
- Synching up the WebSockets to accord with other emissions and on events appropriately

## Objectives We Achieved:
- Built a genetic algorithm to play the tron light bikes against itself - see `tron-ai-java/`.
- Created a server to distribute tasks across WiFi connected devices - see `server/`.
- Created a dashboard to view the evolution process  - see `client/`
