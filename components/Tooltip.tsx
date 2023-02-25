import { useState } from 'react'
import styles from '../styles/Tooltip.module.css'

interface TooltipProps {
    text: string
}

export const Tooltip = ({ text }: TooltipProps) => {
    const [show, setShow] = useState(false)

    return (
        <div 
            style={show ? {visibility: 'visible'} : {}}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            >
                {text}
                <span className={styles.tooltip_arrow}></span>
            {/* <p>{text}</p> */}
        </div>
    )
}