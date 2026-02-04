import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, GenJamHeader } from '@/components';
import { cn } from '@/lib/utils';
import { Lightbulb, Heart, Send, Sparkles, Users } from 'lucide-react';

interface Idea {
  id: number;
  title: string;
  description: string;
  author: string;
  votes: number;
  voted: boolean;
}

const DUMMY_IDEAS: Idea[] = [
  {
    id: 1,
    title: "The Last Resolution",
    description: "A time traveler keeps going back to change their New Year's resolution, but each change creates unexpected consequences.",
    author: "Alex Chen",
    votes: 8,
    voted: false,
  },
  {
    id: 2,
    title: "Midnight Reset",
    description: "At the stroke of midnight, everyone in the world swaps bodies with a stranger. Follow three people as they navigate their new lives.",
    author: "Maya Patel",
    votes: 12,
    voted: false,
  },
  {
    id: 3,
    title: "Resolution Paradox",
    description: "An AI therapist helps people with their resolutions, but discovers its own existential crisis when asked about its goals.",
    author: "Jordan Kim",
    votes: 6,
    voted: false,
  },
  {
    id: 4,
    title: "The Countdown",
    description: "A single mother races against time on New Year's Eve to get home before midnight to fulfill a promise to her daughter.",
    author: "Sam Taylor",
    votes: 9,
    voted: false,
  },
];

export function IdeasSubmissionPage() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState<Idea[]>(DUMMY_IDEAS);
  const [newIdea, setNewIdea] = useState({ title: '', description: '' });
  const [submitted, setSubmitted] = useState(false);
  const [votesUsed, setVotesUsed] = useState(0);
  const MAX_VOTES = 3;

  const handleSubmitIdea = () => {
    if (newIdea.title.trim() && newIdea.description.trim()) {
      const idea: Idea = {
        id: ideas.length + 1,
        title: newIdea.title,
        description: newIdea.description,
        author: 'You',
        votes: 0,
        voted: false,
      };
      setIdeas([idea, ...ideas]);
      setSubmitted(true);
      setNewIdea({ title: '', description: '' });
    }
  };

  const toggleVote = (id: number) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === id) {
          if (idea.voted) {
            setVotesUsed((v) => v - 1);
            return { ...idea, votes: idea.votes - 1, voted: false };
          } else if (votesUsed < MAX_VOTES) {
            setVotesUsed((v) => v + 1);
            return { ...idea, votes: idea.votes + 1, voted: true };
          }
        }
        return idea;
      })
    );
  };

  return (
    <Layout
      currentStep={5}
      backTo="/icebreaker"
      backLabel="Back to Icebreaker"
      nextTo="/workflow"
      nextLabel="Continue to Workflow"
      onNext={() => navigate('/workflow')}
    >
      <GenJamHeader
        title="Idea Submission & Voting"
        subtitle="Share your creative vision and vote for your top 3 favorite ideas"
        currentStep={5}
        emoji="💡"
      />

      <div className="space-y-32 sm:space-y-40">
        {/* Today's Theme */}
        <div className="card bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
          <div className="flex items-start gap-32">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Lightbulb className="w-7 h-7 text-amber-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-amber-900 mb-12">
                Today's Theme: New Year 🎊
              </h2>
              <p className="text-amber-800 mb-32">
                Create a short film exploring themes of renewal, reflection, fresh starts, resolutions, countdowns, or celebrating new beginnings.
              </p>
              <div className="flex flex-wrap gap-8">
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">Time Travel</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">Transformation</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">Second Chances</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">Celebration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Your Idea */}
        <div className="card">
          <h2 className="text-xl font-bold mb-32 flex items-center gap-8">
            <Sparkles className="w-5 h-5 text-primary-500" />
            Submit Your Idea
          </h2>

          {!submitted ? (
            <div className="space-y-16">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-12">Idea Title</label>
                <input
                  type="text"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., The Last Resolution"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-12">Description</label>
                <textarea
                  value={newIdea.description}
                  onChange={(e) => setNewIdea((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your film concept in 2-3 sentences..."
                  className="input min-h-[100px] resize-none"
                />
              </div>
              <button
                onClick={handleSubmitIdea}
                disabled={!newIdea.title.trim() || !newIdea.description.trim()}
                className={cn(
                  'btn btn-primary w-full',
                  (!newIdea.title.trim() || !newIdea.description.trim()) && 'opacity-50 cursor-not-allowed'
                )}
              >
                <Send className="w-4 h-4" />
                Submit Idea
              </button>
            </div>
          ) : (
            <div className="bg-success-400/10 border border-success-500/30 rounded-2xl p-24">
              <p className="text-success-600 font-medium">✓ Idea submitted! Now vote for your favorites below.</p>
            </div>
          )}
        </div>

        {/* Vote Counter */}
        <div className="bg-primary-50 rounded-2xl p-24 border border-primary-200 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Users className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-primary-700">Vote for Ideas</span>
          </div>
          <div className="flex items-center gap-8">
            <span className={cn('font-bold', votesUsed === MAX_VOTES ? 'text-success-600' : 'text-primary-600')}>
              {votesUsed}/{MAX_VOTES}
            </span>
            <span className="text-gray-500">votes used</span>
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid gap-32">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className={cn(
                'card transition-all',
                idea.voted && 'border-2 border-primary-400 bg-primary-50/50'
              )}
            >
              <div className="flex items-start justify-between gap-32">
                <div className="flex-1">
                  <div className="flex items-center gap-8 mb-12">
                    <h3 className="font-bold text-lg">{idea.title}</h3>
                    {idea.author === 'You' && <span className="badge badge-primary text-xs">Your Idea</span>}
                  </div>
                  <p className="text-gray-600 mb-12">{idea.description}</p>
                  <p className="text-sm text-gray-500">by {idea.author}</p>
                </div>
                <button
                  onClick={() => toggleVote(idea.id)}
                  disabled={!idea.voted && votesUsed >= MAX_VOTES}
                  className={cn(
                    'flex flex-col items-center gap-1 p-12 rounded-2xl transition-all min-w-[60px]',
                    idea.voted
                      ? 'bg-primary-500 text-white'
                      : votesUsed >= MAX_VOTES
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
                  )}
                >
                  <Heart className={cn('w-5 h-5', idea.voted && 'fill-current')} />
                  <span className="font-bold text-sm">{idea.votes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
