import adminConfig from "./admin-config";
import { CleanForUrl } from "./common";

export const EditorHelper = (function () {
  let makeRichEditor = (selector, settings) => {
    selector = document.querySelector(selector);
    let defaultSettings = {
      selector: "#" + selector.id,
      height: 500,
      theme: "silver",
      plugins:
        "code print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern",
      toolbar1:
        "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist | removeformat | customGallery | image |  code ",
      image_advtab: true,
      template_popup_height: 400,
      template_popup_width: 320,
      valid_elements: "*[*]",
      valid_children: "*[*]",
      document_base_url: adminConfig.get("app_url") + "/",
      allow_script_urls: true,
      convert_urls: false,
      relative_urls: false,
      remove_script_host: false,
      content_css: ["//fonts.googleapis.com/css?family=Lato:300,300i,400,400i"],
      setup: function (editor) {
        editor.ui.registry.addButton("customGallery", {
          text: "Insert Image",
          onAction: function (_) {
            if (Vue?.$refs?.imageGallery) {
              Vue.$refs.imageGallery.open(editor);
            }
          },
        });
      },
    };
    defaultSettings = { ...defaultSettings, ...settings };
    selector.editor = tinymce.init(defaultSettings);
  };

  return { makeRichEditor: makeRichEditor };
})();

/** Page Manager **/
export const PageManager = {
  action: null,
  content_type: null,
  id: null,
  config: {
      dependencies: []
  },
  
  init: function (action, content_type, id, config = {}) {
    this.action = action;
    this.content_type = content_type;
    this.id = id;
    this.config = { ...this.config, ...config };

    this.attachDependencyListeners();

    if (this.action !== "add") {
      this.getParentCategory();
    }
  },

  attachDependencyListeners: function() {
      // Loop over configured dependencies and attach elegant listeners automatically
      if (Array.isArray(this.config.dependencies) && this.config.dependencies.length > 0) {
          this.config.dependencies.forEach(dep => {
              const sourceElem = document.getElementById(dep.onChangeId);
              if (!sourceElem) return;

              sourceElem.addEventListener('change', (e) => {
                  const val = e.target.value;
                  if (!dep.shouldUpdate || !Array.isArray(dep.shouldUpdate)) return;
                  
                  dep.shouldUpdate.forEach(target => {
                      const targetElem = document.getElementById(target.element);
                      // By default, only update if the target is blank OR if the target is specified to force override
                      if (targetElem && (this.isBlank(target.element) || target.forceUpdate)) {
                          let finalVal = val;
                          if (target.formatter && typeof target.formatter === 'function') {
                              finalVal = target.formatter(val);
                          } else if (target.formatter === 'uppercase_clean') {
                              finalVal = CleanForUrl(val.toUpperCase(), "_").substr(0, 60);
                          } else if (target.formatter === 'lowercase_clean') {
                              finalVal = CleanForUrl(val.toLowerCase(), "-").substr(0, 128);
                          } else if (target.formatter === 'capitalize') {
                              finalVal = val.charAt(0).toUpperCase() + val.slice(1);
                          }
                          
                          targetElem.value = finalVal;
                      }
                  });
              });
          });
      } else {
          // Keep legacy overrides for safety during migration
          const langName = document.getElementById("lang_name");
          if (langName) {
               langName.addEventListener("change", this.autoUpdateFields.bind(this));
          }
          
          const langTitle = document.getElementById("lang_title");
          if (langTitle) {
              langTitle.addEventListener("change", this.autoUpdateUrls.bind(this));
          }
      }

      const linkRewrite = document.getElementById("link_rewrite");
      if (linkRewrite) {
          linkRewrite.addEventListener("keyup", this.linkRewriteUpdated.bind(this));
      }

      const categoryId = document.getElementById("category_id");
      if (categoryId) {
          categoryId.addEventListener("change", this.getParentCategory.bind(this));
      }
  },

  isBlank: function (elemId) {
    const el = document.getElementById(elemId);
    return el ? el.value.replace(/\s/g, "") === "" : true;
  },

  autoUpdateFields: function (e) {
    let value = typeof e === "string" ? e : (e.target ? e.target.value : this.value);
    if (!value) return;
    
    try {
      if (this.isBlank("lang_title")) {
        const langTitle = document.getElementById("lang_title");
        if(langTitle) langTitle.value = value.charAt(0).toUpperCase() + value.slice(1);
        
        const alias = document.getElementById("alias");
        if(alias) alias.value = CleanForUrl(value.toUpperCase(), "_");
        
        let active_key = CleanForUrl(value.toLowerCase(), "-");
        
        const langActiveKey = document.getElementById("lang_active_key");
        if(langActiveKey) langActiveKey.value = active_key;
        
        const linkRewrite = document.getElementById("link_rewrite");
        if(linkRewrite && linkRewrite.edited !== true) linkRewrite.value = active_key;
      }
    } catch (err) {
      console.error(err.message);
    }
  },
  
  autoUpdateUrls: function (e) {
    let value = typeof e === "string" ? e : (e.target ? e.target.value : this.value);
    if (!value) return;
    
    const linkRewrite = document.getElementById("link_rewrite");
    if (!linkRewrite || linkRewrite.edited !== true) {
      let aliasVal = CleanForUrl(value.toUpperCase(), "_");
      aliasVal = aliasVal.substr(0, 60); //it's limit
      const alias = document.getElementById("alias");
      if(alias) alias.value = aliasVal;

      let active_key = CleanForUrl(value.toLowerCase(), "-");
      active_key = active_key.substr(0, 128); //it's limit
      
      const langActiveKey = document.getElementById("lang_active_key");
      if(langActiveKey) langActiveKey.value = active_key;
      
      if(linkRewrite) linkRewrite.value = active_key;
    }
  },
  
  linkRewriteUpdated: function () {
    const linkRewrite = document.getElementById("link_rewrite");
    if (linkRewrite) linkRewrite.edited = true;
  },
  
  getParentCategory: function() {
    let parentcombo = document.getElementById("parent_id");
    let categoryElem = document.getElementById("category_id");
    if (!parentcombo || !categoryElem) return;
    
    let category_id = categoryElem.value;
    parentcombo.value = "";

    parentcombo.length = 0;

    if (category_id > 0) {
      parentcombo.options[0] = new Option("Loading...", "");
      this.showHideBlock(true);
      
      // If content_type is null/falsy from our config injection, use a default fallback
      let resolvedContentType = this.content_type || 'category'; 
      
      let path = adminConfig.admin_path("page/getParentCategory", {
        content_type: resolvedContentType,
        category_id: category_id,
      });
      axios
        .get(path)
        .then((res) => {
          parentcombo.length = 0;
          parentcombo.options[0] = new Option("Select", "");
          this.updateCombo(res.data, parentcombo);
        })
        .catch((res) => {
          parentcombo.length = 0;
          parentcombo.options[0] = new Option("Select", "");
          this.showHideBlock(false);
        });
    } else {
      parentcombo.options[0] = new Option("Select", "");
      this.showHideBlock(false);
    }
  },
  
  updateCombo: function(res, parentcombo) {
    let addedCount = 0;
    if (res.length > 0) {
      let index = 1;
      for (let i = 0; i < res.length; i++) {
        let current = res[i];
        if (current.id != this.id) {
          parentcombo.options[index] = new Option(
            current.lang.name,
            current.id,
          );
          index++;
          addedCount++;
        }
      }
    }
    
    this.showHideBlock(addedCount > 0);
  },
  
  showHideBlock: function(show) {
    const parentDiv = document.getElementById("parent_div");
    if (!parentDiv) return;

    if (!parentDiv.dataset.initialized) {
        parentDiv.dataset.initialized = "true";
        parentDiv.style.transition = 'max-height 0.4s ease-in-out, opacity 0.4s ease-in-out, margin 0.4s ease-in-out, padding 0.4s ease-in-out';
        parentDiv.style.overflow = 'hidden';
        if (parentDiv.style.display === 'none' || !show) {
            parentDiv.style.maxHeight = '0px';
            parentDiv.style.opacity = '0';
        }
    }

    if (show) {
        parentDiv.style.display = "";
        requestAnimationFrame(() => {
            parentDiv.style.maxHeight = '500px'; 
            parentDiv.style.opacity = '1';
        });
    } else {
        parentDiv.style.maxHeight = '0px';
        parentDiv.style.opacity = '0';
        setTimeout(() => {
            if (parentDiv.style.opacity === '0') {
                parentDiv.style.display = "none";
            }
        }, 400);
    }
  }
};

/**
 * CollapsibleSection
 * Handles toggle-collapse behaviour for [data-collapsible] sections.
 * State is persisted in localStorage so it survives page reloads.
 *
 * HTML contract:
 *   <section data-collapsible="unique-id" data-collapsed="true|false">
 *       <div data-collapsible-trigger>  ← clicking this toggles
 *       <div data-collapsible-body>     ← this element is shown/hidden
 *   </section>
 */
export const CollapsibleSection = {
    init() {
        document.querySelectorAll('[data-collapsible]').forEach(section => {
            const trigger  = section.querySelector('[data-collapsible-trigger]');
            const body     = section.querySelector('[data-collapsible-body]');
            const chevron  = trigger ? trigger.querySelector('[data-collapsible-chevron]') : null;

            if (!trigger || !body) return;

            // Initial state from data-collapsed attribute
            const startCollapsed = section.dataset.collapsed === 'true';

            this._apply(body, chevron, startCollapsed, false);

            trigger.addEventListener('click', () => {
                const isCurrentlyOpen = body.dataset.open === 'true';
                const shouldCollapse = isCurrentlyOpen; // if it was open, we want to collapse it
                this._apply(body, chevron, shouldCollapse, true);
            });
        });
    },

    _apply(body, chevron, collapsed, animate) {
        if (collapsed) {
            if (animate && (body.style.maxHeight === 'none' || !body.style.maxHeight)) {
                body.style.maxHeight = body.scrollHeight + 'px';
                body.offsetHeight; // force reflow
            }
            body.style.maxHeight  = '0px';
            body.style.overflow   = 'hidden';
            body.dataset.open     = 'false';
            if (chevron) chevron.style.transform = 'rotate(-90deg)';
        } else {
            const scrollHeight = body.scrollHeight;
            body.style.maxHeight = scrollHeight + 'px';
            body.style.overflow  = ''; // allow content to be visible during transition
            body.dataset.open    = 'true';
            if (chevron) chevron.style.transform = 'rotate(0deg)';

            if (animate) {
                setTimeout(() => {
                    if (body.dataset.open === 'true') {
                        body.style.maxHeight = 'none';
                    }
                }, 400);
            } else {
                body.style.maxHeight = 'none';
            }
        }
    },

    expand(section) {
        const body = section.querySelector('[data-collapsible-body]');
        const chevron = section.querySelector('[data-collapsible-chevron]');
        if (body) {
            this._apply(body, chevron, false, false);
        }
    },

    expandAll() {
        document.querySelectorAll('[data-collapsible]').forEach(section => {
            this.expand(section);
        });
    }
};


