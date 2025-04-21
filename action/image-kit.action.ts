const uploadToImageKit = async (file: File) => {
    try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("fileName", file.name)
        formData.append("publicKey", "public_bmq/JUe1encDwcaErb/sRG651VA=")
        formData.append("uploadPreset", "upload_400_400") // Agar ishlatsa
        formData.append("folder", "/dishes")

        const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: "Basic " + btoa("private_zuJ7heH3aQM1AG2/8OP5r34mOMc=" + ":")
            }
        })

        const data = await res.json()
        return data.url // saqlash uchun
    } catch (error) {
        console.error("Xatolik yuz berdi:", error)
        throw new Error("Rasm yuklashda xatolik yuz berdi")
    }
}

export default uploadToImageKit

