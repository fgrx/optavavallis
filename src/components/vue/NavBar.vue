<script setup>
import { ref, onMounted } from "vue";
import generalInfos from "../../content/params/general.json";
import menus from "../../content/params/menu.json";

const isOpen = ref(false);

const drawer = () => (isOpen.value = !isOpen.value);

onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.keyCode == 27 && isOpen.value) isOpen.value = false;
  });
});
</script>

<template>
  <div class="w-full mb-70 shadow-lg bg-primary menu-site">
    <!-- logo part -->
    <div class="container mx-auto flex items-center content-start">
      <div class="flex-auto mt-0">
        <a href="/">
          <div class="items-center">
            <div class="ml-4 my-3 text-white">
              <span class="title-site">
                {{ generalInfos.title }}
              </span>
              <br />
              <span class="subtitle-site text-lg">
                {{ generalInfos.subtitle }}
              </span>
            </div>
          </div>
        </a>
      </div>

      <!-- Horizontal menu -->
      <div class="mr-0 md:mr-4">
        <div class="hidden xl:block md:flex xl:justify-between xl:bg-menu">
          <div
            class="flex hidden xl:flex xl:items-center order-3 xl:order-1"
            id="menu"
          >
            <nav>
              <ul
                class="xl:flex h-full items-center justify-between text-base text-white"
              >
                <template v-for="menu in menus" :key="menu.id">
                  <li v-if="menu?.display !== 'hide-for-large'">
                    <a
                      class="no-underline uppercase text-customGreenDark hover:text-customBlueDark px-4 lg:ml-2"
                      :href="menu.url"
                      >{{ menu.title }}</a
                    >
                  </li>
                </template>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="items-center mr-2 xl:ml-0">
        <label for="menu-toggle" class="cursor-pointer xl:hidden block">
          <button
            class="text-customGreenDark"
            aria-label="Open Menu"
            @click="drawer"
          >
            <svg
              fill="none"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-8 h-8"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </label>

        <input class="hidden" type="checkbox" id="menu-toggle" />
      </div>
    </div>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        @keydown.esc="isOpen = false"
        v-show="isOpen"
        class="z-10 fixed inset-0 transition-opacity"
      >
        <div
          @click="isOpen = false"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>
    <aside
      class="-ml-64 transform text-center bg-primary text-white top-0 left-0 w-64 bg-menu fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 pt-4"
      :class="isOpen ? 'translate-x-0 ml-0' : '-translate-x-full'"
    >
      <nav>
        <ul class="mt-4">
          <li class="text-xl py-4 px-2 text-center list-none">
            <a href="/">Accueil</a>
          </li>

          <li
            v-for="(menu, index) in menus"
            :key="index"
            class="text-xl py-4 px-2 text-center list-none"
            @click="isOpen = false"
          >
            <a :href="menu.url">{{ menu.title }}</a>
          </li>
        </ul>
      </nav>

      <div class="fixed bottom-0 w-full"></div>
    </aside>
  </div>
</template>

<style scoped>
li {
  list-style-type: none;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
