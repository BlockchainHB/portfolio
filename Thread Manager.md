# KP Thread Manager Discord Bot

A Discord bot that automatically creates private support threads for new members and tracks them in Google Sheets.

## Features

- 🔗 Automatically creates private threads when new members join
- 👥 Adds new member and admin role members to the thread
- 📊 Logs thread data to Google Sheets (Name, Discord ID, Thread ID, Status, Link)
- 🔘 Interactive buttons to mark threads as solved or reopen them
- 🔄 Real-time status synchronization between Discord and Google Sheets

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   Copy `.env.example` to `.env` and fill in your values:
   ```
   DISCORD_TOKEN=your_discord_bot_token
   GUILD_ID=your_discord_server_id
   ADMIN_ROLE_ID=your_admin_role_id
   GOOGLE_SHEETS_ID=your_google_sheets_id
   ```

3. **Google Sheets Setup:**
   - Ensure `service_account_secret.json` is in the project root
   - Create a Google Sheet with columns: Name, Discord ID, Thread ID, Status, Channel Link, Created At
   - Share the sheet with the service account email from the JSON file

4. **Discord Bot Setup:**
   - Create a bot application in Discord Developer Portal
   - Enable the following bot permissions:
     - Read Messages/View Channels
     - Send Messages
     - Create Private Threads
     - Manage Threads
     - Use Slash Commands
   - Add bot to your server with these permissions

## Usage

1. **Start the bot:**
   ```bash
   npm start
   ```

2. **For development:**
   ```bash
   npm run dev
   ```

## How it Works

1. When a new member joins the server, the bot creates a private thread
2. The thread includes the new member and all users with the admin role
3. The bot sends a welcome message with a "Mark as Solved" button
4. Thread information is logged to Google Sheets
5. Users can click buttons to change thread status, which updates both Discord and Google Sheets

## Google Sheets Columns

- **Name**: Member's Discord username
- **Discord ID**: Member's unique Discord ID
- **Thread ID**: Discord thread ID
- **Status**: "Open" or "Closed"
- **Channel Link**: Direct link to the Discord thread
- **Created At**: Timestamp when thread was created

ttps://discord.com/api/oauth2/authorize?client_id=1399210264179642469&permissions=274877959168&scope=bot%20a
  pplications.commands