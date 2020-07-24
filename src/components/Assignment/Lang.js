import React, { useEffect, useState } from "react";

const Lang = ({ match }) => {
  const [tests, setTests] = useState([
    {
      id: 1,
      lang: "javascript",
      inputs: [
        [1, 2, 3],
        [2, 56, 34, 54],
      ],
      outputs: [
        [1, 2, 3],
        [2, 56, 34, 54],
      ],
    },
  ]);

  return <div>{match.params.lang}</div>;
};

export default Lang;
