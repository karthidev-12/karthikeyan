import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStudent,
  deleteStudent,
} from '../redux/slice/studentSlice';
import {
  addTeacher,
  deleteTeacher,
} from '../redux/slice/teachersSlice';

const DataTable = ({ title, type }) => {
  const data = useSelector((state) => state[type]);
  console.log(data,"hhjjj")
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: '', email: '', mobile: '' });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = 'Name is required';
    } else if (form.name.length > 20) {
      errs.name = 'Name must not exceed 20 characters';
    }
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Email is invalid';
    }
    if (!form.mobile.trim()) {
      errs.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(form.mobile)) {
      errs.mobile = 'Mobile number must be 10 digits';
    }
    return errs;
  };

  const addItem = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newItem = { ...form };
      type === 'students'
        ? dispatch(addStudent(newItem))
        : dispatch(addTeacher(newItem));
      setForm({ name: '', email: '', mobile: '' });
    }
  };

  const removeItem = (index) => {
    type === 'students'
      ? dispatch(deleteStudent(index))
      : dispatch(deleteTeacher(index));
  };

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" border p-6 rounded-xl shadow-lg bg-blue-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            className={`border px-3 py-2 h-[60px] text-[24px] rounded-md w-full ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-[20px] mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className={`border px-3 py-2 h-[60px] text-[24px] rounded-md w-full ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-[20px] mt-1">{errors.email}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Mobile"
            className={`border px-3 py-2 h-[60px] text-[24px] rounded-md w-full ${
              errors.mobile ? 'border-red-500' : 'border-gray-300'
            }`}
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
          {errors.mobile && <p className="text-red-500 text-[20px] mt-1">{errors.mobile}</p>}
        </div>
      </div>

      <button
        onClick={addItem}
        className="bg-green-500 mb-3 cursor-pointer h-[60px] text-[24px] hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md w-full md:w-auto"
      >
        Add {title.slice(0, -1)}
      </button>
      <input
        type="text"
        placeholder="Search by name..."
        className="border h-[60px] text-[24px] border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full table-auto text-[22px] border-collapse mb-4">
        <thead>
          <tr className="bg-indigo-100 text-indigo-800">
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Mobile</th>
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.mobile}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 cursor-pointer hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-4">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>

     
    </div>
  );
};

export default DataTable;
