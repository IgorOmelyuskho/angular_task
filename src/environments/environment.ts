
const domain = 'http://localhost:3000';

export const environment = {
  production: false,
  auth: domain + '/auth',
  updateProfile: domain + '/auth/update_profile',
  updatePassword: domain + '/auth/update_password',
  products: domain + '/products',
};

