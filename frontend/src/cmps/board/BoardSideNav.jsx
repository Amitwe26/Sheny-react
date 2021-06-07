import { useEffect, useState } from "react";
import { AddCircleOutlineRounded } from "@material-ui/icons";
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { BoardFilter } from "./BoardFilter";
import { BoardList } from "./BoardList";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export function BoardSideNav({ onRemove, onAdd }) {
    const { boards, msg } = useSelector(state => state.boardReducer)
    const { loggedInUser } = useSelector(state => state.userReducer)
    const [isBarShown, setIsBarShown] = useState(false)
    const [isFilterShown, setIsFilterShown] = useState(false)
    const [isInputShown, setIsInputShown] = useState(false)
    const [boardsForDisplay, setBoardsForDisplay] = useState(null)
    const [nameNewBoard, setNameNewBoard] = useState('')
    const history = useHistory()

    const inputRef = useRef(null)

    useEffect(() => {
        getBoradsForDisplay()
    }, [boards])

    const toggleShownBar = () => {
        setIsBarShown(!isBarShown)
    }

    const toggleInput = () => {
        setIsInputShown(!isInputShown)
    }
    const toggleSarech = () => {
        setIsFilterShown(!isFilterShown)

    }
    const handelChange = (ev) => {
        const nameNewBoard = ev.target.value
        setNameNewBoard(nameNewBoard)
    }

    const addBoard = async (ev) => {
        ev.preventDefault()
        const nameWithCapital = nameNewBoard.charAt(0).toUpperCase() + nameNewBoard.slice(1)
        await onAdd(nameWithCapital, loggedInUser)
        toggleInput()

    }
    // const focus = () => {
    //     console.log('amit', inputRef.current);
    //     inputRef.current.focus()
    // }

    const getBoradsForDisplay = async (filterBy) => {
        const regex = new RegExp(filterBy, 'i')
        const newListBoards = boards.filter(board => regex.test(board.name))
        setBoardsForDisplay(newListBoards)
    }

    return (
        <section className={`${(isBarShown) ? `board-side-nav flex col` : `board-side-nav-close`}`}>
            <div className="board-side-nav-top flex col align-start space-between">
                <button
                    className="btn-toggle-sidenav flex center align-center"
                    onClick={() => toggleShownBar()}>
                    {(isBarShown) ? <ArrowBackIosIcon className="arrow-back" /> : <ArrowForwardIosIcon />}
                </button>
                <h2>My Boards:</h2>
                <button
                    className="btn-add flex align-center"
                    onClick={() => toggleInput()}>
                    {/* onClick={() => onAdd('new board')}> */}
                    <AddCircleOutlineRounded />
                                Add
                            </button>
                <button
                    className="btn-filter flex align-center"
                // onClick={focus}
                >
                    <FilterListIcon />
                                Filters
                            </button>
                {!isFilterShown && <button
                    className="btn-filter flex align-center"
                    onClick={() => toggleSarech()}
                >
                    <SearchIcon />Search
                    </button>}
                {isFilterShown && <BoardFilter
                    inputRef={inputRef}
                    toggleSarech={toggleSarech}
                    getBoradsForDisplay={getBoradsForDisplay}
                />}
            </div>
            <div className="board-side-nav-bottom flex col">
                <BoardList
                    boards={boardsForDisplay || boards}
                    onRemove={onRemove}
                />
                {isInputShown &&
                    <form onSubmit={(ev) => addBoard(ev)}>
                        <input
                            className="input-new-board"
                            type="text"
                            placeholder="Enter board name"
                            onChange={(ev) => handelChange(ev)}
                            autoFocus />
                    </form>}

            </div>
        </section>
    )
}

