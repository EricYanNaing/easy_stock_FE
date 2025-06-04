export const showToast = (toast, severity, summary, detail) => {
  toast.add({ severity, summary, detail, life: 3000 });
};