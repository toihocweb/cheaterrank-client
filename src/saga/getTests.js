export const getTests = () => {
  return [
    {
      id: 1,
      lang: "javascript",
      desc: "Tính tổng số lượng các sản phẩm",
      inputs:
        '[[{"name": "Dress" , "quantity": 10} , {"name": "Hat" , "quantity": 20}], [{"name": "Shirt"} , {"name": "Coat" , "quantity": 20}]]',
      outputs: "[30 , 20]",
    },
    {
      id: 2,
      lang: "javascript",
      desc: "In ra mảng các chuỗi có độ dài lớn nhất",
      inputs: '[["name", "1233321", "aa"], ["bb", "cc", "a"]]',
      outputs: '[["1233321"] , ["bb","cc"]]',
    },
    {
      id: 3,
      lang: "javascript",
      desc: "Tìm số lớn nhất trong mảng",
      inputs: "[[1, 1, 1], [1,2,3] , [] , [3,-1, -2]]",
      outputs: "[1 , 3, 0, 3]",
    },
  ];
};
