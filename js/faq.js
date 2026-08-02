// Smooth FAQ Accordions

export function initFAQ() {
  const faqItems = document.querySelectorAll('[data-faq-item]');

  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('[data-faq-trigger]');
    const content = item.querySelector('[data-faq-content]');
    const icon = item.querySelector('[data-faq-icon]');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-faq-open') === 'true';

      // Close all other FAQs in the same group (if needed, here we just close the sibling ones for a clean accordion UX)
      const siblings = item.parentElement.querySelectorAll('[data-faq-item]');
      siblings.forEach(sibling => {
        if (sibling !== item) {
          sibling.setAttribute('data-faq-open', 'false');
          const siblingContent = sibling.querySelector('[data-faq-content]');
          const siblingIcon = sibling.querySelector('[data-faq-icon]');
          if (siblingContent) siblingContent.style.maxHeight = '0px';
          if (siblingIcon) siblingIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current FAQ
      if (isOpen) {
        item.setAttribute('data-faq-open', 'false');
        content.style.maxHeight = '0px';
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        item.setAttribute('data-faq-open', 'true');
        content.style.maxHeight = `${content.scrollHeight}px`;
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}
