import { TCategoryClasses } from "../types/index";
export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

export const categories: TCategoryClasses = {
  'софт-скил': 'soft',
  'дополнительное': 'additional',
  'хард-скил': 'hard',
  'кнопка': 'button',
  'другое': 'other',
}
