import { reactive, toRef } from "vue";

export const categoryFormRules = () => ({
  name: [(v) => !!v || "Name is required"],
});

export function categoryFormValidator(initialFields, getRules) {
  const errors = reactive({});

  const validate = () => {
    const rules = getRules();
    let isValid = true;

    Object.keys(rules).forEach((field) => {
      const value = initialFields.value[field]; // live binding!
      const fieldRules = rules[field] || [];

      for (const rule of fieldRules) {
        const result = rule(value);
        if (result !== true) {
          errors[field] = result;
          isValid = false;
          break;
        } else {
          errors[field] = "";
        }
      }
    });

    return isValid;
  };

  const reset = () => {
    Object.keys(errors).forEach((field) => {
      errors[field] = "";
    });
  };

  return {
    errors,
    validate,
    reset,
  };
}
