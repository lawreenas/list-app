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
    .then(({data}) => {
      console.log(data);
      return data;
    });
}

export function updateBookHolder(book, newHolder) {
  const newBookState = Object.assign(book, {takenBy: newHolder});
  return axios.put(`/books/${book.id}`, newBookState)
    .then(({data}) => {
      console.log(data);
      return data;
    });
}
