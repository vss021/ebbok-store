import React from 'react';
import Hero from '../components/home/Hero.jsx';
import RecentlyAddedBooks from '../components/home/RecentlyAddedBooks.jsx';

export default function Home() {
  return (
    <div className='bg-zinc-900 text-white min-h-screen'>
      {/* Hero Section */}
      <section className='pt-12 px-4 sm:px-6 lg:px-10'>
        <Hero />
      </section>

      {/* Recently Added Books Section */}
      <section className='pt-12 pb-20 px-4 sm:px-6 lg:px-10'>
        <RecentlyAddedBooks />
      </section>
    </div>
  );
}
