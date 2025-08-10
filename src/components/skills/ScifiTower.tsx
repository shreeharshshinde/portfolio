import React from 'react';

const SketchfabModel = () => {
  return (
    <div className="sketchfab-embed-wrapper">
      <iframe
        title="Scifi tower"
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        xr-spatial-tracking="true"
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
        src="https://sketchfab.com/models/4d60616e3d6a4d9487c0b44cfeeae45a/embed"
        style={{ width: '100%', height: '480px' }}
      ></iframe>

      <p style={{ fontSize: '13px', fontWeight: 'normal', margin: '5px', color: '#4A4A4A' }}>
        <a
          href="https://sketchfab.com/3d-models/scifi-tower-4d60616e3d6a4d9487c0b44cfeeae45a?utm_medium=embed&utm_campaign=share-popup&utm_content=4d60616e3d6a4d9487c0b44cfeeae45a"
          target="_blank"
          rel="noreferrer"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Scifi tower
        </a>{' '}
        by{' '}
        <a
          href="https://sketchfab.com/Anima-Z?utm_medium=embed&utm_campaign=share-popup&utm_content=4d60616e3d6a4d9487c0b44cfeeae45a"
          target="_blank"
          rel="noreferrer"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Anima Z
        </a>{' '}
        on{' '}
        <a
          href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=4d60616e3d6a4d9487c0b44cfeeae45a"
          target="_blank"
          rel="noreferrer"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Sketchfab
        </a>
      </p>
    </div>
  );
};

export default SketchfabModel;
