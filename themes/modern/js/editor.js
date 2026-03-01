import { EditorHelper, PageManager, CollapsibleSection } from '../../../helpers';
window.EditorHelper = EditorHelper;
window.PageManager = PageManager;
window.CollapsibleSection = CollapsibleSection;

document.addEventListener('DOMContentLoaded', () => {
    CollapsibleSection.init();
});

