<template>
  <PrimeDialog
    :visible="visible"
    class="w-screen lg:w-3/4"
    header="All milestone clears"
    :draggable="false"
    modal
    maximizable
    :content-style="{ height: '80vh' }"
    @update:visible="$emit('update:visible', $event)"
  >
    <div class="space-y-4 overflow-auto pr-2">
      <section v-if="majorMilestones.length">
        <h4 class="text-sm font-semibold uppercase tracking-wide mb-2">
          Main category finishes
        </h4>
        <div class="space-y-2">
          <PlayerMajorMilestone
            v-for="m in sortedMajor"
            :key="m.levelId + (m.dateCleared ?? '')"
            :milestone="m"
            @click="openLevelPreview"
          />
        </div>
      </section>
      <section v-if="minorMilestones.length">
        <h4 class="text-sm font-semibold uppercase tracking-wide mb-2">
          Month category finishes
        </h4>
        <div class="space-y-2">
          <PlayerMinorMilestone
            v-for="m in sortedMinor"
            :key="m.levelId + (m.dateCleared ?? '')"
            :milestone="m"
            @click="openLevelPreview"
          />
        </div>
      </section>
    </div>
  </PrimeDialog>
  <LevelPreviewModal
    v-if="viewingLevel"
    :level="viewingLevel"
    @close="viewingLevel = undefined"
  />
</template>

<script lang="ts" setup>
import type { ClearedLevel } from '~/types/levels';
import type {
  MajorMilestone,
  Milestone,
  MinorMilestone,
} from '~/types/players';

const props = withDefaults(
  defineProps<{
    visible: boolean;
    milestones?: Milestone[];
    clearedLevels?: ClearedLevel[];
  }>(),
  { milestones: () => [], clearedLevels: () => [] },
);

defineEmits<{ (e: 'update:visible', value: boolean): void }>();


const majorMilestones = computed(
  () =>
    props.milestones?.filter((m): m is MajorMilestone => !('month' in m)) ?? [],
);
const minorMilestones = computed(
  () =>
    props.milestones?.filter((m): m is MinorMilestone => 'month' in m) ?? [],
);

const sortedMajor = computed(() =>
  useOrderBy(majorMilestones.value, 'dateCleared', 'desc'),
);

const sortedMinor = computed(() =>
  useOrderBy(minorMilestones.value, 'dateCleared', 'desc'),
);

const viewingLevel = ref<ClearedLevel>();

function openLevelPreview(levelId: string) {
  const level = props.clearedLevels?.find((l) => l.levelId === levelId);
  if (level) viewingLevel.value = level;
}
</script>
