import { Link } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { Component, useEffect, useState } from 'react';
import { BoardSideNavModal } from './BoardSideNavModal';
import { DeleteModalBoard } from '../DeleteModalBoard';

// import React from 'react'

export function BoardPreview({ board, onRemove }) {
    const [isModalShown, setIsModalShown] = useState(false)
    // const [isModalDeleteShown, setIsModalDeleteShown] = useState(false)
    const [isLoding, setIsLoding] = useState(false)

    useEffect(() => {
        setIsLoding(true)
        // setTimeout(() => {
        //     // getBoards()
        //     setIsLoding(false)

        // }, 4000);
    }, [])

    const toggleModal = () => {
        setIsModalShown(!isModalShown)
    }

    const onToggleModalOptions = () => {
        setIsModalShown(false)
    }

    return (
        <React.Fragment>
            {/* {isLoding && Logo()} */}
            {/* {!isLoding &&  */}
            <section className="board-preview flex align-center" >
                <Link to={`/board/${board._id}`}>
                    {board.name}
                </Link>

                <MoreHorizIcon
                    className="more-icon"
                    onClick={() => toggleModal()} />

                {isModalShown &&
                    <BoardSideNavModal
                        board={board}
                        onRemove={onRemove}
                        onToggleModalOptions={onToggleModalOptions}
                    />}

                {isModalShown &&
                    <div
                        className="screen"
                        onClick={() => toggleModal()}
                    />}

            </section >
            {/* } */}
        </React.Fragment>
    )
}

// export class BoardPreview extends Component {
//     state = {
//         isModalShown: false,
//         isModalDeleteShown: false,
//         isLoding: false
//     }

//     toggleModal = () => {
//         var { isModalShown } = this.state
//         this.setState({ isModalShown: !isModalShown })
//     }

//     onOpenModalDelete = () => {
//         var { isModalDeleteShown } = this.state
//         this.setState({ isModalDeleteShown: !isModalDeleteShown })
//     }

//     onCloseModalDelete = () => {
//         this.setState({ isModalDeleteShown: false, isModalShown: false })
//     }

//     render() {
//         const { board, onRemove } = this.props
//         return (
//             <React.Fragment>
//                 {/* {!this.isLoding && <Logo />} */}
//                 {this.isLoding && <section className="board-preview flex align-center" >
//                     <Link to={`/board/${board._id}`}>
//                         {board.name}
//                     </Link>

//                     <MoreHorizIcon
//                         className="more-icon"
//                         onClick={this.toggleModal} />

//                     {this.state.isModalShown &&
//                         <BoardSideNavModal
//                             board={board}
//                             onOpenModalDelete={this.onOpenModalDelete}
//                         />}

//                     {this.state.isModalShown &&
//                         <div
//                             className="screen"
//                             onClick={this.toggleModal}
//                         />}

//                     {this.state.isModalDeleteShown &&
//                         <DeleteModalBoard
//                             board={board}
//                             onRemove={onRemove}
//                             onCloseModalDelete={this.onCloseModalDelete}
//                         />
//                     }
//                     {this.state.isModalDeleteShown &&
//                         <div
//                             className="dark-screen-nover "
//                         />}
//                 </section >}
//             </React.Fragment>
//         )

//     }
// }
