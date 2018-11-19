const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const configSecret = require('../config/config');
const users = require('../../models/User');

let Auth = class {
    static login(email, password) {
        return new Promise(next => {
            users.findOne({
                    where: {
                        Email: email
                    }
                })
                    .then(res => {
                        if (!res) next(new Error('No user found.'));
                        const passwordIsValid = bcrypt.compareSync(password, res.Password);
                        if (!passwordIsValid) next(new Error('Wrong email or password.'));
                        const token = jwt.sign({id: res.id}, configSecret.secret, {expiresIn: 7200});
                        next({auth: true, token: token});
                    })
                    .catch(err => next(err.message))
            });
    }

    static logout() {
        return new Promise(next => {
            next({auth: false, token: null})
        })
    }
    static register(req) {
        return new Promise((next) => {
            const hashedPassword = bcrypt.hashSync(req.body.password, 8);
            users.findOne({
                where: {
                    Email: req.body.email
                }
            })
                .then((user) => {
                    console.log(user);
                    if (user != null){
                        next(new Error("Email already used. Please use another one to register."));
                    }else{
                        users.create({
                            FirstName: req.body.firstName,
                            Lastname: req.body.lastName,
                            Email: req.body.email,
                            Rank: 0,
                            Pseudo: req.body.pseudo,
                            Password: hashedPassword,
                            Address1: null,
                            Address2: null,
                            City: null,
                            Zipcode: null,
                            Coins: 0
                        })
                            .then(user => {
                                const token = jwt.sign({id: user.Id}, configSecret.secret, {expiresIn: 7200});
                                next({auth: true, token: token})
                            })
                            .catch(err => next(err));
                    }

                })
                .catch(err => next(err.message()))
        });
    }

    static getCurrent(headers) {
        return new Promise((next) => {

            const token = headers['x-access-token'];
            if (!token) next({
                auth: false,
                message: "Error 401, unauthorized. No token provided."
            });
            jwt.verify(token, configSecret.secret, (err, result) => {
                if (err) next(new Error('Failed to authenticate token.'));
                console.log(result.id);
                users.findById(result.id, {password: false})
                    .then(res => {
                        if (!res) next(new Error('No user found.'));
                        next(res)
                    })
                    .catch(err => next(err.message))
            })
        });
    }
};
module.exports = Auth;