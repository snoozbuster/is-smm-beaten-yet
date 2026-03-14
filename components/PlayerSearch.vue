<template>
  <PrimeInputGroup
    :pt="{
      root: {
        class:
          'rounded-md bg-course-world-button-active focus-within:ring-1 focus-within:ring-inset focus-within:ring-course-world-button',
      },
    }"
  >
    <PrimeAutoComplete
      v-model="currentQuery"
      placeholder="Find a player by NNID"
      :min-length="2"
      :suggestions="suggestions"
      :pt="{
        root: { class: 'border-none' },
        input: {
          class:
            'bg-transparent border-none shadow-none text-white placeholder:text-white placeholder:opacity-80',
        },
      }"
      @complete="(event) => search(event.query)"
      @item-select="(event) => navigateToPlayer(event.value)"
    >
      <template #option="{ option }">
        <div class="flex items-center">
          <PlayerNnid :nnid="option" :size="18" />
        </div>
      </template>
    </PrimeAutoComplete>
    <PrimeInputGroupAddon
      :pt="{
        root: {
          class:
            'border-none px-3 bg-course-world-button text-course-world-button-text hover:brightness-105',
        },
      }"
    >
      <i class="pi pi-search" />
    </PrimeInputGroupAddon>
  </PrimeInputGroup>
</template>

<script lang="ts" setup>
const currentQuery = ref('');
const { players } = usePlayerList();

const router = useRouter();

const suggestions = ref<string[]>([]);

const search = (query: string) => {
  suggestions.value = query
    ? Object.keys(unref(players) ?? {}).filter((nnid) =>
        nnid.toLowerCase().includes(query.toLowerCase()),
      )
    : [];
};

const navigateToPlayer = (nnid: string) => router.push(`/players/${nnid}`);
</script>
