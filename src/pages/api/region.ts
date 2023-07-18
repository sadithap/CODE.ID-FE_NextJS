import axios from "axios";
import config from "@/config/config";

const GetData = async () => {
  try {
    const result = await axios.get(`${config.domain}/regions`);
    return result.data;
  } catch (error) {
    return await error;
  }
};

const deleted = async (id: any) => {
  try {
    const result = await axios.delete(`${config.domain}/regions/${id}`);
    return result;
  } catch (error) {
    return await error;
  }
};

const create = async (payload: any) => {
  try {
    const result = await axios.post(`${config.domain}/regions`, payload);
    return result;
  } catch (error) {
    return await error;
  }
};

const update1 = async(payload:any) => {
    const id = payload.id;
    try {
        const result = await axios.put(`${config.domain}/regions/i/${id}`,payload)
        return result
    } catch (error) {
        return await error;
    }
}

const update = async(payload:any) => {
    const id=payload.get("id");
    try {
      const result = await axios.put(`${config.domain}/regions/${id}`,payload)
      const result1 = await axios.get(`${config.domain}/regions/${id}`);
      return result1
    } catch (error) {
      return await error;
    }
  }

const upload = async(payload:any) => {
    try {
      const result = await axios.post(`${config.domain}/regions/upload`,payload)
      return result
    } catch (error) {
      return await error
    }
  }

export default {
  GetData,
  deleted,
  create,
  update,
  update1,
  upload,
};
