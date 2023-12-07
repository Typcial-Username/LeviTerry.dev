import Link from "next/link";
import styles from "../styles/Card.module.css";

type imageLocations = "left" | "right";
type imageOptions = {
  src: string;
  location: imageLocations;
  alt: string;
};
interface CardProps {
  title: string;
  description: string;
  link?: string;
  linkHoverText?: string;
  imageOptions?: imageOptions;
}

export const Card = ({ title, description, link, imageOptions }: CardProps) => {
  let content = description.replaceAll("\n", "--");
  content = content.replaceAll("--", "\n");

  return (
    <div className={`${styles.card}`}>
      {/* {image ? imageLocation == 'left' ? <img src={image} />: '' : null} */}
      <h2 className="border-bottom">
        {link ? (
          <a
            className={styles.link}
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h2>
      <p>{content}</p>
    </div>
  );
};
