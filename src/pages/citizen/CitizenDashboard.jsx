import React, { useEffect, useState } from 'react';
import reportService from '../../services/reportService';
import ReportCard from '../../components/ReportCard';
import { Link } from 'react-router-dom';
import { PlusCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CitizenDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const citizenId = user?.id;

  useEffect(() => {
    if (!citizenId) {
      setLoading(false);
      return;
    }
    const fetchHistory = async () => {
      try {
        const data = await reportService.getCitizenHistory(citizenId);
        setReports(data || []);
      } catch (error) {
        console.error("Failed to load history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Reports</h1>
          <p className="text-slate-500 mt-1">Track the status of your reported environmental issues.</p>
        </div>
        <Link 
          to="/citizen/new"
          className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg shadow hover:bg-emerald-700 transition"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Report New Issue
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-200">
          <img src="https://illustrations.popsy.co/emerald/nature-walk.svg" alt="Empty" className="w-48 mx-auto mb-4 opacity-75" />
          <h3 className="text-lg font-medium text-slate-900">No reports found</h3>
          <p className="text-slate-500 mt-2 mb-6">You haven't reported any waste issues yet.</p>
          <Link to="/citizen/new" className="text-emerald-600 font-medium hover:underline">
            Create your first report &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;
