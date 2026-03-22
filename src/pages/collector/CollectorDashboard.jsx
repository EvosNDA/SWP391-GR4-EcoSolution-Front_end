import React, { useEffect, useState } from 'react';
import reportService from '../../services/reportService';
import ReportCard from '../../components/ReportCard';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CollectorDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const collectorId = user?.id;

  const fetchTasks = async () => {
    if (!collectorId) {
      setLoading(false);
      return;
    }
    try {
      const data = await reportService.getCollectorTasks(collectorId);
      setTasks(data || []);
    } catch (error) {
      console.error("Failed to load assigned tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdateStatus = async (reportId, newStatus) => {
    try {
      await reportService.updateStatus(reportId, { status: newStatus, confirmationImageUrl: null });
      alert('Status updated successfully!');
      fetchTasks();
    } catch (error) {
      console.error("Failed to update status", error);
      alert('Failed to update status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>
        <p className="text-slate-500 mt-1">Manage and update your assigned collection tasks.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900">All caught up!</h3>
          <p className="text-slate-500 mt-2">You don't have any pending collection tasks right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <ReportCard 
              key={task.id} 
              report={task} 
              actions={
                <div className="flex gap-2">
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5"
                    value={task.status}
                    onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                  >
                    <option value="ASSIGNED">ASSIGNED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COLLECTED">COLLECTED</option>
                  </select>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectorDashboard;
