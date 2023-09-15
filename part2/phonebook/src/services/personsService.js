import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((reply) => reply.data);
};

const create = (newObject) => {
  const response = axios.post(baseUrl, newObject);
  return response.then((reply) => reply.data);
};
const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject);
  return response.then((reply) => reply.data);
};
const deleteData = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response.then((reply) => reply.data);
};
export default {
  getAll,
  create,
  update,
  deleteData,
};
