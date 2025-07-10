import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const Employee = (props) => {
    const { employee_id } = useParams();
    const [employee, setEmployee] = useState(null);
    let { user } = useAuth();
    // if auth isn't working (more likely than it seems!!!) pull from local
    if(!user){
        user = JSON.parse(localStorage.getItem('user_id'));
        console.log("user from local storage:", user);
    }


    useEffect(() => {
        // console.log(user);
        const fetchEmployee = async () => {
            try {
                console.log(user)
                const response = await fetch(`http://localhost:3000/api/employee/${employee_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "sender_id": user.id,
                        "sender_role": user.role,
                    })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployee(data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchEmployee();
    }, []);

    if (!employee) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h2>Employee Details</h2>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>ID:</strong> {employee.id}</p>
            <p><strong>Role:</strong> {employee.role}</p>
            <p><strong>Location:</strong> {employee.work_location}</p>
            <p><strong>Phone Number:</strong> {employee.phone}</p>
            <p><strong>Salary:</strong> {employee.salary}</p>
            <p><i>Note: salaries are only visible to yourself, your manager, and HR managers</i></p>
            <button className="btn btn-primary" onClick={() => window.history.back()}>Back to Search</button>
        </div>
    );
}

export default Employee;