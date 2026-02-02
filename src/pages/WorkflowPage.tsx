import { useNavigate } from 'react-router-dom';
import { Layout, GenJamHeader } from '@/components';
import { cn } from '@/lib/utils';
import { Users, FileText, Palette, Film, Music, Upload, Eye, Vote, Clock, CheckCircle2 } from 'lucide-react';

interface Phase {
  id: number;
  title: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  tasks: string[];
  tips: string;
}

const PHASES: Phase[] = [
  {
    id: 1,
    title: 'Team Formation',
    duration: '15 min',
    description: 'Form balanced teams based on idea votes and skills',
    icon: <Users className="w-6 h-6" />,
    tasks: ['Review idea votes', 'Form teams of 3-5', 'Introduce yourselves', 'Assign initial roles'],
    tips: 'Mix skills for diverse teams - writer + visual artist + editor works great!',
  },
  {
    id: 2,
    title: 'Concept Development',
    duration: '30 min',
    description: 'Refine your winning idea into a concrete concept',
    icon: <FileText className="w-6 h-6" />,
    tasks: ['Define the core story', 'Create character sketches', 'Outline key scenes', 'Decide on tone/style'],
    tips: 'Keep it simple - a clear 1-minute story is better than a confused 3-minute one.',
  },
  {
    id: 3,
    title: 'Storyboarding',
    duration: '45 min',
    description: 'Create visual plans and shot lists',
    icon: <Palette className="w-6 h-6" />,
    tasks: ['Sketch key frames', 'Plan camera angles', 'Note transitions', 'Prepare prompts for AI tools'],
    tips: 'Use AI image generation to quickly visualize scenes and iterate on concepts.',
  },
  {
    id: 4,
    title: 'Production',
    duration: '3-4 hours',
    description: 'Generate assets and assemble your film',
    icon: <Film className="w-6 h-6" />,
    tasks: ['Generate visuals', 'Record/generate audio', 'Create animations', 'Initial assembly'],
    tips: 'Divide and conquer - have team members work on parallel tasks.',
  },
  {
    id: 5,
    title: 'Post-Production',
    duration: '1 hour',
    description: 'Edit, add sound, and refine the final cut',
    icon: <Music className="w-6 h-6" />,
    tasks: ['Fine-tune editing', 'Add sound effects', 'Mix audio levels', 'Color correction'],
    tips: 'Sound is 50% of the experience - don\'t rush the audio!',
  },
  {
    id: 6,
    title: 'Submission',
    duration: '15 min',
    description: 'Upload and submit your masterpiece',
    icon: <Upload className="w-6 h-6" />,
    tasks: ['Final review', 'Export at proper settings', 'Upload video', 'Add title & description'],
    tips: 'Export at 1080p, H.264 codec for best compatibility.',
  },
  {
    id: 7,
    title: 'Showcase',
    duration: '30 min',
    description: 'Watch all submissions together',
    icon: <Eye className="w-6 h-6" />,
    tasks: ['Gather as a group', 'Watch each film', 'Celebrate creativity', 'Take notes for voting'],
    tips: 'Cheer for every team - everyone worked hard!',
  },
  {
    id: 8,
    title: 'Voting',
    duration: '10 min',
    description: 'Vote for favorites across three categories',
    icon: <Vote className="w-6 h-6" />,
    tasks: ['Best Overall', 'Best Visuals', 'Most WTF', 'Submit votes'],
    tips: 'Consider story, execution, and creativity in your votes.',
  },
];

export function WorkflowPage() {
  const navigate = useNavigate();

  return (
    <Layout
      currentStep={5}
      backTo="/ideas-submission"
      backLabel="Back to Ideas"
      nextTo="/cheatsheet"
      nextLabel="Continue to Cheat Sheet"
      onNext={() => navigate('/cheatsheet')}
    >
      <GenJamHeader
        title="Production Workflow"
        subtitle="Your roadmap to creating an amazing AI film in 6 hours"
        currentStep={5}
        emoji="📋"
      />

      <div className="mt-10 space-y-8">
        {/* Total Time Summary */}
        <div className="card bg-gradient-hero text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Total Event Time</h2>
                <p className="text-sm opacity-80">From start to winners announcement</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-3xl sm:text-4xl font-bold">~6 hrs</p>
              <p className="text-sm opacity-80">Plan your time wisely!</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-200 hidden md:block" />

          <div className="space-y-6">
            {PHASES.map((phase, index) => (
              <div key={phase.id} className="relative">
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-0 w-12 h-12 rounded-full bg-primary-500 items-center justify-center text-white z-10">
                  {phase.icon}
                </div>

                {/* Phase Card */}
                <div className={cn('card md:ml-20')}>
                  <div className="flex items-start gap-5">
                    <div className="md:hidden w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0">
                      {phase.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-5 mb-3">
                        <h3 className="text-lg font-bold">
                          <span className="text-primary-500">Phase {phase.id}:</span> {phase.title}
                        </h3>
                        <span className="badge badge-primary">{phase.duration}</span>
                      </div>
                      <p className="text-gray-600 mb-6">{phase.description}</p>

                      {/* Tasks */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                        {phase.tasks.map((task, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0" />
                            {task}
                          </div>
                        ))}
                      </div>

                      {/* Tip */}
                      <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                        <p className="text-sm text-amber-800">
                          <span className="font-semibold">💡 Tip:</span> {phase.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector to next phase */}
                {index < PHASES.length - 1 && (
                  <div className="hidden md:block absolute left-6 w-0.5 h-6 bg-primary-200 -bottom-6" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices Card */}
        <div className="card bg-secondary-50 border border-secondary-200">
          <h3 className="text-lg font-bold mb-6">🎯 Best Practices for Success</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-secondary-500 font-bold">1.</span>
              <span><strong>Communicate constantly</strong> - Check in with teammates every 30 minutes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary-500 font-bold">2.</span>
              <span><strong>Embrace imperfection</strong> - Done is better than perfect in a jam!</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary-500 font-bold">3.</span>
              <span><strong>Save frequently</strong> - Don't lose your work to crashes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary-500 font-bold">4.</span>
              <span><strong>Test early</strong> - Watch rough cuts to catch issues fast</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
