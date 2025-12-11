# Accessibility & Best Practices Checklist

## Current Status Overview

This portfolio has good accessibility foundations with:
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Theme support (dark/light mode)
- ✅ Responsive design

## Improvement Opportunities

### 1. Screen Reader Announcements

**Current Issue:** Dynamic content changes don't announce to screen readers

**Areas to fix:**

#### CardStack.astro - Navigation State
```astro
<!-- Current: No announcement -->
<button class="card-nav-next">
  <svg>...</svg>
</button>

<!-- Improved: With announcement -->
<div class="card-status" aria-live="polite" aria-atomic="true">
  Experience {currentIndex + 1} of {cards.length}: {cards[currentIndex].title}
</div>

<button 
  class="card-nav-next"
  aria-controls="card-status"
  aria-label="Go to next experience"
>
  <svg aria-hidden="true">...</svg>
</button>
```

#### ClientTestimonialCarousel.astro - Position Indicator
```astro
<!-- Announce carousel position -->
<div 
  aria-live="polite" 
  aria-atomic="true"
  class="sr-only"
>
  Testimonial {currentIndex + 1} of {testimonials.length}: {testimonials[currentIndex].name}
</div>

<!-- Button with proper label -->
<button aria-label="Previous testimonial">
  <svg aria-hidden="true">Previous</svg>
</button>
```

---

### 2. Keyboard Navigation Documentation

**Add this to component documentation:**

```markdown
## Keyboard Navigation

### CardStack Component
- **Right Arrow**: Next experience
- **Left Arrow**: Previous experience  
- **Tab**: Navigate through controls
- **Enter/Space**: Activate dot navigation

### ClientTestimonialCarousel Component
- **Right Arrow**: Next testimonial
- **Left Arrow**: Previous testimonial
- **Home**: First testimonial
- **End**: Last testimonial
- **Tab**: Focus on controls

### Contact Form
- **Tab**: Move to next field
- **Shift+Tab**: Move to previous field
- **Enter**: Submit form
```

---

### 3. SVG Accessibility

**Current Issues in codebase:**

```astro
<!-- ❌ Bad: SVG not marked as decorative -->
<svg width="24" height="24" viewBox="0 0 24 24">
  <path d="..."/>
</svg>

<!-- ✅ Good: SVG marked as decorative -->
<svg 
  width="24" 
  height="24" 
  viewBox="0 0 24 24"
  aria-hidden="true"
  focusable="false"
>
  <path d="..."/>
</svg>

<!-- ✅ Better: Icon with label -->
<button aria-label="Open menu">
  <svg aria-hidden="true" focusable="false">
    <path d="..."/>
  </svg>
</button>
```

**Action Items:**

1. **Decorative SVGs** - Add `aria-hidden="true"` and `focusable="false"`
2. **Icon Buttons** - Move label to button, hide SVG
3. **Informational SVGs** - Use `<title>` element

---

### 4. Focus Management

**Add focus indicators to `src/styles/global.css`:**

```css
/* Visible focus indicators for keyboard users */
:focus-visible {
  outline: 3px solid var(--color-focus, currentColor);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove default outline, use custom */
button:focus,
a:focus,
input:focus {
  outline: none;
}

/* Ensure links and buttons are always visible */
button, a, [role="button"] {
  position: relative;
  z-index: 1;
}

/* Skip to main content link */
a.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  z-index: 100;
}

a.skip-link:focus {
  top: 0;
}
```

**Add to `src/layouts/BaseLayout.astro`:**

```astro
<!-- Right after opening <body> tag -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Wrap main content -->
<main id="main-content">
  <!-- page content -->
</main>
```

---

### 5. Color Contrast

**Audit checklist:**

- [ ] **Text on background:** Minimum 4.5:1 contrast ratio
- [ ] **Large text (18pt+):** Minimum 3:1 contrast ratio
- [ ] **UI components:** 3:1 minimum for edges and states
- [ ] **Links:** Distinguishable from surrounding text (not just color)

**Specific areas to check:**

1. **Hero Section**
   - Text color vs. background
   - CTA button text vs. button background

2. **Cards**
   - Title text contrast
   - Description text contrast
   - Hover state contrast

3. **Footer**
   - Footer text vs. footer background
   - Links in footer

4. **Form Elements**
   - Input text vs. background
   - Labels readability
   - Error message visibility

**Tool:** Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

### 6. Form Accessibility

**Improvements needed for `contact.astro`:**

```astro
<!-- ❌ Current approach -->
<input type="text" placeholder="Your name" />

<!-- ✅ Better approach -->
<label for="name-input">Name</label>
<input 
  id="name-input"
  type="text" 
  name="name"
  required
  aria-required="true"
  aria-describedby="name-error"
/>
<span id="name-error" class="error" role="alert"></span>
```

**Best practices:**

1. **Always use labels:**
```astro
<div class="form-group">
  <label for="email">Email Address</label>
  <input 
    id="email" 
    type="email" 
    name="email"
    required
    aria-required="true"
  />
</div>
```

2. **Provide error messages with ARIA:**
```astro
<div class="form-error" role="alert" aria-live="polite">
  Please enter a valid email address
</div>
```

3. **Help text for complex fields:**
```astro
<label for="message">Message</label>
<textarea 
  id="message" 
  name="message"
  aria-describedby="message-help"
/>
<p id="message-help" class="help-text">
  Minimum 20 characters. Please include specific details about your project.
</p>
```

---

### 7. Image Alt Text

**Audit existing images:**

```astro
<!-- ❌ Bad: No alt text -->
<img src="/Bryan_hero_image.webp" />

<!-- ❌ Bad: Redundant alt text -->
<img src="/Bryan_hero_image.webp" alt="Image" />

<!-- ✅ Good: Descriptive alt text -->
<img 
  src="/Bryan_hero_image.webp" 
  alt="Bryan Jacinto, copywriter and SEO specialist, smiling in professional headshot"
/>

<!-- ✅ Good: Decorative image (empty alt) -->
<img 
  src="/decorative-background.webp" 
  alt=""
  aria-hidden="true"
/>
```

**Guidelines:**
- Describe the image content, not "image of"
- Include relevant context
- Keep under 125 characters
- For logos: include company/brand name
- For decorative images: use empty alt="" with aria-hidden="true"

---

### 8. Motion & Animation

**Respect user preferences:**

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Update CardStack and Carousel to respect this:**

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const duration = prefersReducedMotion ? 0 : 400; // ms
const useAnimations = !prefersReducedMotion;
```

---

### 9. Reading Order & Semantics

**Current component review:**

```astro
<!-- ❌ Using divs for structure -->
<div class="header">
  <div class="nav">Navigation</div>
</div>

<!-- ✅ Using semantic HTML -->
<header>
  <nav>Navigation</nav>
</header>

<!-- ❌ Using divs for buttons -->
<div class="button" onclick="...">Click me</div>

<!-- ✅ Using actual buttons -->
<button onclick="...">Click me</button>

<!-- ❌ Unclear heading hierarchy -->
<h1>Section Title</h1>
<h1>Subsection</h1>  <!-- Should be h2 -->

<!-- ✅ Proper heading hierarchy -->
<h1>Main Title</h1>
<h2>Subsection</h2>
<h3>Sub-subsection</h3>
```

---

### 10. Language & Internationalization

**Add language attributes:**

```astro
<!-- In BaseLayout.astro -->
<html lang="en">
  <!-- If mixing languages: -->
  <p>This is English. <span lang="es">Esto es español.</span></p>
</html>
```

---

## Testing Tools & Resources

### Automated Tools
1. **WAVE** - WebAIM accessibility checker (browser extension)
2. **Lighthouse** - Built into Chrome DevTools
3. **axe DevTools** - Comprehensive accessibility audit
4. **NVDA** - Free screen reader for testing
5. **JAWS** - Professional screen reader (paid)

### Manual Testing
1. **Keyboard only navigation** - Try using only Tab, Enter, Arrow keys
2. **Screen reader testing** - Test with NVDA or built-in screen reader
3. **Color blindness simulation** - Use browser extensions to simulate
4. **Text scaling** - Test at 200% zoom
5. **Mobile accessibility** - Test with mobile screen readers

### Online Resources
- [WebAIM](https://webaim.org/) - Accessibility resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Official standards
- [Inclusive Components](https://inclusive-components.design/) - Pattern library
- [A11y Project](https://www.a11yproject.com/) - Community-driven checklist

---

## Implementation Checklist

- [ ] Add aria-live regions for dynamic content
- [ ] Add skip-to-main-content link
- [ ] Verify all SVGs have proper aria-hidden attributes
- [ ] Test keyboard navigation on all interactive components
- [ ] Add focus visible styles
- [ ] Improve form accessibility (labels, error messages)
- [ ] Verify image alt text completeness
- [ ] Test color contrast with WAVE tool
- [ ] Add prefers-reduced-motion support
- [ ] Test with screen reader (NVDA)
- [ ] Verify heading hierarchy on all pages
- [ ] Add language attributes
- [ ] Test at 200% zoom
- [ ] Document keyboard shortcuts

---

## Accessibility Compliance

**Current Level:** AA (Mostly compliant)
**Target Level:** AAA (Highly accessible)

### Required for AA (WCAG 2.1)
- ✅ Sufficient color contrast (4.5:1 for normal text)
- ✅ Keyboard accessible
- ✅ No seizure-inducing content
- ✅ Descriptive page titles
- ⚠️ Focus indicators (needs improvement)
- ⚠️ Form labels (needs improvement)

### Additional for AAA
- 🔲 Enhanced color contrast (7:1)
- 🔲 Sign language for audio content
- 🔲 Extended audio descriptions
- 🔲 Text alternatives for complex graphics

---

## Quick Wins (Easy to Implement)

1. **Add skip-to-main-content link** - 10 minutes
2. **Add aria-hidden to decorative SVGs** - 15 minutes
3. **Improve form labels** - 20 minutes
4. **Add prefers-reduced-motion** - 15 minutes
5. **Verify alt text on images** - 10 minutes

**Total: ~70 minutes for significant accessibility improvement**

