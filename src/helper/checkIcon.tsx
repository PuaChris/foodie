import React from 'react';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';

import { EmotionType, RecommendType } from '../constant';

// Matching FontAwesome icon with selected option
export const checkEmotion = (emotion?: EmotionType) => {
  let emotionIcon: [IconPrefix, IconName];

  switch (emotion) {
    case EmotionType.Love:
      emotionIcon = ['far', 'grin-hearts'];
      break;
    case EmotionType.Happy:
      emotionIcon = ['far', 'smile'];
      break;
    case EmotionType.Meh:
      emotionIcon = ['far', 'meh'];
      break;
    case EmotionType.Sad:
      emotionIcon = ['far', 'frown'];
      break;
    default:
      emotionIcon = ['far', 'surprise'];
      break;
  }

  return emotionIcon;
};

export const checkRecommend = (recommend?: RecommendType) => {
  let recommendIcon: [IconPrefix, IconName];

  switch (recommend) {
    case RecommendType.Yes:
      recommendIcon = ['far', 'check-circle'];
      break;
    case RecommendType.No:
      recommendIcon = ['far', 'times-circle'];
      break;
    default:
      recommendIcon = ['far', 'question-circle'];
      break;
  }

  return recommendIcon;
};
