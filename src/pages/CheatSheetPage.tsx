import { useNavigate } from 'react-router-dom';
import { Layout, GenJamHeader } from '@/components';
import { cn } from '@/lib/utils';
import { Pen, Image, Video, Volume2, Music, ExternalLink, Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Tool {
  name: string;
  description: string;
  features: string[];
  tips: string;
  link: string;
  promoCode?: string;
  promoDiscount?: string;
}

interface ToolCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  tools: Tool[];
}

const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'writing',
    name: 'Writing & Storytelling',
    icon: <Pen className="w-5 h-5" />,
    color: 'from-blue-500 to-blue-600',
    tools: [
      {
        name: 'ChatGPT',
        description: 'Versatile AI assistant for script writing, dialogue, and brainstorming',
        features: ['Script outlines', 'Character dialogue', 'Story structure', 'Scene descriptions'],
        tips: 'Use specific prompts like "Write a 2-minute short film script about..."',
        link: 'https://chat.openai.com',
      },
      {
        name: 'Claude',
        description: 'Excellent for long-form narrative and nuanced character development',
        features: ['Long context', 'Character arcs', 'Editing assistance', 'World building'],
        tips: 'Great for refining drafts and catching plot holes',
        link: 'https://claude.ai',
        promoCode: 'GENJAM25',
        promoDiscount: '20% off Pro',
      },
    ],
  },
  {
    id: 'image',
    name: 'Image Generation',
    icon: <Image className="w-5 h-5" />,
    color: 'from-purple-500 to-purple-600',
    tools: [
      {
        name: 'Midjourney',
        description: 'Industry-leading image generation with stunning artistic styles',
        features: ['Artistic styles', 'Character design', 'Environments', 'Concept art'],
        tips: 'Use --ar 16:9 for cinematic aspect ratio, --v 6 for latest model',
        link: 'https://midjourney.com',
        promoCode: 'GENJAM2025',
        promoDiscount: '15% off',
      },
      {
        name: 'DALL-E 3',
        description: 'Great for precise prompts and photorealistic images',
        features: ['Text accuracy', 'Photorealism', 'Quick iterations', 'API access'],
        tips: 'Be very specific about composition and lighting in prompts',
        link: 'https://openai.com/dall-e-3',
      },
    ],
  },
  {
    id: 'video',
    name: 'Video Generation',
    icon: <Video className="w-5 h-5" />,
    color: 'from-red-500 to-red-600',
    tools: [
      {
        name: 'Runway Gen-3',
        description: 'Powerful video generation and editing with motion control',
        features: ['Text to video', 'Image to video', 'Motion brush', 'Green screen'],
        tips: 'Start with 4-second clips, extend as needed',
        link: 'https://runway.ml',
        promoCode: 'MACHINECINEMA',
        promoDiscount: '100 free credits',
      },
      {
        name: 'Kling AI',
        description: 'High-quality cinematic video generation',
        features: ['Long videos', 'Camera control', 'Character consistency', 'Lip sync'],
        tips: 'Use motion mode for complex camera movements',
        link: 'https://kling.ai',
      },
      {
        name: 'Luma Dream Machine',
        description: 'Fast video generation with realistic motion',
        features: ['Quick renders', 'Natural motion', 'Extend clips', 'Style transfer'],
        tips: 'Best for establishing shots and ambient scenes',
        link: 'https://lumalabs.ai',
        promoCode: 'GENJAM50',
        promoDiscount: '50 free generations',
      },
    ],
  },
  {
    id: 'sound',
    name: 'Sound Effects & Voice',
    icon: <Volume2 className="w-5 h-5" />,
    color: 'from-green-500 to-green-600',
    tools: [
      {
        name: 'ElevenLabs',
        description: 'Industry-leading AI voice generation and cloning',
        features: ['Voice cloning', 'Multiple languages', 'Emotion control', 'Sound effects'],
        tips: 'Clone your own voice for narrator, use presets for characters',
        link: 'https://elevenlabs.io',
        promoCode: 'GENJAM25',
        promoDiscount: '10,000 free characters',
      },
    ],
  },
  {
    id: 'music',
    name: 'Music Generation',
    icon: <Music className="w-5 h-5" />,
    color: 'from-amber-500 to-amber-600',
    tools: [
      {
        name: 'Suno AI',
        description: 'Create original songs and soundtracks with vocals',
        features: ['Full songs', 'Custom lyrics', 'Genre selection', 'Instrumental'],
        tips: 'Use instrumental mode for background music, specify tempo and mood',
        link: 'https://suno.ai',
      },
      {
        name: 'Udio',
        description: 'High-quality music generation with fine control',
        features: ['Music styles', 'Extend tracks', 'Remix', 'Stems export'],
        tips: 'Great for creating theme music and emotional cues',
        link: 'https://udio.com',
      },
    ],
  },
];

const SPONSORS = [
  { name: 'Google', logo: '🔵' },
  { name: 'OpenAI', logo: '🟢' },
  { name: 'ByteDance', logo: '⚫' },
  { name: 'Luma AI', logo: '🟣' },
];

export function CheatSheetPage() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <Layout
      currentStep={6}
      backTo="/workflow"
      backLabel="Back to Workflow"
      nextTo="/examples"
      nextLabel="Continue to Examples"
      onNext={() => navigate('/examples')}
    >
      <GenJamHeader
        title="GenJam Cheat Sheet"
        subtitle="Essential tools and resources for your creative journey"
        currentStep={6}
        emoji="🛠️"
      />

      <div className="mt-10 space-y-8">
        {/* Sponsors */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-bold">Today's Sponsors</h2>
          </div>
          <p className="text-gray-600 mb-6">Thank you to our amazing sponsors for making this event possible!</p>
          <div className="flex justify-center gap-8 flex-wrap">
            {SPONSORS.map((sponsor) => (
              <div key={sponsor.name} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-3xl">
                  {sponsor.logo}
                </div>
                <span className="text-sm font-medium text-gray-600">{sponsor.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tool Categories */}
        {TOOL_CATEGORIES.map((category) => (
          <div key={category.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br text-white flex items-center justify-center', category.color)}>
                {category.icon}
              </div>
              <h2 className="text-xl font-bold">{category.name}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {category.tools.map((tool) => (
                <div key={tool.name} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold">{tool.name}</h3>
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{tool.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tool.features.map((feature) => (
                      <span key={feature} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">💡 Tip:</span> {tool.tips}
                    </p>
                  </div>

                  {tool.promoCode && (
                    <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-amber-600 font-medium mb-1">🎁 PROMO CODE</p>
                          <p className="font-mono font-bold text-amber-800">{tool.promoCode}</p>
                          <p className="text-xs text-amber-600 mt-1">{tool.promoDiscount}</p>
                        </div>
                        <button
                          onClick={() => copyCode(tool.promoCode!)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-amber-200 hover:bg-amber-300 rounded-lg text-amber-800 text-sm transition-colors"
                        >
                          {copiedCode === tool.promoCode ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
