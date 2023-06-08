import { useEffect, useState } from "react";

export function useFetch(url, token) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        console.log(response);
        return response.json();
      })
      .then((_data) => {
        console.log("here", _data);
        setData(_data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return data;
}
