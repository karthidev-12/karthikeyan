import React from 'react';
import DataTable from './datatable';

const Dashboard = () => {
  return (
    <div className="p-4 ">
      <h2 className="text-xl font-bold text-[32px]">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <DataTable title="Students" type="students" />
        <DataTable title="Teachers" type="teachers" />
      </div>
    </div>
  );
};

export default Dashboard;
