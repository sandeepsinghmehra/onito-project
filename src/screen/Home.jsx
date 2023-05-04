import React, { useEffect, useState } from 'react'
import "./Home.css";
import axios from 'axios';

export function Home() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        async function fetchData() {
            try {
                setLoading(true);
                const result = await axios.get('http://localhost:8000');
                setData(result.data.response);
                setLoading(false);
            } catch (error) {
                setError(error || error?.message);
                setLoading(false);
            }
        }
        fetchData();
    },[])
    console.log("data", data);
    if(loading){
        return <div>loading...</div>
    }
    return (
        <>  
          <div className='table-container'>
            <table>
                <caption>List Of Patient</caption>
                <tr>
                    <th>OPD No.</th>
                    <th>Name</th>
                    <th>Age/Sex</th>
                    <th>Mobile</th>
                    <th className='table-address'>Address</th>
                    <th>Govt ID</th>
                    <th>Guardian Details</th>
                    <th>Nationality</th>
                </tr>
                {data.map((patient, index) => {
                    return (
                    <tr key={index}>
                        <td data-cell="opd no.">{index+1}</td>
                        <td data-cell="name">{patient.name}</td>
                        <td data-cell="age/sex">{patient.dobOrAge}/{patient.sex}</td>
                        <td data-cell="mobile">{patient?.mobile}</td>
                        <td data-cell="address">{patient?.address !== "" ? patient?.address+", ": null}{patient?.city !== "" ? patient?.city+", ": null}{patient?.state !== "" ? patient?.state+", ": null} {patient?.pincode !== "" ? patient?.pincode: null}</td>
                        <td data-cell="govt id">{patient?.id_type !== "" && patient?.id_type !== undefined ? patient?.id_type+" - ": null}{patient?.govt_id !== "" ? patient?.govt_id: null}</td>
                        <td data-cell="guardian details">{patient?.guardian_name !== "" ? patient?.guardian_name+" , ": null}{patient?.email !== "" ? patient?.email+" , ": null}{patient?.emergency_contact_number !== "" ? patient?.emergency_contact_number: null}</td>
                        <td data-cell="nationality">{patient?.nationality}</td>
                    </tr>
                    )})}
            </table>
          </div>
        </>
    )
}