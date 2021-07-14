import { useEffect, useState } from 'react';

export function DeleteModalBoard({
  info,
  keyName,
  onRemove,
  onToggleModalDelete,
  onCloseModalDelete,
  group,
}) {
  const [key, setKey] = useState('');
  // const [state, setstate] = useState(initialState)
  useEffect(() => {
    if (keyName) setKey(keyName);
  }, [keyName]);

  const clickToRemove = () => {
    if (keyName === 'task') {
      onRemove(info.id, group);
    } else if (keyName === 'group') {
      onRemove(info.id);
    } else {
      onRemove(info._id);
    }
    // onCloseModalDelete();
    onToggleModalDelete();
  };

  return (
    <div className='modal-delete flex col space-between'>
      <div className='top'>
        <p>
          Are you sure want to delete {key}? "{info.name}"
        </p>
      </div>
      <div className='bottom flex align-center'>
        <button className='btn-delete' onClick={() => clickToRemove()}>
          Delete
        </button>
        <button className='btn-go-back' onClick={() => onToggleModalDelete()}>
          Go Back
        </button>
      </div>
    </div>
  );
}
