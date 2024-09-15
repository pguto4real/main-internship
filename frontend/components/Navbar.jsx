import React from 'react'
import navStyles from '../styles/nav.module.css'
function Navbar({toggleModal}) {

  
    return (
        <nav className="nav">
            <div className={navStyles.nav__wrapper}>
                <figure className={navStyles['nav__img--mask']}>
                    <img className={navStyles.nav__img} src="/assets/logo.png" alt="logo" />
                </figure>
                <ul className={navStyles['nav__list--wrapper']}>
                    <li onClick={()=>toggleModal()} className={`${navStyles.nav__list} ${navStyles['nav__list--login']}`}>Login</li>
                    <li className={`${navStyles.nav__list} ${navStyles['nav__list--mobile']}`}>About</li>
                    <li className={`${navStyles.nav__list} ${navStyles['nav__list--mobile']}`}>Contact</li>
                    <li className={`${navStyles.nav__list} ${navStyles['nav__list--mobile']}`}>Help</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar