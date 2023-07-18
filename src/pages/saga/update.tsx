import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { PutRegionReq } from '@/redux-saga/action/regionAction';

export default function Update(props:any) {
  const dispatch = useDispatch();
  const [previewImg, setPreviewImage] = useState<string | undefined>();
  const [upload, setUpload] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: undefined,
      file: undefined,
      id: undefined,
    },
    onSubmit: async (values:any) => {
      let payload = new FormData();
      payload.append("name", values.name);
      payload.append("file", values.file);
      payload.append("id", props.regID);
      dispatch(PutRegionReq(payload));
      props.setEdit(false);
      window.alert(`Data Successfully Update `+values.name);
      props.setRefresh(true);
    },
  });
  const uploadConfig = (name:any) => (event:any) => {
    let reader:any = new FileReader();
    const file = event.target.files[0];
    reader.onload = () => {
      formik.setFieldValue("file", file);
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    setUpload(true);
  };
  const onClear = (event:any) => {
    event.preventDefault();
    setPreviewImage(undefined);
    setUpload(false);
  };
  
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Update Region</label>
        <input
        className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        ></input>
      </div>
      <div>
      <label>Photo</label>
        <div>
          {upload === false ? (
            <>
              <span>Kosong</span>
            </>
          ) : (
            <>
              <img src={previewImg} alt="img"></img>
              <span onClick={onClear}>Remove</span>
            </>
          )}
        </div>
        <div>
          <label>
            <span>upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              onChange={uploadConfig("file")}
            ></input>
          </label>
        </div>
        <div>
          <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">
            Simpan
          </button>
          <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => props.setEdit(false)}>
            Cancel
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}
