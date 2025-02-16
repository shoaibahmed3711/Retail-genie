import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ filter: "saturate(0%)" }}
        animate={{ filter: "saturate(100%)" }}
        exit={{ filter: "saturate(0%)" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ minHeight: "100vh" }} // Ensures full-page effect
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
