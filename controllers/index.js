const User = require('../models/user');
const passport= require('passport');

// {"username":"test1","password":"test1"}
// https://github.com/saintedlama/passport-local-mongoose/blob/main/examples/login/routes.js
module.exports = {
    async postRegister(req,res,next){
        console.log('registering user');
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image
        });
    
        // Para no colocar try y catch en cada llamada async/await, se usará un errorHandler en el middleware
        await User.register(newUser,req.body.password);
        res.redirect('/');

        /* User.register(newUser,req.body.password, (err) => {
            if(err){
                console.log("error while user register",err);
                return next(err);
            }

            console.log('user registered!');
            res.redirect('/');
        }); */
        /* try{
            await User.register(newUser,req.body.password);
            res.redirect('/');

        }catch(err){
            console.log("error while user register",err);
            return next(err);
        }
        res.redirect('/'); */
    },

    postLogin(req,res,next){
        passport.authenticate(
            'local', 
            { 
                successRedirect: '/',
                failureRedirect: '/login' 
            }
        )(req,res,next);
    },

    getLogout(req,res,next){
        req.logout();
        res.redirect('/');
    }
}