import axios from 'axios';

export function fetchUser(googleId) {
  return axios.get(`/users?googleId=${googleId}`)
    .then(({data}) => {
      return data[0];
    });
};

/**
   {
   email
   familyName
   givenName
   googleId
   imageUrl
   name
   }
*/
export function registerUser(googleProfile) {
  return axios.post("/users", googleProfile)
    .then(resp => {
      console.log(resp);
      return resp;
    });
}
