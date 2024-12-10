# 🎬 movie BASE

A website that integrates the TMDB API to search and explore movies, series and celebrities. The site provides an engaging visual experience with smooth transition animations while navigating between pages.

## Features
- Search for movies, TV shows, and celebrities.
- Smooth transition animations for an improved user experience.
- Backend API acting as an intermediary between the client and TMDB, processing data before sending it to the client.
- Planned features: User management with favorites and watched lists (coming soon).

## Techs Used

### Frontend
- **React**: JavaScript library for building the user interface.
- **Redux Toolkit**: State management for efficient data handling.
- **Axios**: For making HTTP requests to the backend and external APIs.
- **React Router**: For routing and navigation between pages.
- **SCSS**: For styling, with a focus on responsive design and smooth animations.

### Backend
- **Express**: Web framework for building the API server.
- **Axios**: For making HTTP requests to the TMDB API.
- **bcrypt**: For password hashing (future user management feature).
- **Passport**: Authentication middleware (future user management feature).
- **pg** & **Sequelize**: PostgreSQL and ORM for user data storage (future feature for managing favorites and watched lists).


## Demo
You can try out the live demo of the site [here](https://moviebase-cph2.onrender.com).

## License
This project is licensed under the MIT License - see the [LICENSE](licens) file for details.

---

> This project follows the [MoSCoW](https://en.wikipedia.org/wiki/MoSCoW_method) method to prioritize features.
