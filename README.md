<img src="src/assets/logo.svg" height="150px" align="right"/>

# DocTube

[![Build Status](https://api.netlify.com/api/v1/badges/557f9421-180f-4f11-bc08-a4ce6a6eb34e/deploy-status)](https://app.netlify.com/sites/doctube/deploys) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) 

_A video library web application built using MERN stack._

## Installation and Setup Instructions

Clone this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

```bash
npm install
```

To Start Server

```bash
npm start
```

Visit app on your browser at:

`localhost:3000`

## Tech Stack

- **UI Library**: React JS
- **CSS library**: [Krypton UI](https://krypton-ui.netlify.app) 
- **Routing**: react router v6

API source code can be found [here](https://github.com/shraddha319/doctube-api)

## Features

### Authentication
- User Sign Up
- User Login
- Persist logged-in state with localStorage

### Playlist Management
- Create new playlist
- Update playlist
- Add/remove videos to/from playlist
- Delete playlist
- Default user playlists: liked, watch later
  
### State manaement
- User, Playlists: React reducer + context
  
### Others
- Search bar
- Filter videos by genre, year of release, country, language, etc.
- Persist filter in URL to create shareable links
- Sort by IMDB rating, year of release, name
- Like and Save video buttons
- 404 page for Not Found error handling

## Routes

- `/` - home
- `/watch` - videos listing
- `/watch/:videoId` - watch video
- `/login` - login
- `/signup` - register

Follwing routes require user authentication:

- `/playlists` - user playlists
- `/playlists/:playlistId` - user playlist


## Attribution

- Icons: [Font Awesome](https://fontawesome.com)
- Logo: [Noun Project](https://thenounproject.com)
- Video source: [YouTube](https://www.youtube.com)






