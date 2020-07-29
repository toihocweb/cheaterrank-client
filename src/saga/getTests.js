import Axios from "axios";

export const getTests = async () => {
  const res = await Axios.get(
    "https://gist.githubusercontent.com/toihocweb/bb510a3db7d632d4153ec6d347397028/raw/cce990db7eae1895db68ee6211b15b453572d33a/tests.json"
  );
  console.log("(res.data)", JSON.parse(res.data));
  // return [
  //   {
  //     id: 1,
  //     lang: "javascript",
  //     desc: "Tính tổng số lượng các sản phẩm",
  //     inputs:
  //       '[[{"name": "Dress" , "quantity": 10} , {"name": "Hat" , "quantity": 20}], [{"name": "Shirt"} , {"name": "Coat" , "quantity": 20}]]',
  //     outputs: "[30 , 20]",
  //   },
  //   {
  //     id: 2,
  //     lang: "javascript",
  //     desc: "In ra mảng các chuỗi có độ dài lớn nhất",
  //     inputs: '[["name", "1233321", "aa"], ["bb", "cc", "a"]]',
  //     outputs: '[["1233321"] , ["bb","cc"]]',
  //   },
  //   {
  //     id: 3,
  //     lang: "javascript",
  //     desc: "Tìm số lớn nhất trong mảng",
  //     inputs: "[[1, 1, 1], [1,2,3] , [] , [3,-1, -2]]",
  //     outputs: "[1 , 3, 0, 3]",
  //   },
  // ];0
  return JSON.parse(res.data);
};
