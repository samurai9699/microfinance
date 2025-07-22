import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PieChart, LineChart, Award, MessageSquare, CheckCircle, ChevronRight, UserCheck, ShieldCheck, TrendingUp } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Financial Mentorship Powered by AI
              </h1>
              <p className="text-lg mb-8 text-white/90 max-w-xl">
                Personalized financial guidance for underbanked communities. Build credit, save money, and achieve financial freedom with MicroFinance Mentor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="font-bold"
                >
                  Get Started - It's Free
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 border"
                  icon={<ArrowRight />}
                  iconPosition="right"
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-2 text-white/80">
                <CheckCircle className="w-5 h-5" />
                <span>No credit check required</span>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden p-4 md:transform md:rotate-2 md:hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.pexels.com/photos/7821485/pexels-photo-7821485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Financial dashboard preview" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-accent rounded-full opacity-30 blur-xl"></div>
              </div>
              <div className="hidden md:block absolute -top-8 -left-8 w-24 h-24 bg-white/20 rounded-full"></div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-white/80">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">$2.5M</p>
                <p className="text-white/80">Savings Created</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">78%</p>
                <p className="text-white/80">Credit Score Improvement</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">12</p>
                <p className="text-white/80">Learning Modules</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How MicroFinance Mentor Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform helps you build financial literacy, track expenses, and make better financial decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <PieChart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Financial Health Score</h3>
              <p className="text-gray-600 mb-4">
                Get a personalized assessment of your financial health and track your progress over time.
              </p>
              <Link to="/features" className="text-primary font-medium flex items-center hover:text-primary/80">
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <LineChart className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expense Tracking</h3>
              <p className="text-gray-600 mb-4">
                Easily log and categorize your expenses to understand where your money goes.
              </p>
              <Link to="/features" className="text-primary font-medium flex items-center hover:text-primary/80">
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Financial Education</h3>
              <p className="text-gray-600 mb-4">
                Access interactive learning modules to improve your financial knowledge and skills.
              </p>
              <Link to="/features" className="text-primary font-medium flex items-center hover:text-primary/80">
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of people who have improved their financial health with MicroFinance Mentor.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Sarah M."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Sarah M.</h4>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Before using MicroFinance Mentor, I was living paycheck to paycheck. Now I have an emergency fund and a clear plan for my finances."
              </p>
              <div className="flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Michael T."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Michael T.</h4>
                  <p className="text-sm text-gray-500">Freelancer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The learning modules helped me understand credit scores and how to improve mine. I've raised my score by 120 points in 6 months!"
              </p>
              <div className="flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Jamila K."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Jamila K.</h4>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "As a student, I was struggling with budgeting. The app made it simple to track expenses and save for my goals. Highly recommend!"
              </p>
              <div className="flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why You Can Trust Us</h2>
            <p className="text-lg text-gray-600 mb-12">
              We're committed to helping underbanked communities access financial education and tools in a secure, trusted environment.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Bank-Level Security</h3>
                <p className="text-gray-600 text-center">
                  Your data is encrypted and protected with the highest security standards.
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Privacy Focused</h3>
                <p className="text-gray-600 text-center">
                  We never sell your personal data to third parties.
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Expert Guidance</h3>
                <p className="text-gray-600 text-center">
                  Our content is created by certified financial advisors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
            <p className="text-lg mb-8 text-white/90">
              Join MicroFinance Mentor today and start your journey to financial wellness.
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              className="font-bold"
            >
              Get Started For Free
            </Button>
            <p className="mt-4 text-white/80">No credit card required.</p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;