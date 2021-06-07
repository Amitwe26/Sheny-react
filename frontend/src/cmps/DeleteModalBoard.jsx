
export function DeleteModalBoard({ board, onRemove, onToggleModalOptions }) {

    return (
        < div className="modal-delete flex col space-between" >
            <div className="top">
                <p>Are you sure want to delete Board? "{board.name}"</p>
            </div>
            <div className="bottom flex align-center">
                <button className="btn-delete" onClick={() => onRemove(board._id)}>Delete</button>
                <button className="btn-go-back" onClick={() => onToggleModalOptions()}>Go Back</button>
            </div>
        </div >
    )
}
