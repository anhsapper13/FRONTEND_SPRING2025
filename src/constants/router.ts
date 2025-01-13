export const ROUTER_URL = {
  USER: "/",
  ADMIN: "/admin",
} as const;

export const NESTED_ROUTER_GUEST = {
  LOGIN: "login",
  REGISTER: "register",
  HOME_PAGE: "",
  CONTACT_PAGE: "",
} as const;

export const NESTED_ROUTER_ADMIN = {
  DASHBOARD: "dashboard",
  USER: "user",
  CATEGORY: "category",
  POST: "post",
  FORM: "form",
  QUESTION: "question",
  NEWS: "news",
  BLOG: "blog",
  SETTING: "setting",
  GALLERY: "gallery",
} as const;
