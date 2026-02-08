//"service_1w8g6sb",
// "template_b31wi1o",
// wTwO1DApwaKc4gyjJ
import { useState } from "react";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";

function ReplyForm() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); 
  // idle | sending | sent | error | declined

  const EMAIL_CONFIG = {
    serviceId: "service_1w8g6sb",
    templateId: "template_b31wi1o",
    publicKey: "wTwO1DApwaKc4gyjJ"
  };

  const sendReply = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        {
          from_name: "Hima",
          message,
          time: new Date().toLocaleString()
        },
        EMAIL_CONFIG.publicKey
      )
      .then(() => {
        setStatus("sent");
        setMessage("");
      })
      .catch(() => {
        setStatus("error");
      });
  };

  // 🔕 Silent notification when she clicks "No"
  const handleNoClick = () => {
    setStatus("declined");

    emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      {
        from_name: "Hima",
        message: "She read today’s message and chose not to reply 💛",
        time: new Date().toLocaleString()
      },
      EMAIL_CONFIG.publicKey
    ).catch(() => {
      // Fail silently — she should never know
    });
  };

  return (
    <>
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
                <button className="no" onClick={handleNoClick}>
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