/*
 * Developed by Nhan Cao on 12/3/19, 11:06 PM.
 * Last modified 12/3/19, 11:06 PM.
 * Copyright (c) 2019 Rilthot. All rights reserved.
 */

import BotCommand from "./BotCommand";
import BotBase from "./BotBase";

export default class ChatIdCommand implements BotCommand {
  id: string;
  text: string;
  botBase: BotBase;

  constructor(id: string, text: string, bot: BotBase) {
    this.id = id;
    this.text = text;
    this.botBase = bot;
  }

  commandCallback = async (ctx) => {
    const fromId = String(ctx.message.from.id);
    if (!this.botBase.isAdmin(fromId)) return;
    this.botBase.resetCommand(fromId);
    let chatId = ctx.message.chat.id;
    this.botBase.sendMessageToAdmin(chatId);
  };

  onBodyText = async (ctx, fromId) => {

  };

}
