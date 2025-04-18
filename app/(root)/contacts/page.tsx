"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Mail, Phone, Clock, Facebook, Instagram, MessageCircle } from "lucide-react"
import { getContacts, type ContactInfo } from "@/lib/contact-data"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactsPage() {
    const [contacts, setContacts] = useState<ContactInfo | null>(null)

    useEffect(() => {
        setContacts(getContacts())
    }, [])

    if (!contacts) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-3xl font-bold text-green-800">Ma'lumotlar yuklanmoqda...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
            <div className="container px-4 py-12 md:px-6 md:py-16 mt-[40px]">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-green-800 md:text-4xl">Biz bilan bog'laning</h1>
                    <p className="mt-4 text-lg text-green-700">Savollaringiz bormi? Biz bilan bog'laning!</p>
                </div>


                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Contact Information */}
                    <Card className="overflow-hidden border-2 border-green-100">
                        <CardContent className="p-6">
                            <div className="mb-6 border-b border-gray-200 pb-4 w-full">
                                <h2 className="text-xl font-bold text-green-800">Bog'lanish uchun</h2>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex items-start">
                                    <MapPin className="mr-3 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <span className="text-gray-700">{contacts.address}</span>
                                </li>
                                <li className="flex items-start">
                                    <Mail className="mr-3 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <a href={`mailto:${contacts.email}`} className="text-green-700 hover:underline">
                                        {contacts.email}
                                    </a>
                                </li>
                                {contacts.phones.map((phone, index) => (
                                    <li key={index} className="flex items-start">
                                        <Phone className="mr-3 h-6 w-6 flex-shrink-0 text-green-600" />
                                        <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-green-700 hover:underline">
                                            {phone}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Working Hours */}
                    <Card className="overflow-hidden border-2 border-green-100">
                        <CardContent className="flex h-full flex-col items-center justify-start p-6 text-center">
                            <div className="mb-6 border-b border-gray-200 pb-4 w-full">
                                <h2 className="text-xl font-bold text-green-800 text-start">Ish vaqti</h2>
                            </div>
                            <Clock className="mb-4 h-12 w-12 text-green-600" />
                            <p className="text-xl font-medium text-green-800">{contacts.workingHours}</p>
                            <p className="mt-4 text-gray-600">
                                Bizning restoranimiz sizga xizmat ko'rsatishga doimo tayyor. Tashrif buyuring va mazali taomlarimizdan
                                bahramand bo'ling!
                            </p>
                        </CardContent>
                    </Card>

                    {/* Social Media */}
                    <Card className="overflow-hidden border-2 border-green-100">
                        <CardContent className="p-6">
                            <div className="mb-6 border-b border-gray-200 pb-4 w-full">
                                <h2 className="text-xl font-bold text-green-800">Ijtimoiy tarmoqlar</h2>
                            </div>
                            <div className="flex flex-col space-y-4">
                                {contacts.social.facebook && (
                                    <Link
                                        href={contacts.social.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center rounded-lg border border-green-200 bg-white p-4 transition-all hover:border-green-400 hover:shadow"
                                    >
                                        <Facebook className="mr-3 h-6 w-6 text-blue-600" />
                                        <span className="text-gray-700">Facebook</span>
                                    </Link>
                                )}
                                {contacts.social.instagram && (
                                    <Link
                                        href={contacts.social.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center rounded-lg border border-green-200 bg-white p-4 transition-all hover:border-green-400 hover:shadow"
                                    >
                                        <Instagram className="mr-3 h-6 w-6 text-pink-600" />
                                        <span className="text-gray-700">Instagram</span>
                                    </Link>
                                )}
                                {contacts.social.telegram && (
                                    <Link
                                        href={contacts.social.telegram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center rounded-lg border border-green-200 bg-white p-4 transition-all hover:border-green-400 hover:shadow"
                                    >
                                        <MessageCircle className="mr-3 h-6 w-6 text-blue-500" />
                                        <span className="text-gray-700">Telegram</span>
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form Section */}
                <div className="mt-16">
                    <Card className="overflow-hidden border-2 border-green-100">
                        <div className="bg-green-600 p-4">
                            <h2 className="text-xl font-bold text-white">Xabar qoldiring</h2>
                        </div>
                        <CardContent className="p-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                                            Ismingiz
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full rounded-md border border-green-200 p-2 focus:border-green-400 focus:outline-none"
                                            placeholder="Ismingizni kiriting"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full rounded-md border border-green-200 p-2 focus:border-green-400 focus:outline-none"
                                            placeholder="Email manzilingizni kiriting"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                                            Telefon
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full rounded-md border border-green-200 p-2 focus:border-green-400 focus:outline-none"
                                            placeholder="Telefon raqamingizni kiriting"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                                            Xabar
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            className="w-full rounded-md border border-green-200 p-2 focus:border-green-400 focus:outline-none"
                                            placeholder="Xabaringizni kiriting"
                                        ></textarea>
                                    </div>
                                    <button className="w-full rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700">
                                        Yuborish
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Map Section */}
                <div className="mt-16 overflow-hidden rounded-2xl border-2 border-green-100 bg-white shadow-lg">
                    <div className="aspect-[16/9] w-full bg-green-100">
                        <div className="relative h-full w-full">
                            {/* This would be replaced with an actual map component in a real application */}
                            <div className="flex h-full w-full items-center justify-center bg-green-50 p-4">
                                <div className="text-center">
                                    <MapPin className="mx-auto h-16 w-16 text-green-600" />
                                    <p className="mt-4 text-xl font-medium text-green-800">{contacts.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
