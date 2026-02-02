/* 
   Example: Importing pre-built CSS in JavaScript 
   Use this if you are using Webpack/Vite with a CSS loader but NOT using SASS.
*/

// Option A: Import from the compiled distribution (simplest)
import "@hashtagcms/admin-ui-kit/dist/admin-ui-kit.min.css";

// Option B: If you want to use individual component styles (if available/split)
// typically the kit bundles everything into one css file.
