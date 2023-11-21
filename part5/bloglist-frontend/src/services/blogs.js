import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (tokenValue) => {
  token = `Bearer ${tokenValue}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlogObject, config);
  return response.data;
};

const updateBlog = async (blogId, newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${blogId}`,
    newBlogObject,
    config
  );

  return response.data;
};
const deleteBlog = async (blogId, newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);

  return response.data;
};

export default { getAll, setToken, create, updateBlog, deleteBlog };
