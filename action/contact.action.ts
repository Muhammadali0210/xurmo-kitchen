'use server'

import dbConnect from "@/lib/mongodb";
import type { IContact } from "@/types";
import { revalidatePath } from "next/cache";
import Contact from "@/database/contact.model";


export const getContact = async () => {
    try {
        await dbConnect()
        const contact = await Contact.findOne()
        return contact
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
            error
        }
    }
}

export const updateContact = async (payload: IContact) => {
    await dbConnect()
    let contact = await Contact.findOne()
    
    if (contact) {
      // mavjud bo‘lsa - yangilaymiz
      Object.assign(contact, payload)
      await contact.save()
    } else {
      // yo‘q bo‘lsa - yangisini yaratamiz
      contact = await Contact.create(payload)
    }
    revalidatePath("/admin/contacts")
    return contact
  }