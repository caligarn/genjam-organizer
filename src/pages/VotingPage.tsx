import { useState } from 'react';
import { Layout, GenJamHeader } from '@/components';
import { cn } from '@/lib/utils';
import { Trophy, Eye, Zap, Check, Clock, Play, PartyPopper } from 'lucide-react';

interface Submission {
  id: number;
  title: string;
  team: string;
  duration: string;
  thumbnail: string;
}

interface CategoryVotes {
  overall: number[];
  visuals: number[];
  wtf: number[];
}

const SUBMISSIONS: Submission[] = [
  { id: 1, title: 'The Last Algorithm', team: 'Neural Dreamers', duration: '2:34', thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=169&fit=crop' },
  { id: 2, title: 'Midnight Reset', team: 'Pixel Prophets', duration: '1:45', thumbnail: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=300&h=169&fit=crop' },
  { id: 3, title: 'Resolution Paradox', team: 'Glitch Collective', duration: '3:12', thumbnail: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=169&fit=crop' },
  { id: 4, title: 'New Year, Old Soul', team: 'Digital Nomads', duration: '2:18', thumbnail: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=169&fit=crop' },
  { id: 5, title: 'The Countdown', team: 'Frame by Frame', duration: '1:56', thumbnail: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=300&h=169&fit=crop' },
  { id: 6, title: 'Fresh Start Protocol', team: 'Synth Vision', duration: '2:45', thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=169&fit=crop' },
  { id: 7, title: 'Binary Dreams', team: 'Code Artists', duration: '2:10', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=169&fit=crop' },
  { id: 8, title: 'The Memory Keeper', team: 'Nostalgia Inc', duration: '2:55', thumbnail: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=300&h=169&fit=crop' },
  { id: 9, title: 'Quantum Love', team: 'Wave Function', duration: '1:30', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=169&fit=crop' },
  { id: 10, title: 'Year Zero', team: 'Reset Button', duration: '2:22', thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=169&fit=crop' },
];

const CATEGORIES = [
  {
    id: 'overall',
    name: 'Best Overall',
    description: 'The most impressive overall submission with great story, execution, and creativity',
    icon: <Trophy className="w-5 h-5" />,
    color: 'amber',
  },
  {
    id: 'visuals',
    name: 'Best Visuals',
    description: 'The most visually stunning submission with exceptional aesthetics and production quality',
    icon: <Eye className="w-5 h-5" />,
    color: 'blue',
  },
  {
    id: 'wtf',
    name: 'Most WTF',
    description: 'The most unexpected, bizarre, or mind-bending submission that made you say "WTF?!"',
    icon: <Zap className="w-5 h-5" />,
    color: 'orange',
  },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

export function VotingPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('overall');
  const [votes, setVotes] = useState<CategoryVotes>({
    overall: [],
    visuals: [],
    wtf: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleVote = (submissionId: number) => {
    setVotes((prev) => {
      const categoryVotes = prev[activeCategory];
      if (categoryVotes.includes(submissionId)) {
        return { ...prev, [activeCategory]: categoryVotes.filter((id) => id !== submissionId) };
      } else if (categoryVotes.length < 3) {
        return { ...prev, [activeCategory]: [...categoryVotes, submissionId] };
      }
      return prev;
    });
  };

  const isComplete = () => {
    return votes.overall.length === 3 && votes.visuals.length === 3 && votes.wtf.length === 3;
  };

  const handleSubmit = () => {
    if (isComplete()) {
      // TODO: Submit votes to backend
      console.log('Votes submitted:', votes);
      setSubmitted(true);
    }
  };

  const getCategoryColor = (color: string) => {
    const colors = {
      amber: { bg: 'bg-amber-500', light: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', ring: 'ring-amber-400' },
      blue: { bg: 'bg-blue-500', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', ring: 'ring-blue-400' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', ring: 'ring-orange-400' },
    };
    return colors[color as keyof typeof colors];
  };

  const activeColors = getCategoryColor(CATEGORIES.find((c) => c.id === activeCategory)!.color);

  if (submitted) {
    return (
      <Layout currentStep={11} backTo="/submit" backLabel="Back">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-8">
            <PartyPopper className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            🎉 Thank You for Participating!
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
            Your votes have been submitted successfully. Thank you for being part of GenJam 2025!
          </p>
          <div className="card max-w-md mx-auto">
            <h3 className="font-bold mb-8">Stay Connected</h3>
            <p className="text-sm text-gray-600 mb-8">
              Follow Machine Cinema for future events and community updates.
            </p>
            <a
              href="https://machinecinema.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              Visit Machine Cinema
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      currentStep={11}
      backTo="/submit"
      backLabel="Back to Submit"
      nextTo="#"
      nextLabel="Submit All Votes"
      nextDisabled={!isComplete()}
      onNext={handleSubmit}
    >
      <GenJamHeader
        title="Vote for Your Favorites"
        subtitle="Select 3 films in each category to cast your votes"
        currentStep={11}
        emoji="🏆"
      />

      <div className="space-y-8 sm:space-y-10">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => {
            const colors = getCategoryColor(category.color);
            const voteCount = votes[category.id].length;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 rounded-2xl font-medium whitespace-nowrap transition-all',
                  isActive
                    ? `${colors.bg} text-white shadow-lg`
                    : `${colors.light} ${colors.text} ${colors.border} border hover:opacity-80`
                )}
              >
                {category.icon}
                {category.name}
                <span className={cn(
                  'ml-1 px-2 py-0.5 rounded-full text-xs',
                  isActive ? 'bg-white/20' : `${colors.bg} text-white`
                )}>
                  {voteCount}/3
                </span>
                {voteCount === 3 && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        <div className={cn('rounded-2xl p-6 border', activeColors.light, activeColors.border)}>
          <p className={cn('text-sm', activeColors.text)}>
            {CATEGORIES.find((c) => c.id === activeCategory)?.description}
          </p>
        </div>

        {/* Submissions Grid */}
        <div className="grid grid-cols-2 gap-8">
          {SUBMISSIONS.map((submission) => {
            const isSelected = votes[activeCategory].includes(submission.id);
            const canSelect = votes[activeCategory].length < 3;

            return (
              <div
                key={submission.id}
                onClick={() => (isSelected || canSelect) && toggleVote(submission.id)}
                className={cn(
                  'relative rounded-2xl overflow-hidden cursor-pointer transition-all group',
                  isSelected && `ring-4 ${activeColors.ring} ring-offset-2`,
                  !isSelected && !canSelect && 'opacity-50 cursor-not-allowed'
                )}
              >
                {/* Thumbnail */}
                <div className="aspect-video relative">
                  <img
                    src={submission.thumbnail}
                    alt={submission.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-gray-800 ml-0.5" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 rounded text-white text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {submission.duration}
                  </div>

                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className={cn('absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white', activeColors.bg)}>
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 bg-white">
                  <h4 className="font-medium text-sm truncate">{submission.title}</h4>
                  <p className="text-xs text-gray-500 truncate">{submission.team}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vote Status */}
        <div className="card">
          <h3 className="font-bold mb-8">Vote Summary</h3>
          <div className="grid gap-8">
            {CATEGORIES.map((category) => {
              const colors = getCategoryColor(category.color);
              const voteCount = votes[category.id].length;
              const isComplete = voteCount === 3;

              return (
                <div
                  key={category.id}
                  className={cn(
                    'rounded-2xl p-6 border',
                    isComplete ? `${colors.light} ${colors.border}` : 'bg-gray-50 border-gray-200'
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{category.name}</span>
                    {isComplete ? (
                      <span className={cn('text-sm font-medium', colors.text)}>✓ Complete</span>
                    ) : (
                      <span className="text-sm text-gray-500">{voteCount}/3</span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-2 flex-1 rounded-full transition-colors',
                          i < voteCount ? colors.bg : 'bg-gray-200'
                        )}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {!isComplete() && (
            <p className="mt-4 text-sm text-gray-500 text-center">
              Please select 3 favorites in each category before submitting.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
