import { useState } from 'react'
import styles from '../styles/Tooltip.module.css'

interface TooltipProps {
    children: React.ReactNode
    text: string
}

export const Tooltip = ({ children, text, ...rest }: TooltipProps) => {
    const [show, setShow] = useState(false)

    return (
        <div>
            <div 
                className={styles.tooltip}
                style={show ? {visibility: 'visible'} : {}}
                >
                    {text}
                    <span className={styles.tooltip_arrow}></span>
            </div>
            
            <div
            {...rest}
                onMouseOver={() => setShow(true)}
                onMouseLeave={() => setShow(false)} 
            >
                {children}   
            </div>
        </div>
    )
}