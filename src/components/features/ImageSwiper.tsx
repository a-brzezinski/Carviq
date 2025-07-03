"use client";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ImageSwiperProps {
  imagesUrl: string[];
}

export const ImageSwiper = ({ imagesUrl }: ImageSwiperProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = useCallback((index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (modalOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modalOpen, closeModal]);

  const renderSlides = (isModal = false) =>
    imagesUrl.map((url, index) => (
      <SwiperSlide
        key={index}
        className={`relative ${!isModal ? "cursor-pointer" : "h-full w-full"}`}
        onClick={!isModal ? () => openModal(index) : undefined}>
        <Image
          src={url}
          alt={`Offer image ${index + 1}`}
          fill
          className={isModal ? "object-contain" : "object-cover"}
          priority={index === 0}
        />
      </SwiperSlide>
    ));

  return (
    <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-64 w-full sm:h-80 md:h-[450px] lg:h-[600px]">
        <Swiper
          navigation
          modules={[Navigation]}
          className="custom-swiper h-full w-full"
          onSlideChange={swiper => setModalIndex(swiper.activeIndex)}>
          {renderSlides()}
        </Swiper>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-2 py-4" onClick={closeModal}>
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-[16/9] w-full">
              <Swiper
                navigation
                modules={[Navigation]}
                initialSlide={modalIndex}
                className="custom-swiper h-full w-full"
                onSlideChange={swiper => setModalIndex(swiper.activeIndex)}>
                {renderSlides(true)}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
