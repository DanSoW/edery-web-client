import { FC, memo } from "react";
import styles from "./TabelHeader.module.scss";

const TabelHeader: FC<any> = () => {
  return (
    <>
      <div className={styles.container}>
        <div>
          <p>Название</p>
        </div>
        <div>
          <p>Оценки</p>
        </div>
        <div>
          <p>Ср. балл</p>
        </div>
        <div>
          <p>Итог</p>
        </div>
      </div>
    </>
  );
};

export default memo(TabelHeader);
