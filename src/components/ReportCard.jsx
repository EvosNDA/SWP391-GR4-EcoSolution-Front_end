import React from 'react';
import StatusBadge from './StatusBadge';
import { MapPin, Calendar, Trash2 } from 'lucide-react';

const ReportCard = ({ report, actions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {report.imageUrl && (
        <div className="h-48 w-full overflow-hidden bg-slate-100">
          <img 
            src={report.imageUrl} 
            alt="Waste Report" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/400x300?text=No+Image';
            }}
          />
        </div>
      )}
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <StatusBadge status={report.status} />
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
            {report.wasteType}
          </span>
        </div>

        <p className="text-slate-800 font-medium mb-4 flex-grow">
          {report.description}
        </p>

        <div className="space-y-2 text-sm text-slate-500 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
            <span className="truncate" title={report.locationAddress}>
              {report.locationAddress}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              {report.createdAt 
                ? new Date(report.createdAt).toLocaleDateString('vi-VN') 
                : 'Just now'}
            </span>
          </div>
          {(report.citizenName || report.collectorName) && (
            <div className="flex items-center gap-2 border-t pt-2 mt-2 border-slate-100">
              <Trash2 className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="flex flex-col text-xs text-slate-400">
                {report.citizenName && <span>Reported by: {report.citizenName}</span>}
                {report.collectorName && <span>Assigned to: {report.collectorName}</span>}
              </div>
            </div>
          )}
        </div>

        {actions && <div className="mt-auto pt-4 border-t border-slate-100">{actions}</div>}
      </div>
    </div>
  );
};

export default ReportCard;
