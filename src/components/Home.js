import React, { Fragment } from 'react';
import Hero from './Hero';
import HomeContent from './HomeContent';

export default function Home() {
  return (
	  <Fragment>
	  <Hero />
	  <div className="box cta">
          <p className="has-text-centered">
          <span className="tag is-primary">Скоро!</span> Опросы будут работать!
      </p>
	  </div>
	  <HomeContent />
	  </Fragment>
  )
}
