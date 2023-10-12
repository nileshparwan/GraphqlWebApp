import { init } from "./server"

const startServer = async () => {
    const app = await init();

    app.listen(4000, () => {
        console.log('app running on port 4000');
    })
}

startServer();