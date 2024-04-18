// import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//business logic

exports.createComment = async (req, res) => {
    try{
        //fetch data from req body
        const {post, user, body} = req.body;
        //create a comment object
        const comment = new Comment({
            post,user,body
        });

        // save the new comment in the data base
        const savedComment = await comment.save();

        //find the post by ID and the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {Comments: savedComment._id}}, {new: true} ) //to update or add new entry push is used
                            .populate("Comments")  //populate the comments array with comment documents
                            .exec();
        res.json({
            post: updatedPost,
        });
    }
    catch(error) {
        return res.status(500).json({
            error:"erroe while creating comment",
        });
    }
};