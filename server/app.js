require('babel-register');
const express = require('express');
const config = require('./assets/config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./assets/swagger.json');
const morgan = require('morgan')('dev');
const bodyParser = require('body-parser');
const cors = require('cors');
const {checkAndChange} = require('./query-status');
require('sequelize');
const sequelize = require('./assets/config/database');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        const app = express();
        app.use(cors({origin: '*'}));

        app.use(morgan);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(config.rootApi + 'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

            // ROUTERS
        let AuthRouter = express.Router();
        let GenreRouter = express.Router();
        let UserRouter = express.Router();
        let ArtistRouter = express.Router();
        let DiscRouter = express.Router();
        let BuyRouter = express.Router();

        // SERVICES
        let Auth = require('./assets/Auth/auth-class');
        let Genre = require('./assets/classes/genre-class');
        let User = require('./assets/classes/user-class');
        let Artist = require('./assets/classes/artist-class');
        let Disc = require('./assets/classes/disc-class');
        let Buy = require('./assets/classes/buy-class');

        const VerifyToken  = require('./assets/Auth/VerifyToken');

        AuthRouter.route('/register')
            .post(async (req, res) => {
                console.log(req.body);
                let account = await Auth.register(req);
                res.json(checkAndChange(account));
            });
        AuthRouter.route('/login')
            .post(async (req, res) => {
                let user = await Auth.login(req.body.email, req.body.password);
                res.json(checkAndChange(user));
            });
        AuthRouter.route('/logout')
            .get(async (req, res) => {
                let result = await Auth.logout();
                res.json(checkAndChange(result));
            });
        AuthRouter.route('/current')
            .get(async (req, res) => {
                let account = await Auth.getCurrent(req.headers, res);
                res.json(checkAndChange(account));
            });

        GenreRouter.route('/')
            .get(async (req, res) => {
                let genres = await Genre.getAll(req.query.max);
                res.json(checkAndChange(genres));
            })

            .post(async (req, res) => {
                let genre = await Genre.add(req.body.name);
                res.json(checkAndChange(genre));
            });
        GenreRouter.route('/:id')
        //Get member by index
            .get(async (req, res) => {
                let genre = await Genre.getById(req.params.id);
                res.json(checkAndChange(genre));
            })

            //Update member with index
            .put(async (req, res) => {
                let genre = await Genre.update(req.params.id, req.body.name);
                res.json(checkAndChange(genre));
            })

            //Delete member with index
            .delete(async (req, res) => {
                let result = await Genre.delete(req.params.id);
                res.json(checkAndChange(result));
            });

        UserRouter.route('/')
            //Get all users
            .get(async (req, res,) => {
                let users = await User.getAll(req.query.max);
                res.json(checkAndChange(users));
            });

        UserRouter.route('/:id')
        //Get user by index
            .get(async (req, res) => {
                let user = await User.getById(req.params.id);
                res.json(checkAndChange(user));
            })

            //Update user with index
            .put(async (req, res) => {
                let user = await User.update(req.body);
                res.json(checkAndChange(user));
            })

            //Delete user with index
            .delete(async (req, res) => {
                let result = await User.delete(req.params.id);
                res.json(checkAndChange(result));
            });

        ArtistRouter.route('/')
            .get(async (req, res,) => {
                let artists = await Artist.getAll(req.query.max);
                res.json(checkAndChange(artists));
            })

            .post(async (req, res) => {
                let artist = await Artist.add(req.body);
                res.json(checkAndChange(artist));
            });
        ArtistRouter.route('/:id')
        //Get artist by index
            .get(async (req, res) => {
                let artist = await Artist.getById(req.params.id);
                res.json(checkAndChange(artist));
            })

            //Update artist with index
            .put(async (req, res) => {
                let artist = await Artist.update(req.params.id, req.body);
                res.json(checkAndChange(artist));
            })

            //Delete artist with index
            .delete(async (req, res) => {
                let result = await Artist.delete(req.params.id);
                res.json(checkAndChange(result));
            });

        DiscRouter.route('/')
            // Get all discs
            .get(async (req, res,) => {
                let discs = await Disc.getAll(req.query.max);
                res.json(checkAndChange(discs));
            });
        DiscRouter.route('/:id')
        //Get disc by index
            .get(async (req, res) => {
                let disc = await Disc.getById(req.params.id);
                res.json(checkAndChange(disc));
            });

        BuyRouter.route('/')
        // Get all discs
            .get(async (req, res,) => {
                let buys = await Buy.getAll(req.query.max);
                res.json(checkAndChange(buys));
            });
        BuyRouter.route('/:id')
        //Get disc by index
            .get(async (req, res) => {
                let buy = await Buy.getById(req.params.id);
                res.json(checkAndChange(buy));
            });

        app.use(config.rootApi + 'disc/', DiscRouter);
        app.use(config.rootApi + 'auth/', AuthRouter);
        app.use(config.rootApi + 'genre/', GenreRouter);
        app.use(config.rootApi + 'user/', UserRouter);
        app.use(config.rootApi + 'artist/', ArtistRouter);
        app.use(config.rootApi + 'buy/', BuyRouter);
        app.listen(config.port, () => {
            console.log('Started on port ' + config.port)
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
