import { Timestamp } from 'firebase/firestore';

export class StreakCalculator {
  // Calculate current streak based on solved problems
  static calculateStreak(solvedProblems: { solvedAt: Timestamp }[]): number {
    if (solvedProblems.length === 0) return 0;

    // Sort problems by solved date (most recent first)
    const sortedProblems = solvedProblems
      .sort((a, b) => b.solvedAt.toMillis() - a.solvedAt.toMillis());

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset to start of day

    // Check if user solved a problem today
    const today = currentDate.getTime();
    const hasToday = sortedProblems.some(problem => {
      const solvedDate = problem.solvedAt.toDate();
      solvedDate.setHours(0, 0, 0, 0);
      return solvedDate.getTime() === today;
    });

    if (!hasToday) {
      // Check if user solved yesterday (grace period)
      const yesterday = new Date(currentDate);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const hasYesterday = sortedProblems.some(problem => {
        const solvedDate = problem.solvedAt.toDate();
        solvedDate.setHours(0, 0, 0, 0);
        return solvedDate.getTime() === yesterday.getTime();
      });

      if (!hasYesterday) {
        return 0; // Streak broken
      }
      
      currentDate = yesterday; // Start counting from yesterday
    }

    // Count consecutive days
    const checkedDates = new Set<string>();
    
    for (let i = 0; i < 365; i++) { // Max 365 days check
      const dateStr = currentDate.toISOString().split('T')[0];
      
      if (checkedDates.has(dateStr)) {
        currentDate.setDate(currentDate.getDate() - 1);
        continue;
      }
      
      checkedDates.add(dateStr);
      
      const hasProblemOnDate = sortedProblems.some(problem => {
        const solvedDate = problem.solvedAt.toDate();
        return solvedDate.toISOString().split('T')[0] === dateStr;
      });

      if (hasProblemOnDate) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  // Check if user is a "Consistent Coder" (7+ day streak)
  static isConsistentCoder(streak: number): boolean {
    return streak >= 7;
  }

  // Calculate weekly goal progress
  static calculateWeeklyProgress(solvedProblems: { solvedAt: Timestamp }[], weeklyGoal: number = 7): number {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weeklyCount = solvedProblems.filter(problem => 
      problem.solvedAt.toDate() >= weekAgo
    ).length;

    return Math.min(weeklyCount, weeklyGoal);
  }

  // Get streak status message
  static getStreakMessage(streak: number): string {
    if (streak === 0) return "Start your coding journey today! 🚀";
    if (streak === 1) return "Great start! Keep it up! 💪";
    if (streak < 7) return `${streak} days strong! You're building momentum! 🔥`;
    if (streak < 30) return `${streak} days streak! You're a Consistent Coder! ⭐`;
    if (streak < 100) return `${streak} days streak! Incredible dedication! 🏆`;
    return `${streak} days streak! You're a coding legend! 👑`;
  }

  // Calculate badge eligibility
  static calculateBadges(streak: number, totalSolved: number, maxStreak: number): string[] {
    const badges: string[] = [];

    // Streak badges
    if (streak >= 7) badges.push("Consistent Coder");
    if (streak >= 30) badges.push("Monthly Warrior");
    if (streak >= 100) badges.push("Centurion");

    // Problem solving badges
    if (totalSolved >= 50) badges.push("Problem Solver");
    if (totalSolved >= 100) badges.push("Code Master");
    if (totalSolved >= 500) badges.push("Algorithm Expert");

    // Achievement badges
    if (maxStreak >= 30) badges.push("Streak Legend");
    if (maxStreak >= 100) badges.push("Dedication Champion");

    return badges;
  }
}