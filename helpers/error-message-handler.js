export class ErrorMessage {
  constructor(options = {}) {
    // Check if options is the legacy 'errors' array or an options object
    const isLegacy = Array.isArray(options);
    
    this.errors = isLegacy ? options : (options.errors || (typeof error_messages !== "undefined" ? error_messages : []));
    
    const parseClasses = (classes, defaultClasses) => {
        if (!classes) return defaultClasses;
        return Array.isArray(classes) ? classes : classes.split(' ').filter(c => c.trim() !== '');
    };

    this.config = {
        invalidClass: parseClasses(!isLegacy && options.invalidClass ? options.invalidClass : 'is-invalid', ['is-invalid']),
        alertClasses: parseClasses(!isLegacy && options.alertClasses ? options.alertClasses : 'alert alert-danger mt-1', ['alert', 'alert-danger', 'mt-1'])
    };
    this.init();
  }

  init() {
    const run = () => {
        this.handleUploadErrorParam();
        this.renderErrors();
        this.focusFirst();

        // Expand all collapsible sections if there are errors
        if (Object.keys(this.errors).length > 0) {
            if (window.CollapsibleSection && typeof window.CollapsibleSection.expandAll === "function") {
                window.CollapsibleSection.expandAll();
            }
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
    } else {
        run();
    }
  }

  /**
   * Reads the ?_upload_error= query param (set by PostTooLargeException handler)
   * and injects a visible red banner into the page.
   * Cleans the param from the URL afterwards so it doesn't persist on refresh.
   */
  handleUploadErrorParam() {
    const params = new URLSearchParams(window.location.search);
    const errorMsg = params.get('_upload_error');
    if (!errorMsg) return;

    // Build the banner
    const banner = document.createElement('div');
    banner.style.cssText = [
      'display:flex', 'align-items:flex-start', 'gap:10px',
      'background:#fef2f2', 'border:1px solid #fecaca', 'color:#b91c1c',
      'font-size:12px', 'font-weight:600', 'padding:12px 16px',
      'border-radius:10px', 'margin-bottom:16px', 'box-shadow:0 1px 4px rgba(185,28,28,.08)'
    ].join(';');
    banner.innerHTML = `<i class="fa fa-exclamation-circle" style="margin-top:2px;flex-shrink:0"></i><span>${errorMsg}</span>`;

    // Insert before the first <form> on the page, or at the top of <body>
    const form = document.querySelector('form');
    if (form) {
      form.parentNode.insertBefore(banner, form);
    } else {
      document.body.prepend(banner);
    }

    // Remove the param from the URL without triggering a reload
    params.delete('_upload_error');
    const cleanUrl = [
      window.location.pathname,
      params.toString() ? '?' + params.toString() : ''
    ].join('');
    window.history.replaceState({}, '', cleanUrl);
  }

  renderErrors() {
    Object.entries(this.errors).forEach(([field, messages]) => {
      const element = document.getElementById(field);

      if (!element) {
        console.warn(`[ErrorMessage] Could not find element with id: ${field}`);
        return;
      }

      element.classList.add(...this.config.invalidClass);

      const div = document.createElement("div");
      div.classList.add(...this.config.alertClasses);

      let message = messages[0];
      if (field.includes("lang_")) {
        message = message.replace("lang ", "");
      }
      
      div.textContent = message; // Safe from XSS
      element.parentNode.insertBefore(div, element.nextSibling);
    });
  }

  focusFirst() {
    const firstErrorId = Object.keys(this.errors)[0];
    if (!firstErrorId) return;

    const element = document.getElementById(firstErrorId);
    if (element && typeof element.focus === "function") {
      try {
        element.focus();
      } catch (e) {
        console.error(`[ErrorMessage] Focus failed: ${e.message}`);
      }
    }
  }
}
