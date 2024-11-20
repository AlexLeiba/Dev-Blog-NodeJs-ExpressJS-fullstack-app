const express = require('express');

const router = express.Router(); // Routes
const Post = require('../models.db/models');
const loginLayout = '../views/layout/loginLayout';
const registerLayout = '../views/layout/registerLayout';
const dashboardLayout = '../views/layout/dashboardLayout';

const AuthModel = require('../models.db/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const e = require('express');

// CHECK IF USER IS LOGGED IN
// In order to make pages secure, we can pass this fn to all the requests we want to be hidden if user isn't logged in.
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      // CHECK IF THIS TOKEN IS USING THE SAME SECRET KEY THAT WE ARE USING
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401);
      res.redirect('/auth/login');
    }
  } else {
    res.status(401);
    res.redirect('/auth/login');
  }
};

// LOGIN AUTH MAIN PAGE GET AND RENDER PAGE
router.get('/login', async (req, res) => {
  const locals = {
    title: 'Login',
    description: 'Login',
  };

  try {
    res.render('auth/login', {
      locals,
      layout: loginLayout,
      error: '',
      currentRoute: '/login',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  } catch (err) {
    console.log(err);
    res.render('auth/login', {
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
          res.redirect('/auth/dashboard');
        }, 1000);
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
    res.render('auth/login', {
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
    res.render('auth/register', {
      locals,
      layout: registerLayout,
      error: '',
      currentRoute: '/register',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  } catch (err) {
    console.log(err);
  }
});

// REGISTER POST AND RENDER PAGE
router.post('/register', async (req, res) => {
  const locals = {
    title: 'Admin',
    description: 'Admin',
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
        });
        if (registered) {
          res
            .status(201)
            .json({ message: 'Registered successfully' })
            .redirect('/login');
        } else {
          res
            .status(400)
            .json({ message: 'Something went wrong please try again' });
        }
      }
    } else {
      res.status(400).json({ message: 'All fields are required' });
      throw new Error('All fields are required');
    }
  } catch (err) {
    console.log(err);
    res.status(400);
    res.render('auth/register', {
      locals,
      layout: registerLayout,
      error: err.message,
      currentRoute: '/register',
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  }
});

// DASHBOARD ROUTE
//protected page
router.get('/dashboard', authMiddleware, async (req, res) => {
  const locals = {
    title: 'Dashboard',
    description: 'Dashboard',
  };

  // SORT BY DATE
  const blogsData = await Post.find().sort({ createdAt: -1 });
  try {
    if (blogsData) {
      res.render('auth/dashboard', {
        locals,
        layout: dashboardLayout,
        data: blogsData,
        error: '',
        currentRoute: '/auth/dashboard',
      });
    }
  } catch (err) {
    console.log(err);
    res.render('auth/dashboard', {
      locals,
      layout: dashboardLayout,
      data: blogsData ? blogsData : [],
      error: err.message,
      currentRoute: 'auth/dashboard',
    });
  }
});
// router.get('/blog/:id', authMiddleware, async (req, res) => {
//   try {
//     const blogData = await Post.findById(req.params.id);

//     const locals = {
//       title: blogData.title,
//       description: blogData.description,
//     };

//     res.render('auth/blog', {
//       locals,
//       layout: dashboardLayout,
//       data: blogData,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// BLOG ROUTE, GET SELECTED BLOG
router.get('/blog/:id', authMiddleware, async (req, res) => {
  const selectedBlog = await Post.findById(req.params.id);
  try {
    if (selectedBlog) {
      const locals = {
        title: selectedBlog.title,
        description: selectedBlog.description,
      };

      res.render('blog', {
        locals,
        post: selectedBlog,
        layout: dashboardLayout,
        error: '',
        currentRoute: '/blog',
      });
    }
  } catch (err) {
    console.log(err);
    res.render('blog', {
      locals,
      post: selectedBlog ? selectedBlog : '',
      layout: dashboardLayout,
      error: err.message,
      currentRoute: '/blog',
    });
  }
});

// ADD NEW BLOG RENDER PAGE
router.get('/add-new-blog', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Add new blog',
      description: 'Add new blog',
    };

    res.render('auth/add-new-blog', {
      locals,
      layout: dashboardLayout,
      error: '',
      currentRoute: '/add-new-blog',
    });
  } catch (err) {
    console.log(err);
    res.render('auth/add-new-blog', {
      locals,
      layout: dashboardLayout,
      error: err.message,
      currentRoute: '/add-new-blog',
    });
  }
});
// ADD NEW BLOG DATA
router.post('/add-new-blog', authMiddleware, async (req, res) => {
  const locals = {
    title: 'Add new blog',
    description: 'Add new blog',
  };
  try {
    const { title, body, author } = req.body;

    const selectedBlog = await Post.insertMany({
      title,
      body,
      author,
    });
    if (selectedBlog) {
      res.redirect('/auth/dashboard');
      res.status(201).json({ message: 'Blog added successfully' });
    }

    res.render('auth/add-new-blog', {
      locals,
      layout: dashboardLayout,
      error: '',
      currentRoute: '/add-new-blog',
    });
  } catch (err) {
    console.log(err);
    res.render('auth/add-new-blog', {
      locals,
      layout: dashboardLayout,
      error: err.message,
      currentRoute: '/add-new-blog',
    });
  }
});
// DELETE A BLOG
router.post('/delete-blog/:id', authMiddleware, async (req, res) => {
  try {
    const deletedBlog = await Post.findByIdAndDelete(req.params.id);
    if (deletedBlog) {
      res.redirect('/auth/dashboard');
      res.status(200).send('Blog deleted successfully');
    }
  } catch (err) {
    res.render('/auth/dashboard', {
      error: err.message,
    });
  }
});
// EDIT A BLOG RENDER
router.get('/edit-blog/:id', authMiddleware, async (req, res) => {
  const editBlog = await Post.findById(req.params.id);
  const locals = {
    title: editBlog.title,
    description: editBlog.body,
  };
  try {
    if (editBlog) {
      res.render('auth/edit-blog', {
        locals,
        layout: dashboardLayout,
        data: {
          title: editBlog.title,
          body: editBlog.body,
          author: editBlog.author,
          id: editBlog._id,
        },
        currentRoute: '/edit-blog',
        error: '',
      });
    }
  } catch (err) {
    console.log(err);
    res.render('auth/edit-blog', {
      locals,
      layout: dashboardLayout,
      data: {
        title: editBlog.title,
        body: editBlog.body,
        author: editBlog.author,
        id: editBlog._id,
      },
      currentRoute: '/edit-blog',
      error: err.message,
    });
  }
});
// EDIT A BLOG
router.post('/edit-blog/:id', authMiddleware, async (req, res) => {
  const editBlog = await Post.findById(req.params.id);
  const locals = {
    title: editBlog ? editBlog.title : '',
    description: editBlog ? editBlog.body : '',
  };
  try {
    if (editBlog) {
      const { title, body, author } = req.body;

      await Post.findByIdAndUpdate(req.params.id, {
        title: title ? title : editBlog.title,
        body: body ? body : editBlog.body,
        author: author ? author : editBlog.author,
        updatedAt: Date.now(),
      });

      res.redirect('/auth/dashboard');
      res.status(201).send('Blog updated successfully');
    }
  } catch (err) {
    res.render('auth/edit-blog', {
      layout: dashboardLayout,
      locals,
      data: {
        title: editBlog ? editBlog.title : '',
        body: editBlog ? editBlog.body : '',
        author: editBlog ? editBlog.author : '',
        id: editBlog ? editBlog._id : '',
      },
      currentRoute: '/edit-blog',
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
// router.post('/admin/blog/:id', async (req, res) => {
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
// router.put('/admin/blog', async (req, res) => {
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
// router.get('/admin/blog/:id', (req, res) => {
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

// ADD POSTS
// async function insertPosts() {
//   Post.insertMany([
//     {
//       title: 'Post 1 Post 1 Post 1',
//       body: 'Post 1 description admin Post 1 description admin',
//       author: 'Author 1',
//     },
//     {
//       title: 'Post 2',
//       body: 'Post 2 description Post 1 description admin',
//       author: 'Author 2',
//     },
//     {
//       title: 'Post 3 Post 1 Post 1',
//       body: 'Post 3 description Post 1 Post 1 Post 1 Post 1Post 1Post 1Post 1',
//       author: 'Author 3',
//     },
//     {
//       title: 'Post 4',
//       body: 'Post 4 description Post 1 description admin Post 1 description admin Post 1 description admin',
//       author: 'Author 4',
//     },
//   ]);
// }

// insertPosts();
