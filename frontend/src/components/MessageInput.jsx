import React, { useRef, useState } from 'react';
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import { motion } from "framer-motion";  // Import framer-motion for animations
import { Plane } from "lucide-react";  // Assuming we use a plane icon from lucide-react, or use a custom image for the plane

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const [showAnimation, setShowAnimation] = useState(false); // Animation state for the plane

  // Handle sending message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      // Send message to the store (or backend)
      sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Trigger the plane animation
      setShowAnimation(true);

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Hide the animation after 4 seconds (adjust the timing as needed)
      setTimeout(() => {
        setShowAnimation(false);
      }, 4000);  // Plane disappears after 4 seconds
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Handle image preview change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");  // Replace with your toast or alert system
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove image preview
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="relative p-4 w-full">
      {/* Plane animation */}
      {showAnimation && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: "100vw", y: "-100vh", rotate: 0 }}  // Plane flies out of screen with a rotation
          transition={{ duration: 4, ease: "easeInOut" }}  // Increased duration to 4 seconds
        >
          <Plane size={40} />  {/* Replace with custom plane icon/image */}
        </motion.div>
      )}

      <div className="p-4 w-full">
        {/* Image preview */}
        {imagePreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
          </div>
        )}

        {/* Message input form */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              className="w-full input input-bordered rounded-lg input-sm sm:input-md"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={20} />
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-circle"
            disabled={!text.trim() && !imagePreview}
          >
            <Send size={22} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
