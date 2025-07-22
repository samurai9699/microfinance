import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Send, ThumbsUp, ThumbsDown, Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'advisor';
  timestamp: Date;
  saved?: boolean;
  reactions?: {
    helpful?: boolean;
    unhelpful?: boolean;
  };
};

const FinancialAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Financial Advisor. I can help you with budgeting, savings, and other financial questions. How can I assist you today?",
      sender: 'advisor',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const advisorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input),
        sender: 'advisor',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, advisorMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userInput: string): string => {
    // Simplified response generation - in production, this would call your AI service
    if (userInput.toLowerCase().includes('budget')) {
      return "Based on your profile and income level, I recommend the 50/30/20 budget rule: 50% for needs, 30% for wants, and 20% for savings. Given the cultural context in your region, you might want to adjust this to account for extended family obligations. Would you like me to break this down further?";
    }
    if (userInput.toLowerCase().includes('save')) {
      return "Looking at your financial goals, I suggest starting with a savings target of 10% of your income. In your region, many people successfully use community savings groups (chamas) to build discipline. Would you like to learn more about different savings methods?";
    }
    return "I understand your question. Let me provide personalized advice based on your financial profile and goals. What specific aspect would you like me to focus on?";
  };

  const toggleReaction = (messageId: string, type: 'helpful' | 'unhelpful') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          reactions: {
            ...msg.reactions,
            [type]: !msg.reactions?.[type],
            [type === 'helpful' ? 'unhelpful' : 'helpful']: false,
          },
        };
      }
      return msg;
    }));
  };

  const toggleSaved = (messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          saved: !msg.saved,
        };
      }
      return msg;
    }));
  };

  return (
    <Card className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Financial Advisor</h2>
        <p className="text-sm text-gray-600">Ask me anything about your finances</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] ${
                message.sender === 'user'
                  ? 'bg-primary text-white rounded-l-lg rounded-tr-lg'
                  : 'bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg'
              } p-4 relative group`}
            >
              <p className="text-sm">{message.content}</p>
              <div className="text-xs mt-2 text-gray-400">
                {format(message.timestamp, 'HH:mm')}
              </div>

              {message.sender === 'advisor' && (
                <div className="absolute -right-20 top-0 hidden group-hover:flex items-center space-x-2">
                  <button
                    onClick={() => toggleReaction(message.id, 'helpful')}
                    className={`p-1 rounded hover:bg-gray-100 ${
                      message.reactions?.helpful ? 'text-green-500' : 'text-gray-400'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleReaction(message.id, 'unhelpful')}
                    className={`p-1 rounded hover:bg-gray-100 ${
                      message.reactions?.unhelpful ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleSaved(message.id)}
                    className={`p-1 rounded hover:bg-gray-100 ${
                      message.saved ? 'text-primary' : 'text-gray-400'
                    }`}
                  >
                    {message.saved ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">AI is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about budgeting, savings, or financial goals..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button
            variant="primary"
            onClick={handleSend}
            icon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FinancialAdvisor;