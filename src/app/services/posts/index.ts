// import envConfig from "@/app/config/envConfig"

export const getPosts = async () => {
    const res = await fetch("https://pet-care-server-three.vercel.app/api/posts")
    // console.log(res)
    return res.json()
}