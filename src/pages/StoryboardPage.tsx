import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components';
import { cn } from '@/lib/utils';
import { Plus, Trash2, GripVertical, Image, Wand2, Save, Camera } from 'lucide-react';

interface StoryboardFrame {
  id: number;
  sceneNumber: number;
  shotType: string;
  description: string;
  imageUrl?: string;
  notes: string;
}

const SHOT_TYPES = [
  'Wide Shot',
  'Medium Shot',
  'Close-up',
  'Extreme Close-up',
  'Over the Shoulder',
  'POV',
  'Establishing Shot',
  'Insert Shot',
];

export function StoryboardPage() {
  const navigate = useNavigate();
  const [frames, setFrames] = useState<StoryboardFrame[]>([
    { id: 1, sceneNumber: 1, shotType: 'Establishing Shot', description: '', notes: '' },
    { id: 2, sceneNumber: 2, shotType: 'Medium Shot', description: '', notes: '' },
    { id: 3, sceneNumber: 3, shotType: 'Close-up', description: '', notes: '' },
  ]);
  const [generating, setGenerating] = useState<number | null>(null);

  const addFrame = () => {
    const newFrame: StoryboardFrame = {
      id: Date.now(),
      sceneNumber: frames.length + 1,
      shotType: 'Medium Shot',
      description: '',
      notes: '',
    };
    setFrames([...frames, newFrame]);
  };

  const removeFrame = (id: number) => {
    setFrames(frames.filter((f) => f.id !== id).map((f, i) => ({ ...f, sceneNumber: i + 1 })));
  };

  const updateFrame = (id: number, updates: Partial<StoryboardFrame>) => {
    setFrames(frames.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const generateImage = async (id: number) => {
    setGenerating(id);
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const placeholderImages = [
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225&fit=crop',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=225&fit=crop',
    ];
    updateFrame(id, { imageUrl: placeholderImages[Math.floor(Math.random() * placeholderImages.length)] });
    setGenerating(null);
  };

  return (
    <Layout
      currentStep={8}
      title="Storyboard Workspace"
      subtitle="Visualize your film before production begins"
      emoji="🎨"
      backTo="/examples"
      backLabel="Back to Examples"
      nextTo="/submit"
      nextLabel="Continue to Submit"
      onNext={() => navigate('/submit')}
    >
      <div className="space-y-8">
        {/* Shot Types Reference */}
        <div className="card bg-secondary-50 border border-secondary-200">
          <div className="flex items-center gap-2 mb-6">
            <Camera className="w-5 h-5 text-secondary-600" />
            <h3 className="font-bold">Quick Shot Reference</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {SHOT_TYPES.map((type) => (
              <span key={type} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border">
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Frames */}
        <div className="space-y-4">
          {frames.map((frame) => (
            <div key={frame.id} className="card">
              <div className="flex items-start gap-5">
                {/* Drag Handle */}
                <div className="flex-shrink-0 pt-2 cursor-move text-gray-400 hover:text-gray-600">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Image Area */}
                <div className="w-40 flex-shrink-0">
                  <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative group">
                    {frame.imageUrl ? (
                      <img src={frame.imageUrl} alt={`Scene ${frame.sceneNumber}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Image className="w-8 h-8" />
                      </div>
                    )}
                    <button
                      onClick={() => generateImage(frame.id)}
                      disabled={generating === frame.id}
                      className={cn(
                        'absolute inset-0 bg-primary-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity',
                        generating === frame.id && 'opacity-100'
                      )}
                    >
                      {generating === frame.id ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="text-white text-center">
                          <Wand2 className="w-6 h-6 mx-auto mb-1" />
                          <span className="text-xs">Generate</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-5">
                    <span className="badge badge-primary">Scene {frame.sceneNumber}</span>
                    <select
                      value={frame.shotType}
                      onChange={(e) => updateFrame(frame.id, { shotType: e.target.value })}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none"
                    >
                      {SHOT_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    value={frame.description}
                    onChange={(e) => updateFrame(frame.id, { description: e.target.value })}
                    placeholder="Describe this scene... (e.g., 'Character walks through neon-lit alley, looking over shoulder')"
                    className="input min-h-[80px] resize-none text-sm"
                  />

                  <input
                    type="text"
                    value={frame.notes}
                    onChange={(e) => updateFrame(frame.id, { notes: e.target.value })}
                    placeholder="Notes (camera movement, lighting, etc.)"
                    className="input text-sm"
                  />
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeFrame(frame.id)}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Frame Button */}
        <button
          onClick={addFrame}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Frame
        </button>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="btn btn-primary">
            <Save className="w-4 h-4" />
            Save Storyboard
          </button>
        </div>
      </div>
    </Layout>
  );
}
