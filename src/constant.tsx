export interface IRestaurant {
  id: string,
  name: string,
  location?: string,
  phone?: string,
  emotion?: EmotionType,
  recommend?: RecommendType,
}

export interface IRestaurantItem {
  id: string,
  name?: string,
  price?: string,
  emotion?: EmotionType,
  recommend?: RecommendType,
}

export enum RestaurantModalType {
  Add,
  Edit,
}

export enum DescriptionType {
  Name,
  Location,
  Phone,
  Emotion,
  Recommend,
}

export enum EmotionType {
  Question = 'surprise',
  Love = 'love',
  Happy = 'happy',
  Meh = 'meh',
  Sad = 'sad',
}

export enum EmotionText {
  Question = 'How was it?',
  Love = 'It was awesome!',
  Happy = 'It was good',
  Meh = 'It was okay',
  Sad = 'It was not good',
}

export enum RecommendType {
  Question = 'question',
  Yes = 'yes',
  No = 'no',
}

export enum RecommendRestText {
  Question = 'Would I go back?',
  Yes = 'I would go back',
  No = 'I would not go back',
}

export enum RecommendItemText {
  Question = 'Would I order again?',
  Yes = 'I would order again',
  No = 'I would not order again',
}

export enum HTTPMethodType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
