import React, { useState } from "react";
import RegionApi from '../api/region';

export default function Update(props:any) {
  const [value, setValue] = useState({
    name: undefined,
  });
  const handleChange = (name:any) => (event:any) => {
    setValue({ ...value, [name]: event.target.value });
  };
  const onSubmit = async () => {
    const payload = {
      name: value.name,
      id: props.regID,
    };
    await RegionApi.update1(payload).then(() => {
      props.setRefresh(true);
      props.setEdit(false)
      window.alert("Data success Update");
    });
  };
  return (
    <div>
      <h2>Update Regions</h2>
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
          <button type="submit">Simpan</button>
          <button onClick={() => props.setEdit(false)}>cancel</button>
        </div>
      </form>
    </div>
  );
}
