<script setup lang="ts">
import { ConfigProvider } from "radix-vue";

const useIdFunction = () => useId();
</script>

<template>
  <div class="absolute inset-0">
    <ConfigProvider :use-id="useIdFunction">
      <NuxtRouteAnnouncer />
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ConfigProvider>
  </div>
</template>
