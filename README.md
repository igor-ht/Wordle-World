# Wordle World

Wordle World is an end-to-end interactive word-guessing game built with a three-tier architecture. This project aims to create a robust and scalable full-stack app with client and server-side components.

![screenshot](https://img.icons8.com/?size=48&id=nCj4PvnCO0tZ&format=png)
![screenshot](https://img.icons8.com/?size=48&id=123603&format=png)
![screenshot](https://cdn1.iconfinder.com/data/icons/akar-vol-1/24/nextjs-fill-48.png)
![screenshot](https://next-auth.js.org/img/favicon.ico)
![screenshot](https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/288_Sass_logo-48.png)

![screenshot](https://img.icons8.com/?size=48&id=54087&format=png)
![screenshot](https://expressjs.com/images/favicon.png)
![screenshot](https://img.icons8.com/?size=48&id=zJh5Gyrd6ZKu&format=png)
![screenshot](https://img.icons8.com/?size=48&id=38561&format=png)
![screenshot](https://img.icons8.com/?size=48&id=rHpveptSuwDz&format=png)

## Development Goals

The main objectives of this project were:

- Create a full-stack app with client and server-side components.
- Utilize a React-based framework for the client-side development.
- Implement an API server using Express and Prisma to manage a SQL database.
- Utilize the latest technologies and stay up-to-date with the industry standards.
- Ensure authentication and security features.
- Develop a user-friendly UI/UX.
- Write clean and maintainable code.

## Milestones

### Development:

- [x] Milestone 1: Project initialization
- [x] Milestone 2: Backend development completed
- [x] Milestone 3: Frontend development completed
- [x] Milestone 4: Testing and bug fixes
- [x] Milestone 5: Deployment and release

### Production:

- [x] Milestone 1: Refactor Client Side to react-query for API communication

## App Commands

To run the application locally, you can use the following commands:

|             | `/client`       | `/server`       |
| ----------- | --------------- | --------------- |
| Development | `npm run dev`   | `npm run dev`   |
| Build       | `npm run build` | `npm run build` |
| Production  | `npm run start` | `npm run start` |

## Live App

You can try the app live <a href="https://wordle-world.vercel.app/">**_here_**</a>.

You have the option to sign up by registering a new account or using your Google account.

Alternatively, you can use the following test account:

> email: `test@wordleworld.com` password: `test123`

Enjoy playing Wordle World!

## Architecture

Wordle World follows a three-tier architecture. The key components of the architecture are as follows:

**Client-side:** The front-end leverages Next.js, a server-side rendering framework, to provide optimal performance and seamless gameplay experiences. Next.js enables server-side rendering and static website generation, enhancing the overall user experience.

**Server-side:** The back-end development utilizes Node.js and Express.js to create a scalable and robust API infrastructure. This combination ensures smooth and secure communication between the client and server, facilitating real-time data exchanges and enhancing the overall gameplay experience.

**Database:** Wordle World uses Prisma, a modern database toolkit, along with PostgreSQL, to efficiently interact with the database. This ensures the integrity and security of player information.

## Authentication

Authentication is a crucial aspect of Wordle World. The project implements a robust authentication system using next-auth and JWT. These technologies ensure secure user account management, allowing players to register, log in, and maintain their profiles.
