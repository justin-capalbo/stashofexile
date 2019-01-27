import createServer from "./createServer";

console.log(process.env.STASH_API);

const server = createServer();

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
}, () => {
    console.log(`Server is now running on http://localhost:4000`);
});
