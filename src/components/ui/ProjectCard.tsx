"use client";

import React, { useState } from "react";
import { InfoCard } from "./InfoCard";
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
} from "../ui/carousel";

import { Dialog, DialogContent } from "../../components/ui/dialog";

// import FilePreview from "reactjs-file-preview";

interface RepositoryCardProps {
  project: Project;
  isPinned?: boolean;
  objective?: { id: string; description: string };
}

type MediaItem = { type: "image" | "video" | "model" | "doc"; src: string };

export const ProjectCard: React.FC<RepositoryCardProps> = ({
  project: repo,
  isPinned = false,
  objective,
}) => {
  if (!repo) {
    throw new Error("No repo found");
  }

  const [isOpen, setIsOpen] = useState(false);
  const [itemIdx, setItemIdx] = useState(0);

  const renderLanguages = () => {
    if (!repo.github || !repo.github?.languages) return;

    const languages = repo.github.languages;

    return (
      <div key={`${repo.id}-languages`} className={styles.languages}>
        <div className={styles.languageBar}>
          {languages.items.map((lang) => (
            <span
              key={`${repo.id}-bar-${lang.name}`}
              className={styles.languageBarSegment}
              style={{
                width: `${lang.percent}%`,
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

            <p
              className={`${styles.languageName} text-7xl`}
              key={`${lang.name}-legend`}
            >
              {lang.name} {lang.percent}%
            </p>
          </>
        ))}
      </div>
    );
  };

  const renderTopics = () => {
    if (!repo.github || !repo.github.topics) return;

    return repo.github.topics.map((topic) => (
      <span
        key={`${repo.id}+${topic}`}
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
        {topic}
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
          src: `https://raw.githubusercontent.com/Typcial-Username/portfolio-data/refs/heads/main/projects/${repo.id}/images/${img}`,
        });
      }
    }
    if (repo.media.videos && repo.media.videos?.length > 0) {
      for (const vid of repo.media.videos) {
        carouselItems.push({ type: "video", src: vid });
      }
    }
    if (repo.media.docs && repo.media.docs.length > 0) {
      for (const doc of repo.media.docs) {
        carouselItems.push({
          type: "doc",
          src: `https://raw.githubusercontent.com/Typcial-Username/portfolio-data/refs/heads/main/projects/${repo.id}/files/${doc}`,
        });
      }
    }
  }

  return (
    <>
      <InfoCard
        key={isPinned ? `pinned-${repo.id}` : repo.id}
        isPinned={isPinned}
        header={
          <span>
            {repo.github?.isFork ?
              <span>
                <FontAwesomeIcon icon={faCodeFork} /> {repo.title}{" "}
                {repo.course ? repo.course : null}
              </span>
            : repo.title}
          </span>
        }
        description={repo.description || "No Given Description"}
        content={
          <>
            {repo.objectives ?
              <p>
                Objective Reasoning:{" "}
                {
                  repo.objectives.find(
                    (obj) =>
                      obj.code.toLowerCase() == objective?.id.toLowerCase()
                  )?.reason
                }
              </p>
            : null}

            <br />

            {renderTopics()}

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

            {carouselItems.length > 0 ?
              <div className="flex flex-col gap-2 w-full max-h-64 m-2 overflow-hidden items-center">
                <br />

                <p>Media</p>

                <Carousel opts={{ loop: true }}>
                  <CarouselContent>
                    {carouselItems.map((item, idx) => (
                      <CarouselItem
                        key={`${repo.id}-thumb-${idx}`}
                        className={`basis-1/${carouselItems.length >= 3 ? 3 : carouselItems.length}`}
                      >
                        <div
                          className="w-20 h-20 overflow-hidden rounded-md cursor-pointer"
                          onClick={() => {
                            setIsOpen(!isOpen);
                            setItemIdx(idx);
                          }}
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

                          {item.type === "doc" && (
                            <div className="w-full h-full flex items-center justify-center bg-black text-white text-xs">
                              {item.src.split(".").pop()?.toUpperCase()}
                            </div>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <br />

                  {carouselItems.length > 3 && (
                    <div className="flex justify-center gap-4 mt-2">
                      <CarouselPrevious className="static translate-y-0" />
                      <CarouselNext className="static translate-y-0" />
                    </div>
                  )}
                </Carousel>
              </div>
            : null}

            <br />

            {renderLanguages()}
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
        <DialogContent className="max-w-none! w-[80vh] h-[80vh] p-4 flex flex-col">
          {/* Header */}
          <div className="text-center mt-2 mb-4 text-lg font-medium border-b-4 shrink-0">
            {repo.title} Media
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <Carousel
              opts={{ loop: true }}
              className="flex-1 flex flex-col w-full h-full justify-center"
            >
              <CarouselContent className="flex-1 h-full">
                {selectedToFront(carouselItems, itemIdx).map((item, idx) => (
                  <CarouselItem
                    key={`${repo.id}-modal-${idx}`}
                    className="flex items-center justify-center"
                  >
                    {item.type === "image" && (
                      <img
                        src={item.src}
                        className="max-h-[70%] max-w-full object-contain"
                      />
                    )}

                    {item.type === "video" && (
                      <iframe
                        src={item.src}
                        className="w-full max-w-[95%] max-h-[95%] h-full aspect-video rounded"
                        allowFullScreen
                      />
                    )}

                    {item.type === "model" && (
                      <iframe
                        src={item.src}
                        className="w-full max-w-[95%] max-h-[95%] h-full rounded"
                      />
                    )}

                    {item.type === "doc" && (
                      <div className="w-full max-w-2xl">
                        <embed
                          src={item.src}
                          type="application/pdf"
                          width={"100%"}
                          height={"100%"}
                        ></embed>
                        {/* <FilePreview preview={item.src} /> */}
                      </div>
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

function selectedToFront(list: MediaItem[], idx: number) {
  while (idx) {
    [list[idx], list[idx - 1]] = [list[idx - 1], list[idx]];
    idx--;
  }

  return list;
}
