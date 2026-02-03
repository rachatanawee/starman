# Feedback Design System

Modern, non-intrusive feedback patterns for Starman ERP.

## 🎯 Components

### 1. InlineFeedback
Subtle notifications that appear inline with content.

**Use for:**
- Form validation success
- Quick confirmations
- Non-critical updates

**Usage:**
```tsx
import { InlineFeedback } from '@/components/feedback/inline-feedback'

<InlineFeedback 
  type="success" 
  message="Changes saved" 
  duration={3000} 
/>
```

### 2. FloatingUndo
Bottom-center floating bar for reversible actions.

**Use for:**
- Delete operations
- Bulk updates
- Schedule changes

**Usage:**
```tsx
import { FloatingUndo } from '@/components/feedback/floating-undo'

{showUndo && (
  <FloatingUndo
    message="PO-001 moved to Jan 28"
    onUndo={() => revertChange()}
    duration={5000}
  />
)}
```

### 3. StatusIndicator
Inline status icons for background processes.

**Use for:**
- Loading states
- Sync status
- Process completion

**Usage:**
```tsx
import { StatusIndicator } from '@/components/feedback/status-indicator'

<StatusIndicator 
  status="loading" 
  message="Syncing..." 
  size="sm" 
/>
```

### 4. useOptimistic Hook
Instant UI updates with automatic rollback on error.

**Use for:**
- Drag & drop
- Inline editing
- Toggle switches

**Usage:**
```tsx
import { useOptimistic } from '@/components/feedback/use-optimistic'

const { data, isPending, update } = useOptimistic(items)

const handleMove = async (item, newDate) => {
  await update(
    [...items, movedItem], // Optimistic update
    () => api.moveItem(item.id, newDate) // Async operation
  )
}
```

## 📋 Decision Matrix

| Scenario | Component | Why |
|----------|-----------|-----|
| Form saved | InlineFeedback | Quick, non-blocking |
| Item deleted | FloatingUndo | Reversible action |
| AI analyzing | StatusIndicator | Background process |
| Drag & drop | useOptimistic | Instant feedback |
| Critical error | Dialog (existing) | Requires attention |
| Background sync | StatusIndicator | Persistent state |

## 🚫 When NOT to Use

**Don't use for:**
- ❌ Critical errors → Use Dialog
- ❌ Multi-step processes → Use Stepper
- ❌ Complex forms → Use inline validation
- ❌ Confirmations → Use Dialog

## 🎨 Design Principles

1. **Subtle over Loud** - Don't interrupt user flow
2. **Instant over Delayed** - Show feedback immediately
3. **Reversible over Final** - Allow undo when possible
4. **Inline over Popup** - Keep context visible
5. **Minimal over Verbose** - Short, clear messages

## 🔄 Migration from Toast

### Before (Toast)
```tsx
toast.success('Order created')
toast.error('Failed to save')
```

### After (Inline)
```tsx
<InlineFeedback type="success" message="Order created" />
// Or use optimistic UI - no message needed!
```

## 📦 Export

```tsx
export { InlineFeedback } from './inline-feedback'
export { FloatingUndo } from './floating-undo'
export { StatusIndicator } from './status-indicator'
export { useOptimistic } from './use-optimistic'
```
