"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Mail, Phone, Clock, Facebook, Instagram, MessageCircle, Youtube } from "lucide-react"
import { IContact } from "@/types"
import Link from "next/link"

interface Props {
    contact: IContact
}
export default function ContactBody({contact}: Props) {
  return (
    <>
        <div className="grid lg:gap-8 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Contact Information */}
                    <Card className="overflow-hidden border-2 border-green-100">
                        <CardContent className="p-6">
                            <div className="mb-6 border-b border-gray-200 pb-4 w-full">
                                <h2 className="text-xl font-bold text-green-800">Bog'lanish uchun</h2>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex items-start">
                                    <MapPin className="mr-3 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <span className="text-gray-700">{contact.address}</span>
                                </li>
                                <li className="flex items-start">
                                    <Mail className="mr-3 h-6 w-6 flex-shrink-0 text-green-600" />
                                    <a href={`mailto:${contact.email}`} className="text-green-700 hover:underline">
                                        {contact.email}
                                    </a>
                                </li>
                                {contact.phones.map((phone, index) => (
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
                            <p className="text-xl font-medium text-green-800">{contact.workingHours}</p>
                            <p className="mt-4 text-gray-600">
                                Bizning choyxonamiz sizga xizmat ko'rsatishga doimo tayyor. Tashrif buyuring va mazali taomlarimizdan
                                bahramand bo'ling!
                            </p>
                        </CardContent>
                    </Card>

                    {/* SocialMedia Media */}
                    <Card className="overflow-hidden border-2 border-green-100">
                        <CardContent className="p-6">
                            <div className="mb-6 border-b border-gray-200 pb-4 w-full">
                                <h2 className="text-xl font-bold text-green-800">Ijtimoiy tarmoqlar</h2>
                            </div>
                            <div className="flex flex-col space-y-4">
                                {contact.socialMedia.youtube && (
                                    <Link
                                        href={contact.socialMedia.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center rounded-lg border border-green-200 bg-white p-4 transition-all hover:border-green-400 hover:shadow"
                                    >
                                        <Youtube className="mr-3 h-6 w-6 text-red-600" />
                                        <span className="text-gray-700">Youtube</span>
                                    </Link>
                                )}
                                {contact.socialMedia.instagram && (
                                    <Link
                                        href={contact.socialMedia.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center rounded-lg border border-green-200 bg-white p-4 transition-all hover:border-green-400 hover:shadow"
                                    >
                                        <Instagram className="mr-3 h-6 w-6 text-pink-600" />
                                        <span className="text-gray-700">Instagram</span>
                                    </Link>
                                )}
                                {contact.socialMedia.telegram && (
                                    <Link
                                        href={contact.socialMedia.telegram}
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
                {/* <div className="mt-16">
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
                </div> */}

                {/* Map Section */}
                <div className="mt-16 overflow-hidden rounded-2xl border-2 border-green-100 bg-white shadow-lg">
                    <div className=" md:h-[400px] h-[300px] w-full bg-green-100">
                        <div className="relative h-full w-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5901.845067808373!2d71.74889567724611!3d40.5000322158359!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sru!2s!4v1745052999364!5m2!1sru!2s"
                                className="w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
    </>
  )
}
