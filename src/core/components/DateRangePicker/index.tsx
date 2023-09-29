/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { DATE_OF_THE_WEEK } from '../../constants/date';
import {
    generateDateArray, getNextMonthLabels, getPrevMonthLabels, isCurrentDateAndYear
} from '../../helpers';

export interface DateRangePickerProps {
  from?: Date | null;
  to?: Date | null;
  isDisabledBehindDate?: boolean;
  onChange?: (param: DateTypeParam) => void;
}

export interface DateTypeParam {
  from: Date | null;
  to: Date | null;
}

function DateRangePicker(props: DateRangePickerProps) {
  const { from = null, to = null, isDisabledBehindDate = true } = props;
  const date = new Date();
  const ref = useRef<any>(null);
  const [expand, setExpand] = useState(false);
  //
  const [fromDate, setFromDate] = useState<Date | null>(from);
  const [toDate, setToDate] = useState<Date | null>(to);
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const onPrevMoths = () => {
    if (month === 0) {
      setMonth(11);
      setYear((year) => year - 1);
      return;
    }
    setMonth((month) => month - 1);
  };

  const onNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((year) => year + 1);
      return;
    }
    setMonth((month) => month + 1);
  };

  const getDisabledDate = (currentDate: number) => {
    if (isDisabledBehindDate) {
      return "";
    }
    return classNames({
      disabled:
        currentDate < date.getDate() &&
        month === date.getMonth() &&
        year === date.getFullYear(),
    });
  };

  const getDisabledForToDate = (month: number, currentDate: number) => {
    return classNames({
      disabled:
        currentDate === 0 ||
        (currentDate < date.getDate() &&
          month === date.getMonth() &&
          year === date.getFullYear()),
    });
  };

  const onSelectedDate = (month: number, name: number) => {
    const date = new Date(year, month, name);
    if (!fromDate && !toDate) {
      setFromDate(date);
    }
    if (fromDate && date >= fromDate) {
      if (!toDate) {
        setToDate(date);
      }
      if (toDate) {
        setToDate(date);
      }
    }
  };

  const ctxSelectedDate = (month: number, dateNumber: number) => {
    if (!dateNumber) {
      return;
    }
    const date = new Date(year, month, dateNumber);
    const strSelected = fromDate?.toDateString() ?? "";
    let isSelected = false;
    if (fromDate) {
      isSelected = strSelected === date.toDateString();
    }
    let isSelectedToDate = false;
    if (toDate) {
      isSelectedToDate = toDate.toDateString() === date.toDateString();
    }
    const isNotEmpty = fromDate && toDate;
    return {
      "is-selected-date": isSelected || isSelectedToDate,
      "within-range": isNotEmpty ? date > fromDate && date < toDate : false,
    };
  };

  const onClickClear = () => {
    setFromDate(null);
    setToDate(null);
  };
  const ctxExpanded = () =>
    classNames({ "h-auto opacity-100": expand, "h-0 opacity-0": !expand });

  const onClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setExpand(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    const { onChange } = props;
    if (onChange) {
      onChange({ from: fromDate, to: toDate });
    }
  }, [fromDate, toDate]);

  return (
    <div className="date-range-wrapper" ref={ref}>
      <div
        className="input-date flex items-center justify-between cursor-pointer"
        onClick={() => setExpand(!expand)}
      >
        <div>{fromDate?.toDateString()}</div>
        <div>{toDate?.toDateString()}</div>
        {(fromDate || toDate) && (
          <div className="cursor-pointer clear-input" onClick={onClickClear}>
            <img src="/assets/icons/cross.svg" alt="" height="12" width="12" />
          </div>
        )}
      </div>
      <div
        className={classNames(
          ctxExpanded(),
          "date-content overflow-hidden transition-all duration-300 ease-in-out",
        )}
      >
        <div className="flex justify-between p-6">
          <div>
            <div className="relative pt-4 pb-10">
              <div
                className={classNames("absolute cursor-pointer left-0 top-5", {
                  disabled:
                    isCurrentDateAndYear(year, month) && !isDisabledBehindDate,
                })}
                onClick={onPrevMoths}
              >
                <img
                  src="/assets/icons/arrow-left.svg"
                  alt=""
                  width={15}
                  height={15}
                />
              </div>
              <div className="text-center">
                {getPrevMonthLabels(month, year)}
              </div>
            </div>
            <ul className="flex">
              {DATE_OF_THE_WEEK.map((name: string, index: number) => (
                <li
                  className="text-center"
                  style={{ width: "46px" }}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-7 mt-8">
              {generateDateArray(year, month).map((name: number, index) => (
                <div
                  onClick={() => onSelectedDate(month, name)}
                  className={classNames(
                    "col-span-1 date-item flex items-center justify-center",
                    getDisabledDate(name),
                    ctxSelectedDate(month, name),
                  )}
                  key={index}
                >
                  {name === 0 ? "" : name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div
              className="relative pt-4 pb-10 cursor-pointer"
              onClick={onNextMonth}
            >
              <div className="text-center">
                {getNextMonthLabels(month, year)}
              </div>
              <div className="absolute right-0 top-5">
                <img
                  src="/assets/icons/arrow-right.svg"
                  alt=""
                  width={15}
                  height={15}
                />
              </div>
            </div>
            <ul className="flex">
              {DATE_OF_THE_WEEK.map((name: string, index: number) => (
                <li style={{ width: "46px" }} key={index}>
                  {name}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-7 mt-8">
              {generateDateArray(year, month + 1).map((name: number, index) => (
                <div
                  onClick={() => onSelectedDate(month + 1, name)}
                  className={classNames(
                    "col-span-1 date-item flex items-center justify-center",
                    getDisabledForToDate(month + 1, name),
                    ctxSelectedDate(month + 1, name),
                  )}
                  key={index}
                >
                  {name === 0 ? "" : name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateRangePicker;
