import React from 'react'

const shimer = () => {
  return (
    <div>
        <div className="flex flex-col gap-4 p-4">
      <div className="shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg h-24 w-full"></div>
      <div className="shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg h-12 w-1/2"></div>
      <div className="shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg h-12 w-1/3"></div>
    </div>
    </div>
  )
}

export default shimer
