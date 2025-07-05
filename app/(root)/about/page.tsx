'use server'

import { getAllGallery } from "@/action/galery.action"
import Gallery from "./_components/Galery"

const About = async() => {
  const gallery = await getAllGallery()
  
  return (
    <section>
        <div className="container pt-[80px]">
            <h1 className="text-2xl text-center font-semibold">Bizning galareya</h1>

            {gallery && (
              <div className="mt-5">
                <Gallery gallery={gallery} />
              </div>
            )}

            {gallery.length === 0 && (
              <div className="w-full h-[200px] flex items-center justify-center">
                <h2>Rasmlar mavjud emas :(</h2>
              </div>
            )}

        </div>
    </section>
  )
}

export default About