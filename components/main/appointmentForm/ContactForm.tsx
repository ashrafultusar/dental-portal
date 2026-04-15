"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  // Fixed: Added ChangeEvent type for inputs and textareas
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fixed: Added FormEvent type for the form submission
  const handleWhatsAppSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myNumber = "8801571419493"; 

    const text = `*New Inquiry*%0A
*Name:* ${formData.name}%0A
*Phone:* ${formData.phone}%0A
*Email:* ${formData.email}%0A
*Subject:* ${formData.subject}%0A
*Message:* ${formData.message}`;

    window.open(`https://wa.me/${myNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-50 shadow-xl shadow-gray-200/50">
      <h2 className="text-3xl font-bold text-[#1D2939] mb-8">Send a Message</h2>
      <form className="space-y-5" onSubmit={handleWhatsAppSend}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input 
            type="text" 
            name="name"
            placeholder="Your Name" 
            required
            onChange={handleChange}
            className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2A9D8F] focus:bg-white transition-all placeholder:text-gray-400 text-sm"
          />
          <input 
            type="text" 
            name="phone"
            placeholder="Phone Number" 
            required
            onChange={handleChange}
            className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2A9D8F] focus:bg-white transition-all placeholder:text-gray-400 text-sm"
          />
        </div>
        <input 
          type="email" 
          name="email"
          placeholder="Email Address" 
          onChange={handleChange}
          className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2A9D8F] focus:bg-white transition-all placeholder:text-gray-400 text-sm"
        />
        <input 
          type="text" 
          name="subject"
          placeholder="Subject" 
          onChange={handleChange}
          className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2A9D8F] focus:bg-white text-black transition-all placeholder:text-gray-400 text-sm"
        />
        <textarea 
          name="message"
          placeholder="Your Message..." 
          rows={5}
          required
          onChange={handleChange}
          className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2A9D8F] text-black focus:bg-white transition-all placeholder:text-gray-400 text-sm resize-none"
        ></textarea>

        <button 
          type="submit" 
          className="w-full py-4 bg-[#2A9D8F] text-white font-bold rounded-xl hover:bg-[#23857a] transition-all text-base shadow-lg shadow-teal-100 flex items-center justify-center gap-2 group"
        >
          Send via WhatsApp
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;