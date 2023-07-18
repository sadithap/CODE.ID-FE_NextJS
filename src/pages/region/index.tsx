import React, { useEffect, useState } from 'react'
import RegionApi from '../api/region'
import Insert from './insert'
import Update from './update'

export default function Region() {
    const [Region,setRegion] = useState<any[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [display, setDisplay] = useState(false);
    const [edit, setEdit]= useState(false);
    const [regID, setRegID]= useState(0);
    useEffect(() => {
        RegionApi.GetData().then(
            data => {
                setRegion(data)
            }
        )
        setRefresh(false);
    },[refresh])
    const onDelete = async (id:any) => {
        RegionApi.deleted(id).then(() => {
          window.alert("Data successfully deleted");
          setRefresh(true);
        });
      };
      const onEdit = async (id:any) => {
        setRegID(id);
        setEdit(true);
      };
  return (
    <div>
    {display ? (<Insert setRefresh={setRefresh} setDisplay={setDisplay} />) : (
        <>
        <div>
        <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"  onClick={() => setDisplay(true)}>Add Regions</button>
      <h2>List Region</h2>
      <table>
        <thead>
            <tr>
                <th>Region ID</th>
                <th>Region Name</th>
                <th>Region Photo</th>
            </tr>
        </thead>
        <tbody>
            {
                Region && Region.map(item => {
                    return (
                        <>
                        <tr>
                            <th>
                               {item.regionId} 
                            </th>
                            <td>
                                {item.regionName}
                            </td>
                            <td>
                                {item.photo}
                            </td>
                            <td>
                                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => onDelete(item.regionId)}>
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => onEdit(item.regionId)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                        </>
                    )
                })
            }
        </tbody>
      </table>
      {edit && <Update setEdit={setEdit} setRefresh={setRefresh} regID={regID}/>}
    </div>
        </>
    )}
    </div>
  )
}
