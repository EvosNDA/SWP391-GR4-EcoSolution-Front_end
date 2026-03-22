import React, { useEffect, useState } from 'react';
import reportService from '../../services/reportService';
import userService from '../../services/userService';
import ReportCard from '../../components/ReportCard';
import { Loader2, Users } from 'lucide-react';

const ManagerDashboard = () => {
  const [reports, setReports] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState(null);
  
  // Map report.id to the selected collector.id
  const [collectorSelections, setCollectorSelections] = useState({});

  const fetchPending = async () => {
    try {
      const data = await reportService.getPendingReports();
      setReports(data || []);
      const cols = await userService.getCollectors();
      setCollectors(cols || []);
    } catch (error) {
      console.error("Failed to load pending reports or collectors", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleSelectChange = (reportId, colId) => {
    setCollectorSelections(prev => ({ ...prev, [reportId]: colId }));
  };

  const handleAssign = async (reportId) => {
    const selectedColId = collectorSelections[reportId];
    if (!selectedColId) return alert("Please select a Collector.");
    
    try {
      setAssigningId(reportId);
      await reportService.assignCollector({ 
        reportId: reportId, 
        collectorId: parseInt(selectedColId) 
      });
      alert('Collector assigned successfully!');
      fetchPending();
      
      // Clear selection for this specific report
      setCollectorSelections(prev => {
        const next = { ...prev };
        delete next[reportId];
        return next;
      });
      
    } catch (error) {
      console.error("Failed to assign collector", error);
      alert('Failed to assign collector. Please try again.');
    } finally {
      setAssigningId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Pending Issues</h1>
        <p className="text-slate-500 mt-1">Review and assign collectors to new waste reports.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
          <Users className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No pending reports</h3>
          <p className="text-slate-500 mt-2">All tasks have been assigned. Good job!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard 
              key={report.id} 
              report={report} 
              actions={
                <div className="flex gap-2">
                  <select
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5"
                    onChange={(e) => handleSelectChange(report.id, e.target.value)}
                    value={collectorSelections[report.id] || ""}
                  >
                    <option value="">Select Collector</option>
                    {collectors.map(c => (
                      <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAssign(report.id)}
                    disabled={assigningId === report.id}
                    className="flex-shrink-0 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 flex items-center justify-center font-medium"
                  >
                    {assigningId === report.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Assign'}
                  </button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;