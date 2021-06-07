import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'

import { loadBoards, removeBoard, addBoard, setActiveBoard } from '../store/actions/boardAction'
import { BoardDetails } from '../cmps/board/BoardDetails'
import { BoardSideNav } from '../cmps/board/BoardSideNav'
import { AppHeader } from '../cmps/AppHeader'

import React from 'react'
import { Logo } from '../cmps/Logo'
import { ModalMsg } from '../cmps/ModalMsg'
// import { storageService } from '../services/storageService'

export function BoardApp(props) {
    const { loggedInUser } = useSelector(state => state.userReducer)
    const { boards, activeBoard, msg } = useSelector(state => state.boardReducer)
    const [isLoading, setIsLoadinge] = useState(true)
    const [msgOpen, setMsgOpen] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        setIsLoadinge(true)
        setTimeout(async () => {
            await getBoards()

        }, 4000);
    }, [])

    useEffect(() => {
        if (msg) {
            setMsgOpen(true)
            setTimeout(() => {
                setMsgOpen(false)
                dispatch({ type: 'SET_MSG', msg: null })
            }, 1700);
        }
        if (msg === 'Add Board successfully') {
            const num = boards.length
            history.push(`/board/${boards[num - 1]._id}`)
        }
    }, [msg])

    const getBoards = async () => {
        // const dispatch(checkUserLogin())
        await onLoadBoards()
        await onSetActiveBoard()

        setIsLoadinge(false)

    }

    const onLoadBoards = async () => {
        dispatch(loadBoards())

    }

    useEffect(() => {
        if (boards && !isLoading) {
            history.push(`/board/${boards[0]._id}`)
        }

    }, [boards])

    const onSetActiveBoard = async () => {
        dispatch(setActiveBoard(boards[0]))

    }

    const onRemove = async (boardId) => {
        dispatch(removeBoard(boardId))
        if (activeBoard._id === boardId) {
            history.push(`/board/${boards[1]._id}`)
        }
    }

    const onAdd = async (board, user) => {
        dispatch(addBoard(board, user))
    }

    //     async componentDidMount() {
    //         this.setState({ isLoading: true })
    //         setTimeout(async () => {
    //             await this.loadBoards()
    //             const { boards } = this.props
    //             if (boards) {
    //                 this.setState({ isLoading: false })
    //                 this.props.history.push(`/board/${boards[0]._id}`)
    //                 return
    //             }
    //             if (!boards || !boards.length) {
    //                 return
    //             }
    //             this.setState({ isLoading: false })
    //         }, 4000);
    //     }
    if (!boards) return <div><h1>loading..</h1></div>
    return (
        <section className="board-app flex">
            <AppHeader />
            {isLoading && <Logo />}
            {!isLoading && <section className="board-main flex">
                < BoardSideNav
                    onRemove={(boardId) => onRemove(boardId)}
                    onAdd={(board, user) => onAdd(board, user)}
                />
                <Switch>
                    <Route path="/board/:boardId" component={BoardDetails} />
                </Switch>
                {<ModalMsg msgOpen={msgOpen} />}
            </section>}

        </section >
    )
}
