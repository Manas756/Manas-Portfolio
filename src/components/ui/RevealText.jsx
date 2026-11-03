import { motion } from 'motion/react'

/**
 * Word-by-word masked reveal when scrolled into view.
 * `text` is a plain string; wrap words in *asterisks* to render them in the italic serif.
 */
export default function RevealText({ text, as: Tag = 'h2', className = '', delay = 0, stagger = 0.045, once = true, ...rest }) {
  const words = text.split(' ')
  return (
    <Tag className={className} aria-label={text.replace(/\*/g, '')} {...rest}>
      {words.map((raw, i) => {
        const serif = raw.startsWith('*') && raw.replace(/[.,!?]$/, '').endsWith('*')
        const word = raw.replace(/\*/g, '')
        return (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block will-change-transform ${serif ? 'font-serif italic font-normal tracking-normal' : ''}`}
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once, margin: '0px 0px -12% 0px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && ' '}
          </span>
        )
      })}
    </Tag>
  )
}
