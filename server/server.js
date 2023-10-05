'use strict';

const express = require('express');

const morgan = require('morgan');
const session = require('express-session'); // session middleware

const passport = require('passport');
const passportLocal = require('passport-local');

const { body, validationResult, check } = require('express-validator');

const memesDao = require('./memes-dao');
const backgroundDao = require('./background-dao');
const userDao = require('./user-dao');

const { ValidatorsImpl } = require('express-validator/src/chain');

passport.use(new passportLocal.Strategy((username, password, done) => {
  //Inside the verification callback for authentication
  userDao.getUser(username, password).then(user => {
    if (user)
      done(null, user);
    else {

      done(null, false, { message: 'Username or password wrong' });
    }
  }).catch(err => { done(err); });
}));

passport.serializeUser((user, done) => {

  done(null, user.id);

});

passport.deserializeUser((id, done) => {
  userDao.getUserById(id).then(user => {
    done(null, user); // user available in req.user
  }).catch(err => {
    done(err, null);
  })
})

const PORT = 3001;

const app = new express();
app.use(morgan('dev'));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'Not authenticated' });
}

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'dogs',
  resave: false,
  cookie: {
    sameSite: 'strict'
  }, /*Cookies will only be sent in a first-party context 
  and not be sent along with requests initiated by third party websites.*/
  saveUninitialized: false
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());

// *********** User API ************
app.get('/api/sessions/current', (req, res) => {

  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Unauthenticated user!' });

});

app.post('/api/sessions', function (req, res, next) {

  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      return res.status(401).json(info);
    }

    req.login(user, (err) => {
      if (err)
        return next(err);
      return res.json(req.user);
    });
  })(req, res, next);
});

app.delete('/api/sessions/current', (req, res) => {

  req.logout();
  res.end();

});



/*** APIs ***/

app.use('/static', express.static('memes'))

app.get('/api/memes', (req, res) => {

  memesDao.listAllMemes()
    .then(memes => res.json(memes))
    .catch(() => res.status(500).end());
});

app.get('/api/memes/filter=public', (req, res) => {
  memesDao.listOnlyPublicMemes()
    .then(memes => res.status(200).json(memes))
    .catch(err => res.status(500).json(err));
});

app.post('/api/memes', isLoggedIn, async (req, res) => {

  await Promise.all([
    //Description must be a string of at least 3 chars
    body('title').isString().withMessage("Must be a string").bail().isLength({ min: 3 }).withMessage("Must be at least 3 chars long").run(req),
    body('background').isInt().withMessage("Must be an integer").run(req),
    body('sentence1').isString().withMessage("Must be a string").run(req),
    body('sentence2').isString().withMessage("Must be a string").run(req),
    body('sentence3').isString().withMessage("Must be a string").run(req),
    body('font').isString().withMessage("Must be a string").run(req),
    body('color').isString().withMessage("Must be a string").run(req),
    body('visibility').custom(() => {
      return (req.body.visibility === 'protected' || req.body.visibility === 'public')
    }).run(req)
  ]);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //If there are errors then return status 422 and the object with the array of errors
    return res.status(422).json({ errors: errors.array() });
  }
  memesDao.createNewMeme(req.body, req.user.id)
    .then(memeId => res.status(201)
      .set({ "Location": `http://localhost:${PORT}/api/tasks/${memeId}` })
      .json({ "id of the new meme": memeId }))
    .catch(err => res.status(500).json(err));
});

app.delete('/api/memes/:id', isLoggedIn, async (req, res) => {

  await check('id').isInt().withMessage("Must be an integer value").run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.status(404).json({ errors: errors.array() });
  }
  memesDao.deleteMemeById(req.params.id, req.user.id)
    .then(() => res.status(200).json({ "id of the deleted meme": req.params.id }))
    .catch(err => {
      if (err.errors)
        res.status(404).json(err);
      else
        res.status(500).json(err);
    });
});

app.get('/api/backs', isLoggedIn, (req, res) => {
  backgroundDao.listBackgrounds()
    .then(memes => res.status(200).json(memes))
    .catch(err => res.status(500).json(err));
});


// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});