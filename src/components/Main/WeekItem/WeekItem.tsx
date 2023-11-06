import { FC, useEffect, useRef, useState } from "react";
import styles from "./WeekItem.module.scss";
import { Half } from "src/models/IWeekModel";
import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 18,
  height: 18,
  borderColor: "#A074FF",
  "&.MuiCheckbox-root": {
    color: "yellow",
  },

  border: "1px solid var(--colors-violet, #A074FF)",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "transparent",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "transparent",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    marginLeft: "1.9px",
    paddingTop: "0.8px",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='15' viewBox='0 0 14 15' fill='none'%3E%3Cpath d='M5.75172 10.9999C5.67173 10.9997 5.59265 10.983 5.5194 10.9509C5.44614 10.9188 5.38027 10.8719 5.32588 10.8133L2.49088 7.79745C2.38491 7.68451 2.32814 7.5341 2.33306 7.3793C2.33798 7.22451 2.4042 7.07801 2.51713 6.97203C2.63007 6.86606 2.78048 6.80928 2.93528 6.81421C3.09007 6.81913 3.23657 6.88534 3.34255 6.99828L5.74588 9.55911L10.6517 4.19245C10.7015 4.13045 10.7634 4.07929 10.8337 4.0421C10.904 4.00491 10.9811 3.98248 11.0604 3.97619C11.1397 3.9699 11.2194 3.97988 11.2946 4.00552C11.3699 4.03116 11.4391 4.07191 11.4981 4.12527C11.557 4.17864 11.6044 4.24349 11.6374 4.31585C11.6703 4.3882 11.6882 4.46653 11.6898 4.54603C11.6914 4.62552 11.6767 4.7045 11.6466 4.77812C11.6166 4.85174 11.5718 4.91843 11.515 4.97411L6.18338 10.8074C6.12951 10.8672 6.06387 10.9151 5.99059 10.9482C5.9173 10.9813 5.83796 10.9989 5.75755 10.9999H5.75172Z' fill='%23A074FF'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "transparent",
  },
});

// Inspired by blueprintjs
function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
        padding: 0,
        width: "18px",
        height: "18px",
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export interface IWeekItemProps {
  data: Half[];
}

export interface IWeekSubItemProps {
  data: Half;
  index: number;
}

const WeekSubItem: FC<IWeekSubItemProps> = ({ data, index }) => {
  const [value, setValue] = useState<boolean>(false);
  const onChange = (e: any) => {
    setValue(!value);
  };

  return (
    <div>
      <div className={styles.title}>
        <p>
          {index + 1}. <span>{data.name?.trim()}</span>
        </p>
        {data.mark && data.mark.trim().length > 0 && (
          <div className={styles.score}>{data.mark.trim()}</div>
        )}
      </div>
      <div className={styles.homework} onClick={onChange}>
        {
          value && <BpCheckbox checked={true} />
        }
        {!value && <BpCheckbox checked={false} />}
        {value && (
          <p>
            <s>
              {(data.homeTask?.trim().length || 0) > 0
                ? data.homeTask?.trim()
                : "Нет домашнего задания"}
            </s>
          </p>
        )}
        {!value && (
          <p>
            {(data.homeTask?.trim().length || 0) > 0
              ? data.homeTask?.trim()
              : "Нет домашнего задания"}
          </p>
        )}
      </div>
    </div>
  );
};

const WeekItem: FC<IWeekItemProps> = ({ data }) => {
  const newData = data
    .filter((item) => (item.name?.trim().length || 0) > 0);

  return (
    <>
      <div className={styles.container}>
        {newData
          .map((item, index) => {
            return <WeekSubItem key={index} data={item} index={index} />;
          })}
        {
          newData.length === 0 && <p>Ничего не задано</p>
        }
      </div>
    </>
  );
};

export default WeekItem;
