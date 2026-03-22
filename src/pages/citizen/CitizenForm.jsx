import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reportService from '../../services/reportService';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Camera, MapPin, Send, Loader2, UploadCloud } from 'lucide-react';

const CitizenForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [report, setReport] = useState({ 
    locationAddress: '', 
    description: '',
    imageUrl: '', // We allow string input, but maybe pre-filled for demo
    wasteType: 'RECYCLABLE',
    citizenId: 1 // Default mock ID
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== 'CITIZEN') {
      alert("Please login as a Citizen to submit a report.");
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = report.imageUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadRes = await api.post('/images/upload', formData, {
           headers: { 'Content-Type': 'multipart/form-data' }
        });
        finalImageUrl = uploadRes.data;
      }

      const payload = {
        ...report,
        citizenId: user.id,
        imageUrl: finalImageUrl || 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=800&auto=format&fit=crop'
      };
      await reportService.createReport(payload);
      alert(`Report submitted successfully!`);
      navigate('/citizen');
    } catch (error) {
      console.error("Failed to submit report", error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-emerald-600 p-8 text-center sm:text-left">
          <h2 className="text-3xl font-extrabold text-white">Report Waste Issue</h2>
          <p className="mt-2 text-emerald-100 text-sm">
            Help us keep the environment clean by reporting scattered waste in your area.
          </p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-1">
              <label className="flex items-center text-sm font-semibold text-slate-700">
                <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                Location Address
              </label>
              <input 
                type="text" 
                placeholder="E.g., 123 Green Avenue, NY"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                value={report.locationAddress}
                onChange={(e) => setReport({...report, locationAddress: e.target.value})}
                required 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Waste Type</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                  value={report.wasteType}
                  onChange={(e) => setReport({...report, wasteType: e.target.value})}
                  required
                >
                  <option value="RECYCLABLE">Recyclable</option>
                  <option value="NON_RECYCLABLE">Non-Recyclable</option>
                  <option value="HAZARDOUS">Hazardous</option>
                  <option value="ALL">Mixed/All</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="flex items-center text-sm font-semibold text-slate-700">
                  <UploadCloud className="w-4 h-4 mr-2 text-emerald-500" />
                  Upload Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <div className="space-y-1 text-center">
                    <Camera className="mx-auto h-8 w-8 text-slate-400" />
                    <div className="flex text-sm text-slate-600 justify-center">
                      <label className="relative cursor-pointer rounded-md bg-transparent font-medium text-emerald-600 focus-within:outline-none hover:text-emerald-500">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                      </label>
                    </div>
                    <p className="text-xs text-slate-500">{imageFile ? imageFile.name : 'PNG, JPG up to 10MB'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <textarea 
                placeholder="Please describe the waste problem in detail..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
                rows="4"
                value={report.description}
                onChange={(e) => setReport({...report, description: e.target.value})}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Report
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CitizenForm;