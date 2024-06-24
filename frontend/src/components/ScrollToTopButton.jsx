import { useEffect } from "react";

export default function ScrollToTopButton() {
    useEffect(() => {
        const scrollToTopBtn = document.getElementById("scrollToTopBtn");

        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.remove("hidden");
            } else {
                scrollToTopBtn.classList.add("hidden");
            }
        };

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };

        window.addEventListener("scroll", toggleVisibility);
        scrollToTopBtn.addEventListener("click", scrollToTop);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
            scrollToTopBtn.removeEventListener("click", scrollToTop);
        };
    }, []);

    return (
        <div className="">
            <button
                id="scrollToTopBtn"
                className="z-50 hidden fixed bottom-8 right-8  text-accent w-12 h-12 rounded-full shadow-lg transition-opacity duration-300 hover:cursor-pointer"
            >
                <i className="ri-arrow-up-line"></i>
            </button>

        </div>
    );
}
