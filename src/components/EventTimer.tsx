import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Clock, Info, Sparkles } from 'lucide-react';

interface EventTimerProps {
  currentStep: number;
  deadline?: Date;
  className?: string;
}

const STEP_INSTRUCTIONS: Record<number, { current: string; next: string }> = {
  1: {
    current: "Welcome! Fill out your information and get ready to create something amazing.",
    next: "Next up: Tell us about your creative skills so we can form balanced teams!",
  },
  2: {
    current: "Help us understand your strengths so we can form diverse, complementary teams.",
    next: "Next: Break the ice with fellow creators through a fun activity!",
  },
  3: {
    current: "Share your creative thoughts and connect with fellow participants.",
    next: "Next: Submit your film idea and vote for favorites to form teams!",
  },
  4: {
    current: "Submit your film idea and vote for your top 3 favorites. Teams form based on shared interests!",
    next: "Next: Review the production timeline and workflow.",
  },
  5: {
    current: "Review the production timeline and plan your approach for maximum efficiency.",
    next: "Next: Explore AI tools and grab promo codes before you start!",
  },
  6: {
    current: "Explore tools and grab sponsor promo codes before you start creating.",
    next: "Next: Get inspired by watching past GenJam films!",
  },
  7: {
    current: "Get inspired by past films. Notice techniques you can use in your own work!",
    next: "Next: Plan your shots visually with the storyboard workspace.",
  },
  8: {
    current: "Plan your shots visually. This will save time during production!",
    next: "Next: Time to submit your masterpiece!",
  },
  9: {
    current: "Upload your final film. Make sure everything is perfect before submitting!",
    next: "Next: Vote for your favorite films across three categories.",
  },
  10: {
    current: "Vote for your favorite films in each category. Choose wisely!",
    next: "Final step: See results and join our community!",
  },
  11: {
    current: "Congratulations on completing GenJam! Stay connected for future events.",
    next: "Thank you for participating! 🎬",
  },
};

export function EventTimer({ currentStep, deadline, className }: EventTimerProps) {
  // Default deadline: 4 hours from now if not provided
  const [targetDate] = useState(() => deadline || new Date(Date.now() + 4 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');
  const isWarning = timeLeft.hours === 0 && timeLeft.minutes < 30;
  const instruction = STEP_INSTRUCTIONS[currentStep] || STEP_INSTRUCTIONS[1];

  return (
    <div className={cn('space-y-4', className)}>
      {/* Countdown Timer */}
      <div
        className={cn(
          'rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white text-center transition-all duration-500',
          isExpired
            ? 'bg-gradient-to-br from-gray-600 to-gray-700'
            : isWarning
            ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse-glow'
            : 'bg-gradient-hero'
        )}
      >
        <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 opacity-80" />
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider opacity-80">
            {isExpired ? "Time's Up!" : 'Time Remaining'}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <div className="flex flex-col items-center">
            <span className="countdown-digit">{formatNumber(timeLeft.hours)}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <span className="text-2xl sm:text-4xl font-light opacity-50 mt-[-14px] sm:mt-[-20px]">:</span>
          <div className="flex flex-col items-center">
            <span className="countdown-digit">{formatNumber(timeLeft.minutes)}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <span className="text-2xl sm:text-4xl font-light opacity-50 mt-[-14px] sm:mt-[-20px]">:</span>
          <div className="flex flex-col items-center">
            <span className="countdown-digit">{formatNumber(timeLeft.seconds)}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>

        {isWarning && !isExpired && (
          <p className="mt-3 text-sm font-medium animate-pulse">
            Less than 30 minutes remaining! Finish up your work!
          </p>
        )}
      </div>

      {/* Contextual Instructions */}
      <div className="bg-secondary-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-secondary-200">
        <div className="flex gap-3">
          <div className="flex-shrink-0 hidden sm:block">
            <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center">
              <Info className="w-5 h-5 text-secondary-600" />
            </div>
          </div>
          <div className="flex-1 space-y-1.5">
            <p className="text-sm sm:text-base text-gray-700 font-medium">{instruction.current}</p>
            <div className="flex items-start gap-2 text-xs sm:text-sm text-secondary-600">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
              <span>{instruction.next}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
