import { FC, memo, useEffect, useRef, useState } from "react";
import styles from "./Week.module.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { apiWeekDate } from "src/store/actions/WeekAction";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import { IconButtonArrow } from "./styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Half } from "src/models/IWeekModel";
import WeekItem from "../WeekItem";
import left from "src/resources/images/left.svg";
import right from "src/resources/images/right.svg";
import CircularIndeterminate from "src/components/CircularIndeterminate";

const days = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
];

const Week: FC<any> = () => {
  const weekSelector = useAppSelector((s) => s.weekReducer);
  const dispatch = useAppDispatch();
  const swiperRef = useRef(null);
  const [date, setDate] = useState(() => {
    const newDate = new Date();
    if (!newDate.getDay()) {
      newDate.setDate(newDate.getDate() + 1);
    }

    return newDate;
  });

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    dispatch(apiWeekDate(date.toISOString().slice(0, 10)));
  }, []);

  const toPrevSlide = () => {
    if (!swiperRef || !swiperRef.current || weekSelector.isLoading) {
      return;
    }

    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);

    if (!newDate.getDay()) {
      newDate.setDate(newDate.getDate() - 1);
    }

    let counter = current - 1;
    if (weekSelector.data && weekSelector.data?.firstHalf && counter >= 0) {
      setCurrent(counter);
      // @ts-ignore
      swiperRef.current.swiper.slideTo(counter);

      // Установка текущей даты
      setDate(newDate);
    } else {
      // Получаем новую дату
      dispatch(apiWeekDate(newDate.toISOString().slice(0, 10))).then(() => {
        // Устанавливаем фокус на последний элемент
        setCurrent(2);
        // Обновляем слайдер после загрузки данных
        // @ts-ignore
        swiperRef.current.swiper.slideTo(2);
        // Установка текущей даты
        setDate(newDate);
      });
    }
  };

  const toNextSlide = () => {
    if (!swiperRef || !swiperRef.current || weekSelector.isLoading) {
      return;
    }

    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);

    if (!newDate.getDay()) {
      newDate.setDate(newDate.getDate() + 1);
    }

    let counter = current + 1;
    if (weekSelector.data && weekSelector.data?.firstHalf && counter < weekSelector.data?.firstHalf?.length) {
      setCurrent(counter);

      // Установка текущей даты
      setDate(newDate);

      // @ts-ignore
      swiperRef.current.swiper.slideTo(counter);
    } else {
      // Получаем новую дату
      dispatch(apiWeekDate(newDate.toISOString().slice(0, 10))).then(() => {
        // Устанавливаем фокус на последний элемент
        setCurrent(0);
        // Обновляем слайдер после загрузки данных
        // @ts-ignore
        swiperRef.current.swiper.slideTo(0);
        // Установка текущей даты
        setDate(newDate);
      });
    }

  };

  const toSlide = (slide: number) => {
    if (!swiperRef || !swiperRef.current || weekSelector.isLoading) {
      return;
    }

    const sign = (slide > current) ? true : false;
    const value = (sign) ? 1 : -1;

    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + value);
    setDate(newDate);
    setCurrent(slide);

    // @ts-ignore
    swiperRef.current.swiper.slideTo(slide);
  };

  return (
    <>
      {
        weekSelector.isLoading && <CircularIndeterminate />
      }
      <div className={styles.container}>
        <div className={styles.controls}>
          <button className={styles.btn} onClick={toPrevSlide}>
            <ArrowForwardIosIcon
              sx={{
                color: "#A074FF",
                transform: "rotate(180deg);",
              }}
            />
          </button>

          <div className={styles.title}>
            <p className={styles.date}>{date.toISOString().slice(0, 10)}</p>
            <p className={styles.date}>{(!date.getDay()) ? days[date.getDay() + 1] : days[date.getDay()]}</p>
          </div>

          <button className={styles.btn} onClick={toNextSlide}>
            <ArrowForwardIosIcon
              sx={{
                color: "#A074FF",
              }}
            />
          </button>
        </div>
        <div className={styles.swiperWrapper}>
          <Swiper
            ref={swiperRef}
            // @ts-ignore
            slidesPerView={1}
            spaceBetween={100}
            autoHeight={true}
            pagination={{
              clickable: true,
            }}
            className={styles.customSwiper}
            onSlideChange={(obj) => {
              toSlide(obj.activeIndex);
            }}
          >
            {weekSelector.data?.firstHalf && weekSelector.data?.firstHalf.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className={styles.swiperSlide}
                  style={{ backgroundColor: "transparent" }}
                >
                  <WeekItem data={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Week;
