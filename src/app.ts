import { App } from "@slack/bolt";
import { ChatGPTAPIBrowser } from "chatgpt";
import { Conversation } from "./interface";

export class Instance {
    api: ChatGPTAPIBrowser;
    app: App;
    conv: Conversation;

    public constructor(api, app, conv) {
        this.api = api;
        this.app = app;
        this.conv = conv;
        this.setup();
    }

    public async start() {
        await this.api.initSession();
        await this.app.start();
        console.log("[INFO] ⚡️ ChatGPT Bot app is running at port 4000");
    }

    private setup() {
        const api = this.api;
        const app = this.app;
        const conv = this.conv;

        app.event("app_mention", async ({ event, say }) => {
            try {
                const question = event.text.replace(/(?:\s)<@[^, ]*|(?:^)<@[^, ]*/, "");

                if (question.includes("reset-thread")) {
                    conv.conversationId = "";
                    conv.parentMessageId = "";
                    await say("<@" + event.user + ">\n" + "Reset dialogue history!");
                } else {
                    const chatResponse = await api.sendMessage(question, {
                        conversationId: conv.conversationId,
                        parentMessageId: conv.parentMessageId,
                    })
                    conv.conversationId = chatResponse.conversationId;
                    conv.parentMessageId = chatResponse.messageId;
                    console.log("[INFO] chatgpt-%s Q: %s, A: %s", conv.conversationId, event.text, chatResponse.response);
                    await say("<@" + event.user + ">\n" + chatResponse.response);
                }
            } catch (error) {
                console.error(error);
            }
        });
    }
}

export const createInstance = (email: string, password: string, appToken: string, botToken: string, signingSecret: string): Instance => {
    const api = new ChatGPTAPIBrowser({
        email: email,
        password: password,
    });

    const app = new App({
        token: botToken,
        signingSecret: signingSecret,
        socketMode: true,
        appToken: appToken,
    });

    const conv = <Conversation>{
        conversationID: "",
        parentMessaegeID: "",
    }

    return new Instance(api, app, conv);
}
