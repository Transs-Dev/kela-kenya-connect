import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: { src: string; alt?: string; title?: string }[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

const Lightbox = ({ images, index, onClose, onIndexChange }: Props) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length, onClose, onIndexChange]);

  if (!images.length) return null;
  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
      >
        <X className="w-5 h-5" />
      </button>
      {images.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); onIndexChange((index - 1 + images.length) % images.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); onIndexChange((index + 1) % images.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
      <figure className="max-w-[92vw] max-h-[88vh] flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <img src={img.src} alt={img.alt || ""} className="max-h-[80vh] max-w-[92vw] object-contain rounded-lg shadow-2xl" />
        {img.title && <figcaption className="text-white/90 text-sm">{img.title}</figcaption>}
        {images.length > 1 && (
          <p className="text-white/50 text-xs">{index + 1} / {images.length}</p>
        )}
      </figure>
    </div>
  );
};

export default Lightbox;
