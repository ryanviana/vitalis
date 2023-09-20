# 🌿 Vitalis Health Plugin for Nomo

This package enables developers to integrate **Vitalis**, a health web3 solution, as a plugin for the [NOMO-app](https://nomo.app). Vitalis leverages the NOMO-app's versatile plugin capabilities to bring a unique blend of health-focused solutions and blockchain technology right into the app.


This README will guide you on developing and integrating the Vitalis plugin for the NOMO-app. Also included is a demo plugin, showcasing the potential functionalities. Note that plugins should ideally be written in JavaScript or TypeScript.

# 🎥 Vitalis Presentation

For a comprehensive overview and walkthrough of the **Vitalis Health Plugin**, check out our presentation. Whether you're a developer, user, or just curious, this presentation provides insights and details that would give you a clear understanding of the value and functionalities Vitalis brings to the NOMO-app ecosystem.

🔗 [**Watch the Vitalis Presentation**](https://your-presentation-link.com)


# 🚀 Quick Usage Guide

**Prerequisites:** Familiarity with npm and JavaScript or TypeScript is assumed.

## Step 1: Download the NOMO-app

Goto <https://nomo.app/>.  
Download the NOMO-app and create a wallet with it.

## Step 2: Run Vitalis Locally

To initiate locally, after cloning the repo,  first you will need to run backend in a terminal.

`cd vitalis/backend`

`npm i`

`nest start --watch`

After that, you must also run the frontend in a second terminal.


`cd vitalis/frontend`

`npm i`

`npm run dev`

## Step 3: Launch the demo-plugin within the NOMO-app

Within the NOMO-app, navigate to 

`Settings -> About this App`.  

Click ten times on the NOMO-icon to enable the developer mode.  

Then the NOMO-app will ask you for a _plugin-URL_.  

Paste: `localhost:3000`

Then the NOMO-app should launch the demo-plugin! 🚀🚀

You are now free to make changes to the demo-plugin or experiment with the features. 
