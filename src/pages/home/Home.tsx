import { motion } from "framer-motion";
import { useStore } from "../../store/useStore";

const Home = () => {
  const profile = useStore((state) => state.profile)
  return (
    <div>
      {
        profile ?
        (
          <motion.div
            initial={{ opacity: 0, y: -50 }}  
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }} 
            style={{
              fontSize: "40px",
              textAlign: "center",
              marginTop: "100px",
              fontWeight: "900",
              color: "#333",
              fontFamily: 'unset'
            }}
          >
            Welcome - {profile.name}
          </motion.div>
        ) :
        (
          <motion.div
            initial={{ opacity: 0, y: -50 }}  
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }} 
            style={{
              fontSize: "40px",
              textAlign: "center",
              marginTop: "100px",
              fontWeight: "900",
              color: "#333",
              fontFamily: 'unset'
            }}
          >
            Home Page
          </motion.div>
        )
      }
    </div>
  );
};

export default Home;
