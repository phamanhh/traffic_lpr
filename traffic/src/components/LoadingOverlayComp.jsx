import React from 'react'
import LoadingOverlay from 'react-loading-overlay';

const LoadingOverlayComp = ({ isActive, text }) => {
  return (
    <div className={`fixed top-0 right-0 left-0 bottom-0 h-screen ${isActive ? 'z-20' : 'z-[-1]'}`}>
      <LoadingOverlay
        className='h-full'
        active={isActive}
        spinner
        text={text ? text :'Loading your content...'}
      >
      </LoadingOverlay>
    </div>
  )
}

export default LoadingOverlayComp