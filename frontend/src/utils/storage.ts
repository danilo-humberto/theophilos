const prefixKey = "@auth/";

type User = {
  access_token: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
};

export const setUserData = (key: string, value: any) => {
  localStorage.setItem(prefixKey + key, JSON.stringify(value));
};

export const getUserData = (key: string): User | null => {
  const data = localStorage.getItem(prefixKey + key);
  return data ? JSON.parse(data) : null;
};

export const removeUserData = (key: string) => {
  localStorage.removeItem(prefixKey + key);
};
