import client from "./client";

export const getDavlat = async () => {
  const response = await client.get("/davlat");
  return response.data.data;
};

export const getDavlatById = async (id) => {
  const response = await client.get(`/davlat/${id}`);
  return response.data.data;
};

export const createDavlat = async (data) => {
  const response = await client.post("/davlat", data);
  return response.data.data;
};

export const updateDavlat = async (id, data) => {
  const response = await client.put(`/davlat/${id}`, data);
  return response.data.data;
};

export const deleteDavlat = async (id) => {
  await client.delete(`/davlat/${id}`);
};
