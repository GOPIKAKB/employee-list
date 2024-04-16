import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './EmployeeList.css'
import { myContext } from '../../App';

const EmployeeList = () => {
    // const employees = [
    //     {
    //       id: 1,
    //       name: "John Doe",
    //       email: "john@example.com",
    //       role: "Developer",
    //       active: true,
    //       designation: "Software Engineer",
    //       dateOfBirth: "1990-05-15"
    //     },
    //     {
    //       id: 2,
    //       name: "Jane Smith",
    //       email: "jane@example.com",
    //       role: "Manager",
    //       active: false,
    //       designation: "Project Manager",
    //       dateOfBirth: "1985-10-20"
    //     },
    //     {
    //       id: 3,
    //       name: "Alice Johnson",
    //       email: "alice@example.com",
    //       role: "Designer",
    //       active: true,
    //       designation: "UI/UX Designer",
    //       dateOfBirth: "1993-02-28"
    //     }
    //   ];

    const { jwtToken } = useContext(myContext)

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://carxier-dev.tahrtech.in/api/v1/employee/all/0/20', {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                setEmployees(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="table-container">
            <h2>Employee List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Active Status</th>
                            <th>Designation</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.role}</td>
                                <td>{employee.active ? 'Active' : 'Inactive'}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.dateOfBirth}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeeList;
