import { groupService } from './groupService'
import { httpService } from './httpService'

const BASE_URL = 'api/board'

export const boardService = {
    query,
    remove,
    getById,
    add,
    update,
    updateBoards
}


async function query() {
    const boards = await httpService.get(BASE_URL)
    return boards
}

async function update(board) {
    await httpService.put(BASE_URL + '/' + board._id, board)
}

async function remove(boardId) {
    await httpService.delete(BASE_URL + '/' + boardId)
}

async function getById(boardId) {
    return await httpService.get(BASE_URL + '/' + boardId)
}

async function add(boardName, user) {
    const board = _createBoard(boardName, user)
    const savedBoard = await httpService.post(BASE_URL, board)
    return savedBoard
}

function updateBoards(updatedBoard, boards) {
    return boards.map(board => {
        if (board._id === updatedBoard._id) {
            return updatedBoard
        }
        return board
    })
}


function _createBoard(boardName, user) {
    return {
        name: boardName,
        desc: 'edit your new board...',
        status: [
            {
                txt: "Completed",
                color: "#00ca71"
            },
            {
                txt: "Working on it",
                color: "#fdab3d"
            },
            {
                txt: "Stuck",
                color: "#e44258"
            },
            {
                txt: "New",
                color: "gray"
            }
        ],
        priority: [
            {
                txt: "Low",
                color: "#00ca71"
            },
            {
                txt: "Medium",
                color: "#fdab3d"
            },
            {
                txt: "High",
                color: "#e44258"
            }
        ],
        creator: {
            _id: user._id,
            fullname: user.fullname,
            imgUrl: user.imgUrl
        },
        groups: [
            groupService.createGroup('group1'),
            groupService.createGroup('group2'),
            groupService.createGroup('group3')
        ],
        createdAt: Date.now(),
        members: [
            {
                _id: "600877404b50bc8b342c1732",
                fullname: "Tair Bitan",
                imgUrl: "https://res.cloudinary.com/tair/image/upload/v1611221821/Tair_xdnngm.jpg"
            },
            {
                _id: "600877404b50bc8b342c1733",
                fullname: "Amit Weiss",
                imgUrl: "https://res.cloudinary.com/tair/image/upload/v1611221821/Amit_cgtbfo.jpg"
            },
            {
                _id: "600877404b50bc8b342c1734",
                fullname: "Tamir Leshetz",
                imgUrl: "https://res.cloudinary.com/tair/image/upload/v1611221822/Tamir_zzn3m4.jpg"
            }
        ]
    }
}

