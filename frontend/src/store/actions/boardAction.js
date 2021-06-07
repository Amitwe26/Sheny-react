import { boardService } from "../../services/boardService"
import { socketService } from "../../services/socketService"

export function loadBoards() {
    return async dispatch => {
        try {
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
            return boards
        } catch (err) {
            console.log('Board Actions: err in loadBoards', err)
        } finally {
        }
    }
}

export function loadBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({ type: 'SET_BOARD', board });
        } catch (err) {
            console.log('Board Actions: err in loadBoard', err)
        } finally {
        }
    }
}

export function updateBoard(board, msg) {
    console.log('board is:', board);
    return async dispatch => {
        try {
            dispatch({ type: 'SET_BOARD', board })
            await boardService.update(board)
            socketService.emit('board update')
            dispatch({ type: 'SET_MSG', msg })
        } catch (err) {
            dispatch({ type: 'SET_MSG', msg: 'Unsuccessfully' })
            console.log('Board Actions: err in updateBoard', err)

        } finally {
        }
    }
}

export function addBoard(boardName, user) {
    return async dispatch => {
        try {
            const board = await boardService.add(boardName, user)
            dispatch({ type: 'ADD_BOARD', board })
            dispatch({ type: 'SET_BOARD', board })
            socketService.emit('boards update', 'added board')
            dispatch({ type: 'SET_MSG', msg: 'Add Board successfully' })

        } catch (err) {
            dispatch({ type: 'SET_MSG', msg: 'Unsuccessfully' })
            console.log('Board Actions: err in addBoard', err)
        } finally {
        }
    }
}

export function updateBoards(board, boards) {
    return dispatch => {
        try {
            const updatedBoards = boardService.updateBoards(board, boards)
            dispatch({ type: 'SET_BOARDS', boards: updatedBoards })
        } catch (err) {
            console.log('Board Actions: err in updateBoards', err)
        } finally {
        }
    }
}

export function removeBoard(boardId) {
    return async dispatch => {
        try {
            dispatch({ type: 'REMOVE_BOARD', boardId })
            await boardService.remove(boardId)
            socketService.emit('boards update', 'removed board')
            dispatch({ type: 'SET_MSG', msg: 'Remove Board successfully' })

        } catch (err) {
            console.log('Board Actions: err in removeBoard', err)
        } finally {
        }
    }
}

export function setActiveBoard(board) {
    console.log('board is:', board);
    return async dispatch => {
        try {
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('Board Actions: err in set active board', err);
        }
    }
}
