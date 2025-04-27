import React from "react";
import { motion } from "framer-motion";

const ThreeDAnimation = ({ visible, onFinish, scale }) => {
  return (
    <motion.div
      className="plane-animation"
      initial={{ opacity: 0, y: 0, x: 0 }} // Start position of the plane
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 100 : 1000, // Move vertically
        x: visible ? 100 : -1000,  // Move horizontally
        scale: scale,              // Apply scaling if needed
      }}
      transition={{ duration: 2, ease: "easeOut" }}  // Animation duration and easing
      onAnimationComplete={onFinish}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100px",
        height: "50px",
        backgroundColor: "red",  // For illustration purposes, change to plane image or model
      }}
    />
  );
};

export default ThreeDAnimation;
