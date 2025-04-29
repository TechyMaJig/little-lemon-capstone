// src/components/api.js

const seededRandom = function (seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

export const fetchAPI = async function (date) {
  let result = [];
  let parsedDate = new Date(date); // ensure date is a Date object
  let random = seededRandom(parsedDate.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ':00');
    }
    if (random() < 0.5) {
      result.push(i + ':30');
    }
  }

  return result;
};

export const submitAPI = async function (formData) {

  console.log("submitAPI (mock) called with:", formData);

  return true;
};

export const store = () => {
  if (!localStorage.getItem("reservations")) {
    localStorage.setItem("reservations", JSON.stringify([]));
  }
};
