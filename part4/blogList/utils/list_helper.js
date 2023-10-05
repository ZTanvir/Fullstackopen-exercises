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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
