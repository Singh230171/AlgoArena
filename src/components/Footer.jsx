import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const socialLinks = [
    {
      title: "GitHub",
      href: "https://github.com/Singh230171",
      icon: <GitHubIcon />,
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/suryansh-singh-bba7a528a/",
      icon: <LinkedInIcon />,
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com/",
      icon: <InstagramIcon />,
    },
  ];

  const resourceLinks = [
    { name: "Sorting Algorithms", path: "/sorting/bubble" },
    { name: "Searching Algorithms", path: "/searching/linear" },
    { name: "Graph Algorithms", path: "/graph/bfs" },
    { name: "Dynamic Programming", path: "/dynamic-programming/fibonacci" },
    { name: "Greedy Algorithms", path: "/greedy-algorithm/activity-selection" },
    { name: "Backtracking", path: "/backtracking/n-queens" },
    { name: "Tree Algorithms", path: "/tree-algorithms/binary-search-tree" },
    { name: "Mathematical Algorithms", path: "/mathematical-algorithms/gcd-euclidean" },
    { name: "Race Mode", path: "/race-mode" },
    { name: "FAQ", path: "/faq" },
  ];

  const mid = Math.ceil(resourceLinks.length / 2);

  return (
    <motion.footer
      className="w-full px-4 py-8 text-white bg-slate-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-3 text-lg font-bold">
              Algorithm Visualization Platform
            </h3>
            <p className="text-sm text-gray-300">
              Built by Surya (Shuryansh Singh) to help learners understand
              algorithms visually and interactively.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-3 text-lg font-bold">Resources</h3>
            <nav className="grid grid-cols-2 gap-x-4">
              {[resourceLinks.slice(0, mid), resourceLinks.slice(mid)].map(
                (column, i) => (
                  <ul key={i} className="space-y-2">
                    {column.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.path}
                          className="text-sm text-gray-300 hover:text-blue-400"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </nav>
          </div>

          {/* Connect (NO LAG) */}
          <div>
            <h3 className="mb-3 text-lg font-bold">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 hover:bg-blue-500 transition-colors"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 mt-8 text-sm text-center text-gray-400 border-t border-gray-700">
          © {new Date().getFullYear()} Surya (Shuryansh Singh). All rights reserved.
          <div className="mt-2 space-x-4">
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="hover:text-blue-400"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setShowTermsModal(true)}
              className="hover:text-blue-400"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPrivacyModal && (
          <PolicyModal
            title="Privacy Policy"
            content={privacyContent}
            onClose={() => setShowPrivacyModal(false)}
          />
        )}
        {showTermsModal && (
          <PolicyModal
            title="Terms of Service"
            content={termsContent}
            onClose={() => setShowTermsModal(false)}
          />
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

/* ---------- Modal ---------- */

const PolicyModal = ({ title, content, onClose }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    onClick={onClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="w-11/12 max-w-2xl p-5 bg-slate-800 rounded-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-blue-400">{title}</h3>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="text-gray-300">{content}</div>
    </motion.div>
  </motion.div>
);

PolicyModal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

/* ---------- Static Content ---------- */

const privacyContent = (
  <p>
    This project does not collect personal data. Built for educational use by
    Surya (Shuryansh Singh).
  </p>
);

const termsContent = (
  <p>This platform is provided for learning purposes only.</p>
);

/* ---------- Icons ---------- */

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56v-2.1c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.11-3.17 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.65.24 2.87.12 3.17.75.81 1.2 1.85 1.2 3.11 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.08.78 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
      <path d="M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96ZM2.5 21.5h5V9h-5v12.5ZM9.5 9h4.8v1.7h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.66v5.74h-5v-5.1c0-1.22-.02-2.8-1.7-2.8-1.7 0-1.96 1.33-1.96 2.7v5.2h-5V9Z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7Zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10Zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5Zm0 9A3.5 3.5 0 1 1 15.5 13 3.5 3.5 0 0 1 12 16.5ZM18 6.5a1 1 0 1 0 1 1 1 1 0 0 0-1-1Z"/>
    </svg>
  );
}

export default Footer;