import React, { useEffect } from "react";
import useTodo from "../../hooks/todo.hook";

const Home = () => {
  const { getTodoList } = useTodo();
  useEffect(() => {
    getTodoList({ successCallback: () => {}, errorCallback: () => {} });
  }, [getTodoList]);

  return (
    <div>
      {/* <Loading /> */}
      Home
    </div>
  );
};

export default Home;
