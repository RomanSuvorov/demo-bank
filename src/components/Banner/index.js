import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../Button';
import { Loading } from '../Loading';
import './index.css';

const POSITION = {
  left: 'banner_left',
  right: 'banner_right',
  center: 'banner_center',
};

const TYPE = {
  VIDEO: 'video',
  IMAGE: 'image',
};

export function Banner() {
  const { banner } = useSelector(state => state.app);
  const {
    bannerLoading,
    error,
    link,
    linkPosition,
    linkName,
    src,
    type,
    title,
    titlePosition,
    description,
    descriptionPosition,
  } = banner;

  const getMedia = () => {
    if (type === TYPE.VIDEO) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = function() {
        new window.YT.Player('player', {
          width: '100%',
          height: '100%',
          videoId: src,
          playerVars: {
            mute: 1,
            autoplay: 1,
            loop: 1,
            playlist: src,
            modestbranding: 1,
            showinfo: 0,
            disablekb: 1,
            controls: 0,
            rel: 0,
            origin: 'http://localhost:3000/'
          },
          events: {},
        })
      }
      return (
        <div
          id="player"
          className={"banner_media"}
        />
      );
    } else if (type === TYPE.IMAGE) {
      return <img className={"banner_media"} src={src} alt={title || 'banner video'} />
    } else {
      return <div className={"banner_media"} />
    }
  };

  if (bannerLoading) {
    return (
      <div className={"banner"}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={"banner"}>
      {getMedia()}
      <div className={"banner_content"}>
        <div className={`banner_content__title ${POSITION[titlePosition]}`}>
          <span>{title}</span>
        </div>
        <div className={`banner_content__description ${POSITION[descriptionPosition]}`}>
          <span>{description}</span>
        </div>
        {
          (link && linkName) && (
            <div className={"banner_buttonBox"}>
              <Button className={`banner_content__button ${POSITION[linkPosition]}`}>
                <a
                  href={link}
                  className={"banner_content__link"}
                  target={"_blank"}
                >
                  {linkName}
                </a>
              </Button>
            </div>
          )
        }
      </div>
    </div>
  );
}
