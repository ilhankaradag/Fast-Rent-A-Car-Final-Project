import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Information = () => {
  const [typeEffect] = useTypewriter({
    words: ['Fast Rent a Car', 'Safe', 'Comfortable', 'Fast Service'],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
  });
  return (
    <div className="information">
      <h1>
        Welcome
        <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
          {typeEffect}
        </span>
      </h1>
    </div>
  );
};

export default Information;
