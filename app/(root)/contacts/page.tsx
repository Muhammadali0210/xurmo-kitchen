import { getContact } from "@/action/contact.action"
import ContactBody from "./_components/contact-body"

export default async function ContactsPage() {
    const contact = await getContact()
    const plainContact = JSON.parse(JSON.stringify(contact))
    return (
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
            <div className="container px-4 py-12 md:px-6 md:py-16 mt-[40px]">
                <div className="lg:mb-12 mb-6 text-center">
                    <h1 className="text-2xl font-bold text-green-800 md:text-4xl">Biz bilan bog'laning</h1>
                    <p className="mt-4 md:text-lg text-md text-green-700">Savol va takliflaringiz bo'lsa bizga murojat qiling</p>
                </div>

                <ContactBody contact={plainContact} />
            </div>
        </div>
    )
}
