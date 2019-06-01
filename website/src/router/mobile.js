import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Home = () => import('@/views-mobile/home.vue');
const Job = () => import('@/views-mobile/job.vue');
const Search = () => import('@/views-mobile/search.vue');
const Detail = () => import('@/views-mobile/detail.vue');
const About = () => import('@/views-mobile/about.vue');
const Contact = () => import('@/views-mobile/contact.vue');
const News = () => import('@/views-mobile/news.vue');
const Article = () => import('@/views-mobile/article.vue');
const Products = () => import('@/views-mobile/products.vue');
const Feedback = () => import('@/views-mobile/feedback.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/job',
    name: 'Job',
    component: Job,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
  },
]

const router = new VueRouter({
  routes 
})

export default router;