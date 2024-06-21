<template>
  <svg
    v-if="full"
    width="100%"
    height="100%"
    viewBox="0 0 40 40"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    xmlns:serif="http://www.serif.com/"
    style="
      fill-rule: evenodd;
      clip-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 1.5;
    "
  >
    <g transform="matrix(1,0,0,1.05982,-0.0668735,-1.13632)">
      <path
        d="M20.067,2.016L20.067,37.871"
        style="fill: none; stroke: currentColor; stroke-width: 0.97px"
      />
    </g>
    <g
      transform="matrix(-1.83697e-16,1,-1.05982,-1.94686e-16,41.1363,-0.0668735)"
    >
      <path
        d="M20.067,2.016L20.067,37.871"
        style="fill: none; stroke: currentColor; stroke-width: 0.97px"
      />
    </g>
    <g
      transform="matrix(-0.707107,0.707107,-0.749407,-0.749407,49.1351,20.7562)"
    >
      <path
        d="M20.067,2.016L20.067,37.871"
        style="fill: none; stroke: currentColor; stroke-width: 0.97px"
      />
    </g>
    <g
      transform="matrix(0.707107,0.707107,-0.749407,0.749407,20.7562,-9.13506)"
    >
      <path
        d="M20.067,2.016L20.067,37.871"
        style="fill: none; stroke: currentColor; stroke-width: 0.97px"
      />
    </g>
  </svg>
  <svg
    v-else
    width="100%"
    height="100%"
    viewBox="0 0 40 40"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    xmlns:serif="http://www.serif.com/"
    style="
      fill-rule: evenodd;
      clip-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 1.5;
    "
  >
    <g transform="matrix(1,0,0,1.05982,-0.0668735,-1.13632)">
      <path
        d="M20.067,2.016L20.067,37.871"
        style="fill: none; stroke: black; stroke-width: 0.97px"
      />
    </g>
    <g
      transform="matrix(-1.83697e-16,1,-1.05982,-1.94686e-16,41.1363,-0.0668735)"
    >
      <path
        d="M20.067,20.338L20.067,37.871"
        style="fill: none; stroke: black; stroke-width: 0.97px"
      />
    </g>
    <g
      transform="matrix(-0.707107,0.707107,-0.749407,-0.749407,49.1351,20.7562)"
    >
      <path
        d="M20.067,20.316L20.067,37.871"
        style="fill: none; stroke: black; stroke-width: 0.97px"
      />
    </g>
    <g
      transform="matrix(0.707107,0.707107,-0.749407,0.749407,20.7562,-9.13506)"
    >
      <path
        d="M20.067,20.022L20.067,37.871"
        style="fill: none; stroke: black; stroke-width: 0.97px"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  full: boolean
}>()
</script>
