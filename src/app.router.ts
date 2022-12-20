import login from "./modules/auth/router/login";
import register from "./modules/auth/router/register";
import postImage from "./modules/home/router/post-image";
import postVideo from "./modules/home/router/post-video";
import allPosts from "./modules/home/router/all-posts";
import postText from "./modules/home/router/post-text";
import getVideos from "./modules/posts/router/get-videos";
import getPhotos from "./modules/posts/router/get-photos";
import getOtherPosts from "./modules/posts/router/get-other-posts";
import postBlog from "./modules/home/router/post-blog";
import getBlogs from "./modules/posts/router/get-blogs";
import userPosts from "./modules/profile/router/user-posts";
import deletePost from "./modules/profile/router/delete-post";
import getUser from "./modules/profile/router/get-user";
import file from "./modules/file/router/file";
import editProfile from "./modules/edit-profile/router/edit-profile";
import editPost from "./modules/profile/router/edit-post";
import changeUsername from "./modules/settings/router/change-username";
import changePassword from "./modules/settings/router/change-password";
import getPost from "./modules/home/router/get-post";
import sendComment from "./modules/posts/router/send-comment";
import sendResponse from "./modules/posts/router/send-response";
import deleteComment from "./modules/posts/router/delete-comment";
import likeComment from "./modules/posts/router/like-comment";
import dislikeComment from "./modules/posts/router/dislike-comment";
import likePost from "./modules/home/router/like-post";
import dislikePost from "./modules/home/router/dislike-post";

export function appRouter(app) {

    app.use('/login', login)
    app.use('/register', register)
    app.use('/post-image', postImage)
    app.use('/post-video', postVideo)
    app.use('/all-posts', allPosts)
    app.use('/post-text', postText)
    app.use('/get-videos', getVideos)
    app.use('/get-blogs', getBlogs)
    app.use('/get-photos', getPhotos)
    app.use('/other-posts', getOtherPosts)
    app.use('/post-blog', postBlog)
    app.use('/user-posts', userPosts)
    app.use('/delete-post', deletePost)
    app.use('/get-user', getUser)
    app.use('/file', file)
    app.use('/edit-profile', editProfile)
    app.use('/edit-post', editPost)
    app.use('/change-username', changeUsername)
    app.use('/change-password', changePassword)
    app.use('/get-post', getPost)
    app.use('/send-comment', sendComment)
    app.use('/send-response', sendResponse)
    app.use('/delete-comment', deleteComment)
    app.use('/like', likeComment)
    app.use('/dislike', dislikeComment)
    app.use('/like-post', likePost)
    app.use('/dislike-post', dislikePost)


}
