import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, GenJamHeader } from '@/components';
import { User, Mail, Instagram, Linkedin, MapPin, Wifi, Clock, Sparkles } from 'lucide-react';

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
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // TODO: Save to backend
      console.log('Registration data:', formData);
      navigate('/skills-survey');
    }
  };

  return (
    <Layout
      currentStep={1}
      nextTo="/skills-survey"
      nextLabel="Continue to Skills Survey"
      nextDisabled={!formData.fullName || !formData.email}
      onNext={handleSubmit}
    >
      {/* Header */}
      <GenJamHeader
        title="Welcome to GenJam 2025!"
        subtitle="Join us for an incredible AI filmmaking experience. Register below to get started."
        currentStep={1}
        emoji="🎬"
      />

      <div className="mt-6 grid md:grid-cols-2 gap-5">
        {/* Registration Form */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-500" />
            Your Information
          </h2>

          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input pl-12"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
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
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram Handle <span className="text-gray-400">(optional)</span>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Profile <span className="text-gray-400">(optional)</span>
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

        {/* Venue Information */}
        <div className="card bg-primary-50 border border-primary-200">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-500" />
            Venue Information
          </h2>

          <div className="space-y-6">
            {/* WiFi */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Wifi className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">WiFi Access</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Network: <span className="font-mono font-semibold">GenJam_Guest</span>
                </p>
                <p className="text-sm text-gray-600">
                  Password: <span className="font-mono font-semibold">create2025!</span>
                </p>
              </div>
            </div>

            {/* Exit Time */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Clock className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Venue Exit Time</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Please vacate by <span className="font-semibold">11:00 PM sharp</span>
                </p>
              </div>
            </div>

            {/* Cleanup Reminder */}
            <div className="bg-white rounded-xl p-4 border border-primary-100">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">🧹 Cleanup Reminder:</span> Please help us
                keep the space tidy! Clean up your workspace and dispose of any trash
                before leaving.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fun fact */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          🎉 You're joining <span className="font-semibold text-primary-600">150+ creators</span> from around the world!
        </p>
      </div>
    </Layout>
  );
}
