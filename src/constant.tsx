export enum PlaceHolder {
  Name = 'Restaurant Name',
  Location = 'Location',
  Phone = 'Phone Number',
  Emotion = 'How was it?',
  Recommend = 'Would I go back?',
}

export enum DescriptionType {
  Name,
  Location,
  Phone,
  Emotion,
  Recommend,
}

export const EmotionOptions = [
  {
    key: 'love',
    text: 'I loved it!',
    value: 'love',
  },
  {
    key: 'happy',
    text: 'It was good',
    value: 'happy',
  },
  {
    key: 'meh',
    text: 'It was okay',
    value: 'meh',
  },
  {
    key: 'sad',
    text: 'It was not good',
    value: 'sad',
  },
];

export const RecommendOptions = [
  {
    key: 'yes',
    text: 'I would go back',
    value: 'yes',
  },
  {
    key: 'no',
    text: 'I would not go back',
    value: 'no',
  },
];
