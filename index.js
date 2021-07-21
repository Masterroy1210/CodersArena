const  express=require('express');
const cookieParser=require('cookie-parser');
const app =express();
const expressLayouts = require('express-ejs-layouts');
const mongoose =require('mongoose');
const db=require('./config/mongoose');
const session =require('express-session');
const passport =require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const colors =require('colors.css');
const sassMiddleware =require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const port =8000;

app.use(sassMiddleware(
    {
        src:'./assets/scss',
        dest:'./assets/css',
        debug:true,
        outputStyle :'extended',
        prefix:'/css'

    }
));

app.use(express.urlencoded());
app.use(cookieParser());
app.use (express.static('./assets'));   
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.set('view engine','ejs');
app.set('views','./views');  


app.use(session({
    name:'coders-arena',
    secret:'masterroy',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
     },
    //Using mongostore th store  the session cookie in the db
    store: new MongoStore(
        {
            mongooseConnection: mongoose.connection,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect mongodb setup ok');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());   
app.use(customMware.setflash);
app.use('/',require('./routes'));




app.listen(port,function(err){
    if(err){
        console.log('ERROR in starting the expresss');
    }
    console.log('Express Server started successfully at the port no-',port);

});
