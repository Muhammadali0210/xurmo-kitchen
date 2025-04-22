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
        formData.append("uploadPreset", "upload_400_400")
        formData.append("folder", "/dishes")
        formData.append("isPrivateFile", "false");

        // const transformation = JSON.stringify([
        //     {
        //       height: "400",
        //       width: "400",
        //       quality: "80",
        //       crop: "force" // yoki "maintain_ratio" bo'lishi ham mumkin
        //     }
        //   ])
        //   formData.append("transformation", transformation)

        const res = await fetch(url, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Basic ${btoa(`${privateKey}:`)}`,
            },
        })
        // https://ik.imagekit.io/njtthrpue/
        const data = await res.json()
        const { filePath } = data;
        const transformedUrl = `https://ik.imagekit.io/fkzcpb1bl/tr:w-400,h-400,fo-auto,q-80${filePath}`;

        return transformedUrl
    } catch (error) {
        console.error("Xatolik yuz berdi:", error)
        throw new Error("Rasm yuklashda xatolik yuz berdi")
    }
}

export default uploadToImageKit
