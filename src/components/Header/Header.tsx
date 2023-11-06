import React, { FC, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import logo_low from "src/resources/images/logo_low.svg";
import week from "src/resources/images/week.svg";
import weekDisable from "src/resources/images/week_disable.svg";
import tabelDisable from "src/resources/images/tabel_disable.svg";
import tabel from "src/resources/images/tabel.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { authLogout } from "src/store/actions/AuthAction";
import { useNavigate } from "react-router-dom";
import messageQueueAction from "src/store/actions/MessageQueueAction";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface IHeaderProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const Header: FC<IHeaderProps> = ({ value, setValue }) => {
  const matches = useMediaQuery("(max-width:1000px)");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userSelector = useAppSelector((s) => s.userReducer);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authLogout());
    handleClose();
    navigate("/auth/sign-in");
    dispatch(messageQueueAction.addMessage(null, "dark", "Выход из аккаунта"));
  };

  return (
    <>
      {!matches && (
        <div className={styles.container}>
          <div className={styles.title}>
            <img src={logo_low} alt="logo" />
            <div>
              <p className={styles.h}>edery.</p>
              <p className={styles.text}>Электронный дневник</p>
            </div>
          </div>
          <div className={styles.controls}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                disableRipple
                sx={{
                  width: "107px",
                }}
                label={
                  !value ? (
                    <div className={styles.labelActive}>
                      <img src={week} alt="Неделя" />
                      <p>Неделя</p>
                    </div>
                  ) : (
                    <div className={styles.labelDisable}>
                      <img src={weekDisable} alt="Неделя" />
                      <p>Неделя</p>
                    </div>
                  )
                }
              />
              <Tab
                disableRipple
                sx={{
                  width: "103px",
                  marginLeft: "31px",
                }}
                label={
                  value ? (
                    <div className={styles.labelActive}>
                      <img src={tabel} alt="Табель" />
                      <p>Табель</p>
                    </div>
                  ) : (
                    <div className={styles.labelDisable}>
                      <img src={tabelDisable} alt="Табель" />
                      <p>Табель</p>
                    </div>
                  )
                }
              />
            </Tabs>
          </div>
          {userSelector.data && (
            <div className={styles.profile}>
              <div className={styles.info}>
                <p className={styles.name}>{userSelector.data.name}</p>
                <p className={styles.class}>{userSelector.data.class}</p>
              </div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar>{userSelector.data?.name?.slice(0, 1)}</Avatar>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleLogout}>Выход</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      )}
      {matches && (
        <>
          <div className={styles.container}>
            <div className={styles.title}>
              <img src={logo_low} alt="logo" />
              <div>
                <p className={styles.h}>edery.</p>
                <p className={styles.text}>Электронный дневник</p>
              </div>
            </div>
            {userSelector.data && (
              <div className={styles.profile}>
                <div className={styles.info}>
                  <p className={styles.name}>{userSelector.data.name}</p>
                  <p className={styles.class}>{userSelector.data.class}</p>
                </div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Avatar>{userSelector.data?.name?.slice(0, 1)}</Avatar>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleLogout}>Выход</MenuItem>
                </Menu>
              </div>
            )}
          </div>

          <div className={styles.controlsMedia}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{
                  width: "107px",
                }}
                label={
                  !value ? (
                    <div className={styles.labelActive}>
                      <img src={week} alt="Неделя" />
                      <p>Неделя</p>
                    </div>
                  ) : (
                    <div className={styles.labelDisable}>
                      <img src={weekDisable} alt="Неделя" />
                      <p>Неделя</p>
                    </div>
                  )
                }
              />
              <Tab
                sx={{
                  width: "103px",
                  marginLeft: "31px",
                }}
                label={
                  value ? (
                    <div className={styles.labelActive}>
                      <img src={tabel} alt="Табель" />
                      <p>Табель</p>
                    </div>
                  ) : (
                    <div className={styles.labelDisable}>
                      <img src={tabelDisable} alt="Табель" />
                      <p>Табель</p>
                    </div>
                  )
                }
              />
            </Tabs>
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(Header);
