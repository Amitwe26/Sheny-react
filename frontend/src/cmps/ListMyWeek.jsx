import { TaskToWeek } from './TaskToWeek';

export function ListMyWeek({ boards, userId, count, filterBy }) {
  return (
    <div className='list'>
      {boards.map((board) => {
        return (
          <TaskToWeek
            key={board._id}
            board={board}
            count={count}
            userId={userId}
            filterBy={filterBy}
          />
        );
      })}
    </div>
  );
}
