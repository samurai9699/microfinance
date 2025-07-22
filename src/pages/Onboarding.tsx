import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Globe2, Sliders, Target, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const [financialSituation, setFinancialSituation] = useState({
    monthlyIncome: 500,
    savings: 100,
    debt: 0,
  });
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [region, setRegion] = useState('');

  const LanguageSelection = () => (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-center mb-8">
        <Globe2 className="w-12 h-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Choose Your Language</h2>
      <div className="grid grid-cols-2 gap-4">
        <Card
          className={`p-6 cursor-pointer transition-all ${
            language === 'en' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setLanguage('en')}
        >
          <h3 className="font-semibold mb-2">English</h3>
          <p className="text-sm text-gray-600">Continue in English</p>
        </Card>
        <Card
          className={`p-6 cursor-pointer transition-all ${
            language === 'sw' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setLanguage('sw')}
        >
          <h3 className="font-semibold mb-2">Kiswahili</h3>
          <p className="text-sm text-gray-600">Endelea kwa Kiswahili</p>
        </Card>
      </div>
      <Button
        variant="primary"
        className="w-full mt-8"
        onClick={() => navigate('/onboarding/assessment')}
        icon={<ChevronRight />}
        iconPosition="right"
      >
        Continue
      </Button>
    </div>
  );

  const FinancialAssessment = () => (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-center mb-8">
        <Sliders className="w-12 h-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Financial Assessment</h2>
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2">
            Monthly Income (USD)
          </label>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={financialSituation.monthlyIncome}
            onChange={(e) =>
              setFinancialSituation({
                ...financialSituation,
                monthlyIncome: parseInt(e.target.value),
              })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>$0</span>
            <span>${financialSituation.monthlyIncome}</span>
            <span>$5,000+</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Current Savings (USD)
          </label>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={financialSituation.savings}
            onChange={(e) =>
              setFinancialSituation({
                ...financialSituation,
                savings: parseInt(e.target.value),
              })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>$0</span>
            <span>${financialSituation.savings}</span>
            <span>$10,000+</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Current Debt (USD)
          </label>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={financialSituation.debt}
            onChange={(e) =>
              setFinancialSituation({
                ...financialSituation,
                debt: parseInt(e.target.value),
              })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>$0</span>
            <span>${financialSituation.debt}</span>
            <span>$10,000+</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => navigate('/onboarding')}
          icon={<ChevronLeft />}
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate('/onboarding/goals')}
          icon={<ChevronRight />}
          iconPosition="right"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const GoalSetting = () => {
    const goals = [
      {
        id: 'business',
        title: 'Start a Business',
        description: 'Get guidance on business planning and microfinance',
        icon: '💼',
      },
      {
        id: 'savings',
        title: 'Build Savings',
        description: 'Create an emergency fund and save for the future',
        icon: '💰',
      },
      {
        id: 'learning',
        title: 'Financial Education',
        description: 'Learn about budgeting, credit, and investments',
        icon: '📚',
      },
      {
        id: 'debt',
        title: 'Manage Debt',
        description: 'Develop a plan to reduce and manage debt',
        icon: '📊',
      },
    ];

    const toggleGoal = (goalId: string) => {
      setSelectedGoals((prev) =>
        prev.includes(goalId)
          ? prev.filter((id) => id !== goalId)
          : [...prev, goalId]
      );
    };

    return (
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Target className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Set Your Goals</h2>
        <div className="grid grid-cols-1 gap-4">
          {goals.map((goal) => (
            <Card
              key={goal.id}
              className={`p-6 cursor-pointer transition-all ${
                selectedGoals.includes(goal.id) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => toggleGoal(goal.id)}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-4">{goal.icon}</span>
                <div>
                  <h3 className="font-semibold">{goal.title}</h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/onboarding/assessment')}
            icon={<ChevronLeft />}
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/onboarding/region')}
            icon={<ChevronRight />}
            iconPosition="right"
            disabled={selectedGoals.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  };

  const RegionSelection = () => {
    const regions = [
      { id: 'east', name: 'East Africa', countries: 'Kenya, Tanzania, Uganda' },
      { id: 'west', name: 'West Africa', countries: 'Nigeria, Ghana, Senegal' },
      { id: 'south', name: 'Southern Africa', countries: 'South Africa, Zambia, Zimbabwe' },
      { id: 'north', name: 'North Africa', countries: 'Egypt, Morocco, Tunisia' },
    ];

    return (
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center mb-8">
          <MapPin className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Select Your Region</h2>
        <div className="grid grid-cols-1 gap-4">
          {regions.map((r) => (
            <Card
              key={r.id}
              className={`p-6 cursor-pointer transition-all ${
                region === r.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setRegion(r.id)}
            >
              <h3 className="font-semibold">{r.name}</h3>
              <p className="text-sm text-gray-600">{r.countries}</p>
            </Card>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/onboarding/goals')}
            icon={<ChevronLeft />}
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/dashboard')}
            icon={<ChevronRight />}
            iconPosition="right"
            disabled={!region}
          >
            Complete
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Routes>
          <Route index element={<LanguageSelection />} />
          <Route path="assessment" element={<FinancialAssessment />} />
          <Route path="goals" element={<GoalSetting />} />
          <Route path="region" element={<RegionSelection />} />
        </Routes>
      </div>
    </div>
  );
};

export default Onboarding;