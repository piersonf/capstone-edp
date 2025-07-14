import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from 'react-router-dom';

const Search = ({ employeeData }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(employeeData);
    let { user, logout } = useAuth();
    const navigate = useNavigate();
    // if auth isn't working (more likely than it seems!!!) pull from local
    if(!user){
        user = JSON.parse(localStorage.getItem('user_id'));
        console.log("user from local storage:", user);
    }

    const handleSearch = async (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term); // Update the search term state
        await fetchEmployees(term); // Fetch employees based on the search term
        const filtered = employeeData.filter((employee) =>
            employee.name.toLowerCase().includes(term) ||
            employee.employee_id.toString().includes(term)
        );
        setFilteredData(filtered);
    };
    
    const fetchEmployees = async (employeeName) => {
        try {
            const response = await fetch('http://localhost:3000/api/employee/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm: employeeName }), // Initial fetch with empty search term
            });
            const data = await response.json();
            console.log(data)
            setFilteredData(data);
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    // get all employees on page load
    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="container mt-5">
            <h1>Welcome back, {user?.name} </h1>
            <div className="d-flex justify-content-center flex-wrap mt-3">
                <div className="mx-2"><strong>ID:</strong> {user?.id}</div>
                <div className="mx-2"><strong>Role:</strong> {user?.role}</div>
                <div className="mx-2"><strong>Location:</strong> {user?.work_location}</div>
                <div className="mx-2"><strong>Phone Number:</strong> {user?.phone}</div>
                <div className="mx-2"><strong>Salary:</strong> {user?.salary}</div>
            </div>
            <p className="text-center mt-3">Welcome to the employee search page. You can search for employees by their name or ID.</p>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul className="list-group">
                {filteredData?.map((employee) => (
                    <li key={employee.employee_id} className="list-group-item">
                        <a href={`/employee/${employee.id}`}> {employee.name} (ID: {employee.id})</a>
                    </li>
                ))}
            </ul>
            <button className="btn btn-primary mt-3" onClick={() => logout()}>Log out</button>
            <button className="btn btn-primary mt-3" onClick={() => navigate("/predict")}>Predict Salary</button>
        </div>
    );
}

export default Search;