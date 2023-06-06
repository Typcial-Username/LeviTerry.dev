import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faBook, faCog, faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faHtml5 } from '@fortawesome/free-brands-svg-icons'
import styles from '../styles/Sidebar.module.css'
import Link from 'next/link'
import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { Tooltip } from './Tooltip'
import { Dropdown } from './Dropdown'

export const Sidebar = () => {
    const [ settingsOpen, setSettingsOpen ] = useState(false)
    const [ option, setOption ] = useState('files')

    const themes = [
        {
            label: 'Light',
            value: 'light'
        },
        {
            label: 'Dark',
            value: 'dark'
        },
        {
            label: 'Blue',
            value: 'blue'
        },
    ]
    return <aside id={styles.sidebar}>
        <div>
            <ul className={styles.options}>
                <li>
                    {/* <Tooltip text={"Files"}> */}
                        <a 
                            id="files"
                            className={styles.button}
                            onClick={() => {
                                selectMenu('files')
                                setOption('files')
                            }}
                            aria-label="Files"
                        >
                        <FontAwesomeIcon icon={faFile} size="3x" className={styles.icon}/>
                        </a>
                    {/* </Tooltip> */}
                </li>

                <li>
                    {/* <Tooltip text={"Documents"}> */}
                        <a 
                            id="docs"
                            className={styles.button}
                            onClick={() => {
                                selectMenu('docs')
                                setOption('docs')
                            }}
                        >
                            <FontAwesomeIcon icon={faBook} size="3x" className={styles.icon}/>
                        </a>        
                    {/* </Tooltip> */}
                </li>

                {/* <li>
                    <Link 
                        href="https://github.com/Typcial-Username">
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                    </Link>
                </li> */}

            </ul>

            <ul className={styles.options}>
                <li>
                    {/* <Tooltip text="Socials"> */}
                        <a
                            className={styles.button}
                        >
                            <FontAwesomeIcon icon={faCircleUser} size="3x" className={styles.icon}/>
                        </a>
                    {/* </Tooltip> */}
                </li>

                <li>
                    {/* <Tooltip text={"Settings"}> */}
                        <a 
                            className={styles.button} 
                            type='button' 
                            onClick={() => setSettingsOpen(!settingsOpen)}
                            >
                                <FontAwesomeIcon icon={faCog} size="3x" className={styles.icon}/>
                        </a>
                    {/* </Tooltip> */}
                </li>

            </ul>
        </div>
        
        <div className={`${styles.content} ${settingsOpen ? `${styles.open}` : `${styles.closed}`}`}>
            <ul style={{ margin: 'auto', padding: 'auto', alignContent: 'center', justifyContent: 'center', display: 'flex' }}>
                <form style={{ margin: 'auto', padding: 0 }}>
                    <label htmlFor="theme">Theme: </label>
                    {/* <Dropdown options={themes} /> */}
                    <select name="theme" id="theme" onChange={onThemeChange}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="blue">Blue</option>
                    </select>
                </form>
                {/* <li><a href="">{<FontAwesomeIcon icon={faHtml5} size="lg"/>}</a></li> */}
            </ul>
        </div>
    </aside>
}

const selectMenu = (btn: string)  => {
    console.log(`Selected ${btn}`)
    const button = document.getElementById(btn)
    console.log(button)
    button?.classList.add(`${styles.selected}`)

    const allButtons = ['files', 'docs']
    for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i] != btn) {
            document.getElementById(allButtons[i])?.classList.remove(`${styles.selected}`)
        }
    } 
}

if (typeof window !== "undefined") {
    window.onload = (event: Event) => {
        setTheme(localStorage.getItem('theme') || 'dark')
    }
}

const setTheme = (theme: string) => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
}

const onThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // const root = document.querySelector(':root')
    const elm = document.getElementById('theme')
    // @ts-ignore
    setTheme(elm?.value)
}

function titleCase(text: string) {
    return text[0].toUpperCase() + text.slice(1).toLowerCase()
}