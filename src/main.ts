import { createInstance } from './app';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
    const instance = createInstance(
        String(process.env.OPENAI_EMAIL),
        String(process.env.OPENAI_PASSWORD),
        String(process.env.SLACK_APP_TOKEN),
        String(process.env.SLACK_BOT_TOKEN),
        String(process.env.SLACK_SIGNING_SECRET)
    );
    await instance.start();
})();
