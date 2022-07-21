import Link from 'next/link'
import styles from '../styles/Card.module.css'

type imageLocations = 'left' | 'right'
interface CardProps {
    title: string,
    description: string,
    link?: string,
    linkHoverText?: string
    image?: string,
    imageLocation?: imageLocations
}

export const Card = ({title, description, link, image, imageLocation}: CardProps) => {
    let content = description.replaceAll("\n", "--")
    content = content.replaceAll("--", "\n")
    return (
        <div className={`${styles.card}`}>
            <h2 className='border-bottom'>{link ? <a className={styles.link} href={link} target="_blank">{title}</a> : title}</h2>
            <p>{content}</p>
        </div>
    )
}