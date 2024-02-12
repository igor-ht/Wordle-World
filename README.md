# WordleWorld

Wordle World is an interactive word-guessing game built in a three-tier architecture using **SCSS, TypeScript, React.js, Next.js, Next-Auth.js, React-Query, Node.js, Express.js, Prisma ORM**, and more.

[![My Skills](https://skillicons.dev/icons?i=ts,react,next,scss,nodejs,express,prisma&perline=4)](https://skillicons.dev)

## Tech Stack

**Next.js** is a framework that works on top of **React.js** and offers _SSG_ _(Static Site Generation)_ - which contributes to _SEO_ _(Search Engine Optimization)_, performance, and _UX_ _(User Experience)_ -, and many other tools that optimize the development experience. \
**React-Query** is a comprehensive library that goes beyond data fetching. It efficiently handles diverse tasks, including _fetching, caching, synchronizing, and updating server state_. This multifaceted approach forms the core of smooth interactions and data-driven components. \
**Next-Auth** ensures a great authentication implementation. The integration, in combination with **JSON Web Tokens (JWT)**, secures _data exchange_ and precise _session control_ mechanisms, ensuring that the user interactions transpire within a controlled environment, contributing to a seamless and secure user experience. \
For styling, I worked with **SCSS** and a _"7-1"_ personalized architecture that consists of only three folders: _\_abstracts, \_base, and \_components_, which is called by myself _'ABC' Architecture_. (This pattern might have different names but refers to the same thing: a _7-1ish SCSS architecture for smaller projects_.)

## Development Goals

- Build the application end to end.
- Utilize Next.js as a React-based framework.
- Implement an API using Express and Prisma to manage a PostgreSQL database.
- Ensure authentication using Next-Auth (Auth.js) and JsonWebToken.
- Utilize the latest technologies and stay up-to-date with the industry standards.
- Develop a user-friendly and responsible UI/UX.

## Features

- More than 10.000 words to guess.
- Session authentication and accessToken rotation.
- OAuth with Google.
- User can keep track in its dashboard of the points and words they have guessed right.
- Ranking system based on the user's points.
- Guest can play with a limit of 3 games a day.

## Live App

You can try the live app [here](https://wordle-world.vercel.app/).

You have the option to sign up by registering a new account or using your Google account.

Alternatively, you can use the following test account:

> `email: test@wordleworld.com`\
> `password: test123 `

Enjoy playing Wordle World!
