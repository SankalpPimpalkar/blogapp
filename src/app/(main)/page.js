import Blog from '@/components/Blog'
import React from 'react'

export default function Home() {
  return (
    <div className='flex w-full h-dvh px-6 overflow-hidden'>
      <div className='flex-2 space-y-4 overflow-y-auto pr-4'>
        {
          [1, 2, 3, 4, 5, 6].map(blog => (
            <Blog key={blog} />
          ))
        }
      </div>

      <div className='flex-1 p-6 overflow-y-auto space-y-6'>
        <h2 className='text-xl font-semibold text-white mb-6'>Suggested Content</h2>

        {[
          {
            title: "Why Simplicity Wins in Design",
            image: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
          },
          {
            title: "10 Daily Rituals for Creative Minds",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
          },
          {
            title: "How to Build a Consistent Writing Habit",
            image: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
          },
        ].map((item, idx) => (
          <div key={idx} className='flex gap-4 items-start'>
            <img
              src={item.image}
              alt={item.title}
              className='w-20 h-16 object-cover rounded-md'
            />
            <div className='text-sm text-white'>
              <p className='font-medium leading-snug'>{item.title}</p>
              <p className='text-xs text-gray-400 mt-1'>Recommended read</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
