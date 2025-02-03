<template>
  <div class="social-links flex gap-3 justify-center">
    <a
      v-for="link in links"
      :key="link.name"
      :href="link.href"
      target="_blank"
      :title="link.name"
    >
      <Icon :name="link.icon" size="2em" />
    </a>
    <button
      v-tooltip.bottom="`Support this site`"
      @click="donateVisible = true"
    >
      <Icon name="simple-icons:kofi" size="2em" />
    </button>
    <PrimeDialog
      v-model:visible="donateVisible"
      header="Support this site"
      modal
    >
      <DonationPanel />
    </PrimeDialog>
  </div>
</template>

<script setup lang="ts">
const links = [
  {
    name: 'Team 0% Discord',
    href: 'https://discord.com/invite/dw7WKs8',
    icon: 'logos:discord-icon',
  },
  {
    name: 'Watch Team 0% Live',
    href: 'https://twitch.tv/directory/category/super-mario-maker',
    icon: 'logos:twitch',
  },
  {
    name: 'Team 0% Twitter',
    href: 'https://twitter.com/Team0Percent',
    icon: 'logos:twitter',
  },
  {
    name: 'Team 0% YouTube',
    href: 'https://www.youtube.com/@TeamZeroPercent',
    icon: 'logos:youtube-icon',
  },
  {
    name: 'Github',
    href: 'https://github.com/snoozbuster/is-smm-beaten-yet',
    icon: 'logos:github-icon',
  },
];

const donateVisible = ref(false);
</script>
