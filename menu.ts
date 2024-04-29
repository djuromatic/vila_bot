import { Markup } from "telegraf";
import { getAllMemberNamesButtons } from "./racuni";

export const menu = (bot) => {
  const menuUI = Markup.inlineKeyboard([
    Markup.button.url('vila-split', 'https://vila-spliit.duckdns.org/'),
    Markup.button.callback('💬 Brojevi Racuna', 'racuni'),
  ]);

  bot.command('menu', (ctx) => ctx.reply('Welcome', menuUI));
  bot.action('racuni', async (ctx) => ctx.reply('Brojevi Racuna', await getAllMemberNamesButtons(bot)));

}




