import { useState } from "react";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";

function ReplyForm() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); 
  // idle | sending | sent | error | declined

  const sendReply = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        "service_1w8g6sb",
        "template_b31wi1o",
        {
          from_name: "Hima",
          message,
          time: new Date().toLocaleString()
        },
        "wTwO1DApwaKc4gyjJ"
      )
      .then(() => {
        setStatus("sent");
        setMessage("");
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <>
      {/* Prompt */}
      <div className="reply-prompt">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>Would you like to write back? 💌</p>
              <div className="reply-actions">
                <button className="yes" onClick={() => setOpen(true)}>
                  Yes
                </button>
                <button
                  className="no"
                  onClick={() => setStatus("declined")}
                >
                  No
                </button>
              </div>
            </motion.div>
          )}

          {status === "declined" && (
            <motion.p
              key="no-worries"
              className="no-worries"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              🕊 No worries 💖  
              <br />
              Just knowing you’re here made me smile.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <motion.div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3>💬 Write back</h3>

            {status === "sent" ? (
              <p className="success">❤️ Your message has been sent</p>
            ) : (
              <form onSubmit={sendReply}>
                <textarea
                  placeholder="Write your message here…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  maxLength={500}
                />
                <button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send 💌"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="error">Something went wrong 😢</p>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}

export default ReplyForm;