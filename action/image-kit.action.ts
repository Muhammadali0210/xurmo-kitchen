"use server"

const uploadToImageKit = async (file: File) => {
    const { IMAGEKIT_PUBLIC_KEY: publicKey } = process.env
    const { IMAGEKIT_PRIVATE_KEY: privateKey } = process.env
    try {
        const url = `https://upload.imagekit.io/api/v1/files/upload`
        const formData = new FormData()
        formData.append("file", file)
        formData.append("publicKey", publicKey as string)
        formData.append("fileName", file.name)
        formData.append("uploadPreset", "upload_400_400") // Agar ishlatsa
        formData.append("folder", "/dishes")

        const res = await fetch(url, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Basic ${btoa(`${privateKey}:`)}`,
            },
        })

        const data = await res.json()
        return data.url // saqlash uchun
    } catch (error) {
        console.error("Xatolik yuz berdi:", error)
        throw new Error("Rasm yuklashda xatolik yuz berdi")
    }
}

export default uploadToImageKit

