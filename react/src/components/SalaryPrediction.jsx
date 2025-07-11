import React, { useState }  from 'react';
import { Spinner } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';

const PORT = 3000


function SalaryPrediction() {
    const [selectedRole, setSelectedRole] = useState('Software Engineer')
    const [selectedWorkLocation, setSelectedWorkLocation] = useState('New York')
    const [predictedSalary, setPredictedSalary] = useState('');
    const [LoadSpinnerStatus, setLoadSpinnerStatus] = useState(false);

    const roles = ['Software Engineer', 'Data Scientist', 
                    'Product Manager', 'Sales Executive',
                    'HR Manager', 'Marketing Specialist',
                    'Customer Support'];

    const workLocations = ['New York', 'Hartford', 'Chicago', 'St. Paul']

    const handleQuery = async (e) => {
        e.preventDefault();
        const features = {
            'role': selectedRole,
            'work_location': selectedWorkLocation
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(features)

        };
        setLoadSpinnerStatus(true);
        fetch(`http://localhost:${PORT}/api/queryModel`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setPredictedSalary(data);
                setLoadSpinnerStatus(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoadSpinnerStatus(false);
            });
    }   

    return(

       <div className="container mt-5">
        <h1>Salary Predictor </h1>
        <form onSubmit={handleQuery} className="dropdown">
            <div style= {{width: "600px", justifyContent:"space-around"}} className="form-group d-flex">
                <select className='form-control me-3' value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} aria-labelledby="dropdownMenu1">
                    {roles.map((role, index) => (
                        <option value={role} key={index}>
                            {role}
                        </option>
                    ))}
                </select>

                <select className='form-control me-3' value={selectedWorkLocation} onChange={(e) => setSelectedWorkLocation(e.target.value)} aria-labelledby="dropdownMenu2">
                    {workLocations.map((workLocation, index) => (
                        <option value={workLocation} key={index}>
                            {workLocation}
                        </option>
                    ))}
                </select>
                </div>
            <button className="btn btn-primary" type="submit">Predict</button>
            
        </form>
        <div className= "mt-4">
        {LoadSpinnerStatus ? (
            <Spinner animation="border" /> )
             : (predictedSalary && (
                    <p>Predicted Salary: 
                        <NumericFormat value={Number(predictedSalary)} displayType={'text'} thousandSeparator={true} prefix={' $'} /> 
                    </p>
             )
            )}
            </div>
        <button className="btn btn-primary" onClick={() => window.history.back()}>Back to Search</button>
        </div>
    )
}

export default SalaryPrediction;