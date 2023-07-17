import { useState, useEffect } from 'react';

type Data = {
  name: string;
  nickname: string;
  age: number;
};

const UserInfo = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('./api/hello');
      const data = await response.json();
      setData(data);
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <p>名前: {data.name}</p>
        <p>年齢: {data.age}</p>
        <p>あだ名: {data.nickname}</p>
      </div>
    </>
  );
};

export default UserInfo;
