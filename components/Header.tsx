import styles from '../styles/Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHtml5 } from '@fortawesome/free-brands-svg-icons'

// const sidebar = document.getElementById('sidebar')
// sidebar?.style.

interface HeaderProps {
  file: string;
}

const Header = ({ file }: HeaderProps) => {
  return (
    <div className={styles.header}>
        <div className={styles.file}>
          {file}
          {/* <FontAwesomeIcon icon={faHtml5} color="#e44f26"/> {file} */}
      </div>
    </div>
  )
}

export default Header
