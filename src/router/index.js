import Vue from 'vue';
import Router from 'vue-router';
import Rank from '@/components/rank/rank.vue';
import Search from '@/components/search/search.vue';
import Singer from '@/components/singer/singer.vue';
import Recommend from '@/components/recommend/recommend.vue';
import SingerDetail from '@/components/singer-detail/singer-detail.vue'
import RankDetail from '@/components/rank/rankDetail.vue'
Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'root',
    redirect: 'recommend'
  }, {
    path: '/recommend',
    name: 'recommend',
    component: Recommend
  }, {
    path: '/singer',
    name: 'singer',
    component: Singer,
    children: [{
      path: ':id',
      component: SingerDetail
    }]
  }, {
    path: '/rank',
    name: 'rank',
    component: Rank,
    children: [{
      path: ':id',
      component: RankDetail
    }]
  }, {
    path: '/search',
    name: 'search',
    component: Search
  }]
});
