import { FC, memo } from "react";
import styles from "./TabelItem.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface ITabelItemProps {
  title: string;
  middle_score?: string;
  final_score?: string;
  scores: string[];
}

const TabelItem: FC<ITabelItemProps> = ({ title, middle_score, final_score, scores }) => {
  const matches = useMediaQuery("(max-width:1000px)");

  return (
    <>
      <div className={styles.container}>
        <div>
          <p className={styles.name}>{title}</p>
        </div>
        <div>
          {scores.length === 0 && <p className={styles.score}>Нет оценок</p>}
          {scores.length > 0 && (
            <p className={styles.score}>{scores.join(" ")}</p>
          )}
        </div>
        {!matches && (
          <>
            <div>
              {
                !middle_score && <p className={styles.middleA}>-</p>
              }
              {
                middle_score && (
                  <p
                    className={
                      Number(middle_score) >= 4 ? styles.middleA : styles.middleF
                    }
                  >
                    {middle_score.trim()}
                  </p>
                )
              }
            </div>
            <div>
              {!final_score && <p className={styles.result}>-</p>}
              {final_score && <p className={styles.result}>{final_score}</p>}
            </div>
          </>
        )}
        {matches && (
          <div className={styles.matches}>
            {
              !middle_score && <p className={styles.middleA}>-</p>
            }
            {
              middle_score && (
                <p
                  className={
                    Number(middle_score) >= 4 ? styles.middleA : styles.middleF
                  }
                >
                  {middle_score.trim()}
                </p>
              )
            }
            {!final_score && <p className={styles.result}>-</p>}
            {final_score && <p className={styles.result}>{final_score}</p>}
          </div>
        )}
      </div>
    </>
  );
};

export default TabelItem;
