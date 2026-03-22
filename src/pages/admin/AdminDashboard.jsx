import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import { BarChart3, Clock, CheckCircle, PackageSearch, Trophy, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [topCollectors, setTopCollectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sumData = await adminService.getSummaryStats();
        setSummary(sumData);
        const topData = await adminService.getTopCollectors();
        setTopCollectors(topData || []);
      } catch (error) {
        console.error("Failed to load admin stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">System-wide waste report statistics and collector performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Pending" value={summary?.totalPending || 0} icon={Clock} color="bg-amber-100 text-amber-600" />
        <StatCard title="Assigned" value={summary?.totalAssigned || 0} icon={PackageSearch} color="bg-blue-100 text-blue-600" />
        <StatCard title="In Progress" value={summary?.totalInProgress || 0} icon={BarChart3} color="bg-purple-100 text-purple-600" />
        <StatCard title="Collected" value={summary?.totalCollected || 0} icon={CheckCircle} color="bg-emerald-100 text-emerald-600" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center">
          <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
          <h2 className="text-lg font-bold text-slate-800">Top Performance Collectors</h2>
        </div>
        
        {topCollectors.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No collected reports yet to display performance.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-slate-500 text-sm border-b border-slate-200">
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Collector Name</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Reports Collected</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {topCollectors.map((collector, index) => (
                  <tr key={collector.collectorId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-slate-100 text-slate-600' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-500'}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                      {collector.firstName} {collector.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-emerald-600">
                      {collector.totalCollected}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center">
    <div className={`p-4 rounded-lg ${color} mr-4`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

export default AdminDashboard;
