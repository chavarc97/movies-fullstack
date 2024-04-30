import asyncHandler from "express-async-handler"

export const test = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Api is working fine!"
    })
})