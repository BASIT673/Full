import React, { useState } from 'react';

const TravelPagesRouter = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Pages content
  const pages = {
    home: (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Welcome to Wanderlust Travel</h1>
        <p className="text-lg mb-6">Explore our curated selection of travel experiences and find your next adventure!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-3">Featured Destinations</h2>
            <p>Discover our handpicked selection of incredible places to visit.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-3">Special Offers</h2>
            <p>Limited-time deals on our most popular travel packages.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-3">Travel Guide</h2>
            <p>Expert tips and recommendations for your next journey.</p>
          </div>
        </div>
      </div>
    ),
    topDestinations: (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Top Destinations</h1>
        <p className="text-lg mb-6">Explore our most popular travel destinations loved by travelers worldwide.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Bali, Indonesia</h2>
              <p className="text-gray-700 mb-4">Experience the perfect blend of beautiful beaches, lush rice terraces, and vibrant culture.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Learn More</button>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Santorini, Greece</h2>
              <p className="text-gray-700 mb-4">Enjoy breathtaking views of the Aegean Sea from whitewashed buildings perched on cliffs.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Learn More</button>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Kyoto, Japan</h2>
              <p className="text-gray-700 mb-4">Immerse yourself in Japanese culture with ancient temples, beautiful gardens, and traditional tea houses.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Learn More</button>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Machu Picchu, Peru</h2>
              <p className="text-gray-700 mb-4">Discover the ancient Incan citadel set high in the Andes Mountains.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    ),
    tourPackages: (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Tour Packages</h1>
        <p className="text-lg mb-6">All-inclusive tour packages designed to give you the best travel experience.</p>
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">European Discovery</h2>
            <p className="text-gray-600 mb-2">14 days | 7 countries</p>
            <p className="mb-4">Experience the best of Europe with this comprehensive tour package covering major cities and landmarks.</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">$2,999</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Asian Adventure</h2>
            <p className="text-gray-600 mb-2">12 days | 4 countries</p>
            <p className="mb-4">Explore the rich cultures and stunning landscapes of Southeast Asia with this curated tour package.</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">$2,499</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">African Safari</h2>
            <p className="text-gray-600 mb-2">10 days | 3 countries</p>
            <p className="mb-4">Witness the incredible wildlife and breathtaking landscapes of Africa on this unforgettable safari tour.</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">$3,299</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    ),
    weekendGetaways: (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Weekend Getaways</h1>
        <p className="text-lg mb-6">Perfect short trips for when you need a quick escape from your routine.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-40 bg-gray-300"></div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Mountain Retreat</h2>
              <p className="text-gray-700 mb-2">3 days | All-inclusive</p>
              <p className="mb-4">Relax and rejuvenate in a peaceful mountain setting with spa treatments and nature walks.</p>
              <span className="block text-lg font-bold mb-2">$599</span>
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-40 bg-gray-300"></div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Beach Escape</h2>
              <p className="text-gray-700 mb-2">2 days | Breakfast included</p>
              <p className="mb-4">Enjoy sun, sand, and sea with this perfect beach getaway package.</p>
              <span className="block text-lg font-bold mb-2">$399</span>
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-40 bg-gray-300"></div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">City Break</h2>
              <p className="text-gray-700 mb-2">3 days | Hotel & Tours</p>
              <p className="mb-4">Explore vibrant city life with guided tours and premium accommodations.</p>
              <span className="block text-lg font-bold mb-2">$499</span>
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    ),
    adventureTours: (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Adventure Tours</h1>
        <p className="text-lg mb-6">Thrilling experiences for the adventurous traveler seeking excitement and challenge.</p>
        <div className="space-y-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
            <div className="md:w-1/3 h-48 md:h-auto bg-gray-300"></div>
            <div className="md:w-2/3 p-6">
              <h2 className="text-2xl font-bold mb-2">Himalayan Trek</h2>
              <p className="text-gray-600 mb-2">7 days | Expert guides</p>
              <p className="mb-4">Challenge yourself with this guided trek through the majestic Himalayan mountains.</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">$1,299</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
            <div className="md:w-1/3 h-48 md:h-auto bg-gray-300"></div>
            <div className="md:w-2/3 p-6">
              <h2 className="text-2xl font-bold mb-2">Amazon Expedition</h2>
              <p className="text-gray-600 mb-2">10 days | All-inclusive</p>
              <p className="mb-4">Explore the wonders of the Amazon rainforest with experienced guides and comfortable accommodations.</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">$1,899</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
            <div className="md:w-1/3 h-48 md:h-auto bg-gray-300"></div>
            <div className="md:w-2/3 p-6">
              <h2 className="text-2xl font-bold mb-2">Scuba Diving Package</h2>
              <p className="text-gray-600 mb-2">5 days | Equipment included</p>
              <p className="mb-4">Discover the underwater world with professional diving instructors in some of the world's best diving spots.</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">$1,499</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    honeymoonPackages: (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Honeymoon Packages</h1>
        <p className="text-lg mb-6">Romantic getaways designed specifically for newlyweds to celebrate their love.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Maldives Paradise</h2>
              <p className="text-gray-700 mb-4">7 days in an overwater bungalow with private dining experiences and couples spa treatments.</p>
              <ul className="mb-4 space-y-2">
                <li className="flex items-center"><span className="mr-2">✓</span> Private beach dinners</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Couples massage</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Sunset cruise</li>
              </ul>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">$3,999</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Italian Romance</h2>
              <p className="text-gray-700 mb-4">10 days exploring Venice, Florence, and the Amalfi Coast with romantic experiences.</p>
              <ul className="mb-4 space-y-2">
                <li className="flex items-center"><span className="mr-2">✓</span> Gondola ride in Venice</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Private wine tasting</li>
                {/* <li className="flex items-center"><span className="mr-2">✓</span><li className="flex items-center"><span className="mr-2">✓</span> Coastal villa stay</li> */}
              </ul>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">$4,599</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    groupTours: (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Group Tours</h1>
        <p className="text-lg mb-6">Travel with like-minded people and make new friends on these specially designed group tours.</p>
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Cultural Immersion</h2>
            <p className="text-gray-600 mb-2">12 days | Max 15 people</p>
            <p className="mb-4">Immerse yourself in local cultures with this small group tour focusing on authentic experiences.</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">$2,199</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Photography Tour</h2>
            <p className="text-gray-600 mb-2">8 days | Professional guidance</p>
            <p className="mb-4">Perfect for photography enthusiasts looking to capture stunning landscapes and moments.</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">$1,899</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Foodie Adventure</h2>
            <p className="text-gray-600 mb-2">10 days | Culinary experiences</p>
            <p className="mb-4">Explore local cuisines and food traditions with cooking classes and market visits.</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">$2,399</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    ),
    luxuryEscapes: (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Luxury Escapes</h1>
        <p className="text-lg mb-6">Premium travel experiences with 5-star accommodations and exclusive services.</p>
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
            <div className="md:w-2/5 h-64 md:h-auto bg-gray-300"></div>
            <div className="md:w-3/5 p-6">
              <h2 className="text-2xl font-bold mb-2">Private Island Retreat</h2>
              <p className="text-gray-600 mb-2">7 days | All-inclusive</p>
              <p className="mb-4">Experience ultimate luxury with a private island stay, personal butler service, and exclusive amenities.</p>
              <ul className="mb-4 space-y-2">
                <li className="flex items-center"><span className="mr-2">✓</span> Private helicopter transfer</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Personal chef and butler</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Daily spa treatments</li>
              </ul>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">$9,999</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
            <div className="md:w-2/5 h-64 md:h-auto bg-gray-300"></div>
            <div className="md:w-3/5 p-6">
              <h2 className="text-2xl font-bold mb-2">Ultra-Luxury Safari</h2>
              <p className="text-gray-600 mb-2">10 days | Private guides</p>
              <p className="mb-4">Safari in style with private lodges, exclusive game drives, and premium dining experiences.</p>
              <ul className="mb-4 space-y-2">
                <li className="flex items-center"><span className="mr-2">✓</span> Private air transfers</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Exclusive wildlife viewing</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Luxury tented camps</li>
              </ul>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">$12,999</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  // Navigation links
  const navigationItems = [
    { name: 'Top Destinations', page: 'topDestinations' },
    { name: 'Tour Packages', page: 'tourPackages' },
    { name: 'Weekend Getaways', page: 'weekendGetaways' },
    { name: 'Adventure Tours', page: 'adventureTours' },
    { name: 'Honeymoon Packages', page: 'honeymoonPackages' },
    { name: 'Group Tours', page: 'groupTours' },
    { name: 'Luxury Escapes', page: 'luxuryEscapes' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Wanderlust Travel</h1>
          </div>
          <nav>
            <button 
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2 hover:text-blue-300"
            >
              Home
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        {pages[currentPage] || pages['home']}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p>Wanderlust Travel has been helping travelers explore the world since 2005.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4" id="explore-heading">Explore</h2>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.page}>
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(item.page);
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-blue-400 transition-colors duration-300 hover:pl-1 block focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <ul className="space-y-3">
              <li>Email: info@wanderlust.travel</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Travel Lane, City</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <p className="mb-2">Subscribe to get special offers and travel updates</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="px-4 py-2 w-full text-gray-800 rounded-l"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center">
          <p>© 2025 Wanderlust Travel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TravelPagesRouter;