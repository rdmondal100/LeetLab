import express from 'express'
import { checkAuthenticated } from '../middleware/authMiddleware.js'
import { addProblemToPlayList, createPlayList, deletePlayList, getAllListDetails, getPlayListDetails, removeProblemFromPlayList } from '../controllers/playlist.controller.js'
import { playListValidator, problemsIdValidator } from '../validators/index.js'

const playlistRoutes = express.Router()


playlistRoutes.get("/", checkAuthenticated, getAllListDetails)
playlistRoutes.get("/:playListId", checkAuthenticated, getPlayListDetails)
playlistRoutes.post("/create-playList",playListValidator(), checkAuthenticated, createPlayList)
playlistRoutes.post("/:playListId/add-problem",problemsIdValidator(), checkAuthenticated, addProblemToPlayList)
playlistRoutes.delete("/:playListId", checkAuthenticated, deletePlayList)
playlistRoutes.delete("/:playListId/remove-problem",problemsIdValidator(), checkAuthenticated, removeProblemFromPlayList)


export default playlistRoutes