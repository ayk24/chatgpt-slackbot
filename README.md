# ChatGPT Slackbot
## Overview
Use ChatGPT on Slack.  
This application uses the [transitive-bullshit/chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api).

> **Warning**  
> This service can be deployed onto servers with headless chromium browser, but Google reCAPTCHA at login must be manually operated.

## Setup
### Setup Slack bot
1. Create a Slack bot on [this site](https://api.slack.com/apps)
2. Open `Socket Mode Tab` and set as follows:
    ```
    Enable Socket Mode: True
    Event Subscriptions: True
    ```

3. Open `OAuth & Permission Tab` and set these scopes as follows:
    ```
    app_mentions:read
    channels:history
    channels:join
    chat:write
    im:history
    im:read
    im:write
    ```

### Setup your app
1. Copy `.env.example` to create `.env` and enter the information
    ```
    cp .env.sample .env
    ```
    - `OPENAI_EMAIL`: Email address of your OpenAI account
    - `OPENAI_PASSWORD`: Password of your OpenAI account
    - `SLACK_APP_TOKEN`: Slack app token (prefix is `xapp-`)
    - `SLACK_BOT_TOKEN`: Slack bot token (prefix is `xoxb-`)
    - `SLACK_SIGNING_SECRET`: Slack signing secret

2. Build and run
    ```
    npm install
    npm run start
    ```

<!--
### With Docker
```
docker build -t chatgpt_slackbot .
docker run chatgpt_slackbot
``` -->

## Usage
Respond to the following inputs:
- `@YourSlackBot <prompt>`: direct send prompt to ChatGPT
- `@YourSlackBot reset-thread`: reset the convesation thread
