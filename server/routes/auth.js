const express = require('express');

const router = express.Router(); // Routes
const Post = require('../models.db/models');
const loginLayout = '../views/layout/loginLayout';
const registerLayout = '../views/layout/registerLayout';

const AuthModel = require('../models.db/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// LOGIN AUTH MAIN PAGE GET
router.get('/login', async (req, res) => {
  const locals = {
    title: 'Admin',
    description: 'Admin',
  };

  try {
    res.render('auth/login', {
      locals,
      layout: loginLayout,
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  } catch (err) {
    console.log(err);
  }
});
// LOG IN POST
router.post('/login', async (req, res) => {
  const locals = {
    title: 'Admin',
    description: 'Admin',
  };

  try {
    res.render('auth/login', {
      locals,
      layout: loginLayout,
    }); //when accesing this route we visit the 'admin' page from 'views' folder

    const { password, email } = req.body;
    console.log('🚀 ~ router.post ~ email:', email);

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

        console.log('🚀 ~ router.post ~ token:\n\n\n\n', token);

        res.status(200).json({ token });
      }
    } else {
      res.status(400);
    }

    //when accesing this route we visit the 'admin' page from 'views' folder
  } catch (err) {
    console.log(err);
  }
});

// REGISTER MAIN PAGE GET
router.get('/register', async (req, res) => {
  const locals = {
    title: 'Admin',
    description: 'Admin',
  };

  try {
    res.render('auth/register', {
      locals,
      layout: registerLayout,
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  } catch (err) {
    console.log(err);
  }
});

// REGISTER POST
router.post('/register', async (req, res) => {
  const locals = {
    title: 'Admin',
    description: 'Admin',
  };

  try {
    const { username, password, email } = req.body;

    if (username && password && email) {
      const registered = await AuthModel.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      if (registered) {
        res.redirect('/');
        res.status(201).send('Registered successfully');
      } else {
        res.status(400).json({ message: 'User already exists' });
      }
    }

    // RENDER PAGE
    res.render('auth/register', {
      locals,
      layout: registerLayout,
    }); //when accesing this route we visit the 'admin' page from 'views' folder
  } catch (err) {
    console.log(err);
  }
});

// BLOG POST ROUTE, GET SELECTED POST
router.get('/admin/blog/:id', async (req, res) => {
  try {
    const selectedBlog = await Post.findById(req.params.id);

    const locals = {
      title: selectedBlog.title,
      description: selectedBlog.description,
    };

    res.render('blog', {
      locals,
      post: selectedBlog,
    });
  } catch (err) {
    console.log(err);
  }
});

// UPDATE ADMIN BLOG ROUTE
router.post('/admin/blog/:id', async (req, res) => {
  const locals = {
    title: 'Blogs',
    description: 'Blogs',
  };

  try {
    const blogsData = await Post.find(req.params.id);
    if (blogsData) {
      await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
      });
      res.status(201).send('Post updated successfully');
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    res.status(400).send('Error:', error);
  }

  res.render('index', locals); //when accesing this route we visit the 'index' page from 'views' folder
});

// ADD ADMIN BLOG ROUTE
router.put('/admin/blog', async (req, res) => {
  const locals = {
    title: 'Blogs',
    description: 'Blogs',
  };

  try {
    const postedBlog = await Post.insertOne({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
    });

    if (postedBlog) {
      res.status(201).send('Post added successfully');
    } else {
      res.status(400).send('Post not added');
    }
  } catch (error) {
    res.status(400).send('Error:', error);
  }

  res.render('index', locals); //when accesing this route we visit the 'index' page from 'views' folder
});

// DELETE BLOG ROUTE
router.get('/admin/blog/:id', (req, res) => {
  const locals = {
    title: 'Blogs',
    description: 'Blogs',
  };

  try {
    const deletedBlog = Post.findByIdAndDelete(req.params.id);
    if (deletedBlog) {
      res.status(200).send('Post deleted successfully');
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    res.status(400).send('Error:', error);
  }

  res.render('index', locals); //when accesing this route we visit the 'index' page from 'views' folder
});

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
