import { TaskToWeek } from "./TaskToWeek";

export function ListMyWeek({ boards, userId }) {
    return (
        <div>
            {boards.map(board => {
                return <TaskToWeek key={board._id} board={board} userId={userId} />
            })}
        </div>
    )
}
