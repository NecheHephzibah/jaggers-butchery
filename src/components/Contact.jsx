import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Alert from './Alert';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    message: ''
  });

  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! We will get back to you soon.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          state: '',
          city: '',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Network error. Please try again later.'
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12" id='contact'>
      {status.message && (
        <Alert variant={status.type === 'success' ? 'default' : 'destructive'} className="mb-4">
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row gap-12 mt-[80px]">
        <div className="md:w-1/2 text-stone-800 space-y-6">
          <h1 className="text-4xl font-medium uppercase text-yellow-900">Contact Us</h1>
          <p className="text-xl font-light">Looking for premium quality meat?</p>
          <p className="text-stone-600 leading-relaxed">
            At Jagger's Butchery, we pride ourselves on providing the finest cuts of meat and 
            exceptional service. Whether you're planning a special dinner, need catering for an event, 
            or have questions about our products, we're here to help. Reach out to us and experience 
            the difference of working with master butchers who are passionate about their craft.
          </p>
        </div>

        <div className="md:w-1/2 max-w-md">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 space-y-6 border border-stone-200">
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />
              
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-3 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
                
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
              </div>

              <textarea
                name="message"
                placeholder="Tell us what you're looking for... Special cuts | Catering | Bulk orders..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-700 text-white py-3 rounded-md hover:bg-yellow-900 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Send Message</span>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;