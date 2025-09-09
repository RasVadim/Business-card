import { FC, useState, useEffect } from 'react';

import cn from 'classnames';

import { EMessageType } from '@/types';

import s from './s.module.styl';

const OWNER_AVATAR_IMAGE = '/images/photos/vest_side.jpg';

interface IChatAvatarProps {
  type: EMessageType;
  imageUrl?: string;
  className?: string;
}

export const ChatAvatar: FC<IChatAvatarProps> = ({
  type = EMessageType.BOT,
  imageUrl,
  className,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Load owner avatar image
  useEffect(() => {
    if (type === EMessageType.OWNER && !imageUrl) {
      const img = new Image();
      img.onload = () => setIsImageLoaded(true);
      img.onerror = () => setImageError(true);
      img.src = OWNER_AVATAR_IMAGE;
    }
  }, [type, imageUrl]);

  const getAvatarContent = () => {
    // Use provided imageUrl if available
    if (imageUrl) {
      return <img src={imageUrl} alt="Avatar" className={s.avatarImage} />;
    }

    // For owner type, show image if loaded, otherwise show letter
    if (type === EMessageType.OWNER) {
      if (isImageLoaded && !imageError) {
        return <img src={OWNER_AVATAR_IMAGE} alt="Owner Avatar" className={s.avatarImage} />;
      }
      // Show letter as fallback while loading or on error
      return <span className={s.avatarLetter}>V</span>;
    }

    // Default letters for other types
    const letterMap: Record<EMessageType, string> = {
      user: 'U',
      bot: 'B',
      owner: 'V',
    };

    return <span className={s.avatarLetter}>{letterMap[type]}</span>;
  };

  return (
    <div
      className={cn(s.avatar, className, {
        [s.botAvatar]: type === EMessageType.BOT,
        [s.ownerAvatar]: type === EMessageType.OWNER,
      })}
    >
      <div className={s.avatarImage}>{getAvatarContent()}</div>
    </div>
  );
};
