# Centralized Styling System

This folder contains all centralized styles for the Angular Admin Dashboard application.

## File Organization

```
styles/
├── _variables.scss      # Design tokens (colors, spacing, fonts, etc.)
├── _mixins.scss         # Reusable SCSS functions and utilities
├── _typography.scss     # Global text and heading styles
├── _buttons.scss        # Button component styles
├── _cards.scss          # Card component styles
├── _fields.scss         # Form field component styles
├── index.scss           # Master import file
└── README.md            # This file
```

## How to Use

### 1. Import in Component SCSS Files

```scss
@import '../../styles/variables';
@import '../../styles/mixins';
```

### 2. Using Variables

Colors, spacing, typography, and other design tokens:

```scss
.container {
  color: $text-primary;
  background-color: $background-secondary;
  padding: $spacing-lg;
  font-size: $font-size-base;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  transition: all $transition-base;
}
```

### 3. Using Mixins

Reusable SCSS functions for common patterns:

```scss
.my-button {
  @include button-base;
  @include button-variant($primary-color, white, $primary-dark);
}

.my-card {
  @include card-base;
}

.my-form-input {
  @include input-base;
}

.flex-container {
  @include flex-center;
}

// Responsive breakpoints
@include respond-to('md') {
  // Mobile styles
}
```

### 4. Using Component Classes

Use pre-defined CSS classes directly in templates:

```html
<!-- Buttons -->
<button class="btn btn-primary">Save</button>
<button class="btn btn-secondary btn-lg">Cancel</button>
<button class="btn btn-outline">Learn More</button>

<!-- Cards -->
<div class="card card-elevated">
  <div class="card-header">
    <h3>Title</h3>
  </div>
  <div class="card-body">Content</div>
</div>

<!-- Form Fields -->
<div class="form-group">
  <label>Email <span class="required">*</span></label>
  <input type="email" placeholder="Enter email">
</div>
```

## Available Variables

### Colors
```scss
$primary-color, $primary-dark, $primary-light
$secondary-color, $secondary-dark, $secondary-light
$success-color, $warning-color, $danger-color, $info-color
$text-primary, $text-secondary, $text-tertiary
$border-color, $border-dark, $border-light
$background-color, $background-secondary, $background-tertiary
```

### Spacing
```scss
$spacing-xs, $spacing-sm, $spacing-md, $spacing-lg, $spacing-xl, $spacing-2xl
// Values: 4px, 8px, 16px, 24px, 32px, 48px
```

### Typography
```scss
$font-family-base, $font-family-mono
$font-size-xs through $font-size-3xl
$font-weight-light through $font-weight-bold
$line-height-tight, $line-height-normal, $line-height-relaxed
```

### Border Radius
```scss
$border-radius-sm, $border-radius-md, $border-radius-lg, $border-radius-xl, $border-radius-full
```

### Shadows
```scss
$shadow-sm, $shadow-md, $shadow-lg, $shadow-xl
```

## Available Mixins

### Layout
- `@include flex-center` - Center content both horizontally and vertically
- `@include flex-between` - Space-between layout with flex
- `@include flex-column` - Flex column layout

### Text
- `@include truncate` - Single line text truncation with ellipsis
- `@include line-clamp($lines)` - Multi-line text clamping

### Components
- `@include button-base` - Base button styles
- `@include button-variant($bg, $text, $hover)` - Button color variant
- `@include card-base` - Base card styles
- `@include input-base` - Base input field styles

### Responsive
- `@include respond-to('sm'|'md'|'lg'|'xl')` - Media query helper

### Utilities
- `@include focus-visible` - Accessibility focus styles
- `@include gradient($start, $end)` - Linear gradient helper
- `@include absolute-center` - Absolutely center an element

## Customization

To change the design system, edit the variable values in `_variables.scss`. All components will automatically reflect the changes.

Example: Change primary color globally:
```scss
// In _variables.scss
$primary-color: #your-color;
```

## Best Practices

1. **Always use variables** instead of hardcoding colors/spacing
2. **Use mixins** for consistency in common patterns
3. **Use utility classes** in templates for quick styling
4. **Import only what you need** - import variables and mixins only in components that use them
5. **Maintain the layered approach** - don't mix concerns between files
6. **Use semantic naming** - variable names should indicate their purpose

## File Imports

The correct import order is important:

```scss
// 1. Always import variables first
@import '../../styles/variables';

// 2. Then import mixins (they depend on variables)
@import '../../styles/mixins';

// Now you can use both variables and mixins
```
