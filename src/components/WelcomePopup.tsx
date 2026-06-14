import { useState, useEffect } from "react";
import { X, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("kela-welcomed")) return;
    const open = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(open);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const close = setTimeout(() => handleClose(), 20000);
    return () => clearTimeout(close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("kela-welcomed", "1");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="w-6 h-6" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#800024] to-[#C17A8E] rounded-full flex items-center justify-center mx-auto mb-5">
            <Link2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Karibu to Kela Link Ltd</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Your trusted partner across borders. Property, travel and daily assistance handled in Kenya, for the diaspora.
          </p>
          <div className="space-y-3">
            <Link to="/services" onClick={handleClose}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold">
                Explore Our Services
              </Button>
            </Link>
            <button onClick={handleClose} className="w-full text-muted-foreground hover:text-foreground py-2 text-sm">
              Maybe later
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-4">This message closes automatically in 20 seconds.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
