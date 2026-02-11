import { useSidebar } from "../context/SidebarContext";

const Backdrop = () => {
    const { isMobileOpen, toggleMobileSidebar } = useSidebar();

    if (!isMobileOpen) return null;

    return (
        <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={toggleMobileSidebar}
        />
    );
};

export default Backdrop;
