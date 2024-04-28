const { Telegraf } = require('telegraf')
const { Markup } = require('telegraf')


const bot = new Telegraf("6435064171:AAF53yRhPfsabCvdzm1HSPWZaDnSzJTm9tM")
console.log('Bot has been started ...')
// Define the menu
const menu = Markup.inlineKeyboard([
  Markup.button.url('vila-split', 'https://vila-spliit.duckdns.org/'),
  Markup.button.callback('💬 Brojevi Racuna', 'racuni'),
]);

// Start command handler
bot.start((ctx) => {
  ctx.reply('Welcome to our bot! Here are some options:', menu);
});

const racuni = {
  djuro: "115038163121423333",
  pupovac: "160580010006985194",
  srdjan: "325930050043846748",
  strahinja: "265000000602894583",
  filip: "160580010126897176",
  bojan: "340000003242228810",
  cici: "265201031000954538",
  dean: "265000000656434024"
}

for (const [key, value] of Object.entries(racuni)) {
  bot.action(key, (ctx) => {
    ctx.reply(`Racun za ${key} je:`);
    ctx.reply(value);
  });
}

const neki = Markup.inlineKeyboard(
  Object.keys(racuni).map((name) => Markup.button.callback(name, name))
);

// Handle menu callbacks
bot.action('racuni', (ctx) => {
  ctx.reply('Izaberi osobu', neki);

});

bot.action('about', (ctx) => {
  ctx.reply('You clicked "About"');
});

// Start the bot
bot.launch();
