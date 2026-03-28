"use client";

import React, { useState } from "react";
import { InfoCard } from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faCodeFork,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Gallery.module.css";
import { type Project } from "@/src/lib/projects.schema";
import { StarIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

import { Dialog, DialogContent } from "../../components/ui/dialog";

interface RepositoryCardProps {
  project: Project;
  isPinned?: boolean;
}

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string }
  | { type: "model"; src: string };

export const ProjectCard: React.FC<RepositoryCardProps> = ({
  project: repo,
  isPinned = false,
}) => {
  if (!repo) {
    throw new Error("No repo found");
  }

  const [isOpen, setIsOpen] = useState(false);

  const renderLanguages = () => {
    if (!repo || !repo.github?.languages) return;

    const languages = repo.github.languages;

    return (
      <div key={`${repo.id}+languages`} className={styles.languages}>
        <div className={styles.languageBar}>
          {languages.items.map((lang) => (
            <span
              key={`${repo.id}-bar-${lang.name}`}
              className={styles.languageBarSegment}
              style={{
                width: `${lang.name}%`,
                backgroundColor: lang.color || "#888",
              }}
            />
          ))}
        </div>

        {languages.items.map((lang) => (
          <>
            <div
              key={`${lang.name}-color`}
              className={styles.languageColor}
              style={{ backgroundColor: lang.color || "#888" }}
            />

            <p className={styles.languageName}>
              {lang.name} {lang.percent.toFixed(1)}
            </p>
          </>
        ))}
      </div>
    );
  };

  const renderTopics = () => {
    if (
      !repo.github?.repositoryTopics ||
      repo.github?.repositoryTopics.nodes.length === 0
    )
      return;

    return repo.github.repositoryTopics.nodes.map((node) => (
      <span
        key={`${repo.id}+${node.topic.name}`}
        className={styles.topic}
        onMouseOver={(e) => {
          e.currentTarget.style.color = "whitesmoke";
          e.currentTarget.style.backgroundColor = "#1f6feb";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#3493F8";
          e.currentTarget.style.backgroundColor = "#121D2F";
        }}
      >
        {node.topic.name}
      </span>
    ));
  };

  const carouselItems: MediaItem[] = [];
  if (repo.media) {
    if (repo.media.modelViewer)
      carouselItems.push({ type: "model", src: repo.media.modelViewer });

    if (repo.media.images && repo.media.images?.length > 0) {
      for (const img of repo.media.images) {
        carouselItems.push({
          type: "image",
          src: `https://cdn.jsdelivr.net/gh/Typcial-Username/portfolio-data@main/projects/${repo.id}/images/${img}`,
        });
      }
    }
    if (repo.media.videos && repo.media.videos?.length > 0) {
      for (const vid of repo.media.videos) {
        carouselItems.push({ type: "video", src: vid });
      }
    }
  }

  const thumbnails = carouselItems.slice(0, 3);

  return (
    <>
      <InfoCard
        key={isPinned ? `pinned-${repo.id}` : repo.id}
        isPinned={isPinned}
        header={
          <span>
            {repo.github?.isFork ?
              <span>
                <FontAwesomeIcon icon={faCodeFork} /> {repo.title}
              </span>
            : repo.title}
          </span>
        }
        description={repo.description || "No Given Description"}
        content={
          <>
            <br />
            {renderTopics()}

            <br />

            {repo.github?.stargazerCount ?
              <p key={`${repo.id}-stars`} className={styles.repositoryStats}>
                <span className={styles.starIcon}>
                  <StarIcon /> Stars{" "}
                </span>
                <span className={styles.starCount}>
                  {repo.github?.stargazerCount}
                </span>
              </p>
            : null}

            <div className="flex gap-2 w-full max-h-64 p-2 overflow-hidden">
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {thumbnails.map((item, idx) => (
                    <CarouselItem
                      key={`${repo.id}-thumb-${idx}`}
                      className={`basis-1/${carouselItems.length}`}
                    >
                      <div
                        className="w-20 h-20 overflow-hidden rounded-md cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {item.type === "image" && (
                          <img
                            src={item.src}
                            className="w-full h-full object-cover"
                          />
                        )}

                        {item.type === "video" && (
                          <div className="w-full h-full flex items-center justify-center bg-black text-white text-xs">
                            ▶
                          </div>
                        )}

                        {item.type === "model" && (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-black text-xs">
                            3D
                          </div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {carouselItems.length > 1 && (
                  <div className="flex justify-center gap-4 mt-2">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                  </div>
                )}
              </Carousel>

              {carouselItems.length > 3 && (
                <div className="w-20 h-20 flex items-center justify-center bg-black text-white text-sm rounded-md">
                  +{carouselItems.length - 3}
                </div>
              )}
            </div>

            {/* <div
              id="media"
              className="w-full aspect-video max-h-64 p-2 overflow-hidden"
            >
              {carouselItems.length > 0 && carouselItems.length > 1 ?
                <Carousel
                  orientation="horizontal"
                  opts={{
                    loop: true,
                  }}
                  className="h-full"
                >
                  <CarouselContent>
                    {carouselItems.map((item, idx) => (
                      <CarouselItem
                        className={`basis-full flex items-center justify-center`}
                        key={`${repo.id}-carousel-${idx}`}
                      >
                        <div className="w-full h-full">{item}</div>
                      </CarouselItem>
                    ))}
                    <CarouselPrevious />
                    <CarouselNext />
                  </CarouselContent>
                </Carousel>
              : carouselItems[0]}
            </div> */}

            <br />
            {renderLanguages()}
            <br />
          </>
        }
        link={repo.github?.homepageUrl || undefined}
        footer={
          repo.github?.url ?
            <a href={repo.github?.url} target="_blank" rel="noreferrer">
              View Source <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          : null
        }
      />

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogContent className="w-full bg-red-500 mx-auto my-auto">
          <div className="w-full aspect-video flex">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {carouselItems.map((item, idx) => (
                  <CarouselItem key={`${repo.id}-modal-${idx}`}>
                    {item.type === "image" && (
                      <img src={item.src} className="h-full object-contain" />
                    )}

                    {item.type === "video" && (
                      <iframe
                        src={item.src}
                        className="w-full h-[70vh]"
                        allowFullScreen
                      />
                    )}

                    {item.type === "model" && (
                      <iframe src={item.src} className="w-full h-full" />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>

              {carouselItems.length > 1 && (
                <div className="flex justify-center gap-4 mt-2">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              )}
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
