import { Markup } from "telegraf";
import { getAllmembers, setMemberCardNumber } from "./members";



export const getAllMemberNamesButtons = async (bot) => {
  const members = await getAllmembers();
  const ui = Markup.inlineKeyboard(
    members.map((member) => Markup.button.callback(member.username, "racuni-" + member.username))
  );

  //handle click on member name
  bot.action(/racuni.*/, async (ctx) => {
    const members = await getAllmembers();
    const member = members.find((member) => member.username === ctx.match[0].split("-")[1])

    if (!member) {
      return ctx.reply("Member not found");
    }

    if (!member.cardNumber) {
      let input = false
      ctx.reply("Card number not found enter one to save");
      bot.on("text", async (ctx) => {
        const cardNumber = ctx.message.text
        console.log("cardNumber", cardNumber)
        // check if user is owner of the card
        const userId = ctx.from.id;
        try {
          if (!input) {
            await setMemberCardNumber(userId, cardNumber);
            input = true;
            ctx.reply(`Card number saved ${cardNumber}`);
          }
        } catch (error) {
          ctx.reply("Error saving card number");
        }
      })
    }
    else {
      ctx.reply(`${member.username} Card number: ${member.cardNumber}`);
    }
  });
  return ui;
}

