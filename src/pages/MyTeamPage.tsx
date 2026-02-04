import { useState, useEffect } from 'react';
import { Layout, GenJamHeader } from '@/components';
import { cn } from '@/lib/utils';
import { STORAGE_KEY } from '@/lib/teamBuilder';
import type { PublishedTeamsData } from '@/lib/teamBuilder';
import { Search, Clock, Users, CheckCircle, Star } from 'lucide-react';

export function MyTeamPage() {
  const [email, setEmail] = useState('');
  const [teamsData, setTeamsData] = useState<PublishedTeamsData | null>(null);
  const [searchResult, setSearchResult] = useState<{
    found: true;
    teamId: number;
    members: PublishedTeamsData['teams'][0]['members'];
    memberName: string;
  } | { found: false } | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setTeamsData(JSON.parse(raw));
      } catch {
        // ignore invalid data
      }
    }
  }, []);

  const handleSearch = () => {
    if (!teamsData || !email.trim()) return;

    const normalizedEmail = email.trim().toLowerCase();
    for (const team of teamsData.teams) {
      const member = team.members.find((m) => m.email.toLowerCase() === normalizedEmail);
      if (member) {
        setSearchResult({
          found: true,
          teamId: team.id,
          members: team.members,
          memberName: member.name,
        });
        return;
      }
    }

    setSearchResult({ found: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Layout
      currentStep={3}
      backTo="/skills-survey"
      backLabel="Back to Skills Survey"
      nextTo="/icebreaker"
      nextLabel="Continue to Icebreaker"
    >
      <GenJamHeader
        title="My Team"
        subtitle="Find out which team you've been assigned to for this GenJam."
        currentStep={3}
        emoji="👥"
      />

      <div className="space-y-32 sm:space-y-40">
        {!teamsData ? (
          /* Teams not published yet */
          <div className="card text-center py-48 sm:py-64">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-24"
              style={{ backgroundColor: '#F5F5F5', border: '3px solid #E5E5E5' }}
            >
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-12" style={{ color: '#1a1a1a' }}>
              Teams Haven't Been Assigned Yet
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              The organizer is still forming teams. Check back here once teams have been published.
            </p>
          </div>
        ) : (
          <>
            {/* Email search */}
            <div className="card">
              <h2 className="text-xl font-bold mb-24">Find Your Team</h2>
              <p className="text-gray-600 mb-24">
                Enter the email address you used when signing up to see your team assignment.
              </p>
              <div className="flex gap-12">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="your@email.com"
                  className="input flex-1"
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                  <Search className="w-4 h-4 mr-1 inline" />
                  Find
                </button>
              </div>
            </div>

            {/* Search result */}
            {searchResult && !searchResult.found && (
              <div className="card text-center py-32" style={{ borderColor: '#FF3366' }}>
                <p className="font-bold" style={{ color: '#FF3366' }}>
                  We couldn't find that email address
                </p>
                <p className="text-sm text-gray-500 mt-8">
                  Please check the email you used to register and try again.
                </p>
              </div>
            )}

            {searchResult && searchResult.found && (
              <div className="card" style={{ borderColor: '#00D954' }}>
                <div className="text-center mb-32">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-16"
                    style={{ backgroundColor: '#FFD700', border: '3px solid #1a1a1a' }}
                  >
                    <Users className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#1a1a1a' }}>
                    You're on Team {searchResult.teamId}!
                  </h2>
                  <p className="text-gray-500 mt-8">Here are your teammates</p>
                </div>

                <div className="space-y-12">
                  {searchResult.members.map((m) => {
                    const isCurrentUser = m.email.toLowerCase() === email.trim().toLowerCase();
                    return (
                      <div
                        key={m.email}
                        className={cn(
                          'flex items-center gap-12 px-4 py-3 rounded-xl transition-all',
                          isCurrentUser
                            ? 'bg-[#FFF8DC]'
                            : 'bg-gray-50'
                        )}
                        style={isCurrentUser ? { border: '2px solid #FFD700' } : {}}
                      >
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                          style={{
                            backgroundColor: m.aiCapabilityScore >= 4 ? '#00FF66' : m.aiCapabilityScore >= 2 ? '#FFD700' : '#F5F5F5',
                            border: '2px solid #1a1a1a',
                          }}
                        >
                          {m.aiCapabilityScore}
                        </span>
                        <div className="flex-1">
                          <span className="font-medium">
                            {m.name}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFD700]" style={{ border: '1px solid #1a1a1a' }}>
                                You
                              </span>
                            )}
                          </span>
                        </div>
                        {m.isEditor && (
                          <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3" /> Editor
                          </span>
                        )}
                        <span
                          className={cn(
                            'text-xs font-bold px-2 py-1 rounded-full',
                            m.durationCommitment === 'FULL' && 'bg-green-100 text-green-700',
                            m.durationCommitment === 'MOST' && 'bg-blue-100 text-blue-700',
                            m.durationCommitment === 'HALF' && 'bg-yellow-100 text-yellow-700',
                            m.durationCommitment === 'SHORT' && 'bg-red-100 text-red-700',
                            (m.durationCommitment === 'UNSURE' || !m.durationCommitment) && 'bg-gray-100 text-gray-500'
                          )}
                        >
                          {m.durationCommitment}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Skills summary */}
                {(() => {
                  const allSkills = new Set<string>();
                  for (const m of searchResult.members) {
                    for (const s of m.traditionalSkills) allSkills.add(s);
                  }
                  if (allSkills.size === 0) return null;
                  return (
                    <div className="mt-24 pt-20 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-500 mb-10 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" /> Team Skills
                      </p>
                      <div className="flex flex-wrap gap-8">
                        {Array.from(allSkills).map((s) => (
                          <span key={s} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
