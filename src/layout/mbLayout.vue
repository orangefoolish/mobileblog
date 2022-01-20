<template>
  <Aside></Aside>
  <router-view></router-view>
</template>

<script>
import Aside from "@/views/Aside";

export default {
  name: "mbLayout",
  components:{
    Aside,
  }
}
</script>

<style scoped>

</style>