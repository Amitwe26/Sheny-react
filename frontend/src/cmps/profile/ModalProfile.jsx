import React, { useEffect, useState } from 'react';

export function ModalProfile({
  user,
  keyModal,
  setIsModalShown,
  onUpdateUser,
}) {
  const [value, setValue] = useState('');
  const [typeToInput, setTypeToInput] = useState('');
  useEffect(() => {
    checkTypeInput();
    setValue(user[keyModal]);
  }, []);

  const handleChange = (ev) => {
    const { value } = ev.target;
    setValue(value);
  };
  const updateUser = () => {
    onUpdateUser(value);
    setIsModalShown(false);
  };

  const checkTypeInput = () => {
    if (keyModal === 'birthday') {
      setTypeToInput('date');
    } else if (keyModal === 'phone') {
      setTypeToInput('number');
    } else {
      setTypeToInput('text');
    }
  };

  return (
    <div className='modal-profile '>
      <button onClick={() => setIsModalShown(false)}>X</button>
      <h1>{keyModal}</h1>
      <form onSubmit={() => updateUser()}>
        <input
          type={typeToInput}
          value={value}
          autoFocus='on'
          onChange={handleChange}
        />
        <button type='submit'>Save info</button>
      </form>
    </div>
  );
}
