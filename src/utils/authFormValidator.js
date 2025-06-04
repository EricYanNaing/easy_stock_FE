import { reactive, toRefs } from "vue";

export const authFormRules = (isSignUp) => ({
  email: [
    (v) => !!v || "Email is required",
    (v) => /.+@.+\..+/.test(v) || "Email must be valid"
  ],
  password: [(v) => !!v || "Password is required"],
  ...(isSignUp && {
    name: [(v) => !!v || "Name is required"],
    confirmPassword: [
      (v) => !!v || "Confirm Password is required",
      (v, form) => v === form.password || "Passwords must match"
    ]
  })
});

export function authFormValidator(initialFields, getRules) {
  const form = reactive({ ...initialFields });
  const errors = reactive({});

  const validate = (isSignUp) => {
    const rules = getRules(isSignUp); // <- dynamically get rules
    let isValid = true;

    Object.keys(rules).forEach((field) => {
      const value = form[field];
      const fieldRules = rules[field] || [];

      for (const rule of fieldRules) {
        const result = rule(value, form);
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
    Object.keys(form).forEach((field) => {
      form[field] = initialFields[field];
    });
    Object.keys(errors).forEach((field) => {
      errors[field] = "";
    });
  };

  return {
    ...toRefs(form),
    errors,
    validate,
    reset,
  };
}
