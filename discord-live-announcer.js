import DiscordBasePlugin from "./discord-base-plugin.js";

export default class DiscordLiveAnnouncer extends DiscordBasePlugin {
  static get description() {
    return "The <code>DiscordLiveAnnouncer</code> plugin will send a message to a Discord channel when the server goes live.";
  }

  static get defaultEnabled() {
    return true;
  }

  static get optionsSpecification() {
    return {
      ...DiscordBasePlugin.optionsSpecification,
      channelID: {
        required: true,
        description: "The ID of the channel to send the announcements to.",
        example: "1283199362318602270"
      },
      seedingThreshold: {
        required: true,
        description: "Player count required for the server to be considered live.",
        example: 50
      },
      content: {
        required: false,
        description: "The content of the discord message to send when the server goes live.",
        default: null,
        example: "<@&1041503735660163112>"
      },
      embed_title: {
        required: false,
        description: "The embed's title.",
        default: null,
        example: "Server is LIVE"
      },
      embed_url: {
        required: false,
        description: "The embed's url.",
        default: null,
        example: "https://github.com/ItsMax123/SquadJS-DiscordLiveAnnouncer"
      },
      embed_description: {
        required: false,
        description: "The embed's description.",
        default: null,
        example: "Thank you to all who helped seed the server. Now come join the fun!"
      },
      embed_color: {
        required: false,
        description: "The embed's color.",
        default: 65280,
        example: 65280
      },
      embed_author_name: {
        required: false,
        description: "The embed's author's name.",
        default: null,
        example: "DiscordLiveAnnouncer"
      },
      embed_author_url: {
        required: false,
        description: "The embed's author's url.",
        default: null,
        example: "https://github.com/ItsMax123/SquadJS-DiscordLiveAnnouncer"
      },
      embed_author_icon_url: {
        required: false,
        description: "The embed's author's icon's url.",
        default: null,
        example: "https://picsum.photos/1080"
      },
      embed_image_url: {
        required: false,
        description: "The embed's image's url.",
        default: null,
        example: "https://picsum.photos/1080"
      },
      embed_thumbnail_url: {
        required: false,
        description: "The embed's thumbnail's url.",
        default: null,
        example: "https://picsum.photos/1080"
      },
      embed_footer_text: {
        required: false,
        description: "The embed's footer's text.",
        default: null,
        example: "DiscordLiveAnnouncer"
      },
      embed_footer_icon_url: {
        required: false,
        description: "The embed's footers's icon's url.",
        default: null,
        example: "https://picsum.photos/1080"
      },
      embed_fields_server: {
        required: false,
        description: "Turn on or off the 'Server' field in the embed",
        default: true,
        example: true
      },
      embed_fields_map: {
        required: false,
        description: "Turn on or off the 'Map' field in the embed",
        default: true,
        example: true
      },
      embed_fields_player_count: {
        required: false,
        description: "Turn on or off the 'Player Count' field in the embed",
        default: true,
        example: true
      },
      embed_fields_player_list: {
        required: false,
        description: "Turn on or off the 'Player List' field in the embed",
        default: true,
        example: true
      },
      player_list_separator: {
        required: false,
        description: 'The characters used to separate each player in the player list.',
        default: "\n",
        example: ", "
      }
    };
  }

  constructor(server, options, connectors) {
    super(server, options, connectors);
    this.sent = false;
    this.onPlayerCountChange = this.onPlayerCountChange.bind(this);
  }

  async mount() {
    await super.mount();
    this.server.on("UPDATED_PLAYER_INFORMATION", this.onPlayerCountChange);
  }

  async unmount() {
    await super.unmount();
    this.server.removeEventListener("UPDATED_PLAYER_INFORMATION", this.onPlayerCountChange);
  }

  async onPlayerCountChange() {
    const layer = await this.server.currentLayer;
    if (!layer) {
      this.verbose(1, "Failed to load current layer.");
      return;
    }
    if (layer.gamemode !== "Seed") {
      this.sent = false;
      return;
    }
    const playerCount = this.server.players.length;
    if (playerCount < this.options.seedingThreshold) return;
    if (this.sent) return;
    this.sent = true;

    const message = {
      content: this.options.content,
      embed: {
        title: this.options.embed_title,
        url: this.options.embed_url,
        description: this.options.embed_description,
        color: this.options.embed_color,
        author: {
          name: this.options.embed_author_name,
          url: this.options.embed_author_url,
          icon_url: this.options.embed_author_icon_url
        },
        fields: [],
        image: {
          url: this.options.embed_image_url
        },
        thumbnail: {
          url: this.options.embed_thumbnail_url
        },
        footer: {
          text: this.options.embed_footer_text,
          icon_url: this.options.embed_footer_icon_url
        },
        timestamp: new Date().toISOString()
      }
    };
    if (this.options.embed_fields_server) {
      message.embed.fields.push({ name: "Server", value: this.server.serverName });
    }
    if (this.options.embed_fields_map) {
      message.embed.fields.push({ name: "Map", value: layer.name });
    }
    if (this.options.embed_fields_player_count) {
      message.embed.fields.push({ name: "Player Count", value: playerCount + " / " + this.server.maxPlayers });
    }
    if (this.options.embed_fields_player_list) {
      message.embed.fields.push({ name: "Players", value: this.getPlayers() });
    }

    try {
      await this.sendDiscordMessage(message);
    } catch (e) {
      this.verbose(1, `Failed to send message: ${e}`);
    }
  }

  getPlayers() {
    let result = "";
    const players = this.server.players;

    for (let i = 0; i < players.length; i++) {
      const name = players[i].name;
      const isLast = (i === players.length - 1);
      const next = isLast ? name : name + this.options.player_list_separator;

      if ((result + next).length + (isLast ? 0 : 3) > 1024) {
        result += "...";
        break;
      }

      result += next;
    }

    return result;
  }
}