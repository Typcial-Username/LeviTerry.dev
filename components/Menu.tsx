import { useContextMenu } from "./hooks/useContextMenu";
import styles from '../styles/Menu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export const Menu = () => {
    const { anchorPoint, show } = useContextMenu()

    const copy = <FontAwesomeIcon icon={faCopy} size='xs'/>
    const back = <FontAwesomeIcon icon={faArrowLeft} size='xs' />
    const text = "Copy Text"

    if (show) {
        return (
            <ul className={styles.menu} style={{top: anchorPoint.y, left: anchorPoint.x}}>
                <li className={styles.menu_item} onClick={() => navigator.clipboard.writeText("https://leviterry.dev")}>{copy} {text}</li>
                <li className={styles.menu_item} onClick={() => window.history.back()}>{back} Back</li>
                <li className={styles.menu_item}>3</li>
                <li className={styles.menu_item}>4</li>
                <li className={styles.menu_item}>5</li> 
            </ul>
        )
    }
} 