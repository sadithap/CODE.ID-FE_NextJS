import React, { useState } from "react";
import RegionApi from '../api/region';

export default function Insert(props:any) {
  const [value, setValue] = useState({
    name: undefined,
  });
  const handleChange = (name:any) => (event:any) => {
    setValue({ ...value, [name]: event.target.value });
  };
  const onSubmit = async () => {
    const payload = {
      name: value.name,
    };
    await RegionApi.create(payload).then(() => {
      props.setRefresh(true);
      window.alert("Data success Create");
    });
  };
  return (
    <div>
      <h2>Add Regions</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Region Name :</label>
          <input
            type="text"
            placeholder="Name"
            onChange={handleChange("name")}
          ></input>
        </div>
        <div>
          <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Simpan</button>
          <button className="flex justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => props.setDisplay(false)}>cancel</button>
        </div>
      </form>
    </div>
  );
}
