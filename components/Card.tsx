import Link from "next/link";
import styles from "../styles/Card.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

type imageLocations = "left" | "right";
type imageOptions = {
  src: string;
  location: imageLocations;
  alt: string;
};
interface CardProps {
  header: React.ReactNode;
  isPinned?: boolean;
  description?: string;
  content?: React.ReactNode;
  link?: string;
  linkHoverText?: string;
  imageOptions?: imageOptions;
  footer?: React.ReactNode;
}

export const Card = ({
  header: title,
  isPinned,
  description,
  content,
  link,
  imageOptions,
  linkHoverText,
  footer
}: CardProps) => {
  if (description) {
    description = description.replaceAll("\n", "--");
    description = description.replaceAll("--", "\n");
  }

  return (
    <div
      className={`${styles.card}`}
      style={{ border: "1px solid var(--clr-primary)" }}
    >
      {imageOptions ?
        imageOptions.location == "left" ?
          <Image src={imageOptions.src} alt={imageOptions.alt} fill />
        : null
      : null}

      <h2 className="border-bottom">
        {isPinned ?
          <span className={styles.pinned}>📌 </span>
        : null}
        {link ?
          <span>
            <Link
              className={styles.link}
              href={link}
              target="_blank"
              rel="noreferrer"
              title={linkHoverText || "Link to project"}
            >
              {title}{" "}
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Link>
          </span>
        : title}
      </h2>

      <p>{description}</p>

      {content ? content : null}

      {imageOptions ?
        imageOptions.location == "right" ?
          <Image src={imageOptions.src} alt={imageOptions.alt} />
        : null
      : null}

      {
        footer ?
          <div className={styles.footer}>
            {footer}
          </div>
        : null
      }
    </div>
  );
};
