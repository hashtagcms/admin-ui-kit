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
  init: function (action, content_type, id) {
    this.action = action;
    this.content_type = content_type;
    this.id = id;

    if (PageManager.action === "add") {
      document
        .getElementById("lang_name")
        .addEventListener("change", PageManager.autoUpdateFields);
      document
        .getElementById("lang_title")
        .addEventListener("change", PageManager.autoUpdateUrls);
      document
        .getElementById("link_rewrite")
        .addEventListener("keyup", PageManager.linkRewriteUpdated);
      document
        .getElementById("category_id")
        .addEventListener("change", PageManager.getParentCategory);
    } else {
      this.getParentCategory();
    }
  },
  isBlank: function (elem) {
    return document.getElementById(elem).value.replace(/\s/g, "") === "";
  },

  autoUpdateFields: function () {
    let value = this.value;
    try {
      if (PageManager.isBlank("lang_title")) {
        document.getElementById("lang_title").value =
          value[0].toUpperCase() + value.slice(1);
        document.getElementById("alias").value = CleanForUrl(
          value.toUpperCase(),
          "_",
        );
        let active_key = CleanForUrl(value.toLowerCase(), "-");
        document.getElementById("lang_active_key").value = active_key;
        document.getElementById("link_rewrite").value = active_key;
      }
    } catch (e) {
      console.error(e.message);
    }
  },
  autoUpdateUrls: function () {
    let value = this.value;
    if (document.getElementById("link_rewrite").edited !== true) {
      value = CleanForUrl(value.toUpperCase(), "_");
      value = value.substr(0, 60); //it's limit
      document.getElementById("alias").value = value;

      let active_key = CleanForUrl(value.toLowerCase(), "-");
      active_key = value.substr(0, 128); //it's limit
      document.getElementById("lang_active_key").value = active_key;
      document.getElementById("link_rewrite").value = active_key;
    }
  },
  linkRewriteUpdated: function () {
    document.getElementById("link_rewrite").edited = true;
  },
  getParentCategory() {
    let parentcombo = document.getElementById("parent_id");
    let category_id = document.getElementById("category_id").value;
    document.getElementById("parent_id").value = "";

    parentcombo.length = 0;
    parentcombo.options[0] = new Option("Select", "");

    if (category_id > 0) {
      showHideBlock(true);
      let path = adminConfig.admin_path("page/getParentCategory", {
        content_type: PageManager.content_type,
        category_id: category_id,
      });
      axios
        .get(path)
        .then(function (res) {
          //console.log(res);
          updateCombo(res.data);
        })
        .catch(function (res) {
          //console.log(res);
          showHideBlock(false);
        });
    } else {
      showHideBlock(false);
    }

    function updateCombo(res) {
      if (res.length > 0) {
        let index = 1;
        for (let i = 0; i < res.length; i++) {
          let current = res[i];
          if (current.id !== PageManager.id) {
            parentcombo.options[index] = new Option(
              current.lang.name,
              current.id,
            );
            index++;
          }
        }
      } else {
        showHideBlock(false);
      }
    }

    function showHideBlock(show) {
      document.getElementById("parent_div").style.display =
        show === true ? "" : "none";
    }
  },
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


