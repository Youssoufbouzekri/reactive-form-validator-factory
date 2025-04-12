import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ValidatorSchema, ValidatorRule } from './validator-schema';

export class ValidatorFactory {
  static createForm(schema: ValidatorSchema): FormGroup {
    const group: { [key: string]: FormControl } = {};

    for (const field in schema) {
      const rules = schema[field];
      const validatorFns = this.mapRulesToValidators(rules, field);
      group[field] = new FormControl('', validatorFns);
    }

    const form = new FormGroup(group);

    // Handle cross-field validators (like match)
    for (const field in schema) {
      const rules = schema[field];
      rules.forEach(rule => {
        if (rule.match) {
          form.setValidators(this.matchValidator(rule.match, field));
        }
      });
    }

    return form;
  }

  private static mapRulesToValidators(rules: ValidatorRule[], field: string): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    for (const rule of rules) {
      if (rule.required) validators.push(Validators.required);
      if (rule.minLength) validators.push(Validators.minLength(rule.minLength));
      if (rule.maxLength) validators.push(Validators.maxLength(rule.maxLength));
      if (rule.email) validators.push(Validators.email);
      if (rule.pattern) validators.push(Validators.pattern(rule.pattern));
    }

    return validators;
  }

  private static matchValidator(matchTo: string, fieldName: string): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const control = formGroup.get(fieldName);
      const matchingControl = formGroup.get(matchTo);

      if (control?.value !== matchingControl?.value) {
        control?.setErrors({ match: `${fieldName} must match ${matchTo}` });
      } else {
        const errors = control?.errors;
        if (errors && errors['match']) {
          delete errors['match'];
          control.setErrors(Object.keys(errors).length ? errors : null);
        }
      }

      return null;
    };
  }

  static getErrorMessages(form: FormGroup): { [field: string]: string[] } {
    const messages: { [field: string]: string[] } = {};

    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control && control.errors) {
        messages[field] = this.mapErrorsToMessages(field, control.errors);
      }
    });

    return messages;
  }

  static getMessagesFor(form: FormGroup, field: string): string[] {
    const control = form.get(field);
    return control && control.errors
      ? this.mapErrorsToMessages(field, control.errors)
      : [];
  }

  private static mapErrorsToMessages(field: string, errors: any): string[] {
    const messages: string[] = [];

    if (errors['required']) messages.push(`${capitalize(field)} is required.`);
    if (errors['minlength']) messages.push(`${capitalize(field)} must be at least ${errors['minlength'].requiredLength} characters.`);
    if (errors['maxlength']) messages.push(`${capitalize(field)} must be no more than ${errors['maxlength'].requiredLength} characters.`);
    if (errors['email']) messages.push(`${capitalize(field)} must be a valid email.`);
    if (errors['pattern']) messages.push(`${capitalize(field)} format is invalid.`);
    if (errors['match']) messages.push(errors['match']);

    return messages;
  }
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
