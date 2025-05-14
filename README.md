# Discord Live Announcer

A SquadJS plugin that send a discord message when the server goes live from seeding.

## Installation

1. Place `discord-live-announcer.js` in your plugins directory (`SquadJS/squad-server/plugins`).
2. Add the configuration below to your SquadJS config file and edit it as you like.
3. Restart SquadJS.

## Config

```json
{
  "plugin": "DiscordLiveAnnouncer",
  "enabled": true,
  "discordClient": "discord",
  "channelID": "CHANNEL_ID",
  "seedingThreshold": 50,
  "content": "<@&1041503735660163112>",
  "embed_title": "Server is LIVE",
  "embed_url": null,
  "embed_description": "Thank you to all who helped seed the server. Now come join the fun!",
  "embed_color": 65280,
  "embed_author_name": "DiscordLiveAnnouncer",
  "embed_author_url": "https://github.com/ItsMax123/SquadJS-DiscordLiveAnnouncer",
  "embed_author_icon_url": "https://picsum.photos/1080",
  "embed_image_url": "https://picsum.photos/1080",
  "embed_thumbnail_url": "https://picsum.photos/1080",
  "embed_footer_text": "DiscordLiveAnnouncer",
  "embed_footer_icon_url": "https://picsum.photos/1080",
  "embed_fields_server": true,
  "embed_fields_map": true,
  "embed_fields_player_count": true,
  "embed_fields_player_list": true,
  "player_list_separator": "\n"
}
```

Replace `CHANNEL_ID` with your Discord Channel ID.
You can get this by having discord's Developer Mode turned on, right-clicking the channel you want the messages to be
sent in and selecting the 'Copy Channel ID' option.

| Field                     | Required | Description                                                           | Example                                                                 | Default |
|---------------------------|----------|-----------------------------------------------------------------------|-------------------------------------------------------------------------|---------|
| channelID                 | ✅        | The ID of the channel to send the announcements to.                   | `"1283199362318602270"`                                                 | N/A     |
| seedingThreshold          | ✅        | Player count required for the server to be considered live.           | `50`                                                                    | N/A     |
| content                   | ❌        | The content of the discord message to send when the server goes live. | `"<@&1041503735660163112>"`                                             | `null`  |
| embed_title               | ❌        | The embed's title.                                                    | `"Server is LIVE"`                                                      | `null`  |
| embed_url                 | ❌        | The embed's url.                                                      | `"https://github.com/ItsMax123/SquadJS-DiscordLiveAnnouncer"`           | `null`  |
| embed_description         | ❌        | The embed's description.                                              | `"Thank you to all who helped seed the server. Now come join the fun!"` | `null`  |
| embed_color               | ❌        | The embed's color.                                                    | `65280`                                                                 | `65280` |
| embed_author_name         | ❌        | The embed's author's name.                                            | `"DiscordLiveAnnouncer"`                                                | `null`  |
| embed_author_url          | ❌        | The embed's author's url.                                             | `"https://github.com/ItsMax123/SquadJS-DiscordLiveAnnouncer"`           | `null`  |
| embed_author_icon_url     | ❌        | The embed's author's icon's url.                                      | `"https://picsum.photos/1080"`                                          | `null`  |
| embed_image_url           | ❌        | The embed's image's url.                                              | `"https://picsum.photos/1080"`                                          | `null`  |
| embed_thumbnail_url       | ❌        | The embed's thumbnail's url.                                          | `"https://picsum.photos/1080"`                                          | `null`  |
| embed_footer_text         | ❌        | The embed's footer's text.                                            | `"DiscordLiveAnnouncer"`                                                | `null`  |
| embed_footer_icon_url     | ❌        | The embed's footers's icon's url.                                     | `"https://picsum.photos/1080"`                                          | `null`  |
| embed_fields_server       | ❌        | Turn on or off the 'Server' field in the embed.                       | `true`                                                                  | `true`  |
| embed_fields_map          | ❌        | Turn on or off the 'Map' field in the embed.                          | `true`                                                                  | `true`  |
| embed_fields_player_count | ❌        | Turn on or off the 'Player Count' field in the embed.                 | `true`                                                                  | `true`  |
| embed_fields_player_list  | ❌        | Turn on or off the 'Player List' field in the embed.                  | `true`                                                                  | `true`  |
| player_list_separator     | ❌        | The characters used to separate each player in the player list.       | `", "`                                                                  | `"\n"`  |