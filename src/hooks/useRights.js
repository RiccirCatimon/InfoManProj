import { useState, useEffect } from 'react';

export const RIGHTS = {
  EMP_ADD: 'EMP_ADD',
  EMP_EDIT: 'EMP_EDIT',
  EMP_DELETE: 'EMP_DELETE',
  JH_VIEW: 'JH_VIEW',
  DEPT_VIEW: 'DEPT_VIEW',
  STAMP_VIEW: 'STAMP_VIEW',
};

export const useRights = () => {
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.permissions) {
      setUserPermissions(storedUser.permissions);
    }
  }, []);

  const hasRight = (permissionName) => {
    return userPermissions.includes(permissionName);
  };


  return { hasRight }; 
};