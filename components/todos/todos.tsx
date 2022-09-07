import styles from "../../styles/Home.module.css";
import { media } from "../../mock/media";
import { TodoContext } from "../../context/context";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";

interface ITodo {
  title: string;
  isCompleted: boolean;
  isDeleted: boolean;
}

export const TodoContainer = () => {
  const { assets } = media;
  const { todos, todoContract, fetchTodos, setLoading } =
    useContext(TodoContext);

  const markCompleted = async (id: number) => {
    console.log(id);
    try {
      // console.log(todoContract);
      let mark = await todoContract.markAsDone(id);
      setLoading(true);

      // fetchTodos();
      await mark.wait();
      // console.log(todos);

      console.log(mark);
    } catch (err) {
      console.log(err);
    } finally {
      fetchTodos();
      // console.log(todos);
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    console.log(id);
    try {
      // console.log(todoContract);
      let mark = await todoContract.deleteTask(id);
      setLoading(true);

      // fetchTodos();
      await mark.wait();
      // console.log(todos);

      console.log(mark);
    } catch (err) {
      console.log(err);
    } finally {
      fetchTodos();
      // console.log(todos);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ul>
        {todos?.length > 0 ? (
          todos?.map((todo: ITodo, i: number) => {
            const markClass = todo.isCompleted ? styles.markdone : "";
            return (
              <li key={i}>
                <span>
                  <img
                    src={todo.isCompleted ? assets.checked : assets.unchecked}
                    alt="unchecked"
                    width="20px"
                    onClick={() => {
                      markCompleted(i);
                      console.log("kigyutfdrytes");
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </span>
                {/* <span>
            <img src={assets.checked} alt="unchecked" width="20px" />
          </span> */}
                <span className={`${markClass}`}>{todo.title}</span>

                <div className={styles.delete} onClick={() => deleteTodo(i)}>
                  <MdDelete />
                </div>
              </li>
            );
          })
        ) : (
          <div className={styles.notask}>
            <span>NO TASKS YET</span>
          </div>
        )}
      </ul>
    </div>
  );
};
