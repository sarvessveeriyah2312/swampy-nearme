import { motion } from 'framer-motion';

export const FooterNote = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
    className="text-center mt-12 pt-8 border-t border-amber-200"
  >
    <p className="text-amber-700 italic text-sm max-w-2xl mx-auto">
      "May Lord Ayyappa bless you with spiritual enlightenment as you participate in these sacred gatherings during the Mandala Deeksha period."
    </p>
  </motion.div>
);
