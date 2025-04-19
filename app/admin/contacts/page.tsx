import { getContact } from "@/action/contact.action"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ContactForm from "./_components/contact-form"

export default async function AdminContactsPage() {
  const contact = await getContact()
  const plainContact = JSON.parse(JSON.stringify(contact))

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-800">Kontakt ma'lumotlari</CardTitle>
          <CardDescription>Restoran kontakt ma'lumotlarini o'zgartirish</CardDescription>
        </CardHeader>
        <ContactForm contact={plainContact} />
      </Card>
    </div>
  )
}
