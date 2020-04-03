/*
 * Developed by Nhan Cao on 12/3/19, 11:11 PM.
 * Last modified 12/3/19, 11:11 PM.
 * Copyright (c) 2019 Rilthot. All rights reserved.
 */

export default interface BotBase {
  command: any;
  commandData: any;

  resetCommand(fromId: string): void;

  sendMessageToAdmin(message: string): void;

  sendMessage(message: string, botChannelId: string): void;

  sendDocument(document: any, botChannelId: string): void;

  isAdmin(id: string): boolean;

}
