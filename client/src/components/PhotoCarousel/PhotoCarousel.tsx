import { useState } from 'react';

type PhotoCarouselProps = {
    photos: string[];
}

export const PhotoCarousel = ({ photos }: PhotoCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full h-full">
            {/* Image */}
            <img
                src={photos[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
                className="w-full h-full object-contain"
            />

            {/* Navigation Buttons */}
            {photos.length > 1 && (
                <>
                    <button
                        className="absolute z-20 top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full px-2.5"
                        onClick={handlePrev}
                    >
                        &#8249;
                    </button>
                    <button
                        className="absolute  z-20 top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full px-2.5"
                        onClick={handleNext}
                    >
                        &#8250;
                    </button>
                </>
            )}
        </div>
    );
};