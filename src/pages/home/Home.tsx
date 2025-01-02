import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}  
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }} 
        style={{
          fontSize: "50px",
          textAlign: "center",
          marginTop: "50px",
          fontWeight: "900",
          color: "#333",
          fontFamily: 'unset'
        }}
      >
        Home Page
      </motion.div>
    </div>
  );
};

export default Home;
