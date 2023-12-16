import React from 'react'

const Home = () => {

 
  return (
    <>
      <div className='flex justify-center items-center'>
        <p className=''>Welcome to the billing app which provides you with all the required features to generate
          invoices with a click.
        </p>
      </div>
        <a className='tracking-wide w-full mt-6 rounded-lg px-4 py-2 text-lg bg-blue-400' href='/pdfgenerate'>Generate Invoice</a>
    </>
  )
}

export default Home