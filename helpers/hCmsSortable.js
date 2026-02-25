/**
 * HcmsSortable - A lightweight Native HTML5 Drag & Drop Manager for HashtagCMS
 * Handles: Pool-to-Hook (copy), Hook-to-Hook (move), within-Hook (sort), Hook-to-Pool (remove)
 */

export default class HcmsSortable {
    constructor(options = {}) {
        this.options = {
            draggable: ".js_item",
            filter: ".js_delete",
            dragClass: "hcms-dragging",
            dropEagerClass: "module-drop-eager",
            onStart: () => {},
            onEnd:   () => {},
            onAdd:   () => {},
            onUpdate:() => {},
            onFilter:() => {},
            ...options
        };
    }

    static create(container, instanceOptions = {}) {
        const instance = new HcmsSortable(instanceOptions);
        instance.init(container);
        return instance;
    }

    init(container) {
        if (!container) return;
        this.container = container;
        this._handlers = {
            dragstart: this._onDragStart.bind(this),
            dragend:   this._onDragEnd.bind(this),
            dragover:  this._onDragOver.bind(this),
            dragleave: this._onDragLeave.bind(this),
            drop:      this._onDrop.bind(this),
            click:     this._onClick.bind(this),
        };
        for (const [event, handler] of Object.entries(this._handlers)) {
            this.container.addEventListener(event, handler);
        }
    }

    // ─── Private helpers ────────────────────────────────────────────────────

    _getCtx()    { return window.__hcms_drag_context || null; }
    _setCtx(ctx) { window.__hcms_drag_context = ctx; }
    _clearCtx()  { window.__hcms_drag_context = null; }

    _revertDom() {
        const ctx = this._getCtx();
        if (ctx && ctx.draggedElement && ctx.originalParent) {
            // insertBefore(el, null) appends — safe when nextSibling was null
            ctx.originalParent.insertBefore(ctx.draggedElement, ctx.nextElementSibling);
        }
    }

    _clearEagerClasses() {
        document.querySelectorAll(`.${this.options.dropEagerClass}`)
            .forEach(el => el.classList.remove(this.options.dropEagerClass));
    }

    // ─── Event handlers ─────────────────────────────────────────────────────

    _onDragStart(e) {
        const target = e.target.closest(this.options.draggable);
        if (!target) return;

        // Don't start drag when clicking the delete button
        if (e.target.closest(this.options.filter)) {
            e.preventDefault();
            return;
        }

        this._setCtx({
            draggedElement:    target,
            sourceContainer:   this.container,
            originalParent:    target.parentNode,
            nextElementSibling:target.nextElementSibling,
            dropped:           false,   // flag: set to true in _onDrop so _onDragEnd skips revert
        });

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', target.getAttribute('data-module-id') || '');
        e.dataTransfer.setData('application/hcms-layout-id', target.getAttribute('data-layout-id') || '');

        // Defer so the browser captures the un-modified element as the drag image
        setTimeout(() => {
            target.classList.add(this.options.dragClass);
            this.options.onStart({ item: target, from: this.container });
        }, 0);
    }

    _onDragEnd(e) {
        const ctx = this._getCtx();
        if (!ctx) return;

        ctx.draggedElement.classList.remove(this.options.dragClass);

        // Only revert if the drop did NOT succeed (e.g. user pressed Escape or dropped outside)
        if (!ctx.dropped) {
            this._revertDom();
        }

        this.options.onEnd({ item: ctx.draggedElement, from: ctx.sourceContainer });
        this._clearEagerClasses();
        this._clearCtx();
    }

    _onDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const ctx = this._getCtx();
        if (!ctx) return;
        const dragged = ctx.draggedElement;

        // Visual eager feedback on hook containers
        if (this.container.classList.contains('js_hook_modules')) {
            this.container.classList.add(this.options.dropEagerClass);
        }

        // Find the item we're hovering over
        const target = e.target.closest(this.options.draggable);

        if (target && target !== dragged) {
            const rect = target.getBoundingClientRect();
            const isBefore = e.clientY < rect.top + rect.height / 2;
            target.parentNode.insertBefore(dragged, isBefore ? target : target.nextElementSibling);
        } else if (!target && (e.target === this.container || this.container.contains(e.target))) {
            // Hovering over empty space in the container — append to end
            if (this.container.lastElementChild !== dragged) {
                this.container.appendChild(dragged);
            }
        }
    }

    _onDragLeave(e) {
        if (!this.container.contains(e.relatedTarget)) {
            this.container.classList.remove(this.options.dropEagerClass);
        }
    }

    _onDrop(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent parent containers catching the same drop

        this.container.classList.remove(this.options.dropEagerClass);

        const ctx = this._getCtx();
        if (!ctx || !ctx.draggedElement) return;

        const dragged  = ctx.draggedElement;
        const source   = ctx.sourceContainer;

        // Capture drop position BEFORE we revert the DOM
        const layoutId     = dragged.getAttribute('data-layout-id');
        const nextEl       = dragged.nextElementSibling;
        const nextLayoutId = nextEl ? nextEl.getAttribute('data-layout-id') : null;

        // Mark as successfully dropped so _onDragEnd skips the cancel-revert
        ctx.dropped = true;

        // Revert physical DOM — Vue (source of truth) will re-render the new order
        this._revertDom();

        const isExternalDrop = source !== this.container;

        if (isExternalDrop) {
            this.options.onAdd({
                item:        dragged,
                layoutId:    layoutId,
                from:        source,
                to:          this.container,
                nextLayoutId:nextLayoutId,
            });
        } else {
            this.options.onUpdate({
                item:        dragged,
                layoutId:    layoutId,
                to:          this.container,
                nextLayoutId:nextLayoutId,
            });
        }
    }

    _onClick(e) {
        const filterTarget = e.target.closest(this.options.filter);
        if (filterTarget) {
            const item = e.target.closest(this.options.draggable);
            this.options.onFilter({ item, target: filterTarget, event: e });
        }
    }

    // ─── Public API ─────────────────────────────────────────────────────────

    destroy() {
        if (!this.container || !this._handlers) return;
        for (const [event, handler] of Object.entries(this._handlers)) {
            this.container.removeEventListener(event, handler);
        }
        this.container = null;
        this._handlers = null;
    }
}
