import { FC, memo, useEffect } from "react";
import styles from "./Tabel.module.scss";
import { mockTabel } from "./mock.data";
import TabelItem from "../TabelItem";
import TabelHeader from "../TabelHeader";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { getUserTerm } from "src/store/actions/UserAction";
import CircularIndeterminate from "src/components/CircularIndeterminate";

const Tabel: FC<any> = () => {
  const userSlice = useAppSelector((s) => s.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserTerm());
  }, []);

  return (
    <>
      {
        userSlice.isLoading && <CircularIndeterminate />
      }
      <div className={styles.container}>
        <div className={styles.tabelHeader}>
          <p className={styles.h}>Табель успеваемости</p>
          <p className={styles.text}>
            Общий балл: <span className={styles.score}>{userSlice.term?.result_score || ""}</span>
          </p>
        </div>
        <div className={styles.tabelTable}>
          <TabelHeader />
          {userSlice.term && userSlice.term.items.map((item) => {
            return (
              <TabelItem
                title={item.title || ""}
                scores={item.scores || []}
                middle_score={item.middle_score}
                final_score={item.final_score}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default memo(Tabel);
