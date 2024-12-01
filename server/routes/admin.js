const express = require('express');

// router
const router = express.Router();

// mongodb models
const Post = require('../models.db/models');
const AuthVerificationModel = require('../models.db/authVerificationModel');
const AuthModel = require('../models.db/authModel');

// layouts
const loginLayout = '../views/layout/loginLayout';
const registerLayout = '../views/layout/registerLayout';
const dashboardLayout = '../views/layout/dashboardLayout';

// password handler
const bcrypt = require('bcrypt');

// token handler
const jwt = require('jsonwebtoken');

const uuidv4 = require('uuid').v4;

const authMiddleware = require('./authMiddleware');

const sendVerificationEmail = require('./verificationEmail');

const forgotPassword = require('./forgotPassword');

// VERIFICATION EMAIL AND RENDER PAGE
// user will click on this link to verify his email, will redirect him to this address, then we will check if the unique string matches with the one the user send on register
router.get('/email-verification/:id/:uniqueString', async (req, res) => {
  const locals = {
    title: 'Verify email',
    description: 'Verify email',
  };

  //the id was passed from AuthModel _id
  const { id } = req.params;

  try {
    const authenticatedUser = await AuthVerificationModel.findOne({
      userId: id,
    });

    if (!authenticatedUser) {
      throw new Error('The user id is invalid, please try again');
    }

    if (authenticatedUser) {
      const { expiresAt, userId: dbUserID } = authenticatedUser;
      // const hashedUniqueString = authenticatedUser.uniqueString;

      const compareUniqueStrings = dbUserID === id;

      // COMPARE THE TOKEN WITH THE HASHED TOKEN
      if (!compareUniqueStrings) {
        // res.redirect('/admin/verification-error');
        throw new Error('The user id is invalid, please try again');
      }

      // CHECK IF THE TOKEN IS VALID
      if (Date.now() > expiresAt) {
        // DELETE THE USER AUTH AND CLEAR THE USER PROFILE
        const deleteAuthUserModel = await AuthModel.findByIdAndDelete(dbUserID); // clear the user profile, in order to be able to register again
        const deleteAuthVerificationModel =
          await AuthVerificationModel.findOneAndDelete({
            userId: dbUserID,
          }); //delete the user auth because he again has to send verificatione mail with new token

        // res.redirect('/admin/verification-error');
        if (!deleteAuthUserModel || !deleteAuthVerificationModel) {
          throw new Error('Something went wrong deleting the user data');
        }

        if (deleteAuthUserModel && deleteAuthVerificationModel) {
          throw new Error(
            'The verification token has expired :( Please try to register again in order to get a new token'
          );
        }
      }

      // IF WE HAVE NOT ERRORS, THEN WE CAN UPDATE THE USER PROFILE
      // update user verified to true
      const updatedUser = await AuthModel.findByIdAndUpdate(dbUserID, {
        verified: true,
      });
      const updatedUserVerification =
        await AuthVerificationModel.findOneAndUpdate({
          userId: dbUserID,
          verified: true,
        });

      if (updatedUser && updatedUserVerification) {
        res.render('admin/email-verification', {
          locals,
          layout: loginLayout,
          error: '',
          currentRoute: '/email-verification',
          message:
            'Verification was successful, now you can log in into your account!',
        }); //when accesing this route we visit the 'admin' page from 'views' folder
      } else {
        throw new Error('Something went wrong while updating the user data');
      }
    }
  } catch (err) {
    console.log(err);
    res.render('admin/email-verification', {
      locals,
      layout: loginLayout,
      error: err.message,
      currentRoute: '/email-verification',
      message: '',
    });
    //when accesing this route we visit the 'admin' page from 'views' folder
  }
});

////

// LOGIN AUTH MAIN PAGE GET AND RENDER PAGE
router.get('/login', async (req, res) => {
  const locals = {
    title: 'Login',
    description: 'Login',
  };

  try {
    res.render('admin/login', {
      locals,
      layout: loginLayout,
      error: '',
      currentRoute: '/login',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  } catch (err) {
    console.log(err);
    res.render('admin/login', {
      locals,
      layout: loginLayout,
      error: err.message,
      currentRoute: '/login',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  }
});
// LOG IN POST AND RENDER PAGE
router.post('/login', async (req, res) => {
  const locals = {
    title: 'Login',
    description: 'Login',
  };
  try {
    const { password, email } = req.body;

    if (password && email) {
      const userDB = await AuthModel.findOne({ email });

      const comparePasswords = bcrypt.compareSync(password, userDB.password);

      if (userDB && comparePasswords) {
        if (userDB.verified) {
          const token = jwt.sign(
            {
              email: userDB.email,
              password: userDB.password,
              username: userDB.username,
              id: userDB._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
          );

          // SENT TOKEN TO COOKIE
          res.cookie('token', token, { httpOnly: true });

          // REDIRECT TO DASHBOARD

          setTimeout(() => {
            res.redirect('/admin/dashboard');
          }, 1000);
        } else {
          throw new Error('Your account is not verified yet');
        }
      } else {
        throw new Error('Please enter a valid email and password');
      }
    } else {
      res
        .status(400)
        .json({ message: 'Please enter a valid email and password' });
      throw new Error('Please enter a valid email and password');
    }
  } catch (err) {
    console.log(err);
    res.render('admin/login', {
      locals,
      layout: loginLayout,
      error: err.message,
      currentRoute: '/login',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  }
});

// REGISTER MAIN PAGE GET AND RENDER PAGE
router.get('/register', async (req, res) => {
  try {
    const locals = {
      title: 'Admin',
      description: 'Admin',
    };
    res.render('admin/register', {
      locals,
      layout: registerLayout,
      error: '',
      currentRoute: '/register',
      message: '',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  } catch (err) {
    console.log(err);
    res.render('admin/register', {
      locals,
      layout: registerLayout,
      error: '',
      currentRoute: '/register',
      message: '',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  }
});

// REGISTER POST AND RENDER PAGE
router.post('/register', async (req, res) => {
  const locals = {
    title: 'Register',
    description: 'Register',
  };

  try {
    const { username, password, email } = req.body;

    if (username && password && email) {
      const findUser = await AuthModel.findOne({ email });

      if (findUser) {
        throw new Error('User already exists');
      } else {
        const registered = await AuthModel.create({
          username,
          email,
          password: bcrypt.hashSync(password, 10),
          verified: false, //verified email
        });

        if (registered) {
          sendVerificationEmail(req.body, registered._id, res);
          // then rerender register page with message that verification email has been sent
          res.render('admin/register', {
            locals,
            layout: registerLayout,
            error: '',
            currentRoute: '/register',
            message: 'Verification email has been sent to your email account',
          });

          // res.status(201).redirect('/admin/login');
        } else {
          res.status(400);

          throw new Error('Something went wrong please try again');
        }
      }
    } else {
      res.status(400);

      throw new Error('All fields are required');
    }
  } catch (err) {
    console.log(err);
    res.status(400);
    res.render('admin/register', {
      locals,
      layout: registerLayout,
      error: err.message,
      currentRoute: '/register',
      message: '',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  }
});

// DASHBOARD ROUTE
//protected page
router.get('/dashboard', authMiddleware, async (req, res) => {
  const locals = {
    title: 'Admin Dashboard',
    description: 'Admin Dashboard',
  };

  // SORT BY DATE
  const blogsData = await Post.find({
    user_id: req.user.id,
  }).sort({
    createdAt: -1,
  });
  try {
    if (blogsData) {
      res.render('admin/dashboard', {
        locals,
        layout: dashboardLayout,
        data: blogsData,
        error: '',
        currentRoute: '/admin/dashboard',
      });
    }
  } catch (err) {
    console.log(err);
    res.render('admin/dashboard', {
      locals,
      layout: dashboardLayout,
      data: blogsData ? blogsData : [],
      error: err.message,
      currentRoute: 'admin/dashboard',
    });
  }
});
// router.get('/article/:id', authMiddleware, async (req, res) => {
//   try {
//     const blogData = await Post.findById(req.params.id);

//     const locals = {
//       title: blogData.title,
//       description: blogData.description,
//     };

//     res.render('admin/article', {
//       locals,
//       layout: dashboardLayout,
//       data: blogData,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// BLOG ROUTE, GET SELECTED BLOG
router.get('/article/:id', authMiddleware, async (req, res) => {
  const selectedBlog = await Post.findById(req.params.id);
  try {
    if (selectedBlog) {
      const locals = {
        title: selectedBlog.title,
        description: selectedBlog.description,
      };

      res.render('article', {
        locals,
        post: selectedBlog,
        layout: dashboardLayout,
        error: '',
        currentRoute: '/article',
      });
    }
  } catch (err) {
    console.log(err);
    res.render('article', {
      locals,
      post: selectedBlog ? selectedBlog : '',
      layout: dashboardLayout,
      error: err.message,
      currentRoute: '/article',
    });
  }
});

// ADD NEW BLOG - RENDER PAGE
router.get('/add-new-article', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Add new article',
      description: 'Add new article',
    };

    res.render('admin/add-new-article', {
      locals,
      layout: dashboardLayout,
      error: '',
      currentRoute: '/add-new-article',
    });
  } catch (err) {
    console.log(err);
    res.render('admin/add-new-article', {
      locals,
      layout: dashboardLayout,
      error: err.message,
      currentRoute: '/add-new-article',
    });
  }
});
// ADD NEW BLOG - ADD DATA
router.post('/add-new-article', authMiddleware, async (req, res) => {
  const locals = {
    title: 'Add new article',
    description: 'Add new article',
  };

  try {
    const { title, body, author, public, urlLink, titleUrl } = req.body;

    const selectedBlog = await Post.insertMany({
      title,
      body,
      author,
      user_id: req.user.id,
      public: public ? true : false,
      urlLink: urlLink ? urlLink : '',
      titleUrl: titleUrl ? titleUrl : '',
    });
    if (selectedBlog) {
      res.redirect('/admin/dashboard');
    }
  } catch (err) {
    console.log(err);
    res.render('admin/add-new-article', {
      locals,
      layout: dashboardLayout,
      error: err.message,
      currentRoute: '/add-new-article',
    });
  }
});
// DELETE A BLOG
router.post('/delete-article/:id', authMiddleware, async (req, res) => {
  const deletedBlog = await Post.findByIdAndDelete(req.params.id);
  // const selectedBlog = await Post.findById(req.params.id);
  try {
    if (deletedBlog) {
      res.redirect('/admin/dashboard');
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    res.render('/admin/dashboard', {
      error: err.message,
    });
  }
});
// EDIT A BLOG - RENDER PAGE
router.get('/edit-article/:id', authMiddleware, async (req, res) => {
  const editBlog = await Post.findById(req.params.id);
  const locals = {
    title: editBlog.title,
    description: editBlog.body,
  };

  try {
    if (editBlog && req.user.id === editBlog.user_id) {
      res.render('admin/edit-article', {
        locals,
        layout: dashboardLayout,
        data: {
          title: editBlog.title,
          body: editBlog.body,
          author: editBlog.author,
          id: editBlog._id,
          public: editBlog.public,
          urlLink: editBlog.urlLink,
          titleUrl: editBlog.titleUrl,
        },
        currentRoute: '/edit-article',
        error: '',
      });
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    console.log(err);
    res.render('admin/edit-article', {
      locals,
      layout: dashboardLayout,
      data: {
        title: editBlog.title,
        body: editBlog.body,
        author: editBlog.author,
        id: editBlog._id,
        public: editBlog.public,
        urlLink: editBlog.urlLink,
        titleUrl: editBlog.titleUrl,
      },
      currentRoute: '/edit-article',
      error: err.message,
    });
  }
});
// EDIT A BLOG - DATA
router.post('/edit-article/:id', authMiddleware, async (req, res) => {
  const editBlog = await Post.findById(req.params.id);
  const locals = {
    title: editBlog ? editBlog.title : '',
    description: editBlog ? editBlog.body : '',
  };

  try {
    if (editBlog && req.user.id === editBlog.user_id) {
      const { title, body, author, public, urlLink, titleUrl } = req.body;
      await Post.findByIdAndUpdate(req.params.id, {
        title: title ? title : editBlog.title,
        body: body ? body : editBlog.body,
        author: author ? author : editBlog.author,
        updatedAt: Date.now(),
        public: public === 'false' ? true : false,
        urlLink: urlLink ? urlLink : editBlog.urlLink,
        titleUrl: titleUrl ? titleUrl : editBlog.titleUrl,
        error: '',
      });

      res.redirect('/admin/dashboard');
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    res.render('admin/edit-article', {
      layout: dashboardLayout,
      locals,
      data: {
        title: editBlog ? editBlog.title : '',
        body: editBlog ? editBlog.body : '',
        author: editBlog ? editBlog.author : '',
        id: editBlog ? editBlog._id : '',
        public: editBlog ? editBlog.public : '',
        urlLink: editBlog ? editBlog.urlLink : '',
        titleUrl: editBlog ? editBlog.titleUrl : '',
        error: err.message,
      },
      currentRoute: '/edit-article',
      error: err.message,
    });
  }
});

// LOG OUT
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

// // UPDATE ADMIN BLOG ROUTE
// router.post('/admin/article/:id', async (req, res) => {
//   const locals = {
//     title: 'Blogs',
//     description: 'Blogs',
//   };

//   try {
//     const blogsData = await Post.find(req.params.id);
//     if (blogsData) {
//       await Post.findByIdAndUpdate(req.params.id, {
//         title: req.body.title,
//         body: req.body.body,
//         author: req.body.author,
//       });
//       res.status(201).send('Post updated successfully');
//     } else {
//       res.status(404).send('Post not found');
//     }
//   } catch (error) {
//     res.status(400).send('Error:', error);
//   }

//   res.render('index', locals); //when accesing this route we visit the 'index' page from 'views' folder
// });

// // ADD ADMIN BLOG ROUTE
// router.put('/admin/article', async (req, res) => {
//   const locals = {
//     title: 'Blogs',
//     description: 'Blogs',
//   };

//   try {
//     const postedBlog = await Post.insertOne({
//       title: req.body.title,
//       body: req.body.body,
//       author: req.body.author,
//     });

//     if (postedBlog) {
//       res.status(201).send('Post added successfully');
//     } else {
//       res.status(400).send('Post not added');
//     }
//   } catch (error) {
//     res.status(400).send('Error:', error);
//   }

//   res.render('index', locals); //when accesing this route we visit the 'index' page from 'views' folder
// });

// // DELETE BLOG ROUTE
// router.get('/admin/article/:id', (req, res) => {
//   const locals = {
//     title: 'Blogs',
//     description: 'Blogs',
//   };

//   try {
//     const deletedBlog = Post.findByIdAndDelete(req.params.id);
//     if (deletedBlog) {
//       res.status(200).send('Post deleted successfully');
//     } else {
//       res.status(404).send('Post not found');
//     }
//   } catch (error) {
//     res.status(400).send('Error:', error);
//   }

//   res.render('index', locals); //when accesing this route we visit the 'index' page from 'views' folder
// });

// ABOUT ROUTE
router.get('/about', (req, res) => {
  res.render('about');
});

// CONTACT ROUTE
router.get('/contact', (req, res) => {
  res.render('contact');
});
module.exports = router;

// RESET PASSWORD
// FORGOT PASSWORD AND RENDER PAGE
router.get('/forgot-password', async (req, res) => {
  const locals = {
    title: 'Forgot password',
    description: 'Forgot password',
  };

  try {
    res.render('admin/forgot-password', {
      locals,
      layout: loginLayout,
      error: '',
      currentRoute: '/forgot-password',
      message: '',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  } catch (err) {
    console.log(err);
    res.render('admin/forgot-password', {
      locals,
      layout: loginLayout,
      error: err.message,
      currentRoute: '/forgot-password',
      message: '',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  }
});

router.post('/forgot-password', async (req, res) => {
  const locals = {
    title: 'Login',
    description: 'Login',
  };

  const { email } = req.body;
  try {
    if (email) {
      const userDB = await AuthModel.findOne({ email: email });

      if (userDB) {
        const uniqueString = uuidv4() + userDB._id;

        // unique string hashed
        const updatedUserVerification =
          await AuthVerificationModel.findOneAndUpdate({
            userId: userDB._id,
            uniqueString: uniqueString,
          });

        if (!updatedUserVerification)
          throw new Error(
            'Something went wrong updating the user verification'
          );

        forgotPassword(req.body, userDB._id, uniqueString, res);

        res.render('admin/forgot-password', {
          locals,
          layout: loginLayout,
          error: '',
          currentRoute: '/forgot-password',
          message: 'Reset password email has been sent to your email account!',
        }); //when accesing this route we visit the 'admin' page from 'views' folder

        // REDIRECT TO DASHBOARD
      } else {
        throw new Error('The email does not exist');
      }
    } else {
      throw new Error('Please enter a valid email and password');
    }
  } catch (err) {
    console.log(err);
    res.render('admin/forgot-password', {
      locals,
      layout: loginLayout,
      error: err.message,
      currentRoute: '/forgot-password',
      message: '',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  }
});

// RESET PASSWORD

// VERIFICATION EMAIL AND RENDER PAGE
// user will click on this link to verify his email, will redirect him to this address, then we will check if the unique string matches with the one the user send on register
router.get('/check-reset-password/:id/:uniqueString', async (req, res) => {
  const locals = {
    title: 'Verify email',
    description: 'Verify email',
  };

  //the id was passed from AuthModel _id
  const { id, uniqueString } = req.params;

  try {
    const authenticatedUser = await AuthVerificationModel.findOne({
      userId: id,
    });

    if (!authenticatedUser) {
      throw new Error(
        'The verification has expired or the link is invalid, please try again'
      );
    }

    if (authenticatedUser) {
      const {
        expiresAt, //verify if link hasn't expired
        userId: dbUserID,
        uniqueString: dbUniqueString,
      } = authenticatedUser;

      const compareUniqueStrings = dbUniqueString === uniqueString;

      // COMPARE THE TOKEN WITH THE HASHED TOKEN
      if (!compareUniqueStrings) {
        // res.redirect('/admin/verification-error');
        throw new Error('The user id is invalid');
      }

      // CHECK IF THE TOKEN IS VALID
      if (Date.now() > expiresAt) {
        throw new Error(
          'The  token has expired :(, Please try to reset password again in order to get a new token'
        );
      }

      // IF WE HAVE NO ERRORS RENDER THE PAGE TO RESET THE PASSWORD
      res.render(`admin/check-reset-password`, {
        locals,
        layout: loginLayout,
        error: '',
        currentRoute: '/reset-password',
        message: '',
        userId: id,
      });
    }
  } catch (err) {
    console.log(err);
    res.render(`admin/check-reset-password`, {
      locals,
      layout: loginLayout,
      error: err.message,
      currentRoute: '/check-reset-password',
      message: '',
      userId: id,
    });
  }
});

router.post('/check-reset-password/:id', async (req, res) => {
  const locals = {
    title: 'Verify email',
    description: 'Verify email',
  };

  //the id was passed from AuthModel _id
  const { id } = req.params;
  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    if (!password) {
      throw new Error('Please enter a valid password');
    }
    const authUser = await AuthModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    if (!authUser) {
      throw new Error(
        'The verification has expired or the link is invalid, please try again'
      );
    }

    // IF WE HAVE NOT ERRORS, THEN WE CAN UPDATE THE USER PROFILE
    // update user verified to true

    res.render(`admin/check-reset-password`, {
      userId: id,
      locals,
      layout: loginLayout,
      error: '',
      currentRoute: '/check-reset-password',
      message:
        'You resetted password successfully, now you can log in into your account!',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  } catch (err) {
    console.log(err);
    res.render('admin/check-reset-password', {
      userId: id,
      locals,
      layout: loginLayout,
      error: err.message,
      currentRoute: '/check-reset-password',
      message: '',
    });
    //when accesing this route we visit the 'admin' page from 'views' folder
  }
});
