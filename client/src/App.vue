<template>
  <div id="app">
    <NavBar v-show="showNavBar" />
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script setup>
import VLazyImage from "v-lazy-image";
import NavBar from "@/components/NavBar";

import { computed, watch, onMounted } from 'vue';

import {useToast} from 'vue-toast-notification';
const $toast = useToast();

import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();

import { useStore } from 'vuex';
const store = useStore();

import {useLoading} from 'vue-loading-overlay'
const $loading = useLoading({});

const toAuthPage = () => {
  router.push({ name: 'authentication' });
};

let loader = null

const showNavBar = computed(() => {
      const notShow = ["authentication", "setup"];
      return notShow.indexOf(route.name) === -1;
});

const isAuthenticated = computed(() => {
      return store.state.user.isAuthenticated;
});

const isAuthenticatePending = computed(() => {
      return store.state.user.isAuthenticatePending;
});

const loginRequired = computed(() => {
      if (isAuthenticatePending.value) {
        return false;
      }
      return !isAuthenticated.value;
});

const loading = computed(() => {
      return store.state.info.loading;
});

const socketConnection = computed(() => {
      return store.state.info.socket;
});

watch(
  () => loading.value, 
  (newVal) => {
  if (!newVal && loader != null) {
    loader.hide();
  }
});

watch(
  () => socketConnection.value, 
  (newVal) => {
      if (newVal) return;
      setTimeout(() => {
        if (socketConnection.value) return;
        let options = {
          positionClass: "toast-bottom-left"
        };
        $toast.warning(
          "Connection lost to the backend",
          "Connection Lost",
          options
        );
      }, 1000);
});

watch(
  () => loginRequired.value,
  (newValue) => {
    if (newValue) {
      toAuthPage();
    } else {
      if (router.name === 'authentication') {
        router.push({ name: 'datasets' });
      }
    }
  },
  { immediate: true }
);

onMounted(() => {
    // app.__vue_app__.config.globalProperties.$socket.connect(() => {store.commit('info/socket', true);});
    // app.__vue_app__.config.globalProperties.$socket.disconnect(() => {store.commit('info/socket', false);});
    loader = $loading.show({
        height: 100
      });
      
    store.commit('user/setUserInfo');
    store.commit('info/getServerInfo');
    
    // dunno why, but app.__vue_app__ is undefined here, let's consider socket are alaways connected
    store.commit('info/socket', true);
});

</script>

<style>
@import "./assets/tagsStyle.css";
@import "./assets/tooltip.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: inherit;
  width: inherit;
  overflow: hidden;
}
</style>
