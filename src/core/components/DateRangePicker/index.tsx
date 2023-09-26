import classNames from 'classnames';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

import { DATE_OF_THE_WEEK } from '../../constants/date';
import {
  generateDateArray,
  getNextMonthLabels,
  getPrevMonthLabels,
  isCurrentDateAndYear,
} from '../../helpers';

export interface DateRangePickerProps {}

function DateRangePicker(props: DateRangePickerProps) {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
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
    if (!selectedDate && !toDate) {
      setSelectedDate(date);
      return;
    }
    if (selectedDate) {
      if (!toDate) {
        setToDate(date);
        return;
      }
      if (toDate) {
        setToDate(date);
        return;
      }
    }
  };

  const ctxSelectedDate = (month: number, dateNumber: number) => {
    if (!dateNumber) {
      return;
    }
    const date = new Date(year, month, dateNumber);
    const strSelected = selectedDate?.toDateString() ?? '';
    let isSelected = false;
    if (selectedDate) {
      isSelected = strSelected === date.toDateString();
    }
    let isSelectedToDate = false;
    if (toDate) {
      isSelectedToDate = toDate.toDateString() === date.toDateString();
    }
    const isNotEmpty = selectedDate && toDate;
    return {
      'is-selected-date': isSelected || isSelectedToDate,
      'within-range': isNotEmpty ? date > selectedDate && date < toDate : false,
    };
  };

  return (
    <div className="date-range-wrapper">
      <div className="input-date flex items-center justify-between">
        <div>{selectedDate?.toDateString()}</div>
        <div>{toDate?.toDateString()}</div>
      </div>

      <div className="date-content">
        <div className="flex justify-between">
          <div>
            <div className="relative pt-4 pb-10">
              <div
                className={classNames('absolute left-0 top-6 ', {
                  disabled: isCurrentDateAndYear(year, month),
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
                  style={{ width: '46px' }}
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
                    'col-span-1 date-item flex items-center justify-center',
                    getDisabledDate(name),
                    ctxSelectedDate(month, name)
                  )}
                  key={index}
                >
                  {name === 0 ? '' : name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="relative pt-4 pb-10" onClick={onNextMonth}>
              <div className="text-center">
                {getNextMonthLabels(month, year)}
              </div>
              <div className="absolute right-0 top-6">
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
                <li style={{ width: '46px' }} key={index}>
                  {name}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-7 mt-8">
              {generateDateArray(year, month + 1).map((name: number, index) => (
                <div
                  onClick={() => onSelectedDate(month + 1, name)}
                  className={classNames(
                    'col-span-1 date-item flex items-center justify-center',
                    getDisabledForToDate(month + 1, name),
                    ctxSelectedDate(month + 1, name)
                  )}
                  key={index}
                >
                  {name === 0 ? '' : name}
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
