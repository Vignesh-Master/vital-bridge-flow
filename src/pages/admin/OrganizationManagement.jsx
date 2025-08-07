import React, { useState } from 'react';
import { FaSearch, FaBuilding, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const demoOrganizations = [
  {
    id: 1,
    name: 'Global Health Org',
    email: 'contact@globalhealth.org',
    country: 'USA',
    status: 'Active',
    createdAt: '2023-01-15',
  },
  {
    id: 2,
    name: 'Transplant Network',
    email: 'info@transplantnet.com',
    country: 'India',
    status: 'Pending',
    createdAt: '2023-03-22',
  },
  {
    id: 3,
    name: 'LifeLink Foundation',
    email: 'hello@lifelink.org',
    country: 'UK',
    status: 'Active',
    createdAt: '2022-11-09',
  },
];

const statusColors = {
  Active: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Inactive: 'bg-gray-100 text-gray-700',
};

const OrganizationManagement = () => {
  const [search, setSearch] = useState('');
  const [organizations, setOrganizations] = useState(demoOrganizations);

  const filteredOrgs = organizations.filter(org =>
    org.name.toLowerCase().includes(search.toLowerCase()) ||
    org.email.toLowerCase().includes(search.toLowerCase()) ||
    org.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
            <FaBuilding className="text-blue-500" /> Organizations
          </h1>
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform font-semibold">
            <FaPlus /> Add Organization
          </button>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              placeholder="Search organizations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOrgs.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10 text-lg">No organizations found.</div>
          ) : (
            filteredOrgs.map(org => (
              <div
                key={org.id}
                className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-3 border border-blue-100 hover:shadow-2xl transition-shadow relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaBuilding className="text-2xl text-blue-400" />
                  <span className="text-xl font-semibold text-blue-900">{org.name}</span>
                  <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${statusColors[org.status]}`}>{org.status}</span>
                </div>
                <div className="text-gray-600 text-sm flex flex-col gap-1">
                  <span><span className="font-medium text-blue-700">Email:</span> {org.email}</span>
                  <span><span className="font-medium text-blue-700">Country:</span> {org.country}</span>
                  <span><span className="font-medium text-blue-700">Created:</span> {org.createdAt}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                    <FaEdit /> Edit
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                    <FaTrash /> Delete
                  </button>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 opacity-30 rounded-full z-0"></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationManagement;
