/*
 * Developed by Nhan Cao on 11/22/19, 2:46 PM.
 * Last modified 11/22/19, 2:45 PM.
 * Copyright (c) 2019 Rilthot. All rights reserved.
 */
import moment from "moment";
import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import * as Controller from "./Controller";
import IResponse from "./Controller/IResponse";
import RilModule from "../Base/RilModule";
import Util from "../Base/Util";

export default class Gateway extends RilModule {

  AUTH_TOKEN = process.env.AUTHENTICATION_TOKEN ? process.env.AUTHENTICATION_TOKEN : '';

  async start(): Promise<any> {
    const log = console.log;
    const app = express();
    const port = parseInt(process.env.PORT || '7777');

    //////////////////////////////////////////////////////////////////
    /**
     * Config app
     */
    // Body parser: https://github.com/expressjs/body-parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    // CORS on ExpressJS: https://github.com/expressjs/cors
    app.use(cors());
    // Cookie parser: https://github.com/expressjs/cookie-parser
    app.use(cookieParser());
    // Use gzip compression
    app.use(compression());
    // Config http logging with morgan
    morgan.token('date', (req, res, tz) => moment().utc().utcOffset("+0700").format());
    const morganFormat = '[:date] :method :url :status - :response-time ms :user-agent';
    app.use(morgan(morganFormat));
    //////////////////////////////////////////////////////////////////
    /**
     * Declare controller
     */
    const aboutController: Controller.IAbout = new Controller.About();

    /**
     * API calls, use Postman for testing
     * This block should declare before default route
     */
    app.get('/api/about', aboutController.getAbout);

    //////////////////////////////////////////////////////////////////
    /**
     * Default routing
     */
    app.get('*', (req: Request, res: Response) => {
      const token: string | undefined = req.header('token');
      if (!Util.isEmpty(token) && this.AUTH_TOKEN == token) {
        const goodResponse: IResponse = {
          code: 200,
          body: 'Good.'
        };
        return res.status(goodResponse.code).json(goodResponse);
      }
      let response: IResponse = {
        code: 500,
        body: 'Fuck you.'
      };
      return res.status(response.code).json(response);
    });

    /**
     * Start listen only on localhost domain
     */
    app.listen(port, 'localhost', () => {
      log('Server %s listening at port %d', process.env.NODE_ENV, port);
    });
  }
}
