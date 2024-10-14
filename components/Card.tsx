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
  title: string;
  description?: string;
  content?: React.ReactNode;
  link?: string;
  linkHoverText?: string;
  imageOptions?: imageOptions;
}

export const Card = ({
  title,
  description,
  content,
  link,
  imageOptions,
  linkHoverText,
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
      {imageOptions ? (
        imageOptions.location == "left" ? (
          <Image src={imageOptions.src} alt={imageOptions.alt} fill />
        ) : null
      ) : null}
      <h2 className="border-bottom">
        {link ? (
          <span>
            <FontAwesomeIcon icon={faExternalLinkAlt} />{" "}
            <a
              className={styles.link}
              href={link}
              target="_blank"
              rel="noreferrer"
              title={linkHoverText || "Link to project"}
            >
              {title}
            </a>
          </span>
        ) : (
          title
        )}
      </h2>

      <p>{description}</p>

      {content ? content : null}

      {imageOptions ? (
        imageOptions.location == "right" ? (
          <Image src={imageOptions.src} alt={imageOptions.alt} />
        ) : null
      ) : null}
    </div>
  );
};
