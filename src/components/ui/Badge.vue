<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}>();

const variantClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
  outline: 'text-foreground border',
} as const;

const classes = computed(() => [
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  variantClasses[props.variant || 'default']
]);
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
