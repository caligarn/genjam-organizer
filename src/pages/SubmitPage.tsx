import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, GenJamHeader } from '@/components';
import { cn } from '@/lib/utils';
import { Upload, Film, Users, FileVideo, X, Check, AlertCircle } from 'lucide-react';

interface SubmissionData {
  title: string;
  teamName: string;
  teamMembers: string;
  description: string;
  genre: string;
}

const GENRES = [
  'Drama',
  'Comedy',
  'Sci-Fi',
  'Horror',
  'Thriller',
  'Documentary',
  'Experimental',
  'Animation',
  'Romance',
  'Action',
];

const CHECKLIST = [
  { id: 'duration', label: 'Video is under 3 minutes' },
  { id: 'audio', label: 'Audio levels are balanced' },
  { id: 'credits', label: 'All team members are credited' },
  { id: 'theme', label: 'Film follows theme guidelines' },
  { id: 'ready', label: 'Ready for public viewing' },
];

export function SubmitPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<SubmissionData>({
    title: '',
    teamName: '',
    teamMembers: '',
    description: '',
    genre: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
      if (!validTypes.includes(selectedFile.type)) {
        alert('Please upload a valid video file (MP4, MOV, AVI, or WebM)');
        return;
      }
      // Validate file size (500MB)
      if (selectedFile.size > 500 * 1024 * 1024) {
        alert('File size must be under 500MB');
        return;
      }
      setFile(selectedFile);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isFormValid = () => {
    return (
      formData.title &&
      formData.teamName &&
      formData.description &&
      file &&
      uploadProgress >= 100 &&
      checkedItems.length === CHECKLIST.length
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      console.log('Submitting:', { ...formData, file });
      navigate('/voting');
    }
  };

  return (
    <Layout
      currentStep={9}
      backTo="/storyboard"
      backLabel="Back to Storyboard"
      nextTo="/voting"
      nextLabel="Submit & Continue to Voting"
      nextDisabled={!isFormValid()}
      onNext={handleSubmit}
    >
      <GenJamHeader
        title="Submit Your Final Work"
        subtitle="Upload your completed film and share your creative journey"
        currentStep={9}
        emoji="🎥"
      />

      <div className="mt-10 space-y-8">
        {/* Upload Section */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary-500" />
            Video Upload
          </h2>

          {!file ? (
            <label
              className="block border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all"
            >
              <FileVideo className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag and drop your video here
              </p>
              <p className="text-sm text-gray-500 mb-4">
                or click to browse
              </p>
              <p className="text-xs text-gray-400">
                Supported formats: MP4, MOV, AVI, WebM • Max size: 500MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          ) : (
            <div className="border-2 border-primary-200 bg-primary-50 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Film className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                {uploadProgress < 100 ? (
                  <div className="text-primary-600 font-medium">
                    {Math.round(uploadProgress)}%
                  </div>
                ) : (
                  <Check className="w-6 h-6 text-success-500" />
                )}
                <button
                  onClick={removeFile}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {uploading && (
                <div className="mt-3 h-2 bg-primary-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Film Details */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Film className="w-5 h-5 text-primary-500" />
            Film Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Film Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter your film's title"
                className="input"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  placeholder="Your team's name"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                <select
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  className="input"
                >
                  <option value="">Select a genre</option>
                  {GENRES.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Team Members
              </label>
              <input
                type="text"
                value={formData.teamMembers}
                onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                placeholder="List all team members (comma separated)"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your film in a few sentences..."
                className="input min-h-[100px] resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {formData.description.length}/500
              </p>
            </div>
          </div>
        </div>

        {/* Submission Checklist */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary-500" />
            Submission Checklist
          </h2>

          <div className="space-y-3">
            {CHECKLIST.map((item) => (
              <label
                key={item.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all',
                  checkedItems.includes(item.id)
                    ? 'bg-success-400/10 border border-success-500/30'
                    : 'bg-gray-50 border border-transparent hover:bg-gray-100'
                )}
              >
                <div
                  className={cn(
                    'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all',
                    checkedItems.includes(item.id)
                      ? 'bg-success-500 border-success-500 text-white'
                      : 'border-gray-300'
                  )}
                >
                  {checkedItems.includes(item.id) && <Check className="w-4 h-4" />}
                </div>
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item.id)}
                  onChange={() => toggleCheck(item.id)}
                  className="hidden"
                />
                <span className={cn(
                  'text-gray-700',
                  checkedItems.includes(item.id) && 'text-success-700'
                )}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>

          {checkedItems.length === CHECKLIST.length && (
            <div className="mt-4 p-3 bg-success-400/10 border border-success-500/30 rounded-xl">
              <p className="text-success-700 font-medium">
                ✓ All checks complete! You're ready to submit.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
