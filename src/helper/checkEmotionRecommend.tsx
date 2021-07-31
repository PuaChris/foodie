import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';

import {
  EmotionText,
  EmotionType,
  RecommendType,
  RecommendRestText,
  RecommendItemText,
} from '../constant';

export const checkEmotionText = (emotion?: EmotionType) => {
  let emotionText: string;

  switch (emotion) {
    case EmotionType.Love:
      emotionText = EmotionText.Love;
      break;
    case EmotionType.Happy:
      emotionText = EmotionText.Happy;
      break;
    case EmotionType.Meh:
      emotionText = EmotionText.Meh;
      break;
    case EmotionType.Sad:
      emotionText = EmotionText.Sad;
      break;
    default:
      emotionText = EmotionText.Question;
      break;
  }

  return emotionText;
};

// Matching FontAwesome icon with selected option
export const checkEmotionIcon = (emotion?: EmotionType) => {
  let emotionIcon: [IconPrefix, IconName];

  switch (emotion) {
    case EmotionType.Love:
      emotionIcon = ['far', 'laugh-beam'];
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

export const checkRecommendText = (isRestaurant: boolean, recommend?: RecommendType) => {
  let recommendText: string;

  switch (recommend) {
    case RecommendType.Yes:
      recommendText = isRestaurant ? RecommendRestText.Yes : RecommendItemText.Yes;
      break;
    case RecommendType.No:
      recommendText = isRestaurant ? RecommendRestText.No : RecommendItemText.No;
      break;
    default:
      recommendText = isRestaurant ? RecommendRestText.Question : RecommendItemText.Question;
      break;
  }

  return recommendText;
};

export const checkRecommendIcon = (recommend?: RecommendType) => {
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
