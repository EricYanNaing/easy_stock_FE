import { reactive, toRef } from "vue";

export const menuFormRules = () => ({
  name: [(v) => !!v || "Name is required"],
  description: [(v) => !!v || "Description is required"],
  price: [(v) => !!v || "Price is required",
          (v) => !isNaN((v)) || "Price must be number"
        ],
  image: [(v) => !!v || "Image is required"],
});

export function menuFormValidator(initialFields, getRules) {
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
