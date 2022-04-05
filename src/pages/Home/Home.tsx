import React, { useEffect } from "react";
import useCommon from "../../hooks/common";
import useTodo from "../../hooks/todo.hook";

const Home = () => {
  const { getTodoList } = useTodo();
  const { showConfirm } = useCommon();
  useEffect(() => {
    showConfirm({
      title: "TesT",
      message: "Loi roi",
      type: "ERROR",
      actions: [
        {
          label: "閉じる",
          action: (): void => {
            console.log("test");
          },
          className: "g-button-active",
        },
        {
          label: "閉じ",
          action: (): void => {
            console.log("how toe");
          },
          className: "g-button-active",
        },
      ],
    });
    getTodoList({
      successCallback: () => {
        console.log("thanh cong");
      },
      errorCallback: () => {
        console.log("that bai");
      },
    });
  }, [getTodoList, showConfirm]);

  return (
    <div>
      {/* <Loading /> */}
      Home
    </div>
  );
};

export default Home;
