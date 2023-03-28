import axios from 'axios';

export const getData1 = (fn) => {
  axios.get('http://www.dell-lee.com/react/api/demo.json').then((res) => {
    fn(res.data);
  })
}

export const getData2 = () => {
  return axios.get('http://www.dell-lee.com/react/api/demo.json')
}