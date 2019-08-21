export const baseUrl = 'https://us-central1-library-backend-firebase.cloudfunctions.net/api/library/'
export const numResults = 5000;

export const defaultAxiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    // "x-access-token": ""
  },

  timeout: 1000,
}