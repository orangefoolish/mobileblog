<template>
  <Mb_Music></Mb_Music>
</template>

<script>
import global_variable from "../views/global_variable";
import Mb_Music from "../views/mb_Music";
import Mb_Musicmain from "../views/mb_MusicMain";
import Mb_MusicHot from "../views/mb_MusicHot";
import Mb_MusicSearch from "../views/mb_MusicSearch";
export default {
  name: "MusicLayout",
  data(){
    return{
      select:global_variable.select,
    }
  },
  components: {
    Mb_Music,
    Mb_Musicmain,
    Mb_MusicHot,
    Mb_MusicSearch
  }
}
</script>

<style scoped>

</style>