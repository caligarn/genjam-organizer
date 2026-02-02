import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, GenJamHeader } from '@/components';
import { cn } from '@/lib/utils';
import { MessageSquare, Heart, Send, RefreshCw, Lightbulb } from 'lucide-react';

interface Response {
  id: number;
  name: string;
  avatar: string;
  response: string;
  likes: number;
  liked: boolean;
}

const PROMPTS = [
  "If you could make a film about any historical event using AI, what would it be?",
  "What's the weirdest AI-generated image you've ever created?",
  "If you could collaborate with any filmmaker (living or dead) on an AI project, who would it be?",
  "Describe your dream AI filmmaking tool that doesn't exist yet.",
  "What's the most unexpected thing you've learned from using AI creative tools?",
];

const DUMMY_RESPONSES: Response[] = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: '🎬',
    response: "I'd make a documentary about the Library of Alexandria, showing all the lost knowledge being recreated by AI!",
    likes: 12,
    liked: false,
  },
  {
    id: 2,
    name: 'Maya Patel',
    avatar: '✨',
    response: "The weirdest AI image I made was 'a cat as a Renaissance painting' and it gave me a cat with human hands!",
    likes: 8,
    liked: false,
  },
  {
    id: 3,
    name: 'Jordan Kim',
    avatar: '🎭',
    response: "I'd collab with Hayao Miyazaki to create an AI-assisted animated film blending Ghibli style with generative art.",
    likes: 15,
    liked: false,
  },
];

export function IcebreakerPage() {
  const navigate = useNavigate();
  const [currentPrompt, setCurrentPrompt] = useState(PROMPTS[0]);
  const [userResponse, setUserResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState<Response[]>(DUMMY_RESPONSES);

  const shufflePrompt = () => {
    const otherPrompts = PROMPTS.filter((p) => p !== currentPrompt);
    setCurrentPrompt(otherPrompts[Math.floor(Math.random() * otherPrompts.length)]);
  };

  const handleSubmit = () => {
    if (userResponse.trim()) {
      setSubmitted(true);
      const newResponse: Response = {
        id: responses.length + 1,
        name: 'You',
        avatar: '🌟',
        response: userResponse,
        likes: 0,
        liked: false,
      };
      setResponses([newResponse, ...responses]);
    }
  };

  const toggleLike = (id: number) => {
    setResponses((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, likes: r.liked ? r.likes - 1 : r.likes + 1, liked: !r.liked }
          : r
      )
    );
  };

  return (
    <Layout
      currentStep={3}
      backTo="/skills-survey"
      backLabel="Back to Skills Survey"
      nextTo="/ideas-submission"
      nextLabel="Continue to Ideas"
      onNext={() => navigate('/ideas-submission')}
      header={
        <GenJamHeader
          title="Icebreaker Challenge"
          subtitle="Let's have some fun and get to know each other!"
          currentStep={3}
          emoji="🎮"
        />
      }
    >
      <div className="mt-8 sm:mt-10 space-y-8 sm:space-y-10">
        {/* Prompt Card */}
        <div className="card bg-gradient-hero text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative">
            <div className="flex items-start justify-between gap-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-80">Today's Prompt</p>
                </div>
              </div>
              <button
                onClick={shufflePrompt}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                New Prompt
              </button>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
              "{currentPrompt}"
            </p>
          </div>
        </div>

        {/* Response Input */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary-500" />
            Your Response
          </h2>

          {!submitted ? (
            <div className="space-y-4">
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder="Share your creative thoughts..."
                maxLength={300}
                className="input min-h-[120px] resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{userResponse.length}/300</span>
                <button
                  onClick={handleSubmit}
                  disabled={!userResponse.trim()}
                  className={cn('btn btn-primary', !userResponse.trim() && 'opacity-50 cursor-not-allowed')}
                >
                  <Send className="w-4 h-4" />
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-success-400/10 border border-success-500/30 rounded-2xl p-5">
              <p className="text-success-600 font-medium">✓ Response submitted!</p>
            </div>
          )}
        </div>

        {/* Other Responses */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Community Responses</h2>
          <div className="grid gap-5">
            {responses.map((response) => (
              <div key={response.id} className={cn('card', response.name === 'You' && 'border-2 border-primary-300')}>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-2xl">
                    {response.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-semibold">{response.name}</span>
                      {response.name === 'You' && <span className="badge badge-primary text-xs">You</span>}
                    </div>
                    <p className="text-gray-700">{response.response}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => toggleLike(response.id)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all',
                      response.liked ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-red-50'
                    )}
                  >
                    <Heart className={cn('w-4 h-4', response.liked && 'fill-current')} />
                    <span>{response.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
