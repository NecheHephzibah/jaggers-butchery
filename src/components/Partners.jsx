import React from 'react'; // Correct import for React

// If you need icons from lucide-react, import them like this:
// import { IconName } from 'lucide-react';

const Partners = () => {
  return (
    <section id="partners" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-medium text-gray-800 mb-8">Our Partners</h2>
        <p className="text-gray-600 mb-8">
          We are proud to collaborate with some of the most renowned companies, including leading farm businesses.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">

          {/* Partner 1 */}
          <div className="flex flex-col items-center">
            <img
              src="../assets/farm_fresh.jpeg"
              alt="Company 1 Logo"
              className="h-16 object-contain"
            />
            <h3 className="mt-4 text-sm font-medium text-gray-700">Farm Fresh Co.</h3>
          </div>

          {/* Partner 2 */}
          <div className="flex flex-col items-center">
            <img
              src="../assets/logojag.png"
              alt="Company 2 Logo"
              className="h-12 object-contain"
            />
            <h3 className="mt-4 text-sm font-medium text-gray-700">Jubali Agrotech Group</h3>
          </div>

          {/* Partner 3 */}
          <div className="flex flex-col items-center">
            <img
              src="../assets/adia-doaa.png"
              alt="Company 3 Logo"
              className="h-16 object-contain"
            />
            <h3 className="mt-4 text-sm font-medium text-gray-700">Adia Doaa Innovative Agriculture</h3>
          </div>

          {/* Partner 4 */}
          <div className="flex flex-col items-center">
            <img
              src="../assets/farmers_gate.png"
              alt="Company 4 Logo"
              className="h-16 object-contain"
            />
            <h3 className="mt-4 text-sm font-medium text-gray-700">Farmers Gate</h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Partners;
