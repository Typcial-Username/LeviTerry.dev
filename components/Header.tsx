import { useEffect } from 'react'
import styles from '../styles/Header.module.css'

interface HeaderProps {
    name: string
}

// useEffect(() => {
//     window.addEventListener('scroll', isSticky)
//     return () => {
//         window.removeEventListener('scroll', isSticky)
//     }
// })

// const isSticky = (elm) => {
//     const header = document.querySelector('.header')
//     const scrollTop = window.scrollY
//     scrollTop > 250 ? header?.classList.add('isSticky') : header?.classList.remove('isSticky')
// }

const Header = ({name} : HeaderProps) => {
  return (
    <div className={styles.header}>
        <p>{name}</p>
        <div className={styles.links}>
            <a className={styles.link} href="#projects">Projects</a>
            <a className={styles.link} href="#experience">Experience</a>
            <a className={styles.link} href="#contact">Contact</a>
        </div>
    </div>
  )
}

export default Header
