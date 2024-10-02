// import envConfig from "@/app/config/envConfig"

export const getPosts = async () => {
    const res = await fetch("http://localhost:5000/api/posts")
    // console.log(res)
    return res.json()
}