import React, { useEffect } from "react";
import useTodo from "../../hooks/todo.hook";

const Home = () => {
  const { getTodoList } = useTodo();
  useEffect(() => {
    getTodoList({
      successCallback: () => {
        console.log("thanh cong");
      },
      errorCallback: () => {
        console.log("that bai");
      },
    });
  }, [getTodoList]);

  return (
    <div>
      {/* <Loading /> */}
      Home
    </div>
  );
};

export default Home;
