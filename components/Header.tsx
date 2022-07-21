import { useEffect } from 'react'
import styles from '../styles/Header.module.css'

interface HeaderProps {
    name: string,
    links?: string[]
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

const Header = ({name, links} : HeaderProps) => {
  return (
    <div className={styles.header}>
        <p><a href="/"> {name}</a></p>
        <div className={styles.links}>
            
        </div>
    </div>
  )
}

export default Header
