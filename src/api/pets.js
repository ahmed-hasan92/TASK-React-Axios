import instance from ".";

const getAllPets = async () => {
  const res = await instance.get("/pets");
  return res.data;
};
const getPestsByID = async (id) => {
  const res = await instance.get(`/pets/${id}`);
  return res.data;
};
const addNewPet = async (name, type, image, adopted) => {
  const res = await instance.post(`/pets`, {
    name: name,
    type: type,
    image: image,
    adopted: adopted,
  });
  return res.data;
};
const upDateById = async (name, type, image, id) => {
  const res = await instance.put(`pets/${id}`, {
    name: name,
    type: type,
    image: image,
    adopted: 1,
  });
  return res.data;
};
const deleteById = async (id) => {
  const res = await instance.delete(`/pets/${id}`);
  return res.data;
};

export { getAllPets, getPestsByID, addNewPet, upDateById, deleteById };
