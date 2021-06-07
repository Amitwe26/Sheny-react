
export function DeleteModalTask({ task, group, onRemove, onCloseModalDelete }) {
    return (
        < div className="modal-delete flex col space-between" >
            <div className="top">
                <p>Are you sure want to delete Task? "{task.name}"</p>
            </div>
            <div className="bottom flex align-center">
                <button className="btn-delete" onClick={() => onRemove(task.id, group)}>Delete</button>
                <button className="btn-go-back" onClick={onCloseModalDelete}>Go Back</button>
            </div>
        </div >
    )
}
