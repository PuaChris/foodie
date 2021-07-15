export interface IRestaurantData {
  id: string,
  name?: string,
  location?: string,
  phone?: string,
  emotion?: EmotionType,
  recommend?: RecommendType,
  itemList?: number[],
}

export interface IRestaurantItem {
  id: string,
  name?: string,
  price?: string,
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
  Surprise = 'surprise',
  Love = 'love',
  Happy = 'happy',
  Meh = 'meh',
  Sad = 'sad',
}

export enum RecommendType {
  Question = 'question',
  Yes = 'yes',
  No = 'no',
}
