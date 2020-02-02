import React from 'react';

import './index.css';

export default ({ employees }) => {
    return (
        <div>
            {
                employees && employees.map((employee, key) => {
                    return (
                        <div className="home-container" key={key}>
                            <div className="home-employee-card">
                                <h1>{employee.name}</h1>
                                <h2>{employee.occupation}</h2>
                                <h3>Hello! My skills to pay the bills are: {employee.skills.join(', ')}</h3>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}