<template>
  <PrimeInputGroup>
    <PrimeInputGroupAddon class="p-2">
      <i class="pi pi-search" />
    </PrimeInputGroupAddon>
    <PrimeAutoComplete
      v-model="currentQuery"
      placeholder="Find a player by NNID"
      :min-length="2"
      :suggestions="suggestions"
      @complete="(event) => search(event.query)"
      @item-select="(event) => navigateToPlayer(event.value)"
    >
      <template #option="{ option }">
        <div class="flex items-center">
          <PlayerNnid :nnid="option" :size="18" />
        </div>
      </template>
    </PrimeAutoComplete>
  </PrimeInputGroup>
</template>

<script lang="ts" setup>
const selectedItem = ref();
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
