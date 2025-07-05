'use client';

import { useState, useMemo, useEffect } from 'react';
import { ColumnsPhotoAlbum, type Photo } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'react-photo-album/columns.css';

import type { IGalery } from '@/types';

interface Props {
  gallery: IGalery[];
}

export default function Gallery({ gallery }: Props) {
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const initialPhotos = useMemo<Photo[]>(() => {
    return gallery.flatMap(({ images }, gIdx) =>
      images.map((src, i) => {
        const m = src.match(/(\d+)x(\d+)\./);         // fayl nomida bo‘lsa
        const width  = m ? +m[1] : 4;                 // fallback 4×3
        const height = m ? +m[2] : 3;

        return { src, width, height, alt: `image-${gIdx}-${i}` };
      })
    );
  }, [gallery]);

  /* 2) Client: real o‘lchamlarni aniqlash va state’ni yangilash */
  useEffect(() => {
    let active = true;

    Promise.all(
      initialPhotos.map(
        (p) =>
          new Promise<Photo>((resolve) => {
            const img = new Image();
            img.src = p.src;
            img.onload = () =>
              resolve({ ...p, width: img.naturalWidth, height: img.naturalHeight });
            img.onerror = () => resolve(p); // xato bo'lsa eski qiymat
          })
      )
    ).then((real) => {
      if (active) setPhotos(real);
    });

    return () => {
      active = false;
    };
  }, [initialPhotos]);

  if (!photos.length) return <p>Loading…</p>;

  /* 3) UI */
  return (
    <>
      <ColumnsPhotoAlbum
        photos={photos}
        spacing={10}
        onClick={({ index }) => setIndex(index)}
        //  @ts-ignore
        renderPhoto={({ imageProps }) => (
          <div className="photo-card">
            <img {...imageProps} className="photo-img" />
          </div>
        )}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </>
  );
}
