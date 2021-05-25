<h2 align='center'>
  <img src="https://camo.githubusercontent.com/32cda55c5940c9fb06146df41452eec9bcd059c8e6b3d7e7766943b07d8c82ed/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3734373630323939393033353136363831302f3735373833383639373038303136303335362f6c6f676f5f776f5f6261636b67726f756e642e706e67" height='100px' width='100px' />
<br>
Botrix </h2>
  <p align="center">
An opensource Discord bot list developed by Windows, Awish, Mei-chan, Toxic-dev, PixelSized, and Dylan James to hopefully replace <a href='https://github.com/Sank6/Discord-Bot-List'>this.</a> If you want to contribute open a pull request and the development team will take a look! For support, please join our <a href='https://botric.cc/join'>support server.</a>     <h2>PLEASE NOTE!!</h2>
    <p>Support for this version of botrix is no longer avaliable! There is a new unfinished version of botrix avaliable here: https://github.com/Botrixlist/botrix-react-opensource </p>
  <br>
        <a href="https://botrix.cc">
      <img src="https://img.shields.io/badge/Website:-Botrix.cc%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/>
    </a>
        <a href="https://botrix.cc/join">
      <img src="https://img.shields.io/badge/Maintained%20by:-The Botrix Team%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/>
    </a>
          <a href="https://botrix.cc/">
      <img src="https://img.shields.io/badge/Library:-Discord.js & ExpressJS%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/>
    </a>
            <a href="https://botrix.cc/join">
      <img src="https://img.shields.io/badge/Support:-Discord Server%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/>
    </a>
    </p>

<h2>Can I add my bot to Botrix?</h2>

Yes, please go [here](https://botrix.cc/add) to apply for your bot. If you require support, or you would like to give any feedback or suggestions, please join [the support server](https://botrix.cc/join).

<h2> Documentation </h2>

While we do offer some support for hosting Botrix on your own, please note that hosting locally is not fully supported and we aren't liable for running your own instance.

<h2> Should I Run Botrix Locally? </h2>

Probably not. Botrix has enough moving pieces that running a local version is complicated. The main purpose of having the source released is to allow others to understand and audit the functionality. The code is by no means meant to be easy to setup or bootstrap, and I don't plan on supporting folks trying to run locally. That said, feel free to run a local version of Botrix for your own purposes, (but not a public version please).

<h2> Self-hosting Agreement </h2>

- You may not use the Botrix logo or name within derivative bots.
- You may not host a public version of Botrix.
- You may not charge for the usage of your instance of Botrix.
- You may not provide support for Botrix.
- You may not remove any credits to the original author anywhere within this bot. We know what code we've written, and we will recognize it.

<h2> Requirements </h2>

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. Node.js v12.0.0 or newer
3. At least 4GB of Ram
4. MongoDB **[Guide](https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/)**
5. Dedicated IP

<h2> Getting Started </h2>

Once you clone the repo into a folder, open config.json in your text editor of choice.
First off lets configure authentication set the `id` property to your client id, and `clientSecret` to your client secret.
To configure the callback go into your discord developer portal and add an oauth2 redirect to `yourwebsite.com/api/callback` then go back to the config file and replace `domain` with your base domain example: `"https://botrix.cc"`. For completly free hosting you can [create a free database with mongodb atlas](https://www.mongodb.com/try). Once you have the connection string replace `MongoDbServer` with your connection string. Replace `Token` with your bot token and `ServerToken` with your server bot token. I would recomend you keep the defualt port as long as your are not running on localhost. In the field `AppId` put in your client id and `callback` as the same thing as you put when you setup your oauth2 redirects.
The next thing we will configure is the owner users, these users will have acsess to the eval command and the website admin panel and verifacation to bots in the `OWNER_USERS` field put the discord ids of the owners. Next will be the admin users, these users will have acsess to the admin panel, and to verify bots. This permission role is for the verifiers, in `ADMIN_USERS` put the discord ids of your verifiers. Next we will setup default member and bot roles. Create a new role called Unverifed bots, copy the id of that role and paste it into this field `UNVERIFIED_ROLE`. Next create a role called members copy the id and then paste it in `BOT_DEVELOPER_ROLE_ID`. Now we can setup the verified bot developer, and bot roles. Create a new role called Verified Developer, copy the id and paste it into `BOT_DEVELOPER_ROLE_ID_VERIFIED`. Create another role called Verified bots and paste the id of that role into `VERIFIED_ROLE`. Paste your guild id into `GUILD_ID`. Don't worry! We are almost done, these next params are for the website logs `greeting_chan` is the greeting channel id, `leave_chan` is for leave logs, and `logging_chan` and `MOD_LOG` is for all website logs (Updated bot pages, added bots, verified bots.),`VOTE_LOG` is for logging votes,`CERT_LOGS` are for all pending and new certifacation requests. Now for the hard part! Go into `/src/veiws/add.ejs` and change line 292* `fetch('https://cdn.botrix.cc/uploadBanner', {` to fetch your file uploading server see below how to set up your own file hosting server. Next go to line 297* 298\* and change the `https://cdn.botrix.cc/` to your image uploading server, please keep the /banner/ to keep compatibility. Do the same on the file `/src/views/edit.ejs` on line 181\* 186\* and 188\*. Congradulations! You have setup an instance of botrix!

<h2> Serving Images with our CDN </h2>

This part of the guide will showcase on how to setup an image hosting service to upload banners on, for this you **will** need a vps. In the root dir of botrix go to botrix-fielupload
in config.json setup the cdn url to your vps's ip or a subdomain pointing to the vps. Finally run it on the vps and your cdn network will be up.

<h2> Features </h2>

- Clean and modern UI
![Botrix Clean and Modern UI](https://i.imgur.com/AK1cTYv.png)

- Bot awards plus currency system (Configured for Paypal)
![Botrix Award System](https://i.imgur.com/1fqoGsm.png)

- Server Listing (Beta)
![Botrix Server Listing](https://i.imgur.com/OyFsH6d.png)

- Custom Bot Banners
![Botrix Bot Banner](https://i.imgur.com/hgTJhGi.png)

- Certified Bot Program
![Botrix Bot Certification Program](https://i.imgur.com/xYmHg6k.png)

- Easy-to-use Admin Panel
![Botrix Admin Panel](https://i.imgur.com/RazPeYV.png)

- Stylish & Responsive 404 Page
![Botrix 404 Page](https://i.imgur.com/PcfjLGA.png)


<h2> Contributing </h2>

**Can I contribute?**

Maybe. Feel free to submit PRs and issues, but unless they are explicitly bug fixes that have good documentation and clean code, I likely won't merge. Features will not be accepted through PR unless stated elsewhere. Do not submit feedback on this repository, the server is the right place for that. PRs focused around the frontend and web panel are more likely to be accepted.

1. [Fork the repository](https://github.com/Botrixlist/botrix/fork)
2. Clone your fork: `git clone https://github.com/Botrixlist/botrix.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request

<h2> Credits </h2>

- Botrix was created by the following people: [PixelSized](https://github.com/PixelSized), [Windows](https://github.com/WindowsCmd), [Awish](https://github.com/Awish-Senpai), and [Dylan James](https://github.com/dylanjamesdev).

<h2> Inspiration </h2>

- Our inspiration to create Botrix was to hopefully replace [this](https://github.com/Sank6/Discord-Bot-List), we all agree that it's been around to long and we decided to redefine how botlists are made. 
