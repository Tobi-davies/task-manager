import styles from "../../styles/Home.module.css";
import { media } from "../../mock/media";
import { useContext, useState } from "react";
import { TodoContext } from "../../context/context";

export const AddTodo = () => {
  const { assets } = media;
  const { todoContract, fetchTodos, setLoading } = useContext(TodoContext);
  const [formData, setformData] = useState<string>("");

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(todoContract.address);
    let xyz = await todoContract?.getPersonalTodos();
    console.log(xyz);
    try {
      if (formData !== "") {
        let task = await todoContract.addTodo(formData);
        setLoading(true);

        await task.wait();

        console.log("todo added");
      }
    } catch (err) {
      console.log(err);
    } finally {
      fetchTodos();
      setformData("");

      setLoading(false);
    }
    console.log(formData);
  };
  return (
    <form className={styles.form}>
      <input
        type="text"
        onChange={(e) => {
          setformData(e.target.value);
          // console.log("ytuiukjiohuigyutf");
        }}
        value={formData}
        placeholder="Create a new todo..."
      />
      <button onClick={addTodo}>
        <img src={assets.arrow} alt="send" width="30px" />
      </button>
    </form>
  );
};
