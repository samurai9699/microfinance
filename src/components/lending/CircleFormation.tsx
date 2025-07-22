import React, { useState } from 'react';
import { Users, MapPin, Target, Shield, Calendar } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

type FormStep = 'basics' | 'members' | 'schedule' | 'confirmation';

const CircleFormation: React.FC = () => {
  const [step, setStep] = useState<FormStep>('basics');
  const [formData, setFormData] = useState({
    circleName: '',
    goal: '',
    location: '',
    memberCount: 6,
    contribution: 100,
    frequency: 'monthly',
    startDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 'basics':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Circle Name
              </label>
              <input
                type="text"
                name="circleName"
                value={formData.circleName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Give your circle a name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal
              </label>
              <input
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="What is this circle's purpose?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="City or region"
              />
            </div>
          </div>
        );
      
      case 'members':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Members
              </label>
              <select
                name="memberCount"
                value={formData.memberCount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                {[4, 6, 8, 10, 12].map(num => (
                  <option key={num} value={num}>{num} members</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Contribution
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="contribution"
                  value={formData.contribution}
                  onChange={handleInputChange}
                  className="w-full pl-8 p-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="100"
                />
              </div>
            </div>
          </div>
        );
      
      case 'schedule':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contribution Frequency
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        );
      
      case 'confirmation':
        return (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Circle Summary</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li>Name: {formData.circleName}</li>
                <li>Goal: {formData.goal}</li>
                <li>Location: {formData.location}</li>
                <li>Members: {formData.memberCount}</li>
                <li>Contribution: ${formData.contribution}</li>
                <li>Frequency: {formData.frequency}</li>
                <li>Start Date: {formData.startDate}</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Important Notice</h4>
              <p className="text-sm text-yellow-700">
                By creating this circle, you agree to our terms and commit to making regular contributions
                as scheduled. All members must verify their identity and agree to the circle's rules.
              </p>
            </div>
          </div>
        );
    }
  };

  const steps = [
    { id: 'basics', label: 'Basic Info', icon: Shield },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'confirmation', label: 'Confirm', icon: Target },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Create New Circle</h3>
      
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === s.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <s.icon className="w-4 h-4" />
              </div>
              {idx < steps.length - 1 && (
                <div className="w-full h-1 bg-gray-200 mx-2">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: step === s.id ? '50%' : step === steps[idx + 1].id ? '0%' : '100%',
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {renderStep()}
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => {
            const currentIdx = steps.findIndex(s => s.id === step);
            if (currentIdx > 0) {
              setStep(steps[currentIdx - 1].id as FormStep);
            }
          }}
          disabled={step === 'basics'}
        >
          Back
        </Button>
        
        <Button
          variant="primary"
          onClick={() => {
            const currentIdx = steps.findIndex(s => s.id === step);
            if (currentIdx < steps.length - 1) {
              setStep(steps[currentIdx + 1].id as FormStep);
            }
          }}
        >
          {step === 'confirmation' ? 'Create Circle' : 'Next'}
        </Button>
      </div>
    </Card>
  );
};

export default CircleFormation;