import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Heart, MessageCircle, Clock, Shield } from 'lucide-react';

const Hotline: React.FC = () => {
  const navigate = useNavigate();

  const hotlines = [
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: '24/7 crisis support via text message',
      icon: MessageCircle,
      color: 'text-blue-600'
    },
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: 'Free and confidential emotional support',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral and information service',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      name: 'Crisis Support Services',
      number: '1-800-273-8255',
      description: 'Available 24/7 for immediate support',
      icon: Clock,
      color: 'text-purple-600'
    }
  ];

  const handleCall = (number: string) => {
    if (number.includes('Text')) {
      alert(`To get help: ${number}`);
    } else {
      window.open(`tel:${number.replace(/[^\d]/g, '')}`);
    }
  };

  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Hotline</h1>
          <p className="text-gray-600 text-sm">Get help when you need it</p>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-red-600 mt-1">
            <Heart size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-red-900 mb-1">
              Emergency Support
            </h3>
            <p className="text-red-800 text-sm">
              If you're in immediate danger or having thoughts of self-harm, please call 911 or go to your nearest emergency room.
            </p>
          </div>
        </div>
      </div>

      {/* Hotline Cards */}
      <div className="space-y-4 mb-6">
        {hotlines.map((hotline, index) => {
          const IconComponent = hotline.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full bg-gray-50 ${hotline.color}`}>
                  <IconComponent size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {hotline.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {hotline.description}
                  </p>
                  <button
                    onClick={() => handleCall(hotline.number)}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    <Phone size={16} />
                    {hotline.number}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Resources */}
      <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
        <h3 className="font-semibold text-primary-900 mb-3">
          Remember
        </h3>
        <ul className="space-y-2 text-primary-800 text-sm">
          <li>• You're not alone in this journey</li>
          <li>• Seeking help is a sign of strength</li>
          <li>• Recovery is possible with the right support</li>
          <li>• Every small step forward matters</li>
        </ul>
      </div>

      {/* Back to Habits */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/habits')}
          className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          ← Back to Active Habits
        </button>
      </div>
    </div>
  );
};

export default Hotline;