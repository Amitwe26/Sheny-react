import React, { useState } from 'react';
import { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

export function ChartPreview({ groups, activeBoard }) {
  const [option, setOption] = useState('status');
  const [keys, setKeys] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [colors, setColors] = useState([]);
  const data = {
    labels: keys,
    datasets: [
      {
        label: '# of Votes',
        data: numbers,
        backgroundColor: colors,
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  };
  const options = [
    {
      label: 'Status',
      value: 'status',
    },
    {
      label: 'Priority',
      value: 'priority',
    },
  ];

  useEffect(() => {
    getInfo();
  }, [option, groups]);

  const getInfo = async () => {
    const list = groups.map((group) => {
      const arrTask = [];
      group.tasks.forEach((task) => {
        const key = task[option];
        const isSame = arrTask.some((obj) => key === obj.key);
        const idx = arrTask.findIndex((obj) => key === obj.key);
        if (!isSame) {
          arrTask.push({ key: key, number: 1 });
        } else {
          arrTask[idx].number++;
        }
      });
      return arrTask;
    });
    const newArr = [];
    list.flat().forEach((obj) => {
      const isFind = newArr.findIndex((object) => object.key === obj.key);
      if (isFind !== -1) {
        newArr[isFind].number += obj.number;
      } else {
        newArr.push(obj);
      }
    });
    const onlyKeys = newArr.map((obj) => obj.key);
    const onlyNumbers = newArr.map((obj) => obj.number);
    setKeys(onlyKeys);
    setNumbers(onlyNumbers);
    getColors(onlyKeys);
  };

  const changeDataPie = (ev) => {
    const { value } = ev.target;
    setOption(value);
  };

  const getColors = (onlyKeys) => {
    const arrColors = [];
    activeBoard[option].forEach((key) => {
      const idx = onlyKeys.findIndex((name) => key.txt === name);
      arrColors[idx] = key.color;
    });
    setColors(arrColors);
  };

  return (
    <div className='chart'>
      <select value={option} onChange={(ev) => changeDataPie(ev)}>
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Pie data={data} width={400} height={400} />
    </div>
  );
}
