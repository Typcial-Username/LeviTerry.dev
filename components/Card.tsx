import Link from 'next/link'
import styles from '../styles/Card.module.css'

interface CardProps {
    title: string,
    description: string,
    link?: string,
    linkHoverText?: string
}

export const Card = ({title, description, link}: CardProps) => {
    let content = description.replaceAll("\n", "--")
    content = content.replaceAll("--", "\n")
    return (
        <div className={styles.card}>
            <h2>{link ? <a className={styles.link} href={link} target="_blank">{title}</a> : title}</h2>
            <p>{content}</p>
        </div>
    )
}