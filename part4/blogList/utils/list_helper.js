const dummy = (blog) => {
  return 1;
};

const totalLikes = (blogPostList) => {
  const totalLikes = blogPostList.reduce((acc, cur) => acc + cur.likes, 0);

  return blogPostList.length === 0 ? 0 : totalLikes;
};

const favoriteBlog = (blogList) => {
  let favoriteBlog = null;
  let mostLikes = 0;
  blogList.forEach((blog) => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes;
      favoriteBlog = blog;
    }
  });
  return favoriteBlog;
};

const mostBlogs = (blogList) => {
  let authorList = [];
  let authorBlogs = {};
  // store all the author from blog in author list
  blogList.forEach((blog) => {
    let author = blog.author;
    if (!authorList.includes(author)) {
      authorList = authorList.concat(author);
    }
  });
  let blogs = 0;
  //loop the authorlist and find how many blog they have written
  authorList.forEach((blogWriter) => {
    let writer = blogWriter;
    let totalBlog = 0;
    blogList.forEach((blog) => {
      if (blog.author === writer) {
        totalBlog += 1;
      }
      if (totalBlog > blogs) {
        blogs = totalBlog;
        authorBlogs = { ...authorBlogs, author: writer, blogs: totalBlog };
      }
    });
  });
  return blogList.length === 0 ? null : authorBlogs;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
