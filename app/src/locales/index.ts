import { en } from './en';
import { ar } from './ar';

export const translations = {
  en,
  ar,
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof en;

// Helper type for nested translation keys
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationPath = NestedKeyOf<typeof en>;
