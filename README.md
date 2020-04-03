# NC Liteforex Signal

- Email notifier
- MongoDB
- Telegraf
- Dotenv
- ExpressJS
- Excel4node
- Data-store

## Mt4Bridge
- https://bitbucket.org/nhancv/nc-liteforex-mt4bridge.git
- https://bitbucket.org/nhancv/nc-liteforex-signal.git
- Put `nc-liteforex-signal\nc-liteforex-signal.set` to `MT4 Data Folder\history\symbolsets`

## Install
```
npm install
```

## Update .env
- Copy `.env_sample` to `.env`
- Correct value in `.env`

## Dev
```
npm start
```

## Build release for prod and staging
```
npm run build

# Note for windows need install win-node-env first
npm install -g win-node-env

# Run production code
npm run production
```

## Deploy to integration [HEROKU]

### Getting started with Heroku
```
heroku login
heroku create <app name>
git add .
git commit -m 'deploy to heroku'
git push heroku master

Test at: <app name>.herokuapp.com
Log view: heroku logs -t
```

## Run with PM2
```
npm install pm2 -g
pm2 install pm2-logrotate

cd project_path
pm2 start npm --name projectname -- run production
pm2 stop projectname
pm2 restart projectname
pm2 reload projectname
pm2 logs projectname
```
