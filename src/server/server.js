import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import React from "react"
import { renderToString} from "react-dom/server"
import {Provider} from "react-redux"
import {createStore} from "redux"
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import helmet from 'helmet'

import serverRoutes from '../frontend/routes/serverRoutes'
import reducer from "../frontend/reducers/"
import initialState from '../frontend/initialState'
import getManifest from './getManifest'
dotenv.config()

const { ENV, PORT } = process.env
const app = express();

if( ENV === 'development'){
    console.log('development config');
    const webpackConfig = require('../../webpack.config.js');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);
    const serverConfig = { 
                            publicPath: webpackConfig.output.publicPath,
                            serverSideRender:true
                        };
                        
    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));

} else {
    app.use((req, res, next)=>{
        if(!req.hashManifest) req.hashManifest = getManifest()
        next()
    })
    app.use(express.static(`${__dirname}/public`))
    app.use(helmet())
    app.use(helmet.contentSecurityPolicy({
        directives: {
            'default-src': ["'self'"],
            'script-src': [
                "'self'", 
                "'sha256-EsOWYpWW298wWBO7RXThRjMwqB6SnlRkUvaFBDrt950='"
            ],
            'img-src': [
                "'self'", 
                'http://dummyimage.com',
                'https://gravatar.com'
            ],
            'style-src-elem': [
                "'self'",
                "https://fonts.googleapis.com/",
            ],
            'font-src': ['https://fonts.gstatic.com'],
            'media-src': ['*']
        },
    }))
    app.use(helmet.permittedCrossDomainPolicies())
    app.disable('x-powered-by')
}

const setResponse = (html, preloadedState, manifest) => {
    const mainStyles = manifest ? manifest["vendors.css"] : 'assets/app.css'
    const mainBuild = manifest ? manifest["main.js"] : 'assets/app.js'
    const mainVendor = manifest ? manifest["vendors.js"] : 'assets/vendor.js'
    

    return (`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Platzi Video</title>
            <link href='${mainStyles}' rel='stylesheet' type='text/css'>
        </head>
        <body>
            <div id='app'>
                ${html}
            </div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g,'\\u003c')}
            </script>
            <script src='${mainBuild}' type='text/javascript'></script>
            <script src='${mainVendor}' type='text/javascript'></script>
        </body>
    </html>
    `)
}

const renderApp = (req, res) => {
    const store = createStore(reducer, initialState)
    const preloadedState = store.getState();
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location ={req.url} context = {{}}>
                {renderRoutes(serverRoutes)}
            </StaticRouter>
        </Provider>
    );

    res.send(setResponse(html, preloadedState, req.hashManifest))
}

app.get('*', renderApp);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server running on port ${PORT}`)
})