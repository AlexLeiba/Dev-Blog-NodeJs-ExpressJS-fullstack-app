const express = require('express');

const router = express.Router(); // Routes
const Post = require('../models.db/models');

// HOME ROUTE, GET ALL ARTICLES
// router.get('/', async (req, res) => {
//   const locals = {
//     title: 'Blogs',
//     description: 'Blogs',
//   };

//   try {
//     const blogsData = await Post.find(); //returns all data from the database i mentioned in dbConnection.js

//     res.render('index', { locals, blogsData }); //when accesing this route we visit the 'index' page from 'views' folder
//     console.log('\n\n🚀 ~ =>>>>>>>> blogsData here:', blogsData);
//   } catch (err) {
//     console.log(err);
//   }
// });

// HOME ROUTE, GET ARTICLES PAGINATED
router.get('', async (req, res) => {
  const locals = {
    title: 'Public Articles',
    description: 'Public Articles',
  };

  try {
    let articlePerPage = 5;
    let currentPage = req.query.page || 1;

    // const blogsData = await Post.find()
    //   .limit(articlePerPage)
    //   .skip((page - 1) * articlePerPage);

    // const blogsData = await Post.find({ public: true })
    //   .aggregate([{ $sort: { createdAt: -1 } }])
    //   .skip((currentPage - 1) * articlePerPage)
    //   .limit(articlePerPage)
    //   .exec();

    const blogsData = await Post.find({
      public: true,
    })
      .sort({
        createdAt: -1,
      })
      .skip((currentPage - 1) * articlePerPage)
      .limit(articlePerPage)
      .exec();

    const count = await Post.find({ public: true }).countDocuments();
    // console.log('🚀 ~ \n\n router.get ~ n:', count);

    const nextPage = parseInt(currentPage) + 1;
    const prevPage = parseInt(currentPage) - 1;

    const hasNextPage = currentPage * articlePerPage < count;

    res.render('index', {
      locals,
      blogsData,
      nextPage,
      hasNextPage,
      prevPage,
      currentPage: parseInt(currentPage),
      currentRoute: '/',
    }); //when accesing this route we visit the 'index' page from 'views' folder
  } catch (err) {
    console.log(err);
    res.status(400).send('Error:', err);
  }
});

// BLOG POST ROUTE, GET SELECTED POST
router.get('/article/:id', async (req, res) => {
  try {
    const selectedBlog = await Post.findById(req.params.id);

    const locals = {
      title: selectedBlog.title,
      description: selectedBlog.description,
    };

    res.render('article', {
      locals,
      post: selectedBlog,
      currentRoute: '/article',
    });
  } catch (err) {
    console.log(err);
  }
});
// BLOG POST SEARCH TERM ROUTE, GET SEARCHED  POST
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: 'Search',
      description: 'Search',
    };

    const searchTerm = req.body.searchTerm;
    const searchNoSpecialCharacters = searchTerm;
    // replace(/"[a-zA-Z0-9]"/g, '');

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialCharacters, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialCharacters, 'i') } },
        {
          author: {
            $regex: new RegExp(searchNoSpecialCharacters, 'i'),
          },
        },
      ],
      public: true,
    });

    res.render('search', {
      locals,
      data,
      currentRoute: '/search',
    });
  } catch (err) {
    console.log(err);
  }
});

// UPDATE POST ROUTE
router.post('/article/:id', async (req, res) => {
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

  res.render('index', { locals, currentRoute: '/blog/:id' }); //when accesing this route we visit the 'index' page from 'views' folder
});

// ADD POST ROUTE
router.put('/article/', async (req, res) => {
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

  res.render('index', { locals, currentRoute: '/blog' }); //when accesing this route we visit the 'index' page from 'views' folder
});

// DELETE POST ROUTE
router.get('blog/:id', (req, res) => {
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
  res.render('about', { currentRoute: '/about' });
});

// CONTACT ROUTE
router.get('/contact', (req, res) => {
  res.render('contact', { currentRoute: '/contact' });
});
module.exports = router;

// async function insertPosts() {
//   Post.insertMany([
//     {
//       title: 'Post 1',
//       body: 'Post 1 description',
//       author: 'Author 1',
//     },
//     {
//       title: 'Post 2',
//       body: 'Post 2 description',
//       author: 'Author 2',
//     },
//     {
//       title: 'Post 3',
//       body: 'Post 3 description',
//       author: 'Author 3',
//     },
//     {
//       title: 'Post 4',
//       body: 'Post 4 description',
//       author: 'Author 4',
//     },
//   ]);
// }

// insertPosts();
