import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Users, Truck } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 bg-emerald-50 h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#86efac] to-[#047857] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
            Keep Our City <span className="text-emerald-600">Clean & Green</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            EcoSolution is a revolutionary waste management system empowering citizens to report waste, and helping authorities to clean them up efficiently. Select your role to get started.
          </p>
        </div>
      </div>

      {/* Role Selection */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

            {/* Citizen */}
            <Link to="/citizen" className="group rounded-2xl p-8 bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Citizen</h3>
              <p className="text-slate-500">Report waste in your locality and track the cleanup progress in real-time.</p>
            </Link>

            {/* Manager */}
            <Link to="/manager" className="group rounded-2xl p-8 bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:blue-500 transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Manager</h3>
              <p className="text-slate-500">Review incoming reports and dispatch field collectors efficiently.</p>
            </Link>

            {/* Collector */}
            <Link to="/collector" className="group rounded-2xl p-8 bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:purple-500 transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Collector</h3>
              <p className="text-slate-500">View your assigned tasks, navigate to locations, and update statuses.</p>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
