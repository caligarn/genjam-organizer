import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, GenJamHeader } from '@/components';
import { cn } from '@/lib/utils';
import { Play, Trophy, Eye, Zap, X, Clock } from 'lucide-react';

interface ExampleFilm {
  id: number;
  title: string;
  team: string;
  event: string;
  duration: string;
  award?: string;
  awardIcon?: React.ReactNode;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  tools: string[];
  techniques: string[];
}

const EXAMPLE_FILMS: ExampleFilm[] = [
  {
    id: 1,
    title: 'The Last Algorithm',
    team: 'Neural Dreamers',
    event: 'GenJam SF 2024',
    duration: '2:34',
    award: 'Best Overall',
    awardIcon: <Trophy className="w-4 h-4" />,
    description: 'A poignant story about an AI learning to appreciate the beauty of impermanence as it faces decommissioning.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
    tools: ['Midjourney', 'Runway', 'ElevenLabs', 'Suno'],
    techniques: ['Consistent character design', 'Emotional pacing', 'Seamless transitions'],
  },
  {
    id: 2,
    title: 'Midnight Reset',
    team: 'Pixel Prophets',
    event: 'GenJam LA 2024',
    duration: '1:45',
    award: 'Best Visuals',
    awardIcon: <Eye className="w-4 h-4" />,
    description: 'A visually stunning exploration of consciousness transfer through neon-drenched cityscapes.',
    thumbnail: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=400&h=225&fit=crop',
    tools: ['DALL-E 3', 'Kling', 'Udio'],
    techniques: ['Color grading', 'Parallax motion', 'Sound design sync'],
  },
  {
    id: 3,
    title: 'Resolution Paradox',
    team: 'Glitch Collective',
    event: 'GenJam NYC 2024',
    duration: '3:12',
    award: 'Most WTF',
    awardIcon: <Zap className="w-4 h-4" />,
    description: 'A surreal journey through a therapy session where the therapist is also the patient, looping infinitely.',
    thumbnail: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=225&fit=crop',
    tools: ['Midjourney', 'Runway', 'ElevenLabs'],
    techniques: ['Recursive storytelling', 'Glitch aesthetics', 'Unreliable narrator'],
  },
  {
    id: 4,
    title: 'New Year, Old Soul',
    team: 'Digital Nomads',
    event: 'GenJam Tokyo 2024',
    duration: '2:18',
    description: 'A grandmother and her AI companion navigate the streets of future Tokyo during New Year celebrations.',
    thumbnail: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=225&fit=crop',
    tools: ['Midjourney', 'Pika', 'Suno'],
    techniques: ['Cultural authenticity', 'Character chemistry', 'Environmental storytelling'],
  },
  {
    id: 5,
    title: 'The Countdown',
    team: 'Frame by Frame',
    event: 'GenJam Berlin 2024',
    duration: '1:56',
    description: 'A race against time as a single mother navigates a city-wide blackout on New Year\'s Eve.',
    thumbnail: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&h=225&fit=crop',
    tools: ['DALL-E 3', 'Runway', 'ElevenLabs'],
    techniques: ['Tension building', 'Limited lighting', 'Diegetic sound'],
  },
  {
    id: 6,
    title: 'Fresh Start Protocol',
    team: 'Synth Vision',
    event: 'GenJam London 2024',
    duration: '2:45',
    description: 'In a world where memories can be erased, one person chooses to remember everything.',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=225&fit=crop',
    tools: ['Midjourney', 'Kling', 'Udio', 'ElevenLabs'],
    techniques: ['Memory visualization', 'Non-linear narrative', 'Emotional crescendo'],
  },
];

export function ExamplesPage() {
  const navigate = useNavigate();
  const [selectedFilm, setSelectedFilm] = useState<ExampleFilm | null>(null);

  return (
    <Layout
      currentStep={7}
      backTo="/cheatsheet"
      backLabel="Back to Cheat Sheet"
      nextTo="/storyboard"
      nextLabel="Continue to Storyboard"
      onNext={() => navigate('/storyboard')}
    >
      <GenJamHeader
        title="Inspiration Gallery"
        subtitle="Learn from past GenJam winners and standout submissions"
        currentStep={7}
        emoji="🎬"
      />

      <div className="mt-10 sm:mt-12 space-y-20">
        {/* Tips Card */}
        <div className="card bg-secondary-50 border border-secondary-200">
          <h3 className="font-bold mb-6">🎯 What to Look For</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
            <li>• <strong>Pacing</strong> - How do they maintain interest?</li>
            <li>• <strong>Style</strong> - What visual choices make it unique?</li>
            <li>• <strong>Sound</strong> - How does audio enhance the story?</li>
            <li>• <strong>Transitions</strong> - How do scenes flow together?</li>
          </ul>
        </div>

        {/* Films Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAMPLE_FILMS.map((film) => (
            <div
              key={film.id}
              className="card p-0 overflow-hidden cursor-pointer group"
              onClick={() => setSelectedFilm(film)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary-600 ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {film.duration}
                </div>

                {/* Award Badge */}
                {film.award && (
                  <div className={cn(
                    'absolute top-3 left-3 px-2 py-1 rounded text-white text-xs font-medium flex items-center gap-1',
                    film.award === 'Best Overall' && 'bg-amber-500',
                    film.award === 'Best Visuals' && 'bg-blue-500',
                    film.award === 'Most WTF' && 'bg-orange-500',
                  )}>
                    {film.awardIcon}
                    {film.award}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{film.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{film.team} • {film.event}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{film.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedFilm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80" onClick={() => setSelectedFilm(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Video placeholder */}
            <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
              <img
                src={selectedFilm.thumbnail}
                alt={selectedFilm.title}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-10 h-10 text-primary-600 ml-1" />
                </div>
              </div>
              <button
                onClick={() => setSelectedFilm(null)}
                className="absolute top-5 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedFilm.title}</h2>
                  <p className="text-gray-500">{selectedFilm.team} • {selectedFilm.event}</p>
                </div>
                {selectedFilm.award && (
                  <span className={cn(
                    'badge',
                    selectedFilm.award === 'Best Overall' && 'bg-amber-100 text-amber-700',
                    selectedFilm.award === 'Best Visuals' && 'bg-blue-100 text-blue-700',
                    selectedFilm.award === 'Most WTF' && 'bg-orange-100 text-orange-700',
                  )}>
                    {selectedFilm.award}
                  </span>
                )}
              </div>

              <p className="text-gray-700">{selectedFilm.description}</p>

              <div>
                <h4 className="font-semibold mb-3">Tools Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFilm.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{tool}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Notable Techniques</h4>
                <ul className="space-y-1">
                  {selectedFilm.techniques.map((technique) => (
                    <li key={technique} className="text-sm text-gray-600">• {technique}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
