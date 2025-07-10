import React, { useContext, useEffect, useState } from 'react';
import Title from '../Components/Title';
import { UserContext } from '../Providers/UserProvider';
import Spinner from '../Components/Spinner';
import { Link } from 'react-router-dom';

function Homepage() {
  const { currUser, fetching } = useContext(UserContext);
  const [role, setRole] = useState('null');

  useEffect(() => {
    if (!fetching) {
      setRole(currUser.role);
    }
  }, [fetching]);

  return (
    <div>
      <Title title="Deliver | Home"></Title>
      <div class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Hero Section */}
        <header class="text-center py-10 bg-gradient-to-r from-blue-500 to-purple-700 text-white shadow-lg relative">
          <div class="container mx-auto px-4">
            <h1 class="text-6xl font-extrabold animate-fade-in-down">
              Deliver
            </h1>
            <p class="text-2xl mt-4 animate-fade-in-up">
              Welcome to the Future of Parcel Delivery
            </p>
            <div class="mt-6 animate-scale-in-center">
              <img
                src="https://i.ibb.co/MstwFy4/pikaso-texttoimage-cartoon-delivery-man.jpg"
                alt="Delivery Person"
                class="mx-auto w-64 h-auto rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <h2 class="text-3xl font-semibold mt-8 animate-fade-in">
              Efficient. Reliable. Convenient.
            </h2>
            <p class="mt-4 max-w-xl mx-auto text-lg">
              With Deliver, sending and receiving parcels has never been easier.
              Whether it's across the street or across the country, we've got
              you covered.
            </p>

            {(role === 'null' || role === 'user') && (
              <Link
              to="/place_order"
              class="mt-6 inline-block px-6 py-3 text-white font-bold rounded-lg shadow-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-[length:200%_auto] animate-wave transition duration-300"
              >
                Place an order
              </Link>  
            )}

          </div>
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 opacity-20 rounded-full blur-3xl"></div>
        </header>

        {/* Features Section */}
        <section class="py-16 bg-white">
          <div class="max-w-6xl mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold mb-12 text-gray-800">
              Why Choose Us?
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Fast Delivery',
                  description:
                    'Our network of couriers ensures speedy delivery to your doorstep.',
                },
                {
                  title: 'Real-Time Tracking',
                  description:
                    'Stay updated on the status of your parcel with our live tracking feature.',
                },
                {
                  title: 'Secure',
                  description:
                    'Your parcels are handled with care and delivered safely to their destination.',
                },
                {
                  title: '24/7 Support',
                  description:
                    'Need assistance? Our customer support team is available around the clock to help you.',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  class="bg-gradient-to-br from-blue-100 to-gray-100 rounded-lg shadow-lg p-6 hover:scale-105 transform transition"
                >
                  <h3 class="text-2xl font-semibold mb-4 text-gray-700">
                    {feature.title}
                  </h3>
                  <p class="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section class="py-16 bg-gray-200">
          <div class="max-w-6xl mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold mb-12 text-gray-800">
              How It Works
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Book Your Delivery',
                  description:
                    'Simply enter the pickup and delivery details to get started.',
                },
                {
                  title: 'Track Your Parcel',
                  description: 'Monitor your parcel’s journey in real-time.',
                },
                {
                  title: 'Receive Your Parcel',
                  description:
                    'Enjoy hassle-free delivery right to your doorstep.',
                },
              ].map((step, index) => (
                <div
                  key={index}
                  class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                >
                  <h3 class="text-2xl font-semibold mb-4 text-gray-700">
                    {step.title}
                  </h3>
                  <p class="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section class="py-16 bg-white">
          <div class="max-w-6xl mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold mb-12 text-gray-800">
              Join Thousands of Satisfied Customers
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  class="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg p-6 hover:scale-105 transform transition"
                >
                  <div class="flex items-center mb-4">
                    <img
                      src={`https://randomuser.me/api/portraits/${
                        i % 2 === 0 ? 'men' : 'women'
                      }/${i}.jpg`}
                      alt="User"
                      class="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 class="text-xl font-semibold">
                        {i % 2 === 0 ? 'John Doe' : 'Jane Doe'}
                      </h3>
                      <p class="text-gray-600">
                        {i % 2 === 0 ? 'Los Angeles, CA' : 'New York, NY'}
                      </p>
                    </div>
                  </div>
                  <p class="text-gray-600">
                    "Deliver has completely changed how I send and receive
                    parcels. Highly recommended!"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        {(role === 'null' || role === 'user') && (
        <section class="py-10 bg-gradient-to-r from-green-400 to-blue-400 text-white text-center">
          <h2 class="text-3xl font-bold mb-6">
            Ready to Deliver Smarter?
          </h2>
              <Link
              to="/place_order"
              class="mt-6 inline-block px-6 py-3 text-white font-bold rounded-lg shadow-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-[length:200%_auto] animate-wave transition duration-300"
              >
                Place an order
              </Link>  
        </section>
        )}
      </div>
    </div>
  );
}

export default Homepage;
