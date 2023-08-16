import axios from "axios";

export const insertData = (data) => {
  axios
    .post("http://192.168.1.100:5000/api/v1/vehicles", data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getData = (data) => {
  return axios
    .get("http://192.168.1.100:5000/api/v1/vehicles", data)
    .then((res) => {
      console.log(res.data);
      return (res.data)
    })
    .catch((e) => {
      console.log(e);
    });
};
