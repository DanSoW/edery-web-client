import React, { FC, useEffect, useState } from "react";
import styles from "./Main.module.scss";
import filterMin from "src/resources/images/filter_min.svg";
import Filter from "src/components/Filter";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { getUserInfo } from "src/store/actions/UserAction";
import Header from "src/components/Header";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Week from "src/components/Main/Week";
import Tabel from "src/components/Main/Tabel";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Main: FC<any> = () => {
  const [value, setValue] = useState(0);
  const userSelector = useAppSelector((s) => s.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <>
      <div className={styles.container}>
        <Header value={value} setValue={setValue} />
        <CustomTabPanel value={value} index={0}>
          <Week />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Tabel />
        </CustomTabPanel>
      </div>
    </>
  );
};

export default React.memo(Main);
