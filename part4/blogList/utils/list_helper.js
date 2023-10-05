const dummy = (blog) => {
  return 1;
};

const totalLikes = (blogPostList) => {
  const totalLikes = blogPostList.reduce((acc, cur) => acc + cur.likes, 0);

  return blogPostList.length === 0 ? 0 : totalLikes;
};

module.exports = {
  dummy,
  totalLikes,
};
