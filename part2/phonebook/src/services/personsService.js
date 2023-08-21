import axios from "axios";
const baseUrl = "http://localhost:3000/persons";

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((reply) => reply.data);
};

const create = (newObject) => {
  const response = axios.post(baseUrl, newObject);
  return response.then((reply) => reply.data);
};

// const deleteData = (id) => {
//   const resourceItemUrl = `http://localhost:3000/persons/${id}`;
//   const response = axios.delete(resourceItemUrl);
//   return response.then((reply) => reply.data);
// };
export default {
  getAll,
  create,
  //   deleteData,
};
