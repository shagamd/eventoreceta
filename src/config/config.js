export const configData = {
  hostApi: "http://localhost:8000/api",
};
//export const configData = {
//  hostApi: "http://192.168.23.102:81/api",
//};

export const headers = {
  headers: {
    Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("token"))?.token,
  },
};
