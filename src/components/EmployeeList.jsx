import React, { useState, useEffect } from 'react';
import { useRights, RIGHTS } from '../hooks/useRights';

const EmployeeList = () => {
  const { hasRight } = useRights();
  const [employees, setEmployees] = useState([]);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Employee Directory</h2>
        {hasRight(RIGHTS.EMP_ADD) && (
          <button style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Add Employee
          </button>
        )}
      </div>

      <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            {hasRight(RIGHTS.STAMP_VIEW) && <th>Created At</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example Employee</td>
            <td>Software Engineer</td>
            <td>Active</td>
            {hasRight(RIGHTS.STAMP_VIEW) && <td>2026-05-11</td>}
            <td>
              {hasRight(RIGHTS.EMP_EDIT) && <button>Edit</button>}
              {hasRight(RIGHTS.EMP_DELETE) && <button style={{ marginLeft: '10px', color: 'red' }}>Delete</button>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;