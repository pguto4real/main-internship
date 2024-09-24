import React from 'react'
import landingStyles from '../styles/landing.module.css'
import LoginModal from './LoginModal'
function Landing({toggleModal}) {

  return (
    <section className={landingStyles.landing}>
      <div className="containers">
        <div className="row">
          <div className={landingStyles.landing__wrapper}>
            <div className={landingStyles.landing__content}>
              <div className={landingStyles.landing__content__title}>
                Gain more knowledge <br className="remove--tablet" />
                in less time
              </div>
              <div className={landingStyles.landing__content__subtitle}>
                Great summaries for busy people,
                <br className="remove--tablet" />
                individuals who barely have time to read,
                <br className="remove--tablet" />
                and even people who don’t like to read.
              </div>
              {/* <LoginModal text="Login" /> */}
              <button className="btn__ai home__cta--btn__ai" onClick={()=>toggleModal()}>Login</button>
            </div>
            <figure className={`${landingStyles['landing__image--mask']}`}>
              <img src="/assets/landing.png" alt="landing" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing