import React from 'react';
import { Users, Award, Globe, Heart, Target, Zap, CheckCircle } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Premium Products' },
    { number: '25+', label: 'Countries Served' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Fashion',
      description: 'We live and breathe fashion, constantly seeking the latest trends and timeless pieces that speak to your soul.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Every piece in our collection is carefully selected and crafted with the finest materials and attention to detail.'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'We connect fashion lovers worldwide, creating a community that celebrates individual style and expression.'
    },
    {
      icon: Target,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to ensure every shopping experience exceeds expectations.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & Creative Director',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'With 15 years in fashion, Sarah brings her vision of accessible luxury to UrbanThreads.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Marcus leads our design team with expertise in sustainable fashion and innovative textiles.'
    },
    {
      name: 'Emma Thompson',
      role: 'Customer Experience Lead',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Emma ensures every customer interaction reflects our commitment to exceptional service.'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Founded', description: 'UrbanThreads was born from a vision to democratize premium fashion' },
    { year: '2019', title: 'First Collection', description: 'Launched our debut collection with 50 carefully curated pieces' },
    { year: '2021', title: 'Global Expansion', description: 'Expanded to serve customers in 25+ countries worldwide' },
    { year: '2023', title: 'Sustainability Focus', description: 'Launched our eco-friendly line with 100% sustainable materials' },
    { year: '2024', title: 'Community Milestone', description: 'Reached 50,000+ satisfied customers and growing' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Born from a passion for exceptional fashion and a commitment to empowering individual style, 
              UrbanThreads has been redefining premium clothing since 2018.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                At UrbanThreads, we believe that exceptional fashion should be accessible to everyone. 
                We curate premium clothing that doesn't just look good—it makes you feel confident, 
                authentic, and ready to conquer the world.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Every piece in our collection tells a story of craftsmanship, sustainability, and style. 
                We work directly with artisans and ethical manufacturers to bring you clothing that 
                reflects your values and elevates your wardrobe.
              </p>
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Ethically sourced materials</span>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Fair trade partnerships</span>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Carbon-neutral shipping</span>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Fashion design process"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-300">
                <div className="flex items-center space-x-3">
                  <Zap className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Innovation</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Driven by creativity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do, from product selection to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                  <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From humble beginnings to global fashion destination
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-indigo-200 dark:bg-indigo-800"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-300">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The passionate individuals behind UrbanThreads
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
                  {member.role}
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion enthusiasts who trust UrbanThreads for their premium clothing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Shop Collection
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;