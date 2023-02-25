import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faBook, faCog, faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faHtml5 } from '@fortawesome/free-brands-svg-icons'
import styles from '../styles/Sidebar.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { Tooltip } from './Tooltip'

export const Sidebar = () => {
    const [ settingsOpen, setSettingsOpen ] = useState(false)

    return <aside id={styles.sidebar}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ul className={styles.options}>
                <li>
                    <button 
                        id="files"
                        className={styles.button}
                        onClick={() => selectMenu('files')}
                        aria-label="Explorer"
                    >
                    <FontAwesomeIcon icon={faFile} size="3x"/>
                 </button>
                 <Tooltip text={"Explorer"}/>
                </li>

                <li>
                    <button 
                        id="docs"
                        className={styles.button}
                        onClick={() => selectMenu('docs')}
                     >
                        <FontAwesomeIcon icon={faBook} size="3x"/>
                    </button>
                </li>

                {/* <li>
                    <Link 
                        href="https://github.com/Typcial-Username">
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                    </Link>
                </li> */}

                <li>
                    <button
                        className={styles.button}
                    >
                        <FontAwesomeIcon icon={faCircleUser} size="3x"/>
                    </button>
                </li>

                <li>
                    <button 
                        className={styles.settings_btn} 
                        type='button' 
                        onClick={() => setSettingsOpen(!settingsOpen)}
                        >
                            <FontAwesomeIcon icon={faCog} size="3x" />
                    </button>
                </li>
            </ul>
        </div>  
        
        <div className={`${styles.content} ${settingsOpen ? `${styles.open}` : `${styles.closed}`}`}>
            <ul>
                {/* <li><a href="">{<FontAwesomeIcon icon={faHtml5} size="lg"/>}</a></li> */}
            </ul>
        </div>
    </aside>
}

const selectMenu = (btn: string)  => {
    const button = document.getElementById(btn)
    button?.classList.add(`${styles.selected}`)

    const allButtons = ['files', 'docs']
    for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i] != btn) {
            document.getElementById(allButtons[i])?.classList.remove(`${styles.selected}`)
        }
    }
}