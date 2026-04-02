import Link from "next/link";
import styles from "../../styles/Card.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  // CardFooter,
} from "../ui/card";

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

export const InfoCard = ({
  header: title,
  isPinned,
  description,
  content,
  link,
  imageOptions,
  linkHoverText,
  footer,
}: CardProps) => {
  if (description) {
    description = description.replaceAll("\n", "--");
    description = description.replaceAll("--", "\n");
  }

  return (
    <Card>
      <CardHeader>
        {imageOptions ?
          imageOptions.location == "left" ?
            <Image src={imageOptions.src} alt={imageOptions.alt} fill />
          : null
        : null}

        <CardTitle>
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
                  {title} <FontAwesomeIcon icon={faExternalLinkAlt} />
                </Link>
              </span>
            : title}
          </h2>
        </CardTitle>
      </CardHeader>

      <CardDescription>
        <p>{description}</p>
      </CardDescription>

      <CardContent className="p-4">
        {content ? content : null}

        {imageOptions ?
          imageOptions.location == "right" ?
            <Image src={imageOptions.src} alt={imageOptions.alt} />
          : null
        : null}
      </CardContent>
      {footer ?
        <CardFooter className={styles.footer}>{footer}</CardFooter>
      : null}
    </Card>
  );
};
