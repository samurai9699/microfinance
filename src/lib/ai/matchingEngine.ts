import { UserProfile, LendingCircle, BusinessTemplate } from '../types';

export class MatchingEngine {
  public matchLendingCircle(
    userProfile: UserProfile,
    availableCircles: LendingCircle[]
  ): LendingCircle[] {
    return availableCircles.filter(circle => {
      // Match by region
      if (circle.region !== userProfile.region) return false;

      // Match by contribution capacity
      const maxContribution = userProfile.monthlyIncome * 0.3;
      if (circle.contribution > maxContribution) return false;

      // Additional matching criteria can be added here
      return true;
    });
  }

  public matchBusinessTemplate(
    userProfile: UserProfile,
    availableTemplates: BusinessTemplate[]
  ): BusinessTemplate[] {
    return availableTemplates.filter(template => {
      // Match by region
      if (template.region !== userProfile.region) return false;

      // Match by business experience
      if (
        template.size === 'medium' && 
        userProfile.businessExperience === 'none'
      ) return false;

      // Match by financial capacity
      const startupCapacity = userProfile.monthlyIncome * 6;
      if (template.requirements.startup > startupCapacity) return false;

      return true;
    });
  }
}