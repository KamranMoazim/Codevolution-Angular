import 'dotenv/config'


const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "300",
    10
);
const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10
);

// options for cookies
export const accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 24 * 60  * 60 * 1000),
    maxAge: accessTokenExpire * 24 * 60 * 60 * 1000,
    // httpOnly: true,
    httpOnly: false,
    secure:false,
    // sameSite: "none",
    // priority: "high",
    // domain: process.env.DOMAIN || "localhost",
    // path: "/"
    // secure:true,
};

export const refreshTokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    domain: process.env.DOMAIN || "localhost",
    path: "/"
    // secure: true,
    // secure: false,
};


export const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    // const refreshToken = user.SignRefreshToken();

    res.cookie("access_token", accessToken, accessTokenOptions);
    // res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    // set cookie in response


    console.log("User")
    console.log(user)

    res.status(statusCode).json({
        success: true,
        message: "Logged in successfully",
        data:{
            user,
            accessToken,
        }
    });
};
