import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, GenJamHeader } from '@/components';
import { User, Mail, Instagram, Linkedin, Wifi, Clock, AlertTriangle } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  instagram: string;
  linkedin: string;
}

export function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    instagram: '',
    linkedin: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // TODO: Save to backend
    console.log('Registration data:', formData);
    navigate('/skills-survey');
  };

  return (
    <Layout
      currentStep={1}
      nextTo="/skills-survey"
      nextLabel="Continue to Skills Survey"
      onNext={handleSubmit}
    >
      {/* Header */}
      <GenJamHeader
        title="Welcome to GenJam 2025!"
        subtitle="Let's get you registered for today's creative event"
        currentStep={1}
        emoji="🎬"
      />

      <div className="space-y-8 sm:space-y-10">
        {/* Registration Form Card */}
        <div className="card">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Name <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="input pl-12"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Email <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="input pl-12"
                />
              </div>
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Instagram <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="@yourusername"
                  className="input pl-12"
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                LinkedIn <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/yourprofile"
                  className="input pl-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Venue Information Card */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            📍 Venue Information
          </h2>

          <div className="space-y-6">
            {/* WiFi Info */}
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
              <Wifi className="w-6 h-6 text-primary-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">WiFi Network:</span>
                  <span className="font-mono font-semibold text-gray-900 bg-white px-3 py-1 rounded-lg">GenJam_Guest</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">WiFi Password:</span>
                  <span className="font-mono font-semibold text-gray-900 bg-white px-3 py-1 rounded-lg">create2025!</span>
                </div>
              </div>
            </div>

            {/* Important Reminders */}
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-3">Important Reminders:</h3>
                  <ul className="space-y-3 text-sm text-amber-700">
                    <li className="flex items-start gap-3">
                      <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Event ends at <strong>11:00 PM</strong> - please wrap up by then</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lg">🧹</span>
                      <span>Please clean up your workspace before leaving</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lg">📦</span>
                      <span>Return any borrowed equipment to the front desk</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
