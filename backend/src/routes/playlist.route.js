import express from 'express'
import { checkAuthenticated } from '../middleware/authMiddleware.js'
import { addProblemToPlayList, createPlayList, deletePlayList, getAllListDetails, getPlayListDetails, removeProblemFromPlayList } from '../controllers/playlist.controller.js'
import { playListValidator } from '../validators/index.js'

const playlistRoutes = express.Router()


playlistRoutes.get("/", checkAuthenticated, getAllListDetails)
playlistRoutes.get("/:playListId", checkAuthenticated, getPlayListDetails)
playlistRoutes.post("/create-playList",playListValidator(), checkAuthenticated, createPlayList)
playlistRoutes.post("/:playListId/add-problem", checkAuthenticated, addProblemToPlayList)
playlistRoutes.delete("/:playListId", checkAuthenticated, deletePlayList)
playlistRoutes.delete("/:playListId/remove-problem", checkAuthenticated, removeProblemFromPlayList)


export default playlistRoutes