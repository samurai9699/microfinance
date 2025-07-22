import { UserProfile, FinancialData, RegionContext } from '../types';

type ResponseContext = {
  userProfile: UserProfile;
  financialData: FinancialData;
  regionContext: RegionContext;
  language: string;
};

const culturalContexts = {
  'east-africa': {
    savingsMethods: ['Chama groups', 'M-Pesa savings', 'Village banking'],
    businessTypes: ['Agriculture', 'Mobile money', 'Retail'],
    financialTerms: {
      en: {
        budget: 'Budget (Bajeti)',
        savings: 'Savings (Akiba)',
        investment: 'Investment (Uwekezaji)',
      },
      sw: {
        budget: 'Bajeti',
        savings: 'Akiba',
        investment: 'Uwekezaji',
      },
    },
  },
  // Add other regions...
};

const responseTemplates = {
  budgeting: {
    basic: (context: ResponseContext) => {
      const { userProfile, regionContext } = context;
      const localMethods = culturalContexts[regionContext.region].savingsMethods;
      
      return `Based on your monthly income of $${userProfile.monthlyIncome}, I recommend:
      - Essential expenses (50%): $${userProfile.monthlyIncome * 0.5}
      - Savings (30%): $${userProfile.monthlyIncome * 0.3}
      - Flexible spending (20%): $${userProfile.monthlyIncome * 0.2}
      
      Consider joining ${localMethods[0]} for community-based savings.`;
    },
    // Add more templates...
  },
  // Add other categories...
};

export function generateResponse(
  message: string,
  context: ResponseContext
): string {
  // Analyze message intent
  const intent = analyzeIntent(message);
  
  // Select appropriate template
  const template = selectTemplate(intent, context);
  
  // Generate personalized response
  return template(context);
}

function analyzeIntent(message: string): string {
  const keywords = {
    budgeting: ['budget', 'spend', 'track', 'expense'],
    saving: ['save', 'savings', 'emergency fund'],
    investing: ['invest', 'return', 'growth'],
    business: ['business', 'startup', 'entrepreneur'],
  };

  // Simple keyword matching for demo
  for (const [intent, words] of Object.entries(keywords)) {
    if (words.some(word => message.toLowerCase().includes(word))) {
      return intent;
    }
  }

  return 'general';
}

function selectTemplate(
  intent: string,
  context: ResponseContext
): (context: ResponseContext) => string {
  switch (intent) {
    case 'budgeting':
      return responseTemplates.budgeting.basic;
    // Add other intents...
    default:
      return () => 'I understand your question. How can I help you further?';
  }
}