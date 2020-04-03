/*
 * Developed by Nhan Cao on 12/3/19, 11:01 PM.
 * Last modified 12/3/19, 11:01 PM.
 * Copyright (c) 2019 Rilthot. All rights reserved.
 */

import BotBase from "./BotBase";

export default interface BotCommand {
  text: string;
  id: string;
  botBase: BotBase;

  commandCallback(ctx): Promise<any>;

  onBodyText(ctx, fromId): Promise<any>;
}
