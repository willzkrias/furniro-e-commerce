import React, { useEffect } from 'react';

const Admin = () => {
  useEffect(() => {
    document.body.classList.add('admin-wrapper');
    return () => {
      document.body.classList.remove('admin-wrapper');
    };
  }, []);

  return (
    <div className='admin-container'>
      <h1>Admin Page</h1>
    </div>
  );
}

export default Admin;
