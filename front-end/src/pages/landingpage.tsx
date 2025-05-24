import React from "react";


const eventImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr1zNcqRfrYyAf5e-sPsX1ZsTxUb_knzGZQw&s",
  "https://www.dreamjob.ma/wp-content/uploads/2024/04/Inscription-Bourse-Jadara-Foundation-2024-2025.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtidb7u-BSPvgiEbc7QcpOYQlslMXMybEbH7x0Ht1d7ly1rU5EZvqBOsif5kCF3U29l2k&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgjjNAmF9ckgaIGwl5wlgQrHi2fwVLdXop263DHsgF_JYy3sQFMqvy6D4xOFTYW6qW2mY&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvX2aIg28K64uDGDe-zpoudAxaBNYZrrpBsyHXnsGzBbUD_k3AlmKTo2BMgC1TFrsj4FQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qSvpdpB0lGwtIMi3iJndGCPQHWqakRZ70TtTAv_xADgNtotjZU0ZPU_323Ov20Sulsg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuyVVGZhuMIEO8ByNkY6451EE68CeKvdDbg7E-YBrBlNgKnvbf8jbvDEWPYJ-HAWqMPZo&usqp=CAU",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
    
      <section className="bg-blue-50 py-20 text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Empowering Students Through Events & Skills</h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-6">
          Jadara helps students manage their activities, track achievements, and grow through hands-on events.
        </p>
        <a href="#login" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Get Started
        </a>
      </section>

      
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Recent Events</h3>
          <div className="flex gap-4 overflow-x-auto">
            {eventImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Event ${i + 1}`}
                className="w-full h-48 object-cover rounded-xl shadow-md"
              />
            ))}
          </div>
        </div>
      </section>

      
      <section id="about" className="bg-gray-50 py-16 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">About Jadara</h2>
          <p className="text-gray-700 text-lg mb-10">
            Jadara is a student-focused platform that enables skill development and achievement tracking through events, workshops, and leadership initiatives.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Skill Tracking", desc: "Measure and improve your personal and technical abilities." },
              { title: "Event Engagement", desc: "Join, organize, and lead student events and projects." },
              { title: "Recognition & Rewards", desc: "Earn badges and get recognized for your contributions." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <h4 className="text-xl font-semibold text-blue-700">{item.title}</h4>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
        <p className="mb-6">Join Jadara and elevate your student experience through purposeful engagement.</p>
        <a href="/register" className="inline-block bg-white text-blue-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100">
          Join Now
        </a>
      </section>

    </div>
  );
}
