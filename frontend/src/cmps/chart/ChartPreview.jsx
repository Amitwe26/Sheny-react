import React, { useState } from 'react';
import { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

export function ChartPreview({ groups }) {
  const [option, setOption] = useState('status');
  const [keys, setKeys] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const data = {
    labels: keys,
    datasets: [
      {
        label: '# of Votes',
        data: numbers,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
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
    // {
    //   label: 'Date',
    //   value: 'date',
    // },
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
  };

  const changeDataPie = (ev) => {
    const { value } = ev.target;
    setOption(value);
  };
  return (
    <div className='chart'>
      <select value={option} onChange={(ev) => changeDataPie(ev)}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
      <Pie data={data} width={400} height={400} />
    </div>
  );
}
