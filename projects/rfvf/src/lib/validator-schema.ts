import { ValidatorFn } from '@angular/forms';

export interface ValidatorRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  pattern?: string;
  match?: string; // Custom validator for confirming password, etc.
  // Add more as needed
}

export type ValidatorSchema = {
  [fieldName: string]: ValidatorRule[];
};
