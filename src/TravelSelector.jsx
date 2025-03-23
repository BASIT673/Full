import React, { useState } from 'react';
import { Calendar, MapPin, Plane, Hotel, Umbrella, ChevronDown, X, Check } from 'lucide-react';
 
const TravelSelector = ({
  currentView,
  setView,
  featured,
  trending
}) => {
  const [step, setStep] = useState('where');
  const [selection, setSelection] = useState({
    destination: '',
    dates: '',
    activity: ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const activities = [
    { id: 'adventure', name: 'Adventure' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'relaxation', name: 'Relaxation' },
    { id: 'family', name: 'Family' },
    { id: 'romantic', name: 'Romantic' }
  ];

  const handleDestinationSelect = (destination) => {
    setSelection({...selection, destination: destination.name});
    setStep('when');
    setIsDropdownOpen(false);
  };
  
  const handleDateSelect = (option) => {
    setSelection({...selection, dates: option});
    setStep('what');
  };
  
  const handleActivitySelect = (activity) => {
    setSelection({...selection, activity: activity});
    // Here you would trigger your search/navigation
  };
  
  const resetSelection = () => {
    setSelection({destination: '', dates: '', activity: ''});
    setStep('where');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex border-b border-gray-200">
        <button 
          className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium transition-colors ${
            step === 'where' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => step !== 'where' && setStep('where')}
        >
          <MapPin className="w-5 h-5" />
          Where
          {selection.destination && (
            <span className="ml-2 text-sm bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full flex items-center">
              {selection.destination}
              <button onClick={(e) => {
                e.stopPropagation();
                setSelection({...selection, destination: ''});
              }}>
                <X className="w-3 h-3 ml-1" />
              </button>
            </span>
          )}
        </button>
        
        <button 
          className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium transition-colors ${
            step === 'when' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
          } ${!selection.destination && 'opacity-50 cursor-not-allowed'}`}
          disabled={!selection.destination}
          onClick={() => selection.destination && setStep('when')}
        >
          <Calendar className="w-5 h-5" />
          When
          {selection.dates && (
            <span className="ml-2 text-sm bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full flex items-center">
              {selection.dates}
              <button onClick={(e) => {
                e.stopPropagation();
                setSelection({...selection, dates: ''});
              }}>
                <X className="w-3 h-3 ml-1" />
              </button>
            </span>
          )}
        </button>
        
        <button 
          className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium transition-colors ${
            step === 'what' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
          } ${(!selection.destination || !selection.dates) && 'opacity-50 cursor-not-allowed'}`}
          disabled={!selection.destination || !selection.dates}
          onClick={() => (selection.destination && selection.dates) && setStep('what')}
        >
          <Umbrella className="w-5 h-5" />
          What
          {selection.activity && (
            <span className="ml-2 text-sm bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full flex items-center">
              {selection.activity}
              <button onClick={(e) => {
                e.stopPropagation();
                setSelection({...selection, activity: ''});
              }}>
                <X className="w-3 h-3 ml-1" />
              </button>
            </span>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {step === 'where' && (
          <div>
            <div className="relative mb-6">
              <div 
                className="p-3 border border-gray-300 rounded-lg flex items-center justify-between cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                  <span className={selection.destination ? 'text-gray-900' : 'text-gray-500'}>
                    {selection.destination || 'Select your destination'}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {featured.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleDestinationSelect(item)}
                    >
                      <img 
                        src={item.imageUrl || '/api/placeholder/32/32'} 
                        alt={item.name} 
                        className="w-8 h-8 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Destinations</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {trending.slice(0, 6).map((item) => (
                  <div 
                    key={item.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer flex items-center"
                    onClick={() => handleDestinationSelect(item)}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {step === 'when' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">When would you like to travel?</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Next Weekend', 'Within 30 Days', 'Within 90 Days', 'Next 6 Months', 'This Summer', 'This Winter'].map((option) => (
                <div 
                  key={option}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selection.dates === option 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleDateSelect(option)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {selection.dates === option && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {step === 'what' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">What kind of experience?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {activities.map((activity) => (
                <div 
                  key={activity.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all text-center ${
                    selection.activity === activity.name 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleActivitySelect(activity.name)}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      {activity.id === 'adventure' && <Plane className="w-5 h-5 text-blue-600" />}
                      {activity.id === 'cultural' && <MapPin className="w-5 h-5 text-blue-600" />}
                      {activity.id === 'relaxation' && <Umbrella className="w-5 h-5 text-blue-600" />}
                      {activity.id === 'family' && <Hotel className="w-5 h-5 text-blue-600" />}
                      {activity.id === 'romantic' && <Calendar className="w-5 h-5 text-blue-600" />}
                    </div>
                    <span className="font-medium">{activity.name}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {selection.activity && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">Your selection:</div>
                    <div className="text-lg font-medium">
                      {selection.activity} in {selection.destination}, {selection.dates}
                    </div>
                  </div>
                  <button 
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    // onClick={() => {
                    //   // Here you would trigger a search or navigation with the full selection
                    //   console.log('Complete selection:', selection);
                    // }}
                    // Inside TravelSelector - modify all "Find Tours" button handlers
onClick={() => {
    // Instead of just console.log
    console.log('Complete selection:', selection);
    onComplete(selection);
  }}
                  >
                    Find Tours
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
        <button 
          className="text-gray-600 hover:text-gray-900 font-medium flex items-center"
          onClick={resetSelection}
        >
          <X className="w-4 h-4 mr-2" />
          Reset
        </button>
        
        <div className="flex gap-4">
          {step !== 'where' && (
            <button 
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => {
                setStep(step === 'what' ? 'when' : 'where');
              }}
            >
              Back
            </button>
          )}
          
          <button 
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${
              (step === 'where' && !selection.destination) || 
              (step === 'when' && !selection.dates) || 
              (step === 'what' && !selection.activity)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={
              (step === 'where' && !selection.destination) || 
              (step === 'when' && !selection.dates) || 
              (step === 'what' && !selection.activity)
            }
            onClick={() => {
              if (step === 'where' && selection.destination) {
                setStep('when');
              } else if (step === 'when' && selection.dates) {
                setStep('what');
              } else if (step === 'what' && selection.activity) {
                // Here you would trigger a search or navigation with the full selection
                console.log('Complete selection:', selection);
              }
            }}
          >
            {step === 'what' && selection.activity ? 'Find Tours' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelSelector;