import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'
dotenv.config()
import { autoRegisterUsers } from './auto-register-users'
import { getAllmembers } from './members'
import { menu } from './menu'

const bot = new Telegraf(process.env.BOT_TOKEN)

menu(bot)

bot.start((ctx) => ctx.reply('Welcome!'))
// Middleware function to automatically register users and store username with user ID
bot.use(autoRegisterUsers);

bot.command("members", async (ctx) => {
  console.log("members command")
  const members = await getAllmembers()
  ctx.reply(`Members: ${JSON.stringify(members)}`)
})

bot.launch()
