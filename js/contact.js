// Form Validation, ROI Calculator, SEO Score Simulator, and Before/After Slider

export function initContact() {
  // --- 1. CONTACT FORM VALIDATION ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = contactForm.querySelectorAll('[required]');
      
      inputs.forEach(input => {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('border-red-500');
          if (errorEl) errorEl.classList.remove('hidden');
        } else {
          input.classList.remove('border-red-500');
          if (errorEl) errorEl.classList.add('hidden');
        }

        // Email validation check
        if (input.type === 'email' && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            input.classList.add('border-red-500');
            const emailError = document.getElementById('email-error');
            if (emailError) {
              emailError.textContent = 'Please enter a valid email address';
              emailError.classList.remove('hidden');
            }
          }
        }
      });

      if (isValid) {
        // Show premium toast/success overlay
        const formContainer = contactForm.parentElement;
        const successTemplate = `
          <div class="flex flex-col items-center justify-center text-center py-12 px-6 animate-scale">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <i data-lucide="check-circle-2" class="w-12 h-12 text-success"></i>
            </div>
            <h3 class="text-2xl font-bold text-dark mb-2">Message Sent Successfully!</h3>
            <p class="text-slate-600 max-w-md mb-8">Thank you for reaching out to VM RankUp. Our SEO experts are already reviewing your details and will get back to you within 24 hours.</p>
            <button id="reset-contact-form" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold">Send Another Message</button>
          </div>
        `;
        const originalContent = formContainer.innerHTML;
        formContainer.innerHTML = successTemplate;
        // Reinitialize icons if Lucide is loaded
        if (window.lucide) window.lucide.createIcons();

        document.getElementById('reset-contact-form').addEventListener('click', () => {
          formContainer.innerHTML = originalContent;
          initContact(); // reinitialize listeners
          if (window.lucide) window.lucide.createIcons();
        });
      }
    });
  }

  // --- 2. NEWSLETTER VALIDATION ---
  const newsletterForms = document.querySelectorAll('[data-newsletter-form]');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!input || !emailRegex.test(input.value.trim())) {
        if (input) {
          input.classList.add('border-red-500', 'focus:ring-red-400');
          input.placeholder = 'Invalid email address';
        }
        return;
      }

      input.classList.remove('border-red-500', 'focus:ring-red-400');
      const button = form.querySelector('button');
      const origText = button.innerHTML;
      button.disabled = true;
      button.innerHTML = '<span class="text-sm font-semibold">Subscribed!</span>';
      input.value = '';
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = origText;
      }, 3000);
    });
  });

  // --- 3. SEO ROI CALCULATOR ---
  const trafficInput = document.getElementById('roi-traffic');
  const conversionInput = document.getElementById('roi-conversion');
  const valueInput = document.getElementById('roi-value');
  const packageSelect = document.getElementById('roi-package');

  // Outputs
  const outTraffic = document.getElementById('out-traffic-growth');
  const outConversions = document.getElementById('out-conv-growth');
  const outRevenue = document.getElementById('out-rev-growth');
  const outRoi = document.getElementById('out-roi-percentage');
  const roiBadge = document.getElementById('roi-badge');

  if (trafficInput && conversionInput && valueInput) {
    const updateCalculator = () => {
      const currentTraffic = parseFloat(trafficInput.value) || 0;
      const conversionRate = parseFloat(conversionInput.value) / 100 || 0;
      const avgOrderValue = parseFloat(valueInput.value) || 0;
      const selectedPackage = parseFloat(packageSelect?.value) || 1500;

      // Update slider badges if they exist
      const trafficVal = document.getElementById('val-roi-traffic');
      const convVal = document.getElementById('val-roi-conversion');
      const valueVal = document.getElementById('val-roi-value');

      if (trafficVal) trafficVal.textContent = currentTraffic.toLocaleString();
      if (convVal) convVal.textContent = conversionInput.value + '%';
      if (valueVal) valueVal.textContent = '$' + avgOrderValue.toLocaleString();

      // Math formulas (assuming an average of 150% traffic growth from our SEO campaigns)
      const expectedTrafficGrowth = currentTraffic * 1.5; // +150% growth
      const extraConversions = expectedTrafficGrowth * conversionRate;
      const newMonthlyRevenue = extraConversions * avgOrderValue;
      
      // Net profit / cost of campaign
      const profit = newMonthlyRevenue - selectedPackage;
      const roiPercent = selectedPackage > 0 ? (profit / selectedPackage) * 100 : 0;

      // Update DOM outputs
      if (outTraffic) outTraffic.textContent = `+${Math.round(expectedTrafficGrowth).toLocaleString()}`;
      if (outConversions) outConversions.textContent = `+${Math.round(extraConversions).toLocaleString()}`;
      if (outRevenue) outRevenue.textContent = `$${Math.round(newMonthlyRevenue).toLocaleString()}`;
      
      if (outRoi) {
        if (roiPercent <= 0) {
          outRoi.textContent = '0%';
          if (roiBadge) roiBadge.className = 'px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full';
        } else {
          outRoi.textContent = `${Math.round(roiPercent)}%`;
          if (roiBadge) roiBadge.className = 'px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full';
        }
      }
    };

    [trafficInput, conversionInput, valueInput, packageSelect].forEach(element => {
      if (element) {
        element.addEventListener('input', updateCalculator);
      }
    });

    // Run once on load
    updateCalculator();
  }

  // --- 4. LIVE SEO SCORE SIMULATOR ---
  const auditBtn = document.getElementById('btn-run-audit');
  const auditInput = document.getElementById('input-audit-domain');
  const auditProgress = document.getElementById('audit-progress-container');
  const auditResults = document.getElementById('audit-results-container');
  const progressText = document.getElementById('audit-progress-text');
  const progressBar = document.getElementById('audit-progress-bar');

  if (auditBtn && auditInput && auditProgress) {
    auditBtn.addEventListener('click', () => {
      const url = auditInput.value.trim();
      if (!url) {
        auditInput.classList.add('border-red-500');
        return;
      }
      auditInput.classList.remove('border-red-500');

      // Hide input grid/intro & show loader
      document.getElementById('audit-input-group').classList.add('hidden');
      auditProgress.classList.remove('hidden');

      const steps = [
        { text: 'Connecting to server & caching headers...', time: 800, progress: 25 },
        { text: 'Scanning DOM structure & meta tag schemas...', time: 1600, progress: 55 },
        { text: 'Running mobile friendliness and Core Web Vitals audit...', time: 2400, progress: 80 },
        { text: 'Evaluating backlink profile and domain authority...', time: 3000, progress: 100 }
      ];

      steps.forEach(step => {
        setTimeout(() => {
          if (progressText) progressText.textContent = step.text;
          if (progressBar) progressBar.style.width = `${step.progress}%`;

          // Complete step
          if (step.progress === 100) {
            setTimeout(() => {
              auditProgress.classList.add('hidden');
              if (auditResults) {
                // Populate custom mock details based on domain string to feel authentic
                const score = Math.floor(Math.random() * (85 - 60) + 60); // score between 60 and 85
                const scoreCircle = document.getElementById('results-score-circle');
                const scoreNum = document.getElementById('results-score-num');
                const scoreGrade = document.getElementById('results-score-grade');
                const inputDomainSpan = document.getElementById('results-domain-name');

                if (inputDomainSpan) inputDomainSpan.textContent = url;
                if (scoreNum) scoreNum.textContent = score;

                // Adjust color based on score grade
                if (scoreCircle && scoreGrade) {
                  if (score < 70) {
                    scoreCircle.style.borderColor = '#EF4444'; // red-500
                    scoreGrade.textContent = 'Poor (Immediate Fixes Needed)';
                    scoreGrade.className = 'text-red-500 font-bold';
                  } else if (score < 80) {
                    scoreCircle.style.borderColor = '#F59E0B'; // amber-500
                    scoreGrade.textContent = 'Fair (Improvements Available)';
                    scoreGrade.className = 'text-amber-500 font-bold';
                  } else {
                    scoreCircle.style.borderColor = '#22C55E'; // green-500
                    scoreGrade.textContent = 'Good (Needs minor fine-tuning)';
                    scoreGrade.className = 'text-green-500 font-bold';
                  }
                }

                auditResults.classList.remove('hidden');
              }
            }, 500);
          }
        }, step.time);
      });
    });

    const resetAuditBtn = document.getElementById('btn-reset-audit');
    if (resetAuditBtn) {
      resetAuditBtn.addEventListener('click', () => {
        if (auditResults) auditResults.classList.add('hidden');
        document.getElementById('audit-input-group').classList.remove('hidden');
        if (progressBar) progressBar.style.width = '0%';
        auditInput.value = '';
      });
    }
  }

  // --- 5. BEFORE VS AFTER COMPARISON SLIDER ---
  const compareSliders = document.querySelectorAll('.comparison-slider-wrapper');
  compareSliders.forEach(slider => {
    const after = slider.querySelector('.comparison-after');
    const handle = slider.querySelector('.comparison-handle');
    
    if (!after || !handle) return;

    let isResizing = false;

    // Set starting position (50% split)
    after.style.width = '50%';
    handle.style.left = '50%';

    const updateSlider = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let position = ((clientX - rect.left) / rect.width) * 100;

      // Restrain percentage between 0 and 100
      if (position < 0) position = 0;
      if (position > 100) position = 100;

      after.style.width = `${position}%`;
      handle.style.left = `${position}%`;
    };

    // Mouse events
    handle.addEventListener('mousedown', () => {
      isResizing = true;
    });

    window.addEventListener('mouseup', () => {
      isResizing = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      updateSlider(e.clientX);
    });

    // Touch events
    handle.addEventListener('touchstart', () => {
      isResizing = true;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isResizing = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isResizing) return;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });
  });
}
