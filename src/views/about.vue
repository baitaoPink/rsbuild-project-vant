<template>
    <div>
      <h1>{{ t('hello') }}</h1>
      <p>{{ t('welcome') }}</p>
    </div>
  </template>

  <script setup lang="ts">
  import { useI18n } from 'vue-i18n'， // Import the useI18n function from vue-i18n


  const { t } = useI18n(); // Composition API method to access translation functions

  </script>
