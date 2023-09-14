# Multi-Threading in Node.js

This project demonstrates the use of worker_threads module (released since Node.js v10.5.0).

In this project we will simulate a CPU intensive task to block the main thread and then show how to use worker threads in Node.js to run Javascript code in parallel.


## Project setup

1. Create a directory
```
mkdir multi-thread
cd multi-thread
```
2. Install express-generator globally, to create an application skeleton and then launch it.
```
npm i -g express-generator
express
npm install
```
3. To perform image compression, install jimp (JavaScript Image Manipulation Program).
4. A CPU intensive task without worker threads implementation is written in `/blocking` API.
5. CPU intensive image compression run using worker_threads module is written in `/workers` API.
6. Calling the `/blocking` API will block the main thread and hence hinder the response time for rest of the APIs.
7. You will observer that the `/workers` API does not block the main thread.






