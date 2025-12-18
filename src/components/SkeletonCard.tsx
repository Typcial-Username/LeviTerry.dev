import React from 'react';
import styles from '../styles/SkeletonCard.module.css';

interface SkeletonCardProps {
  isPinned?: boolean;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ isPinned = false }) => {
  return (
    <div className={`${styles.skeletonCard} ${isPinned ? styles.pinned : ''}`}>
      {/* Header skeleton */}
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonText} style={{ width: '70%' }}></div>
      </div>
      
      {/* Description skeleton */}
      <div className={styles.skeletonDescription}>
        <div className={styles.skeletonText} style={{ width: '100%' }}></div>
        <div className={styles.skeletonText} style={{ width: '80%' }}></div>
      </div>
      
      {/* Languages skeleton */}
      <div className={styles.skeletonLanguages}>
        <div className={styles.skeletonLanguage}>
          <div className={styles.skeletonDot}></div>
          <div className={styles.skeletonText} style={{ width: '60px' }}></div>
        </div>
        <div className={styles.skeletonLanguage}>
          <div className={styles.skeletonDot}></div>
          <div className={styles.skeletonText} style={{ width: '50px' }}></div>
        </div>
        <div className={styles.skeletonLanguage}>
          <div className={styles.skeletonDot}></div>
          <div className={styles.skeletonText} style={{ width: '40px' }}></div>
        </div>
      </div>
      
      {/* Stars skeleton */}
      <div className={styles.skeletonStars}>
        <div className={styles.skeletonText} style={{ width: '80px' }}></div>
      </div>
      
      {/* Topics skeleton */}
      <div className={styles.skeletonTopics}>
        <div className={styles.skeletonTopic}></div>
        <div className={styles.skeletonTopic}></div>
        <div className={styles.skeletonTopic}></div>
      </div>
      
      {/* Footer skeleton */}
      <div className={styles.skeletonFooter}>
        <div className={styles.skeletonText} style={{ width: '90px' }}></div>
      </div>
    </div>
  );
};

interface SkeletonCardsProps {
  count: number;
  isPinned?: boolean;
}

export const SkeletonCards: React.FC<SkeletonCardsProps> = ({ 
  count, 
  isPinned = false 
}) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={`skeleton-${index}`} isPinned={isPinned} />
      ))}
    </>
  );
};
