import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

type Scenario = {
  id: string;
  title: string;
  description: string;
  initialAmount: number;
  options: {
    id: string;
    label: string;
    impact: {
      savings: number;
      risk: 'low' | 'medium' | 'high';
      timeframe: string;
    };
  }[];
};

const scenarios: Scenario[] = [
  {
    id: 'business-expansion',
    title: 'Business Expansion Opportunity',
    description: 'A local supplier offers bulk inventory at a 30% discount. How would you proceed?',
    initialAmount: 5000,
    options: [
      {
        id: 'invest-all',
        label: 'Invest entire savings',
        impact: {
          savings: 8000,
          risk: 'high',
          timeframe: '3 months',
        },
      },
      {
        id: 'partial-invest',
        label: 'Invest 50% of savings',
        impact: {
          savings: 6500,
          risk: 'medium',
          timeframe: '6 months',
        },
      },
      {
        id: 'save-more',
        label: 'Wait and save more',
        impact: {
          savings: 5500,
          risk: 'low',
          timeframe: '12 months',
        },
      },
    ],
  },
  // Add more scenarios...
];

const FinancialScenario: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(scenarios[0]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showImpact, setShowImpact] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowImpact(true);
  };

  const resetScenario = () => {
    setSelectedOption(null);
    setShowImpact(false);
  };

  const selectedImpact = currentScenario.options.find(
    opt => opt.id === selectedOption
  )?.impact;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Financial Decision Simulator</h3>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-lg">{currentScenario.title}</h4>
          <span className="text-sm text-gray-600">
            Initial Amount: ${currentScenario.initialAmount}
          </span>
        </div>
        <p className="text-gray-600 mt-2">{currentScenario.description}</p>
      </div>

      <div className="space-y-4">
        {currentScenario.options.map((option) => (
          <motion.button
            key={option.id}
            className={`w-full p-4 rounded-lg border transition-all ${
              selectedOption === option.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
            onClick={() => handleOptionSelect(option.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{option.label}</span>
              {selectedOption === option.id && (
                <CheckCircle className="w-5 h-5 text-primary" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showImpact && selectedImpact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 p-4 bg-gray-50 rounded-lg"
          >
            <h5 className="font-semibold mb-4">Projected Impact</h5>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-semibold">${selectedImpact.savings}</div>
                <div className="text-sm text-gray-600">Potential Return</div>
              </div>
              <div className="text-center">
                <AlertCircle className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="font-semibold capitalize">{selectedImpact.risk}</div>
                <div className="text-sm text-gray-600">Risk Level</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="font-semibold">{selectedImpact.timeframe}</div>
                <div className="text-sm text-gray-600">Timeframe</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={resetScenario}>
                Try Another Option
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default FinancialScenario;