export interface IRestaurantData {
  id?: string,
  name?: string,
  location?: string,
  phone?: string,
  emotion?: EmotionType,
  recommend?: RecommendType,
  itemList?: number[],
  comments?: string[],
}

export interface IRestaurantItem {
  name: string,
  price?: number,
  emotion?: EmotionType,
  recommend?: RecommendType,
}

export enum PlaceHolder {
  Name = 'Restaurant Name',
  Location = 'Location',
  Phone = 'Phone number',
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

export enum EmotionType {
  Love = 'love',
  Happy = 'happy',
  Meh = 'meh',
  Sad = 'sad',
}

export const EmotionDropdownOptions = [
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

export enum RecommendType {
  Yes = 'yes',
  No = 'no',
}
