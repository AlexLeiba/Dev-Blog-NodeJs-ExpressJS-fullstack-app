const mongoose = require('mongoose');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const marked = require('marked');

const dompurify = createDomPurify(new JSDOM().window);

// Article schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  senitizedHtml: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    default: true,
  },
});

postSchema.pre('validate', function (next) {
  if (this.body) {
    this.senitizedHtml = dompurify.sanitize(marked.parse(this.body));
  }

  next();
});

module.exports = mongoose.model('Post', postSchema);
