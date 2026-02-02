import { Layout, GenJamHeader } from '@/components';
import { PartyPopper, Trophy, Eye, Zap, Calendar, MessageCircle, Instagram, Twitter, Youtube, Users, Film, Vote, ExternalLink, Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const WINNERS = [
  { category: 'Best Overall', icon: <Trophy className="w-5 h-5" />, color: 'amber', team: 'Neural Dreamers', title: 'The Last Algorithm', votes: 47 },
  { category: 'Best Visuals', icon: <Eye className="w-5 h-5" />, color: 'blue', team: 'Pixel Prophets', title: 'Midnight Reset', votes: 42 },
  { category: 'Most WTF', icon: <Zap className="w-5 h-5" />, color: 'orange', team: 'Glitch Collective', title: 'Resolution Paradox', votes: 38 },
];

const STATS = [
  { label: 'Participants', value: '156', icon: <Users className="w-5 h-5" /> },
  { label: 'Films Submitted', value: '32', icon: <Film className="w-5 h-5" /> },
  { label: 'Total Votes', value: '1,247', icon: <Vote className="w-5 h-5" /> },
];

const SPONSORS = [
  { name: 'Google', logo: '🔵' },
  { name: 'OpenAI', logo: '🟢' },
  { name: 'ByteDance', logo: '⚫' },
  { name: 'Luma AI', logo: '🟣' },
];

export function FollowupPage() {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; light: string; text: string }> = {
      amber: { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700' },
      blue: { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-700' },
    };
    return colors[color] || colors.amber;
  };

  return (
    <Layout currentStep={11} backTo="/voting" backLabel="Back to Voting" showTimer={false}>
      <GenJamHeader title="Thank You for Participating!" subtitle="Stay connected with the Machine Cinema community" currentStep={11} emoji="🎉" />

      <div className="mt-10 sm:mt-12 space-y-8">
        {/* Celebration Banner */}
        <div className="card bg-gradient-hero text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent)]" />
          <div className="relative">
            <PartyPopper className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Congratulations to All Participants!</h2>
            <p className="opacity-90">You created something amazing in just a few hours. Be proud of what you accomplished!</p>
          </div>
        </div>

        {/* Event Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="card text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 mx-auto mb-2 sm:mb-3">
                {stat.icon}
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Winners */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Winners Announcement
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {WINNERS.map((winner) => {
              const colors = getColorClasses(winner.color);
              return (
                <div key={winner.category} className={cn('rounded-xl p-4 border-2', colors.light, `border-${winner.color}-200`)}>
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3', colors.bg)}>
                    {winner.icon}
                  </div>
                  <p className={cn('text-sm font-medium mb-1', colors.text)}>{winner.category}</p>
                  <h3 className="font-bold text-lg">{winner.title}</h3>
                  <p className="text-sm text-gray-500">by {winner.team}</p>
                  <p className="text-xs text-gray-400 mt-2">{winner.votes} votes</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Join Community */}
        <div className="card border-2 border-primary-200 bg-primary-50">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-white flex-shrink-0">
              <Heart className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Join Machine Cinema</h2>
              <p className="text-gray-600 mb-4">Stay connected with our global community of AI creators. Get notified about future events, share your work, and collaborate with fellow filmmakers.</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://lu.ma/machinecinema" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Calendar className="w-4 h-4" />
                  View Upcoming Events
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="https://discord.gg/machinecinema" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <MessageCircle className="w-4 h-4" />
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Follow Us</h2>
          <div className="flex gap-4">
            <a href="https://instagram.com/machinecinema" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/machinecinema" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white hover:scale-110 transition-transform">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://youtube.com/@machinecinema" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center text-white hover:scale-110 transition-transform">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">Share your film with <span className="font-semibold text-primary-600">#GenJam2025</span> and tag <span className="font-semibold text-primary-600">@MachineCinema</span></p>
        </div>

        {/* Sponsors */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-bold">Thank You to Our Sponsors</h2>
          </div>
          <div className="flex justify-center gap-8 flex-wrap">
            {SPONSORS.map((sponsor) => (
              <div key={sponsor.name} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-3xl">{sponsor.logo}</div>
                <span className="text-sm font-medium text-gray-600">{sponsor.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center py-8">
          <p className="text-2xl font-display font-bold text-gradient mb-2">See you at the next GenJam!</p>
          <p className="text-gray-500">Keep creating. Keep experimenting. Keep pushing boundaries.</p>
        </div>
      </div>
    </Layout>
  );
}
