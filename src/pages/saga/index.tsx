import { GetRegionReq,DeleteRegionReq } from '@/redux-saga/action/regionAction'
import React, {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Insert from './insert'
import Update from './update'

export default function RegionSaga() {
    const dispatch = useDispatch()
    const {regions} = useSelector((state:any) => state.regionState)
    const [display, setDisplay] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [edit, setEdit]= useState(false);
    const [regID, setRegID]= useState(0);
    useEffect(()=> {
        dispatch(GetRegionReq())
    },[dispatch])

    const onEdit = async (id:any) => {
        setRegID(id);
        setEdit(true);
      }
    
    const onDelete = async (id:any) => {
        dispatch(DeleteRegionReq(id))
        window.alert(`Data Deleted`);
        setRefresh(true)
    };

  return (
    <div>
      {display ? (<Insert setDisplay={setDisplay} setRefresh={setRefresh} />) : (
        <>
        <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => setDisplay(true)}>Add Region</button>
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
                        regions && regions.map((item: any) => {
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
        </>
      )}
    </div>
  )
}
